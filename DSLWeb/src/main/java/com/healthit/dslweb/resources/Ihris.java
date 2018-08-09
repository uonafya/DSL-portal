/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslweb.resources;

import com.healthit.dslservice.dao.FacilityDao;
import com.healthit.dslservice.dao.IhrisDao;
import com.healthit.dslservice.dto.adminstrationlevel.Facility;
import com.healthit.dslservice.dto.ihris.Cadre;
import com.healthit.dslservice.dto.ihris.CadreAllocation;
import com.healthit.dslservice.dto.ihris.CadreGroup;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author duncan
 */
@Controller
public class Ihris {
    @ResponseBody
    @RequestMapping(value = "/cadre2", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllCadres(@RequestParam String msisdn) {
        
        if (true) {
            return new ResponseEntity<String>("No Content found for this number", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity(HttpStatus.OK);
        }
    }
    
    
    @ResponseBody
    @RequestMapping(value = "/cadregroups", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List> getAllCadresGroup() {
        IhrisDao ihris=new IhrisDao();
        List<CadreGroup> cadreGroupList = ihris.getAllCadresGroup();
        return new ResponseEntity<List>(cadreGroupList, HttpStatus.OK);

    }
    
    
    @ResponseBody
    @RequestMapping(value = "/cadre", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List> getAllCadres() {
        IhrisDao ihris=new IhrisDao();
        List<Cadre> cadreList = ihris.getAllCadres();
        return new ResponseEntity<List>(cadreList, HttpStatus.OK);

    }
    
    @ResponseBody
    @RequestMapping(value = "/cadreallocation", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List> getCadreAllocation() {
        IhrisDao ihris=new IhrisDao();
        List<CadreAllocation> cadreAllocationList = ihris.getCadreAllocation();
        return new ResponseEntity<List>(cadreAllocationList, HttpStatus.OK);

    }
    
}
