package com.healthit.metadata.util;

import com.healthit.metadata.MetadataFetcher;
import com.healthit.metadata.model.RequestEntity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author duncan
 */
public class RequestBodyDissolver {

    final static Logger log = Logger.getLogger(RequestBodyDissolver.class.getCanonicalName());

    private Map<String, Object> getRequestsPart(JSONArray requestBody) {
        Map<String, Object> requestBodyValue = new HashMap();
        for (Object o : requestBody) {

            JSONObject jsoObj = (JSONObject) o;
            StringBuilder metadataSourceName = new StringBuilder();
            String[] queryNamesFromUI = jsoObj.getString("what").split(":");
            metadataSourceName.append(queryNamesFromUI[0]);

            log.info("we got data "+queryNamesFromUI[0]);
            
            if (queryNamesFromUI[0].equals("date")) {
                JSONObject filters = jsoObj.getJSONObject("filter");
                requestBodyValue.put("period", filters);
                requestBodyValue.put("periodType", queryNamesFromUI[1]);
            }

            if (queryNamesFromUI[0].equals("locality")) {
                JSONObject filters = jsoObj.getJSONObject("filter");
                requestBodyValue.put("orgUnitID", filters);
                requestBodyValue.put("orgUnitType", queryNamesFromUI[1]);
            }
        }
        return requestBodyValue;
    }
    

    private List<String> getRequestSubject(JSONArray requestBody) {
        List <String> subjects =new ArrayList();
        for (Object o : requestBody) {

            JSONObject jsoObj = (JSONObject) o;

            StringBuilder metadataSourceName = new StringBuilder();

            String[] queryNamesFromUI = jsoObj.getString("what").split(":");
            

            JSONObject filters = jsoObj.getJSONObject("filter");
            JSONArray keys = filters.names();

            if (keys != null) {
                for (Object obj : keys) {
                    String key = (String) obj;
                    JSONArray filterValues = filters.getJSONArray(key);
                    for (Object filterValueObj : filterValues) {
                        metadataSourceName.append(queryNamesFromUI[0]);
                        log.info("Filter value " + filterValueObj);
                        String filterValue;
                        try {
                            filterValue = (String) filterValueObj;
                        } catch (ClassCastException ex) {
                            filterValue = String.valueOf(filterValueObj);
                        }

                        metadataSourceName.append("-").append(key).append("-").append(filterValue);

                        subjects.add(metadataSourceName.toString());
                        metadataSourceName=new StringBuilder(); 
                    }
                }
            }

            
        }

        return subjects;
        
    }

    public List<RequestEntity> dissolve(JSONArray requestBody) {

        log.info("The request body values "+getRequestsPart(requestBody));
        log.info("The request subject "+getRequestSubject(requestBody));
        
        List<RequestEntity> requestEntities = new ArrayList();
        return requestEntities;
        
    }
}
