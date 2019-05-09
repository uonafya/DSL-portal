package com.healthit.dslweb.resources.service;

import com.healthit.dslweb.service.QueryInterpreter;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import static com.healthit.dslservice.util.strings.DataTypeConverter.getJSONFromObject;
import com.healthit.metadata.MetadataFetcher;
import javax.servlet.http.HttpSession;

/**
 *
 * @author duncan
 */
@Controller
public class QueryProcessor {

    @ResponseBody
    @RequestMapping(value = "/processquery", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> processQuery(@RequestBody String pBody, HttpSession session) {
                
        QueryInterpreter queryInterpreterObj = new QueryInterpreter();
        JSONObject jsonObj = new JSONObject(pBody);
        JSONArray array = jsonObj.getJSONArray("query");
        MetadataFetcher metaData=new MetadataFetcher();
        List<Object> components=metaData.getMeta(array);
        Map<String, List<Object>> rsults = queryInterpreterObj.interpretQuery(array);
        rsults.put("components", components);
        String queryResults = getJSONFromObject(rsults);
        
        return new ResponseEntity<String>(queryResults, HttpStatus.OK);
    }

}
