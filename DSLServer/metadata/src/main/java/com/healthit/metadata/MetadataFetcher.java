/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.metadata;

import com.healthit.metadata.model.RequestEntity;
import com.healthit.metadata.util.RequestBodyDissolver;
import java.util.Iterator;
import java.util.List;
import org.apache.log4j.Logger;
import org.json.JSONArray;

/**
 *
 * @author duncan
 */
public class MetadataFetcher {

    final static Logger log = Logger.getLogger(MetadataFetcher.class.getCanonicalName());

    public String getMeta(JSONArray requestBody) {
        log.info("Getmetadata function");
         List<RequestEntity> rqtEntities = _sort(requestBody);
         Iterator i = rqtEntities.iterator();
         while(i.hasNext()){
             RequestEntity rstEnty=(RequestEntity) i.next();
             log.info("got one org id"+ rstEnty.getOrgUnitID());
             log.info("got one org type"+ rstEnty.getOrgUnitType());
             log.info("got one period"+ rstEnty.getPeriod());
             log.info("got one period type"+ rstEnty.getPeriodType());
             log.info("got one subject"+ rstEnty.getSubject());
         }
        return "";
    }

    /**
     * Checks the request body for indicators/subjects with available metadata
     * and calls relevant functions to process meta info.
     *
     * @param pBody
     * @return
     */
    public List<RequestEntity> _sort(JSONArray pBody) {
        log.info("metadata sorting");
        RequestBodyDissolver requestBodyDissolver = new RequestBodyDissolver();
        List<RequestEntity> rqtEntities = requestBodyDissolver.dissolve(pBody);
        log.info("The meta list "+rqtEntities);
        return rqtEntities;
    }
}
