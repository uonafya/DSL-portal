var dslGraph;
var indicatorName = "";
var indicatorType = "";


var initOrganisationUnitChosenDropDown = function initOrganisationUnitChosenDropDown(orgType) {
    $("#organisation-unit").chosen({
        placeholder_text_single: "Select " + orgType + ": ",
        no_results_text: "No results found!"
//        width: "85%"
    });
};

//load county list
function populateCounty() {
    destroyChosenDropDownList();
// 
    populateOrgunitList(locationCommon.countiesList)
    initOrganisationUnitChosenDropDown("county");
}


//load commodity names list
function populateCommodity() {
    $("#organisation-unit").empty();
    $.each(commodityCommon.commodity_names, function (index, objValue) {
        var elementToAppend = ' <li><a href="#" data-name="' + objValue + '">' + objValue + '</a></li>';
        // $("#commodity-names").append(elementToAppend);
    });
}


function populateCadres() {
    $.each(common_ihris.cadres, function (index, objValue) {
        var elementToAppend = ' <li><a href="#" data-name="' + objValue.name + '" data-id="' + objValue.id + '" >' + objValue.name + '</a></li>';
        $("#cadre_names_list").append(elementToAppend);
    });
}


function destroyChosenDropDownList() {
    try {
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


//on change specific orgunit eg nairobi,momba  county, embakasi counstituency etc  
$('#organisation-unit').on('change', function (event) {
    var orgunitId = $("#organisation-unit option:selected").attr('data-id');
    var filter = {};
    filter[organisationUnit.current_level] = new Array(orgunitId);
    setLocality(organisationUnit.current_level, filter);

    if (dslGraph.selectedPeriodType == 'yearly') {
        getYearRangeData(_getYearRangeData);
    } else if (dslGraph.selectedPeriodType == 'monthly') {
        var year = yearMonthParameters.currentYear;
        var indicator = dslGraph.indicator;
        yearMonthParameters.currentYear = year;
        setPeriodValues("monthly", year, year);
        console.log("got few ");
        console.log(indicatorType);
        console.log("got few 2");
        //setIndicatorValues("indicator:average:with_filter", indicator);
        indicatorHandler(indicatorType, indicator);
        var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicator, SETTING.graph_year_month);
        getQueryValues(queryPropertiesToSubmit, dslGraph);
    }
});

//on click organisation unit level eg county, counstituency
$(document).ready(function () {
    $("#organisation-unit-level li a").click(function (event) {
        var orgUnitLevel = $(event.target).attr('data-org_unit');
        var orgunitLabel='Organisation Unit';
        var orgUnitLevelName="";
        if (orgUnitLevel == 'county') {
            organisationUnit.current_level = SETTING.orgisation_level[3];
            $("label[data-name='organisation-unit']").text("County:");
            destroyChosenDropDownList();
            populateOrgunitList(locationCommon.countiesList);
            initOrganisationUnitChosenDropDown("county");
            orgUnitLevelName='County';
        } else if (orgUnitLevel == 'constituency') {
            organisationUnit.current_level = SETTING.orgisation_level[2];
            destroyChosenDropDownList();
            populateOrgunitList(locationCommon.constituenciesList);
            initOrganisationUnitChosenDropDown("Sub County");
            $("label[data-name='organisation-unit']").text("Constituency:");
            orgUnitLevelName='Sub-County';
        } else if(orgUnitLevel=='national'){
            orgUnitLevelName='National';
        }
        $('#orgunitLabel').empty();
        $('#orgunitLabel').text(orgunitLabel+" - " +orgUnitLevelName);
    });

});


var queryParametersList = [];
//for year month period
function setPeriodValues(periodType, startDate, endDate) {
    var dateValuesToQuery = {};
    dateValuesToQuery['filter'] = {};
    var startDate = startDate;
    var endDate = endDate;
    dateValuesToQuery['filter'] = {};
    if (periodType == "monthly") {
        dateValuesToQuery['what'] = 'date:yearly:monthly';
        dateValuesToQuery['filter']['start_month'] = new Array('1');
        dateValuesToQuery['filter']['end_month'] = new Array('12');
    } else if (periodType == "yearly") {
        dateValuesToQuery['what'] = 'date:yearly';
    }
    dateValuesToQuery['filter']['start_year'] = new Array(startDate);
    dateValuesToQuery['filter']['end_year'] = new Array(endDate);
    queryParametersList.push(dateValuesToQuery);
    return queryParametersList;
}


function setIndicatorValues(indicatorType, indicator) {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = indicatorType;
    indicatorValuesToQuery['filter'] = {'indicator': new Array(indicator)};
    queryParametersList.push(indicatorValuesToQuery);
    return queryParametersList;
}

function setFacilityValues(indicatorType, facilities) {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = indicatorType;
    indicatorValuesToQuery['filter'] = {'facility': new Array(facilities)};
    queryParametersList.push(indicatorValuesToQuery);
    return queryParametersList;
}

function setIhrisValues(indicatorType, cadre) {
    var humanResourceValuesToQuery = {};
    humanResourceValuesToQuery['what'] = indicatorType;
    humanResourceValuesToQuery['filter'] = {'cadre': new Array(cadre)};
    queryParametersList.push(humanResourceValuesToQuery);
    return queryParametersList;
}

function setLocality(org_level, filter) {
    var localityValuesToQuery = {};
    localityValuesToQuery['what'] = "locality:" + org_level;
    localityValuesToQuery['filter'] = filter;
    console.log("Filter");
    console.log(filter);
    queryParametersList.push(localityValuesToQuery);
    return queryParametersList;
}


function setKemsaValues(commodityType) {
    if (dslGraph.fetchKemsaData) {
        var commodityValuesToQuery = {};
        commodityValuesToQuery['what'] = commodityType;
        queryParametersList.push(commodityValuesToQuery);
    }
    return queryParametersList;
}

// ########### init function ##########
// ###########                ##########
//initial date values to start visualization


function initGraph() {
    dslGraph = new DslGraph();
    indicatorName = "TB curative Rate";
    indicatorType = "indicator:average:with_filter";
    yearMonthParameters.currentYear = '2015';
    setPeriodValues("monthly", '2015', '2015');
    indicatorHandler("indicator:average:with_filter", indicatorName);
    var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit("TB curative Rate", SETTING.graph_year_month);
    getQueryValues(queryPropertiesToSubmit, dslGraph);
}


function prepareQueryPropertiesToSubmit(currentIndicator, grapType) {
    var queryToSubmit = {"query": queryParametersList};
    var queryPropertiesToSubmit = JSON.stringify(queryToSubmit);
    console.log(queryToSubmit);
    dslGraph.type = grapType;
    dslGraph.elementId = "test-graph";
    dslGraph.indicator = currentIndicator;
    return queryPropertiesToSubmit;
}

//on change mothly data year selection
$(document).ready(function () {
    $('#start_year').change(function () {
        var year = $(this).val();
        var indicator = dslGraph.indicator;
        yearMonthParameters.currentYear = year;
        setPeriodValues("monthly", year, year);
        setIndicatorValues("indicator:average:with_filter", indicator);
        var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicator, SETTING.graph_year_month);
        getQueryValues(queryPropertiesToSubmit, dslGraph);

    });
});

