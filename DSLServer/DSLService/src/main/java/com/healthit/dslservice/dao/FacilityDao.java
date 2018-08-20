/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice.dao;

import com.healthit.dslservice.DslException;
import com.healthit.dslservice.dto.KephLevel;
import com.healthit.dslservice.dto.adminstrationlevel.Facility;
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
public class FacilityDao {

    final static Logger log = Logger.getLogger(FacilityDao.class);
    private String getALlFacilties = "Select id,name,code as kmflcode,kephlevel_sk, owner_sk as owner_id, ward_id, sub_county_id "
            + "from facilities_facility";

    public List<Facility> getFacilities() throws DslException {
        List<Facility> facilityList = new ArrayList();
        Database db =new Database();
        ResultSet rs = db.executeQuery(getALlFacilties);
        log.info("Fetching facilities");
        try {
            while (rs.next()) {
                Facility facility = new Facility();
                facility.setWardId(rs.getString("ward_id"));
                facility.setFacilityOwner(rs.getString("owner_id"));
                facility.setId(rs.getString("id"));
                KephLevel l = KephLevel.getKephLevel(Integer.parseInt(rs.getString("kephlevel_sk")));
                facility.setKephLevel(l);
                facility.setName(rs.getString("name"));
                facility.setSubCountyId(rs.getString("sub_county_id"));
                facilityList.add(facility);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }finally{
            db.CloseConnection();
        }
        return facilityList;
    }

}
