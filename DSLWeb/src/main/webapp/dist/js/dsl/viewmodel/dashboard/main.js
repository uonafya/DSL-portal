//load county list
$(document).ajaxComplete(function (event, xhr, settings) {

    if (settings.url === SETTING.county_api) {
        destroyChosenDropDownList();
        populateOrgunitList(locationCommon.countiesList);
        initOrganisationUnitChosenDropDown("county")

    }
});

//load commodity names list
$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url === SETTING.commodity_names) {
        $("#organisation-unit").empty();
        $.each(commodityCommon.commodity_names, function (index, objValue) {
            var elementToAppend = ' <li><a href="#" data-name="' + objValue + '">' + objValue + '</a></li>';
            // $("#commodity-names").append(elementToAppend);
        });
    }
});

//load cadre names list
$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url === SETTING.cadre) {
        $.each(common_ihris.cadres, function (index, objValue) {
            var elementToAppend = ' <li><a href="#" data-name="' + objValue.name + '" data-id="' + objValue.id + '" >' + objValue.name + '</a></li>';
            $("#cadre_names_list").append(elementToAppend);
        });
    }
});

var initOrganisationUnitChosenDropDown = function initOrganisationUnitChosenDropDown(orgType) {
    $("#organisation-unit").chosen({
        placeholder_text_single: "Select " + orgType + ": ",
        no_results_text: "No results found!",
        width: "50%"
    });
};

function destroyChosenDropDownList() {
    try {
        console.log("destroying ...");

        $("#organisation-unit").chosen("destroy");
    } catch (err) {
        console.log(err);
    }
}
;

function populateOrgunitList(data) {
    $("#organisation-unit").empty();
    $("#organisation-unit").append("<option></option>");
    $.each(data, function (index, objValue) {
        var elementToAppend = '<option data-id="' + objValue.id + '" data-name="' + objValue.name + '">' + objValue.name + '</option>';
        $("#organisation-unit").append(elementToAppend);
    });
}

$(document).ready(function () {
    $("#organisation-unit-level li a").click(function (event) {

        var orgUnitLevel = $(event.target).attr('data-value');
        if (orgUnitLevel == 'county') {
            $("label[data-name='organisation-unit']").text("County:");
            destroyChosenDropDownList();
            populateOrgunitList(locationCommon.countiesList);
            initOrganisationUnitChosenDropDown("county");
        } else if (orgUnitLevel == 'constituency') {
            destroyChosenDropDownList();
            populateOrgunitList(locationCommon.constituenciesList);
            initOrganisationUnitChosenDropDown("constituency");
            $("label[data-name='organisation-unit']").text("Constituency:");
        } else {
            //pass
        }
    });
});



var queryParametersList = [];
var currentIndicator="TB curative Rate";

// ########### init functions ##########
// ###########                ##########
//initial date values to start visualization
function initDateValues() {
    var dateValuesToQuery = {};
    dateValuesToQuery['filter'] = {};
    var startDate = '2015';
    var endDate = '2015';
    dateValuesToQuery['filter'] = {};
    dateValuesToQuery['what'] = 'date:yearly:monthly';
    dateValuesToQuery['filter']['start_month'] = new Array('1');
    dateValuesToQuery['filter']['end_month'] = new Array('12');
    dateValuesToQuery['filter']['start_year'] = new Array(startDate);
    dateValuesToQuery['filter']['end_year'] = new Array(endDate);
    queryParametersList.push(dateValuesToQuery);
    return queryParametersList;
}

function initIndicatorValues() {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = "indicator:average:with_filter";
    indicatorValuesToQuery['filter'] = {'indicator': new Array(currentIndicator)};
    queryParametersList.push(indicatorValuesToQuery);
    return queryParametersList;
}


function initIhrisValues() {
    var humanResourceValuesToQuery = {};
    humanResourceValuesToQuery['what'] = "human_resource:count";
    humanResourceValuesToQuery['filter'] = {};
    var what = '';
    humanResourceValuesToQuery['what'] = humanResourceValuesToQuery['what'] + what;
    queryParametersList.push(humanResourceValuesToQuery);
    return queryParametersList;
}


function initKemsaValues() {
    
        var commodityValuesToQuery = {};
        commodityValuesToQuery['what'] = "commodity:count";
        queryParametersList.push(commodityValuesToQuery);    
        return queryParametersList;
    
}


function init() {
    console.log("Initializing charts");
    //period selected
    initDateValues();
    initIndicatorValues();
    initIhrisValues();
    initKemsaValues();
    var queryToSubmit = {"query": queryParametersList};
    var x = JSON.stringify(queryToSubmit);
    console.log(queryToSubmit);
    var dslGraph=new DslGraph();
    dslGraph.type=SETTING.graph_year_month;
    dslGraph.elementId="test-graph";
    dslGraph.indicator=currentIndicator;
    getQueryValues(x,dslGraph);
    
}

init();

/// end of init function



function getSelectedPeriod() {
    //period selected
    var dateValuesToQuery = {};
    dateValuesToQuery['filter'] = {};
    var startDate = $('#start_year').val();
    var endDate = $('#start_year').val();

    dateValuesToQuery['filter'] = {};
    dateValuesToQuery['what'] = 'date:yearly:monthly';

    dateValuesToQuery['filter']['start_month'] = new Array('1');
    dateValuesToQuery['filter']['end_month'] = new Array('12');
    dateValuesToQuery['filter']['start_year'] = new Array(startDate);
    dateValuesToQuery['filter']['end_year'] = new Array(endDate);

    queryParametersList.push(dateValuesToQuery);

}

function getIndicatorValues(indicatorName) {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = "indicator:average:all_county:with_filter";
    indicatorValuesToQuery['filter'] = {'indicator': new Array(indicatorName)};
    queryParametersList.push(indicatorValuesToQuery);

}

$(document).ready(function () {

    $("#indicators li a").click(function (event) {
        getSelectedPeriod();
        var indicatorName = $(event.target).attr('data-value');
        getIndicatorValues(indicatorName);
        var queryToSubmit = {"query": queryParametersList};
        var x = JSON.stringify(queryToSubmit);
        console.log(queryToSubmit);
        getQueryValues(x);
        

    });

});


function getQueryValues(x,dslGraph) {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/processquery', // the url from server we that we want to use
        dataType: 'json', // what type of data do we expect back from the server
        contentType: 'application/json; charset=utf-8',
        encode: true,
        data: x,
        success: function (data, textStatus, jqXHR) {
            console.log("Data is: " + JSON.stringify(data));
            dslGraph.graphData=data;
            dslGraph.drawGraph();
            //populateAnalyticsTable(data);
//            $('#table-status').hide();
        },
        error: function (response, request) {
            //   console.log("got an error fetching cadregroups");
            $('#table-status').hide();
            var parsed_data = response.responseText;

        }

    });
    queryParametersList = [];
}