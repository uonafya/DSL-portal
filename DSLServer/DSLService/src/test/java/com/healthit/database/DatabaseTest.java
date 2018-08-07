/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.database;

import com.healthit.dslservice.QueryTemplate;
import com.healthit.dslservice.database.Database;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import static org.junit.Assert.assertNotNull;
import org.junit.Test;

/**
 *
 * @author duncan
 */
public class DatabaseTest {
   // MethodName_StateUnderTest_ExpectedBehavior
    
   @Test
   public void testDatabaseConnection() {
    //  assertEquals(message,messageUtil.printMessage());
      assertNotNull(Database.executeQuery("SELECT 1"));
   } 
   
   @Test
   public void testDatabaseQuery(){
       ResultSet rs=
       Database.executeQuery(QueryTemplate.SELECT+QueryTemplate.DHIS_MFL+ "limit 10");
       try {
           while(rs.next()){
               System.out.println(rs.getString(2));
           }
       } catch (SQLException ex) {
           Logger.getLogger(DatabaseTest.class.getName()).log(Level.SEVERE, null, ex);
       }
       assertNotNull(Database.executeQuery(QueryTemplate.SELECT+QueryTemplate.DHIS_MFL+ "limit 100"));
   }
}