//on change indicator
$(document).ready(function () {
    $("#indicators li a").click(function (event) {
        var filter = $(event.target).attr('data-value');
        indicatorType = $(event.target).attr('data-name');
        indicatorName = filter;
        $("#indicator-name-label").text($(event.target).text());
        if (dslGraph.selectedPeriodType == 'yearly') {
            dslGraph.indicator = filter;
            console.log("indicator " + filter);
            getYearRangeData(_getYearRangeData);
        } else {
            var year = yearMonthParameters.currentYear;
            yearMonthParameters.currentYear = year;
            setPeriodValues("monthly", year, year);
            var dataName = $(event.target).attr('data-name');
            indicatorHandler(dataName, filter);
            var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(filter, SETTING.graph_year_month);
            getQueryValues(queryPropertiesToSubmit, dslGraph);

        }
    });
});



function facilityHanlder(dataName, filter) {
    setFacilityValues(dataName, filter);
}

function commodityHanlder(dataName, indicator) {

}

function cadreHanlder(dataName, indicator) {
    setIhrisValues(dataName, indicator);
}

function dhisHanlder(dataName, filter) {
    setIndicatorValues(dataName, filter);
}


function indicatorHandler(dataName, filter) {

    if (dataName.indexOf("facility") != -1) {
        console.log("facility handler");
        console.log(dataName);
        console.log(filter);
        facilityHanlder(dataName, filter);
    } else if (dataName.indexOf("indicator") != -1) {
        console.log("indicator handler");
        dhisHanlder(dataName, filter);
    } else if (dataName.indexOf("human_resource") != -1) {
        console.log("cadre handler");
        console.log(dataName);
        console.log(filter);
        cadreHanlder(dataName, filter);
    }
}


