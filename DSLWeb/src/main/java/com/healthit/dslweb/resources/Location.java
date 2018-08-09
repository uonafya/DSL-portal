/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslweb.resources;

import com.healthit.dslservice.dao.FacilityDao;
import com.healthit.dslservice.dao.LocationDao;
import com.healthit.dslservice.dto.adminstrationlevel.Constituency;
import com.healthit.dslservice.dto.adminstrationlevel.County;
import com.healthit.dslservice.dto.adminstrationlevel.Facility;
import com.healthit.dslservice.dto.adminstrationlevel.Ward;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author duncan
 */
@Controller
public class Location {
    @ResponseBody
    @RequestMapping(value = "/ward", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List> getALlWards() {
        LocationDao locationDao=new LocationDao();
        List<Ward> wardList = locationDao.getALlWards();
        return new ResponseEntity<List>(wardList, HttpStatus.OK);

    }
    
    
    @ResponseBody
    @RequestMapping(value = "/constituency", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List> getConstituencies() {
        LocationDao locationDao=new LocationDao();
        List<Constituency> constituencyList = locationDao.getConstituencies();
        return new ResponseEntity<List>(constituencyList, HttpStatus.OK);

    }
    
    
    @ResponseBody
    @RequestMapping(value = "/county", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List> getCounties() {
        LocationDao locationDao=new LocationDao();
        List<County> countyList = locationDao.getCounties();
        return new ResponseEntity<List>(countyList, HttpStatus.OK);

    }
    
}
