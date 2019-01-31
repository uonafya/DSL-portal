package com.healthit.metadata.util.data;

import com.healthit.dslweb.service.QueryInterpreter;
import com.healthit.metadata.indicators.uhc.TBcurativeRate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

/**
 *
 * @author duncan
 */
public class Commodity {
        final static Logger log = Logger.getLogger(TBcurativeRate.class.getCanonicalName());

    /**
     * fetches kemsa commodity issues for tb
     *
     * @param startYear
     * @param endYear
     * @param startMonth
     * @param endMonth
     * @param kemsaQuery
     * @return
     */
    public static List<Object> getCommodityData(String startYear, String endYear, String startMonth, String endMonth, String query, String commodityList) {

        query = query.replaceAll("@commodity_list@", commodityList);
        query = populateYearMonthParametersInQuery(startYear, endYear, startMonth, endMonth, query);

        List<Object> components = new ArrayList();

        QueryInterpreter queryIntpret = new QueryInterpreter();
        log.info("Final query commodity meta " + query);
        Map<String, List<Object>> data = queryIntpret.runSqlQuery(query);  // run query and bundle in data tables format

        Map<String, Object> component = new HashMap();

        component.put("display", "table");
        component.put("data", data);

        Map<String, String> dimension = new HashMap();
        dimension.put("small", "6");
        dimension.put("medium", "6");
        dimension.put("large", "6");
        component.put("dimension", dimension);

        components.add(component);

        return components;
    }

    private static String populateYearMonthParametersInQuery(String startYear, String endYear, String startMonth, String endMonth, String query) {
        query = query.replaceAll("@start_year@", startYear);
        query = query.replaceAll("@end_year@", endYear);
        query = query.replaceAll("@start_month@", startMonth);
        query = query.replaceAll("@end_month@", endMonth);
        return query;
    }

}