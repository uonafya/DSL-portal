/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

/**
 *
 * @author duncan
 */
public class Database {

    private static Connection conn = null;
    private final String url = "jdbc:postgresql://41.89.93.180:5432/mohdsl";
    private final String user = "dsl";
    private final String password = "dsl2017";
    final static Logger log = Logger.getLogger(Database.class);

    private static Connection connect() {
        if (conn == null) {
            Database db = new Database();
            try {
                log.info("Making database connection");
                conn = DriverManager.getConnection(db.url, db.user, db.password);
                log.info("Connected to the PostgreSQL server successfully.");
            } catch (SQLException e) {
                log.error(e.getMessage());
            }

        }
        return conn;
    }

    
    public static ResultSet executeQuery(String sql) {
        PreparedStatement ps;
        ResultSet rs = null;
        connect();
        try {
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
        } catch (SQLException ex) {
            log.error(ex);
        }
        return rs;
    }
}
