/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.metadata;

import com.healthit.metadata.model.RequestEntity;
import com.healthit.metadata.util.RequestBodyDissolver;
import java.util.List;
import org.apache.log4j.Logger;

/**
 *
 * @author duncan
 */
public class MetadataFetcher {

    final static Logger log = Logger.getLogger(MetadataFetcher.class.getCanonicalName());

    public String getMeta(String requestBody) {
        log.info("Getmetadata function");
        return _sort(requestBody);
    }

    /**
     * Checks the request body for indicators/subjects with available metadata
     * and calls relevant functions to process meta info.
     *
     * @param pBody
     * @return
     */
    public String _sort(String pBody) {
        log.info("metadata sorting");
        RequestBodyDissolver requestBodyDissolver = new RequestBodyDissolver();
        List<RequestEntity> rqtEntities = requestBodyDissolver.dissolve(pBody);
        return "";
    }
}
