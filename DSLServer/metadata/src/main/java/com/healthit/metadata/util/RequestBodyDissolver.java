/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.metadata.util;

import com.healthit.metadata.MetadataFetcher;
import com.healthit.metadata.model.RequestEntity;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;

/**
 *
 * @author duncan
 */
public class RequestBodyDissolver {

    final static Logger log = Logger.getLogger(RequestBodyDissolver.class.getCanonicalName());

    public List<RequestEntity> dissolve(String requestBody) {
        log.info("The got requst body :"+requestBody);
        List<RequestEntity> requestEntities=new ArrayList();
        return requestEntities;
    }
}
