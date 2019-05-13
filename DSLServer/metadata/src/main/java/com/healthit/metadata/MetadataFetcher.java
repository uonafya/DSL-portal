/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.metadata;

import com.healthit.metadata.model.RequestEntity;
import com.healthit.metadata.util.PropertiesLoader;
import com.healthit.metadata.util.RequestBodyDissolver;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import org.apache.log4j.Logger;
import org.json.JSONArray;

/**
 *
 * @author duncan
 */
public class MetadataFetcher {

    final static Logger log = Logger.getLogger(MetadataFetcher.class.getCanonicalName());

    public List<Object> getMeta(JSONArray requestBody) {
        log.info("Getmetadata function");
        List<RequestEntity> rqtEntities = _sort(requestBody);
        Iterator i = rqtEntities.iterator();
        Properties metadataMapperFile = null;
        metadataMapperFile = PropertiesLoader.getPropertiesFile(metadataMapperFile, "metadatamapping.properties");
        log.info("All the keys right " + PropertiesLoader.getAllKeys(metadataMapperFile).toString());
        List<Object> components=null;
       
        while (i.hasNext()) {
            RequestEntity rstEnty = (RequestEntity) i.next();
            log.info("got one org id" + rstEnty.getOrgUnitID());
            log.info("got one org type" + rstEnty.getOrgUnitType());
            log.info("got one period" + rstEnty.getPeriod());
            log.info("got one period type" + rstEnty.getPeriodType());
            log.info("got one subject" + rstEnty.getSubject());
            
            try {
                
                //String classToGetMetadataFrom = metadataMapperFile.getProperty(rstEnty.getSubject().replaceAll("\\s+", "").replaceAll("-", ""));
                String classToGetMetadataFrom = metadataMapperFile.getProperty(rstEnty.getSubject().replaceAll("\\s+", ""));
                log.info("class name " + classToGetMetadataFrom);
                Object[] obj = {rstEnty};
                Class<?> params[] = new Class[obj.length];
                params[0] = rstEnty.getClass();

                String methoName = "getMetadata"; // methodname to be invoked
                Class<?> cls = Class.forName(classToGetMetadataFrom);
                Object _instance = cls.newInstance();
                Method myMethod = cls.getDeclaredMethod(methoName, params);
                components=(List<Object>) myMethod.invoke(_instance, rstEnty);

            } catch (ClassNotFoundException
                    | NoSuchMethodException | SecurityException
                    | InstantiationException | IllegalAccessException | IllegalArgumentException
                    | InvocationTargetException | NullPointerException ex) {
                log.error(ex);
            }

        }
        return components;
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
        log.info("The meta list " + rqtEntities);
        return rqtEntities;
    }
}
