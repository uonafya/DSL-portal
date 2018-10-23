package com.healthit.dslweb.service;

import com.healthit.dslservice.util.Database;
import com.healthit.dslservice.util.PropertiesLoader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import java.util.logging.Level;
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

    /**
     *
     * @param array array containing query parameters to intepret to sql string
     * @return generated sql string to run
     */
    public String interpretQuery(JSONArray array) {

        JSONObject jsoObj;
        StringBuilder whatTOGetFromDataSource = new StringBuilder();
        for (Object o : array) {

            jsoObj = (JSONObject) o;
            //System.out.println("----------------------------------mojo object " + jsoObj);
            //System.out.println("----------------------------------filter " + jsoObj.getJSONObject("filter"));

            String s=getQueryToRun(jsoObj.getString("what"));
            log.info("This is the query to run: " + s);
        }
        
        return "";
    }

    private String getQueryToRun(String queryName) {
        log.info("Fetching query to run, passed name: "+queryName);
        String[] qName = queryName.split(":");
        PropertiesLoader propLoader = new PropertiesLoader();
        Properties prop = propLoader.getPropertiesFile(queriesMatcherFile, "query-matcher.properties");
        Set<Object> keys = propLoader.getAllKeys(prop);

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
                return key;
            }
        }

        // prop.getProperty(key);
        System.out.println(prop.getProperty("dbuser"));
        return "";
    }

}