//populate table with data
var table = null;


function prepareComponentHolder(value) {
    var componentId = makeid();
    //$("#components-area").empty();
    $("#components-area").append("<div style='margin-bottom: 5px;' id='" + componentId + "'></div>");
    var dimensions = value['dimension'];
    var small = dimensions['small'];
    var medium = dimensions['medium'];
    var large = dimensions['large'];

    var gridClasses = "col-sm-" + small + " col-md-" + medium + " col-lg-" + large + " ";

    $('#' + componentId).addClass(gridClasses);
    return componentId;
}

function insertMetadataComponents(data) {
    console.log("the data");
    console.log(data);
    console.log(data.components);
    $.each(data.components, function (index, value) {
        // sm md lg
        console.log("check components");
        console.log(data.components);
        if (!('graph-type' in value)) {

            var graphType = value['display'];
            console.log("type of graph");
            console.log(graphType);
            if (graphType == 5) { //table
                var theId = prepareComponentHolder(value);
                $('#' + theId).append("<table class='display'></table>");
                var elem = $('#' + theId + ' > table');
                console.log("the element ");
                console.log(elem);
                drawDataTable(value['data'], elem);
            }

            if (graphType == 6) {
                var theId = prepareComponentHolder(value);
                var convertedData = convertToMultiLine(value, value['data']);

                drawMultiLineGraph(theId, convertedData[2], convertedData[1], convertedData[0]);
            }
            if (graphType == 0) { // piechart
                var pieCharts = convertToPieChart(value, value['data'], 1);

                $.each(pieCharts, function (index, chart) {
                    var theId = prepareComponentHolder(value);

                    drawPie(theId, "titlee", [{data: chart}]);
                });
            }
        }
    });
}

//validate selected year range
function _validateYearRange(startYear, endYear) {
    if (!(startYear)) {
        $("#year-range-msg").text(" please select start year");
        return false;
    }
    if (!(endYear)) {
        $("#year-range-msg").text(" please select end year");
        return false;
    }
    if (endYear < startYear) {
        $("#year-range-msg").text(" Error: end year is less than start year");
        return false;
    }
    $("#year-range-msg").text("");
    return true;
}

//on click periodicity type
$("#period-option li a").click(function (event) {

    var periodTypeSelected = $(event.target).attr('data-period_type');
    console.log("Period type " + periodTypeSelected);
    if (periodTypeSelected == 'monthly') {
        //$('#monthly-opt').show();
        $('#monthly-opt').css('display', 'inline-block');
        $('#yearly-opt').css('display', 'none');
        dslGraph.selectedPeriodType = 'monthly';
    } else if (periodTypeSelected == 'yearly') {
        //$('.month').hide();
        $('#yearly-opt').css('display', 'inline-block');
        $('#monthly-opt').css('display', 'none');
        dslGraph.selectedPeriodType = 'yearly';
    } else {

    }
    $('#periodTypeLabel').empty();
    $('#periodTypeLabel').text("Period  - "+ dslGraph.selectedPeriodType);
});

function reRunQuery() {
    if (dslGraph.selectedPeriodType == 'yearly') {
        getYearRangeData(_getYearRangeData);
    } else if (dslGraph.selectedPeriodType == 'monthly') {
        var year = yearMonthParameters.currentYear;
        var indicator = dslGraph.indicator;
        yearMonthParameters.currentYear = year;
        setPeriodValues("monthly", year, year);
        setIndicatorValues("indicator:average:with_filter", indicator);
        var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicator, SETTING.graph_year_month);
        getQueryValues(queryPropertiesToSubmit, dslGraph);
    } else {

    }

}

//show or hide other data sources
//kemsa data source
$(document).ready(function () {
    $('#kemsa-switch').change(function () {
        if ($(this).is(":checked")) {
            $('#commodities').show();
            dslGraph.graphData;
            dslGraph.fetchKemsaData = true;
            reRunQuery();
        } else {
            $('#commodities').hide();
            dslGraph.fetchKemsaData = false;
        }
    });
});
//ihris data source
$(document).ready(function () {
    $('#ihris-switch').change(function () {
        if ($(this).is(":checked")) {
            $('#cadres').show();
            dslGraph.fetchIhrisData = true;
            reRunQuery();
        } else {
            $('#cadres').hide();
            dslGraph.fetchIhrisData = false;
        }
    });

});

