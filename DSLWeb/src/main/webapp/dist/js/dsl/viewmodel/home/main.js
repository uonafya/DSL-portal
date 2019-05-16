function getMonthlyData(year, indicator, title, elementid,graphType,type) {
    var dslGraph = new DslGraph();
    yearMonthParameters.currentYear = year;
    setPeriodValues("monthly", year, year);
    sortIndicatorType(type, indicator);
    //setIhrisValues("human_resource:count");
    //setKemsaValues("commodity:count");
    var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(title, SETTING.graph_year_month, elementid, graphType,dslGraph);
    getQueryValues(queryPropertiesToSubmit, dslGraph);
}


var isCadre="human_resource:count:all_cadre_group";
function getYearRangeData(startYear, endYear, indicator, title, elementid, graphType,data_to_fetch) {
    var dslGraph = new DslGraph();
    yearlyParameters.startYear = startYear;
    yearlyParameters.endYear = endYear
    setPeriodValues("yearly", startYear, endYear);
    
    if(data_to_fetch[0]) setIndicatorValues("indicator:average:with_filter", indicator);
    if(data_to_fetch[1]) {
        setIhrisValues("human_resource:count");
    }else{
        setIhrisValues(isCadre);
    } 
    if(data_to_fetch[2]) setKemsaValues("commodity:count");
    var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(title, SETTING.graph_yearly, elementid,graphType ,dslGraph);
    getQueryValues(queryPropertiesToSubmit, dslGraph);
}


function prepareQueryPropertiesToSubmit(currentIndicator, grapPeriodType, elementId, graphType,dslGraph) {
    var queryToSubmit = {"query": queryParametersList};
    var queryPropertiesToSubmit = JSON.stringify(queryToSubmit);
    console.log(queryToSubmit);
    dslGraph.graphType=graphType;
    dslGraph.type = grapPeriodType;
    dslGraph.elementId = elementId;
    dslGraph.indicator = currentIndicator;
    return queryPropertiesToSubmit;
}


function getQueryValues(queryToSubmit, dslGraph) {
    
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/processquery', // the url from server we that we want to use
        dataType: 'json', // what type of data do we expect back from the server
        contentType: 'application/json; charset=utf-8',
        encode: true,
        data: queryToSubmit,
        success: function (data, textStatus, jqXHR) {
            dslGraph.graphData = data;
            dslGraph.drawGraph();
            //populateAnalyticsTable(data);
            //   drawMultiLineGraph("test-graph2");

//    drawMultiLineGraph("test-graph2");
//    drawMultiLineGraph("test-graph4");
//    drawPieChart("test-graph5");
//    drawMultiLineGraph("test-graph6");
            //$('#'+elementid+'.status').hide();
        },
        error: function (response, request) {
            //   console.log("got an error fetching cadregroups");
            var parsed_data = response.responseText;

        }

    });
    queryParametersList = [];
}

getMonthlyData("2018", "PMTCT Positivity Infants", "National PMTCT Positivity Infants (2018)", "test-graph1",SETTING.graph_type[4],"indicator:average:with_filter");

getMonthlyData("2018","HIV+ test rate - PMTCT -ANC", "National HIV+ test rate - PMTCT -ANC (2018)", "test-graph2", SETTING.graph_type[6],"indicator:average:with_filter");

getMonthlyData("2018", "facility_owner", "National Facility Distribution by owner", "test-graph4", SETTING.graph_type[0],"facility_owner:count");

getMonthlyData("2018", "Proportion of tested for HIV TB patient", "National Proportion of tested for HIV TB patient (2018)", "test-graph5", SETTING.graph_type[4],"indicator:average:with_filter");

getMonthlyData("2018", "human_resource", "National Human Resource Distribution (2018)", "test-graph3", SETTING.graph_type[0],"human_resource:count");


