/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice.dao;

import static com.healthit.dslservice.dao.Kemsa.log;
import com.healthit.dslservice.dto.dhis.Indicator;
import com.healthit.dslservice.dto.kemsa.Commodity;
import com.healthit.dslservice.util.Database;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;

/**
 *
 * @author duncan
 */
public class dhis {
    
    final static Logger log = Logger.getLogger(FacilityDao.class);
    private String getALlIndicators = "Select \"Indicator ID\" as id,\"Indicator Name\" as indicatorName, code as mflcode,startdate,enddate,kpivalue from dim_ihris_cadre";

    public List<Indicator> getIndicators(){
         List<Indicator> indicatorList = new ArrayList();
        ResultSet rs = Database.executeQuery(getALlIndicators);
        log.info("Fetching Commodities");
        try {
            while (rs.next()) {
                Indicator indicator = new Indicator();
                indicator.setId(rs.getString("id"));
                indicator.setEndDate(rs.getString("enddate"));
                indicator.setIdicatorName(rs.getString("indicatorName"));
                indicator.setIndicatorValue(rs.getString("kpivalue"));
                indicator.setMflCode(rs.getString("mflcode"));
                indicator.setStartDate(rs.getString("startdate"));

                indicatorList.add(indicator);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }
        return indicatorList;
    }
}
