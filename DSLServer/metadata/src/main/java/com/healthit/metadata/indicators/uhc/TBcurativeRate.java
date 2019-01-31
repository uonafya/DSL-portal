package com.healthit.metadata.indicators.uhc;

import com.healthit.dslweb.service.QueryInterpreter;
import com.healthit.metadata.Metadata;
import com.healthit.metadata.model.OrgUnitName;
import com.healthit.metadata.model.PeriodType;
import com.healthit.metadata.model.RequestEntity;
import com.healthit.metadata.model.query.QueryParameters;
import com.healthit.metadata.util.PropertiesLoader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import org.apache.log4j.Logger;
import org.json.JSONObject;

/**
 *
 * @author duncan
 */
public class TBcurativeRate implements Metadata {

    final static Logger log = Logger.getLogger(TBcurativeRate.class.getCanonicalName());

    @Override
    public List<Object> getMetadata(RequestEntity requestString) {
        log.info("Tb curative rate metadata fetcher");

        OrgUnitName orgUnit = OrgUnitName.NATIONAL;
        String orgUnitId = "";
        PeriodType periodType = PeriodType.MONTHLY;
        try {
            JSONObject orgUnitIdObj = (JSONObject) requestString.getOrgUnitID();
            orgUnitId = (String) orgUnitIdObj.getJSONArray(requestString.getOrgUnitType()).get(0);
            log.debug("The or type is" + requestString.getOrgUnitType());
            if ("ward".equals(requestString.getOrgUnitType())) {
                orgUnit = OrgUnitName.WARD;
            } else if ("subcounty".equals(requestString.getOrgUnitType())) {
                orgUnit = OrgUnitName.SUBCOUNTY;
            } else if ("constituency".equals(requestString.getOrgUnitType())) {
                orgUnit = OrgUnitName.CONSTITUENCY;
            } else if ("facility".equals(requestString.getOrgUnitType())) {
                orgUnit = OrgUnitName.FACILITY;
            } else {
                orgUnit = OrgUnitName.NATIONAL;
            }
        } catch (Exception ex) {
            log.error(ex);
        }

        String startYear = "2015";
        String endYear = "2015";
        String startMonth = "1";
        String endMonth = "12";
        String periodTypeRaw = "";

        try {
            JSONObject period = (JSONObject) requestString.getPeriod();
            periodTypeRaw = requestString.getPeriodType();
            log.debug("the period type is " + requestString.getPeriodType());

            if (periodTypeRaw.equals("yearly")) {
                periodType = PeriodType.YEARLY;
                startYear = (String) period.getJSONArray("start_year").get(0);
                endYear = (String) period.getJSONArray("end_year").get(0);
            }

            if (periodTypeRaw.equals("monthly")) {
                periodType = PeriodType.MONTHLY;
                startYear = (String) period.getJSONArray("start_year").get(0);
                endYear = (String) period.getJSONArray("end_year").get(0);

                startMonth = (String) period.getJSONArray("start_month").get(0);
                endMonth = (String) period.getJSONArray("end_month").get(0);
            }

        } catch (Exception ex) {
            log.error(ex);
        }

        QueryParameters queryParams = new QueryParameters.QueryParametersBuilder()
                .setEndMonth(endMonth)
                .setEndYear(endYear)
                .setOrgId(orgUnitId)
                .setStartMonth(startMonth)
                .setStartYear(startYear)
                .setOrgUnitName(orgUnit)
                .setPeriodType(periodType)
                .build();

        List<Object> components = responseManager(queryParams);

        return components;
    }

