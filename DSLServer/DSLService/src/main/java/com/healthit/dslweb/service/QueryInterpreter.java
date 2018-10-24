package com.healthit.dslweb.service;

import com.healthit.dslservice.DslException;
import com.healthit.dslservice.util.Database;
import com.healthit.dslservice.util.PropertiesLoader;
import com.healthit.dslservice.util.strings.RandomStringGenerator;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author duncan
 */
public class QueryInterpreter {

    final static Logger log = Logger.getLogger(QueryInterpreter.class.getCanonicalName());
    static Properties queriesFile;
    static Properties queriesMatcherFile;
    static Set<String> tableAlias = new HashSet();

    /**
     *
     * @param array array containing all query parameters to interpret to sql
     * string
     * @return generated sql string to run
     */
    public Map<String, List<Object>> interpretQuery(JSONArray array) {

        JSONObject jsoObj;
        List<Map<String, Object>> queriesToRun = new ArrayList();
        for (Object o : array) {
            jsoObj = (JSONObject) o;
            //System.out.println("----------------------------------mojo object " + jsoObj);
            //System.out.println("----------------------------------filter " + jsoObj.getJSONObject("filter"));
            Map<String, Object> s = getQueryToRun(jsoObj.getString("what"));
            if (s != null) {
                queriesToRun.add(s);
            }
        }
        String finalQuery = getQuery(queriesToRun);
        Map<String, List<Object>> results = runSqlQuery(finalQuery);
        return results;
    }

    private Map<String, List<Object>> runSqlQuery(String sqlQuery) {
        Map<String, String[][]> queryResults = new HashMap();
        Database db = new Database();
        List<List> reslts1 = null;
        Map<String, List<Object>> wrapperMap = null;
        try {
            String[][] reslts;
            reslts1 = new ArrayList();
            wrapperMap = new HashMap();
            Map<String, Object> results = db.executeQueryWithColumnCount(sqlQuery);
            ResultSet rs = (ResultSet) results.get("resultset");
            int rowsCount = (int) results.get("columncount");
            log.info("total row count from results " + rowsCount);
            ResultSetMetaData rsMetaData = rs.getMetaData();
            int columnsCount = rsMetaData.getColumnCount();
            log.info("total column count from results " + columnsCount);
            reslts = new String[columnsCount][rowsCount + 1];

            //add columns heads
            log.info("Getting columns headers");
            List<Map<String, String>> colmns = new ArrayList();
            for (int x = 1; x <= columnsCount; x++) {
                log.debug("column name " + rsMetaData.getColumnName(x));
                reslts[x - 1][0] = rsMetaData.getColumnName(x);
                Map<String, String> colum = new HashMap();
                colum.put("title", rsMetaData.getColumnName(x));
                colmns.add(colum);
            }
            wrapperMap.put("columns", (List<Object>) (Object) colmns);
            int rowIndex = 1; //initialize to 1 because first row occupied by column headers
            log.info("Getting resultset rows data");
            String colType;
            while (rs.next()) {
                rowIndex = rowIndex + 1;
                List<String> resultRow = new ArrayList();
                for (int x = 1; x <= columnsCount; x++) {
                    colType = rsMetaData.getColumnTypeName(x);
                    log.info("Column type " + (rowIndex - 1));
                    reslts[x - 1][rowIndex - 1] = rs.getObject(x).toString();
                    resultRow.add(rs.getObject(x).toString());
                }
                reslts1.add(resultRow);
                wrapperMap.put("data", (List<Object>) (Object) reslts1);
            }
            queryResults.put("query_results", reslts);
        } catch (DslException | SQLException ex) {
            log.error(ex);
        } finally {
            db.CloseConnection();
        }
        return wrapperMap;
    }

    /**
     * Generates table aliases and gets the final query
     *
     * @param queriesToRun list of queries to run and their attribues including,
     * values to fetch, the join elements
     * @return Final Sql string
     */
    private String getQuery(List<Map<String, Object>> queriesToRun) {
        List<Map<String, Object>> _queriesToRun = queriesToRun;
        int queriesToRunListLength = queriesToRun.size() - 1;
        log.info("Queries to run are: " + queriesToRunListLength + 1);
        String[] tableAliases = new String[queriesToRunListLength + 1];
        for (int x = 0; x <= queriesToRunListLength; x++) {
            String tableAliasName = RandomStringGenerator.getRandomString(10);
            while (tableAlias.contains(tableAliasName)) {
                tableAliasName = RandomStringGenerator.getRandomString(10);
            }
            tableAliases[x] = tableAliasName;
            tableAlias.add(tableAliasName);
            _queriesToRun.get(x).put("alias", tableAliasName);
        }
        return buildSql(_queriesToRun, queriesToRunListLength);

    }

