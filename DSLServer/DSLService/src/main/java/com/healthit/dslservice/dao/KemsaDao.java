/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice.dao;

import com.healthit.dslservice.dto.ihris.CadreGroup;
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
public class KemsaDao {

    final static Logger log = Logger.getLogger(FacilityDao.class);
    private String getALlCommodities = "Select c_order_id as id,mfl as mflcode,product as name,"
            + "qtyordered as orderQuantity,order_year as orderYear,order_month as orderMonth from fact_kemsa_order_dsl";

    public List<Commodity> getAllCommodities() {
        List<Commodity> cadreGroupList = new ArrayList();
        ResultSet rs = Database.executeQuery(getALlCommodities);
        log.info("Fetching Commodities");
        try {
            while (rs.next()) {
                Commodity commodity = new Commodity();
                commodity.setId(rs.getString("id"));
                commodity.setMflcode(rs.getString("mflcode"));
                commodity.setName(rs.getString("name"));
                commodity.setOrderMonth(rs.getString("orderMonth"));
                commodity.setOrderQuantity(rs.getString("orderQuantity"));
                commodity.setOrderYear(rs.getString("orderYear"));

                cadreGroupList.add(commodity);
            }
        } catch (SQLException ex) {
            log.error(ex);
        }
        return cadreGroupList;
    }

}
