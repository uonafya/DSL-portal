/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.metadata.util;

import com.healthit.metadata.MetadataFetcher;
import com.healthit.metadata.model.RequestEntity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author duncan
 */
public class RequestBodyDissolver {

    final static Logger log = Logger.getLogger(RequestBodyDissolver.class.getCanonicalName());

    public List<RequestEntity> dissolve(JSONArray requestBody) {
        log.info("Debugging");
        log.info("Lost string " + requestBody.toString());
        for (Object o : requestBody) {

            JSONObject jsoObj = (JSONObject) o;

            StringBuilder metadataSourceName = new StringBuilder();

            String[] queryNamesFromUI = jsoObj.getString("what").split(":");
            metadataSourceName.append(queryNamesFromUI[0]);

            JSONObject filters = jsoObj.getJSONObject("filter");
            JSONArray keys = filters.names();

            if (keys != null) {
                for (Object obj : keys) {
                    String key = (String) obj;
                    JSONArray filterValues = filters.getJSONArray(key);
                    for (Object filterValueObj : filterValues) {
                        log.info("Filter value " + filterValueObj);
                        String filterValue;
                        try {
                            filterValue = (String) filterValueObj;
                        } catch (ClassCastException ex) {
                            filterValue = String.valueOf(filterValueObj);
                        }

                        metadataSourceName.append("-").append(key).append("-").append(filterValue);
                    }
                }
            }

            log.info("Done dissolver " + metadataSourceName);

        }

        List<RequestEntity> requestEntities = new ArrayList();
        return requestEntities;
    }
}
