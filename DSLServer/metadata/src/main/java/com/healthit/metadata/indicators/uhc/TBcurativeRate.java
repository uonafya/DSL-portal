package com.healthit.metadata.indicators.uhc;

import com.healthit.metadata.Metadata;
import com.healthit.metadata.model.RequestEntity;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author duncan
 */
public class TBcurativeRate implements Metadata {

    final static Logger log = Logger.getLogger(TBcurativeRate.class.getCanonicalName());

    @Override
    public String getMetadataData(RequestEntity requestString) {
        log.info("Tb curative rate metadata fetcher");
        
        try {
            JSONObject orgUnitIdObj = (JSONObject) requestString.getOrgUnitID();
            String orgUnitId = (String) orgUnitIdObj.getJSONArray(requestString.getOrgUnitType()).get(0);
        } catch (Exception ex) {
            log.error(ex);
        }

        try {
            JSONObject period =(JSONObject) requestString.getPeriod();
            if (requestString.getPeriodType().equals("yearly")) {
                String startYear = (String) period.getJSONArray("start_year").get(0);
                String endYear = (String) period.getJSONArray("end_year").get(0);
            }
            
        } catch (Exception ex) {
            log.error(ex);
        }

        String s = "";
        return s;
    }

}
