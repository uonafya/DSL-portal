/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.metadata.indicators.uhc;

import com.healthit.metadata.Metadata;
import com.healthit.metadata.model.RequestEntity;
import org.apache.log4j.Logger;

/**
 *
 * @author duncan
 */
public class TBcurativeRate implements Metadata {

    final static Logger log = Logger.getLogger(TBcurativeRate.class.getCanonicalName());

    @Override
    public String getMetadataData(RequestEntity requestString) {
        log.info("the Tb curative rate");
        
        String s = "";
        return s;
    }

}