    /**
     * creates the select from part of the sql from passed attributes
     *
     * @param finalQueryToRun finalquery to run string builder
     * @param _queriesToRun queries to run with aliases
     * @param queriesToRunListLength number of queries that need to be run
     * @return
     */
    private StringBuilder createSelectSqlSegment(StringBuilder finalQueryToRun, List<Map<String, Object>> _queriesToRun, int queriesToRunListLength) {

        boolean isFirstFetchValue = true;
        for (int x = 0; x <= queriesToRunListLength; x++) {
            //   append fetch values
            String r = (String) _queriesToRun.get(x).get("fetchValues");
            r = r.replace("[", "").replace("]", "");
            String[] fetchValues = (String[]) r.split("'");
            String alias = (String) _queriesToRun.get(x).get("alias");
            for (int y = 0; y <= fetchValues.length - 1; y++) {
                StringBuilder g = new StringBuilder();
                log.info("fetch value to append " + alias + "." + fetchValues[y] + " ");
                if (fetchValues[y].length() != 0) {
                    if (isFirstFetchValue) {
                        finalQueryToRun.append(alias + "." + fetchValues[y] + " ");
                        isFirstFetchValue = false;
                    } else {
                        finalQueryToRun.append("," + alias + "." + fetchValues[y] + " ");
                    }
                }
            }
        }
        return finalQueryToRun;
    }

    /**
     *
     * @param finalQueryToRun String builder object for stiching different parts
     * of the final query
     * @param _queriesToRun list of queries to run and their attribues
     * including, values to fetch, the join elements and aliases
     * @param loopIndex index indicating current subquery in context
     * @return
     */
    private StringBuilder createFromSqlSegment(StringBuilder finalQueryToRun, List<Map<String, Object>> _queriesToRun, int loopIndex) {
        finalQueryToRun.append("from ");
        finalQueryToRun.append("(" + _queriesToRun.get(loopIndex).get("querySring") + ")");
        finalQueryToRun.append(" " + _queriesToRun.get(loopIndex).get("alias"));
        return finalQueryToRun;
    }

    /**
     *
     * @param finalQueryToRun String builder object for stiching different parts
     * of the final query
     * @param _queriesToRun list of queries to run and their attribues
     * including, values to fetch, the join elements and aliases
     * @param loopIndex index indicating current subquery in context
     * @return
     */
    private StringBuilder createJoinSqlSegment(StringBuilder finalQueryToRun, List<Map<String, Object>> _queriesToRun, int loopIndex) {
        finalQueryToRun.append(" inner join ");
        finalQueryToRun.append("(" + _queriesToRun.get(loopIndex).get("querySring") + ")");
        finalQueryToRun.append(" " + _queriesToRun.get(loopIndex).get("alias"));
        finalQueryToRun.append(" on ");
        return finalQueryToRun;
    }

    /**
     *
     * @param _queriesToRun list of queries to run and their attribues
     * including, values to fetch, the join elements and aliases
     * @param loopIndex index indicating current subquery in context
     * @return
     */
    private List<String[]> getJoinValuesAttributes(List<Map<String, Object>> _queriesToRun, int loopIndex) {
        List<String[]> aliases = new ArrayList();
        String joinVals = (String) _queriesToRun.get(loopIndex).get("joins");
        String[] joinValues = joinVals.replace("[", "").replace("]", "").replace("'", "").split(",");

        String _previousSubqueryJoinValues = (String) _queriesToRun.get(loopIndex - 1).get("joins");
        String[] previousSubqueryJoinValues = _previousSubqueryJoinValues.replace("[", "").replace("]", "").replace("'", "").split(",");
        aliases.add(previousSubqueryJoinValues);
        aliases.add(joinValues);
        return aliases;

    }