//###### END #######

//get year range data section
function getYearRangeData(_callback) {
    var startYear = $("#start-time").val();
    var endYear = $("#end-time").val();
    var valid = _validateYearRange(startYear, endYear);
    _callback(startYear, endYear, valid);
}

function _getYearRangeData(startYear, endYear, valid) {
    if (valid) {
        var indicator = dslGraph.indicator;
        yearlyParameters.startYear = startYear;
        yearlyParameters.endYear = endYear
        setPeriodValues("yearly", startYear, endYear);
        setIndicatorValues("indicator:average:with_filter", indicator);
        var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicator, SETTING.graph_yearly);
        getQueryValues(queryPropertiesToSubmit, dslGraph);
    }
}
// #######END#######

//get yearly data section
function getYearlyData(_callback) {
    var startYear = $("#start-time").val();
    var endYear = $("#end-time").val();
    var valid = _validateYearRange(startYear, endYear);
    _callback(startYear, endYear, valid);
}

function _getYearlyData(year) {
    var year = yearMonthParameters.currentYear;
    var indicator = dslGraph.indicator;
    yearMonthParameters.currentYear = year;
    setPeriodValues("monthly", year, year);
    setIndicatorValues("indicator:average:with_filter", indicator);
    var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicator, SETTING.graph_year_month);
    getQueryValues(queryPropertiesToSubmit, dslGraph);
}

// #######END#######

//get year range data
$(document).ready(function () {
    $("#filter").click(function () {
        getYearRangeData(_getYearRangeData);
    });
});

function getQueryValues(queryToSubmit, dslGraph) {
    $('#table-status').show();
    console.log("submitted data");
    console.log(queryToSubmit);
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/processquery', // the url from server we that we want to use
        dataType: 'json', // what type of data do we expect back from the server
        contentType: 'application/json; charset=utf-8',
        encode: true,
        data: queryToSubmit,
        success: function (data, textStatus, jqXHR) {
            $("#components-area").empty();
            dslGraph.graphData = data;
            var graphType = 6;
            console.log("the graph  object");
            console.log(dslGraph);
            console.log(data);
            console.log(data.components);
            $.each(data.components, function (index, value) {

                if ('graph-type' in value) {
                    graphType = value['graph-type'];
                    console.log("the graph type is " + graphType);
                }
            });
            dslGraph.graphType = SETTING.graph_type[graphType];

            dslGraph.drawGraph();
            insertMetadataComponents(data);
            $('#table-status').hide();
        },
        error: function (response, request) {
            //   console.log("got an error fetching cadregroups");
            $('#table-status').hide();
            var parsed_data = response.responseText;
        }
    });
    queryParametersList = [];
}

$(document).ready(function () {
//load cadre names list
    fetchCadre(populateCadres);
    fetchCounties(populateCounty);
    fetchConstituency($.noop);

    initGraph();
    //initialise initial values
    $('#kemsa-switch').prop('checked', false);
    $('#ihris-switch').prop('checked', false);
    console.log($('#start_year option[value="2015"]'));
    $('#start_year').val('2015');
    $('#montly-option').prop("checked", true);
    dslGraph.fetchKemsaData = false;
    dslGraph.fetchIhrisData = false;
    dslGraph.selectedPeriodType = "monthly";

});



//$('#graph-options > a').on('click', '*', function(event) {
//    alert(event.target);
//});

$('#graph-options > a').click(function (event) {
    var className = $(event.target).parent().attr('class');
    if (className == 'dsl-bar') {
        console.log("Drawing  graph");
        dslGraph.graphType = SETTING.graph_type[4];
        dslGraph.drawGraph();
    } else if (className == 'dsl-pie') {
        console.log("Drawing  graph");
        dslGraph.graphType = SETTING.graph_type[0];
        dslGraph.drawGraph();
    } else if (className == 'dsl-line') {
        console.log("Drawing  graph");
        dslGraph.graphType = SETTING.graph_type[6];
        dslGraph.drawGraph();
    } else if (className == 'dsl-table') {
        console.log("Drawing  graph");
        dslGraph.graphType = SETTING.graph_type[5];
        dslGraph.drawGraph();
    }
});
