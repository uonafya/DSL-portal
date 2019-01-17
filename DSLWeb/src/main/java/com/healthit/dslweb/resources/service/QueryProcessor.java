/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslweb.resources.service;

import com.healthit.dslservice.route.DataResourceRouter;
import com.healthit.dslweb.service.QueryInterpreter;
import java.util.List;
import java.util.Map;
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
import static com.healthit.dslservice.util.strings.DataTypeConverter.getJSONFromObject;
import javax.servlet.http.HttpSession;

/**
 *
 * @author duncan
 */
@Controller
public class QueryProcessor {

    @ResponseBody
    @RequestMapping(value = "/processquery", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> processQuery(@RequestBody String pBody,HttpSession session) {
        DataResourceRouter dataResourceRouter=new DataResourceRouter();
        String queryResults=dataResourceRouter.route(pBody);
        return new ResponseEntity<String>(queryResults, HttpStatus.OK);
    }

}
