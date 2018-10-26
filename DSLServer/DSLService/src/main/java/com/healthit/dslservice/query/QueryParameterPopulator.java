package com.healthit.dslservice.query;

import com.healthit.dslservice.dao.FacilityDao;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
/**
 *
 * @author duncan
 */
public class QueryParameterPopulator {

    final static Logger log = Logger.getLogger(QueryParameterPopulator.class.getCanonicalName());

    /**
     *
     * @param finalQuery
     * @param jsoObj json object with locality filter values
     * @param parameterPlaceholder
     * @return
     */
    public static String populateLocalityParameters(String finalQuery, JSONObject jsoObj, Map<String, String> parameterPlaceholder) {
        log.debug("locality paramerter populator");
        JSONObject Obj = jsoObj.getJSONObject("filter");
        Iterator parameterPlaceholderKeys = parameterPlaceholder.keySet().iterator();
        log.debug("palceholder keys "+parameterPlaceholder.toString());
        while (parameterPlaceholderKeys.hasNext()) {
            String placeholderKey = (String) parameterPlaceholderKeys.next();
            log.debug("The placeholder key "+placeholderKey);
            JSONArray itemIdsToReplace = Obj.getJSONArray(placeholderKey);
            String placeHolder = parameterPlaceholder.get(placeholderKey);
            log.debug("The placeholder "+placeholderKey);
            List intList = Arrays.asList(itemIdsToReplace.toList());
            log.debug("String with values for replacement "+intList.toString());
            finalQuery = finalQuery.replaceAll(placeHolder, intList.toString().replaceAll("\\[", "").replaceAll("\\]", ""));
        }
        log.debug("Query from locality populator " + finalQuery);
        return finalQuery;

    }
    
    public static String populateContituencyIds(String finalQuery) {
        return finalQuery;
    }

    public static String populateCountyIds(String finalQuery) {
        return finalQuery;
    }

}