    private List<Object> responseManager(QueryParameters queryParams) {
        List<Object> components = null;
        log.info("Running response manager");
        log.info("period type " + queryParams.getPeriodType());
        log.info("org unit type " + queryParams.getOrgUnitName());

        if (queryParams.getPeriodType() == PeriodType.YEARLY && queryParams.getOrgUnitName() == OrgUnitName.NATIONAL) {
            log.info("Yearly and National");
            components = getNationalYearlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth());
        }
        if (queryParams.getPeriodType() == PeriodType.MONTHLY && queryParams.getOrgUnitName() == OrgUnitName.NATIONAL) {

            log.info("Monthly and National");
            components = getNationalMonthlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth());

        }
        return components;
    }

    private String populateYearMonthParametersInQuery(String startYear, String endYear, String startMonth, String endMonth, String query) {
        query = query.replaceAll("@start_year@", startYear);
        query = query.replaceAll("@end_year@", endYear);
        query = query.replaceAll("@start_month@", startMonth);
        query = query.replaceAll("@end_month@", endMonth);
        return query;
    }

    private List<Object> getFacilityYearlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String orgId) {
        Properties kemsaQueryFile = null;
        kemsaQueryFile = PropertiesLoader.getPropertiesFile(kemsaQueryFile, "kemsa.properties");
        log.info("The query to run " + kemsaQueryFile.getProperty("commodity_sum_per_year_per_month"));
        String query = kemsaQueryFile.getProperty("commodity_sum_per_year_per_month");
        String commodityList = "['%ethambutol%','%isoniazid%', '%rifampicin%', '%pyrazinamide%']";

        query = query.replaceAll("@commodity_list@", commodityList);
        query = populateYearMonthParametersInQuery(startYear, endYear, startMonth, endMonth, query);

        List<Object> components = new ArrayList();

        QueryInterpreter queryIntpret = new QueryInterpreter();
        Map<String, List<Object>> data = queryIntpret.runSqlQuery(query);  // run query and bundle in data tables format

        Map<String, Object> component = new HashMap();
        log.info("Final query " + query);
        component.put("display", "table");
        component.put("data", data);
        log.info("All the keys kemsa " + PropertiesLoader.getAllKeys(kemsaQueryFile).toString());

        Map<String, String> dimension = new HashMap();
        dimension.put("small", "6");
        dimension.put("medium", "6");
        dimension.put("large", "6");
        component.put("dimension", dimension);

        components.add(component);

        return components;
    }

    private List<Object> getFacilityMonthlyMetadata() {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getWardYearlyMetadata() {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getWardMonthlyMetadata() {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getSubCountyMonthlyMetadata() {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getSubCountyYearlyMetadata() {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getConstituencyMonthlyMetadata() {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getConstituencyYearlyMetadata() {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getNationalMonthlyMetadata(String startYear, String endYear, String startMonth, String endMonth) {
        String kemsaQuery = "commodity_sum_per_year_per_monthly";
        return getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery);
    }

    private List<Object> getNationalYearlyMetadata(String startYear, String endYear, String startMonth, String end_month) {
        String kemsaQuery = "commodity_sum_year_range";
        return getCommodityData(startYear, endYear, startMonth, end_month, kemsaQuery);
    }

    private List<Object> getCommodityData(String startYear, String endYear, String startMonth, String endMonth, String kemsaQuery) {
        Properties kemsaQueryFile = null;
        kemsaQueryFile = PropertiesLoader.getPropertiesFile(kemsaQueryFile, "kemsa.properties");
        log.info("The query to run " + kemsaQueryFile.getProperty(kemsaQuery));
        String query = kemsaQueryFile.getProperty(kemsaQuery);
        String commodityList = "['%ethambutol%','%isoniazid%', '%rifampicin%', '%pyrazinamide%']";

        query = query.replaceAll("@commodity_list@", commodityList);
        query = populateYearMonthParametersInQuery(startYear, endYear, startMonth, endMonth, query);

        List<Object> components = new ArrayList();

        QueryInterpreter queryIntpret = new QueryInterpreter();
        log.info("Final query tbcurative " + query);
        Map<String, List<Object>> data = queryIntpret.runSqlQuery(query);  // run query and bundle in data tables format

        Map<String, Object> component = new HashMap();

        component.put("display", "table");
        component.put("data", data);
        log.info("All the keys kemsa " + PropertiesLoader.getAllKeys(kemsaQueryFile).toString());

        Map<String, String> dimension = new HashMap();
        dimension.put("small", "6");
        dimension.put("medium", "6");
        dimension.put("large", "6");
        component.put("dimension", dimension);

        components.add(component);

        return components;
    }

}
