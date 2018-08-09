/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice.dao;

import com.healthit.dslservice.dto.adminstrationlevel.Constituency;
import com.healthit.dslservice.dto.adminstrationlevel.County;
import com.healthit.dslservice.dto.adminstrationlevel.SubCounty;
import com.healthit.dslservice.dto.adminstrationlevel.Ward;
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
public class LocationDao {

    final static Logger log = Logger.getLogger(FacilityDao.class);
    private String getALlWards = "Select id, name ,constituency_id from common_ward";

    private String getAllConstituencies = "Select id, name ,county_id from common_constituency";

     private String getAllCounties = "Select id, name from common_county";

    

    public List<Ward> getALlWards() {
        List<Ward> wardList = new ArrayList();
        ResultSet rs = Database.executeQuery(getALlWards);
        log.info("Fetching getWards");
        try {
            while (rs.next()) {
                Ward ward = new Ward();
                ward.setId(rs.getString("id"));
                ward.setName(rs.getString("name"));
                ward.setConstituencyId(rs.getString("constituency_id"));
                wardList.add(ward);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }
        return wardList;
    }

   
    public List<County> getCounties() {
         List<County> countyList = new ArrayList();
        ResultSet rs = Database.executeQuery(getAllCounties);
        log.info("Fetching Counties");
        try {
            while (rs.next()) {
                County county = new County();
                county.setId(rs.getString("id"));
                county.setName(rs.getString("name"));
                countyList.add(county);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }
        return countyList;
    }

    public List<Constituency> getConstituencies() {
        List<Constituency> constituencyList = new ArrayList();
        ResultSet rs = Database.executeQuery(getAllConstituencies);
        log.info("Fetching Constituencies");
        try {
            while (rs.next()) {
                Constituency constituency = new Constituency();
                constituency.setId(rs.getString("id"));
                constituency.setName(rs.getString("name"));
                constituency.setCountyId(rs.getString("county_id"));
                constituencyList.add(constituency);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }
        return constituencyList;
    }

}
