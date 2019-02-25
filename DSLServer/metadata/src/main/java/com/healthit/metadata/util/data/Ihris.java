/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
public class Ihris {
    final static Logger log = Logger.getLogger(Ihris.class.getCanonicalName());

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
    public static List<Object> getIhrisData(String startYear, String endYear, String startMonth, String endMonth, String query, String commodityList,String xaxis) {

        query = query.replaceAll("@commodity_list@", commodityList);
        query = populateYearMonthParametersInQuery(startYear, endYear, startMonth, endMonth, query);

        List<Object> components = new ArrayList();

        QueryInterpreter queryIntpret = new QueryInterpreter();
        log.info("Final query ihris meta " + query);
        Map<String, List<Object>> data = queryIntpret.runSqlQuery(query);  // run query and bundle in data tables format

        Map<String, Object> component = new HashMap(); //carries info/data for indicator components
        
        
        component.put("display", "6");
        component.put("data", data);
        component.put("subject", "cadre"); // converter helper data
        component.put("dataname", "cadre_count"); // converter helper data
        component.put("xaxis",xaxis);// converter helper data
        component.put("title", "Cadre distribution");
       
        Map<String, String> dimension = new HashMap();
        dimension.put("small", "12");
        dimension.put("medium", "6");
        dimension.put("large", "6");
        component.put("dimension", dimension);
        
        
        components.add(component);
        log.info("components returned " + components);
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
