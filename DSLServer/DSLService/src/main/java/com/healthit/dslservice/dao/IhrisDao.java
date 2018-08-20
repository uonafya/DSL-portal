/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice.dao;

import com.healthit.dslservice.DslException;
import static com.healthit.dslservice.dao.FacilityDao.log;
import com.healthit.dslservice.dto.ihris.Cadre;
import com.healthit.dslservice.dto.KephLevel;
import com.healthit.dslservice.dto.adminstrationlevel.Facility;
import com.healthit.dslservice.dto.ihris.CadreAllocation;
import com.healthit.dslservice.dto.ihris.CadreGroup;
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
public class IhrisDao {

    final static Logger log = Logger.getLogger(FacilityDao.class);
    private String getALlCadreGroup = "Select cadreid,cadrename from dim_ihris_cadre";
    private String getALlCadre = "Select dataelementid as id,dataelementname as cadrename, cadreid as cadre_group_id from dim_ihris_dataelement";
    private String getCadreAllocation = "Select dataelementid as cadreid,periodid,mflcode,value from fact_ihris_datavalue where periodid is not null";
   
    
    public List<CadreAllocation> getCadreAllocation() throws DslException {
        List<CadreAllocation> cadreGroupList = new ArrayList();
        Database db =new Database();
        ResultSet rs = db.executeQuery(getCadreAllocation);
        log.info("Fetching cadre groups");
        try {
            while (rs.next()) {
                CadreAllocation cadreAllocationList = new CadreAllocation();
                cadreAllocationList.setCadreid(rs.getString("cadreid"));
                cadreAllocationList.setCadreNumber(rs.getString("value"));
                cadreAllocationList.setMflcode(rs.getString("mflcode"));
                cadreAllocationList.setPeriod(rs.getString("periodid"));
                
                cadreGroupList.add(cadreAllocationList);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }finally{
            db.CloseConnection();
        }
        return cadreGroupList;
    }
    
    public List<CadreGroup> getAllCadresGroup() throws DslException {
        List<CadreGroup> cadreGroupList = new ArrayList();
        Database db =new Database();
        ResultSet rs = db.executeQuery(getALlCadreGroup);
        log.info("Fetching cadre groups");
        try {
            while (rs.next()) {
                CadreGroup cadreGroup = new CadreGroup();
                cadreGroup.setId(rs.getString("cadreid"));
                cadreGroup.setName(rs.getString("cadrename"));
                cadreGroupList.add(cadreGroup);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }finally{
            db.CloseConnection();
        }
        return cadreGroupList;
    }

    public List<Cadre> getAllCadres() throws DslException {
        List<Cadre> cadreList = new ArrayList();
        Database db =new Database();
        ResultSet rs = db.executeQuery(getALlCadre);
        log.info("Fetching cadres");
        try {
            while (rs.next()) {
                Cadre cadre = new Cadre();
                cadre.setId(Integer.toString(rs.getInt("id")));
                cadre.setName(rs.getString("cadrename"));
                cadre.setCadreGroupId(rs.getString("cadre_group_id"));
                cadreList.add(cadre);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }finally{
            db.CloseConnection();
        }
        return cadreList;
    }
}
