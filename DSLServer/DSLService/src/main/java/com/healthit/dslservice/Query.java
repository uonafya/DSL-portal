/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice;

import com.healthit.dslservice.util.Database;
import java.sql.ResultSet;

/**
 *
 * @author duncan
 */
public class Query {
    private String sqlQuery;
    private ResultSet rs;
    
    public String getSqlQuery() {
        return sqlQuery;
    }

    public void setSqlQuery(String sqlQuery) {
        this.sqlQuery = sqlQuery;
    }

    public ResultSet getRs() {
        rs=Database.executeQuery(sqlQuery);
        return rs;
    }
    
}
