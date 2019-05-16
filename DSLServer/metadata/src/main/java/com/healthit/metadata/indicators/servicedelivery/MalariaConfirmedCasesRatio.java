package com.healthit.metadata.indicators.servicedelivery;

import com.healthit.dslweb.service.QueryInterpreter;
import com.healthit.metadata.Metadata;
import com.healthit.metadata.model.OrgUnitName;
import com.healthit.metadata.model.PeriodType;
import com.healthit.metadata.model.RequestEntity;
import com.healthit.metadata.model.query.QueryParameters;
import com.healthit.metadata.util.PropertiesLoader;
import com.healthit.metadata.util.data.Commodity;
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
public class MalariaConfirmedCasesRatio implements Metadata {

    final static Logger log = Logger.getLogger(MalariaConfirmedCasesRatio.class.getCanonicalName());
    String kemsaQueryFile = "kemsa.properties";
    String commodityList = "['%phosphate%','%quinine%']";

    @Override
    public List<Object> getMetadata(RequestEntity requestString) {
        log.info("Malaria Confirmed Cases Ratio metadata fetcher");
        Map<String, String> indicator = new HashMap(); //carries metadata for main indicator
        String pType="month";
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
            } else if ("county".equals(requestString.getOrgUnitType())) {
                orgUnit = OrgUnitName.COUNTY;
            } else {
                orgUnit = OrgUnitName.NATIONAL;
            }
        } catch (Exception ex) {
            log.error(ex);
        }
        indicator.put("orgunit", orgUnit.name().toLowerCase());

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
                pType="year";
                startYear = (String) period.getJSONArray("start_year").get(0);
                endYear = (String) period.getJSONArray("end_year").get(0);
            }

            if (periodTypeRaw.equals("monthly")) {
                periodType = PeriodType.MONTHLY;
                pType="month";
                startYear = (String) period.getJSONArray("start_year").get(0);
                endYear = (String) period.getJSONArray("end_year").get(0);

                startMonth = (String) period.getJSONArray("start_month").get(0);
                endMonth = (String) period.getJSONArray("end_month").get(0);
            }

        } catch (Exception ex) {
            log.error(ex);
        }
        indicator.put("xaxis", pType);
        indicator.put("subject", "indicator_name"); // converter helper data
        indicator.put("dataname", "value"); // converter helper data
        String title= "Malaria confirmed cases ratio ";
         if(pType=="month"){
            indicator.put("title", title+startYear);
        }else{
            indicator.put("title", title +startYear+" - "+endYear);
        }
        indicator.put("graph-type", "4");
        indicator.put("dissagregated-subjects", "false"); //weather the name of the subjects (eg, can be dissagragated as facility by type)
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

        components.add(indicator);

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

        if (queryParams.getPeriodType() == PeriodType.MONTHLY && queryParams.getOrgUnitName() == OrgUnitName.CONSTITUENCY) {
            log.info("Monthly and Constituency");
            components = getConstituencyMonthlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth(), queryParams.getOrgId());
        }

        if (queryParams.getPeriodType() == PeriodType.YEARLY && queryParams.getOrgUnitName() == OrgUnitName.CONSTITUENCY) {
            log.info("Monthly and Constituency");
            components = getConstituencyYearlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth(), queryParams.getOrgId());
        }

        if (queryParams.getPeriodType() == PeriodType.MONTHLY && queryParams.getOrgUnitName() == OrgUnitName.COUNTY) {
            log.info("Monthly and County");
            components = getCountyMonthlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth(), queryParams.getOrgId());
        }

        if (queryParams.getPeriodType() == PeriodType.YEARLY && queryParams.getOrgUnitName() == OrgUnitName.COUNTY) {
            log.info("Monthly and County");
            components = getCountyYearlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth(), queryParams.getOrgId());
        }

        if (queryParams.getPeriodType() == PeriodType.MONTHLY && queryParams.getOrgUnitName() == OrgUnitName.WARD) {
            log.info("Monthly and County");
            components = getWardMonthlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth(), queryParams.getOrgId());
        }

        if (queryParams.getPeriodType() == PeriodType.YEARLY && queryParams.getOrgUnitName() == OrgUnitName.WARD) {
            log.info("Monthly and County");
            components = getWardYearlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth(), queryParams.getOrgId());
        }
        
        if (queryParams.getPeriodType() == PeriodType.MONTHLY && queryParams.getOrgUnitName() == OrgUnitName.FACILITY) {
            log.info("Monthly and Facility");
            components = getFacilityMonthlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth(), queryParams.getOrgId());
        }

        if (queryParams.getPeriodType() == PeriodType.YEARLY && queryParams.getOrgUnitName() == OrgUnitName.FACILITY) {
            log.info("Monthly and Facility");
            components = getFacilityYearlyMetadata(queryParams.getStartYear(), queryParams.getEndYear(), queryParams.getStartMonth(), queryParams.getEndMonth(), queryParams.getOrgId());
        }
        
        return components;
    }

    private List<Object> getFacilityYearlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String facility) {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getFacilityMonthlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String facility) {
        List<Object> components = new ArrayList();
        return components;
    }

    private List<Object> getWardYearlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String ward) {
        String kemsaQueryName = "commodity_sum_per_ward_per_year_range";
        String kemsaQuery = getQueryToRun(kemsaQueryName, kemsaQueryFile);
        kemsaQuery = kemsaQuery.replaceAll("@ward@", ward);
        return Commodity.getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery, commodityList, "year");
    }

    private List<Object> getWardMonthlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String ward) {
        String kemsaQueryName = "commodity_sum_per_ward_per_year_per_monthly";
        String kemsaQuery = getQueryToRun(kemsaQueryName, kemsaQueryFile);
        kemsaQuery = kemsaQuery.replaceAll("@ward@", ward);
        return Commodity.getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery, commodityList, "monthly");
    }

    private List<Object> getCountyMonthlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String county) {
        String kemsaQueryName = "commodity_sum_per_county_per_year_per_monthly";
        String kemsaQuery = getQueryToRun(kemsaQueryName, kemsaQueryFile);
        kemsaQuery = kemsaQuery.replaceAll("@county@", county);
        return Commodity.getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery, commodityList, "month");
    }

    private List<Object> getCountyYearlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String county) {
        String kemsaQueryName = "commodity_sum_per_county_per_year_range";
        String kemsaQuery = getQueryToRun(kemsaQueryName, kemsaQueryFile);
        kemsaQuery = kemsaQuery.replaceAll("@county@", county);
        return Commodity.getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery, commodityList, "year");
    }

    private List<Object> getConstituencyMonthlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String constituency) {
        String kemsaQueryName = "commodity_sum_per_constituency_per_year_per_monthly";
        String kemsaQuery = getQueryToRun(kemsaQueryName, kemsaQueryFile);
        kemsaQuery = kemsaQuery.replaceAll("@constituency@", constituency);
        return Commodity.getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery, commodityList, "month");
    }

    private List<Object> getConstituencyYearlyMetadata(String startYear, String endYear, String startMonth, String endMonth, String constituency) {
        String kemsaQueryName = "commodity_sum_per_constituency_per_year_range";
        String kemsaQuery = getQueryToRun(kemsaQueryName, kemsaQueryFile);
        kemsaQuery = kemsaQuery.replaceAll("@constituency@", constituency);
        return Commodity.getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery, commodityList, "year");
    }

    private List<Object> getNationalMonthlyMetadata(String startYear, String endYear, String startMonth, String endMonth) {
        String kemsaQueryName = "commodity_sum_per_year_per_monthly";
        String kemsaQuery = getQueryToRun(kemsaQueryName, kemsaQueryFile);
        return Commodity.getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery, commodityList, "month");
    }

    private List<Object> getNationalYearlyMetadata(String startYear, String endYear, String startMonth, String endMonth) {
        String kemsaQueryName = "commodity_sum_year_range";

        String kemsaQuery = getQueryToRun(kemsaQueryName, kemsaQueryFile);
        return Commodity.getCommodityData(startYear, endYear, startMonth, endMonth, kemsaQuery, commodityList, "year");
    }

    private String getQueryToRun(String queryName, String queryFile) {
        Properties kemsaQueryFile = null;
        kemsaQueryFile = PropertiesLoader.getPropertiesFile(kemsaQueryFile, queryFile);
        log.info("The query to run " + kemsaQueryFile.getProperty(queryName));
        String query = kemsaQueryFile.getProperty(queryName);
        return query;
    }

}
