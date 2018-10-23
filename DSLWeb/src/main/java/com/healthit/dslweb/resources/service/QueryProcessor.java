/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslweb.resources.service;

import com.healthit.dslweb.service.QueryInterpreter;
import static javax.ws.rs.client.Entity.json;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.HttpEntity;

/**
 *
 * @author duncan
 */
@Controller
public class QueryProcessor {

    @ResponseBody
    @RequestMapping(value = "/processquery", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> processQuery(@RequestBody String pBody) {
        QueryInterpreter queryInterpreterObj = new QueryInterpreter();
        JSONObject jsonObj = new JSONObject(pBody);
        JSONArray array = jsonObj.getJSONArray("query");
        queryInterpreterObj.interpretQuery(array);

        return new ResponseEntity<String>("query generated ok", HttpStatus.OK);
    }

}
