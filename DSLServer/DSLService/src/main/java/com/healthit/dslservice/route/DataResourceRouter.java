/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.healthit.dslservice.route;

import static com.healthit.dslservice.util.strings.DataTypeConverter.getJSONFromObject;
import com.healthit.dslweb.service.QueryInterpreter;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author duncan
 * 
 * Checks for sent data requests and channels them to the right processor
 */
public class DataResourceRouter implements Router{
        
    @Override
    public String route(String pBody){
        QueryInterpreter queryInterpreterObj = new QueryInterpreter();
        System.out.println("Gone: "+pBody);
        JSONObject jsonObj = new JSONObject(pBody);
        JSONArray array = jsonObj.getJSONArray("query");
        Map<String,List<Object>> rsults = queryInterpreterObj.interpretQuery(array);
        String queryResults = getJSONFromObject(rsults);
        return queryResults;
    }
}