    /**
     *
     * @param finalQueryToRun String builder object for stiching different parts
     * of the final query
     * @param loopIndex index indicating current subquery in context
     * @param previousSubqueryJoinValues the attributes/names from the previous
     * subquery in the loop that are used to inner join with current subquery
     * @param joinValues the attributes/names from the current subquery in the
     * loop that are used to inner join with previous subquery
     * @param alias current subquery alias
     * @param previousSubqueryJAlias previous subquery alias
     * @return
     */
    private StringBuilder createJoinOnSqlSegment(
            StringBuilder finalQueryToRun,
            int loopIndex, String[] previousSubqueryJoinValues,
            String[] joinValues,
            String alias,
            String previousSubqueryJAlias
    ) {
        int joinCount = 1;
        for (int y = 0; y <= joinValues.length - 1; y++) {
            if (joinCount == 1) {
            } else {
                finalQueryToRun.append(" and ");
            }
            for (int p = 0; p <= previousSubqueryJoinValues.length - 1; p++) {
                log.info("we join using same column names on this query and the previous one");
                if (joinValues[y].equals(previousSubqueryJoinValues[p])) {
                    log.info("joins values to join " + alias + "." + joinValues[y] + "=" + previousSubqueryJAlias + "." + previousSubqueryJoinValues[p]);
                    finalQueryToRun.append(alias + "." + joinValues[y] + "=" + previousSubqueryJAlias + "." + previousSubqueryJoinValues[p]);
                    joinCount = joinCount + 1;
                }
            }
        }
        return finalQueryToRun;
    }

    /**
     *
     * @param queriesToRun list of queries to run and their attribues including,
     * values to fetch, the join elements and aliases
     * @param queriesToRunLength the number of independent queries to perform
     * joins
     * @return runnable sql string
     */
    private String buildSql(List<Map<String, Object>> queriesToRun, int queriesToRunLength) {
        List<Map<String, Object>> _queriesToRun = queriesToRun;
        int queriesToRunListLength = queriesToRunLength;
        StringBuilder finalQueryToRun = new StringBuilder("Select ");
        finalQueryToRun = createSelectSqlSegment(finalQueryToRun, _queriesToRun, queriesToRunLength);

        boolean isFirstQuery = true;
        for (int x = 0; x <= queriesToRunListLength; x++) {
            //   querySring joins fetchValues
            if (isFirstQuery) {
                finalQueryToRun = createFromSqlSegment(finalQueryToRun, _queriesToRun, x);
                isFirstQuery = false;
                continue;
            }
            finalQueryToRun = createJoinSqlSegment(finalQueryToRun, _queriesToRun, x);
            String alias = (String) _queriesToRun.get(x).get("alias"); //current query alias
            String previousSubqueryJAlias = (String) _queriesToRun.get(x - 1).get("alias"); //previous query alias
            List<String[]> joinValues = getJoinValuesAttributes(_queriesToRun, x);

            finalQueryToRun = createJoinOnSqlSegment(finalQueryToRun, x, joinValues.get(0), joinValues.get(1), alias, previousSubqueryJAlias);
        }
        log.info("Final query " + finalQueryToRun.toString());
        return finalQueryToRun.toString();
    }

    /**
     *
     * @param queryName the query name to use in fetching the query from file
     * @return query to run.
     */
    private Map<String, Object> getQueryToRun(String queryName) {
        log.info("Fetching query to run, passed name: " + queryName);
        String[] qName = queryName.split(":");
        PropertiesLoader propLoader = new PropertiesLoader();
        Properties prop = propLoader.getPropertiesFile(queriesMatcherFile, "query_matcher.properties");
        Set<Object> keys = propLoader.getAllKeys(prop);
        Map<String, Object> queriesToAttributes = null;
        if (qName[0] == "locality") {
            return queriesToAttributes;
        }
        for (Object k : keys) {
            String key = (String) k;
            boolean queryNameMatch = true;
            for (int x = 0; x <= qName.length; x++) {
                if (key.contains(qName[0])) {
                    continue;
                } else {
                    queryNameMatch = false;
                    break;
                }
            }
            if (queryNameMatch == true) {
                String queryAttributes = prop.getProperty(key); //get the properties file of the query and the key(name)
                String[] qAttributes = queryAttributes.split(":");
                Properties queryFile = null;
                prop = propLoader.getPropertiesFile(queryFile, qAttributes[1]);
                log.info("Third parameter " + qAttributes[2]);
                queriesToAttributes = new HashMap();
                queriesToAttributes.put("querySring", prop.getProperty(qAttributes[0])); // the sql query
                log.debug("The join parameters are " + qAttributes[2]);
                queriesToAttributes.put("joins", qAttributes[2]); //columns that can be used to join to other queries
                queriesToAttributes.put("fetchValues", qAttributes[3]); //values that can be pulled from this query
                return queriesToAttributes; //return query to run
            }
        }
        return queriesToAttributes;
    }

}
