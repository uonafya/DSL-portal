var dslGraph;

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
        setIndicatorValues("indicator:average:with_filter", indicator);
        setIhrisValues("human_resource:count");
        setKemsaValues("commodity:count");
        var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicator, SETTING.graph_year_month);
        getQueryValues(queryPropertiesToSubmit, dslGraph);
    }
});

//on click organisation unit level eg county, counstituency
$(document).ready(function () {
    $("#organisation-unit-level li a").click(function (event) {

        var orgUnitLevel = $(event.target).attr('data-org_unit');
        if (orgUnitLevel == 'county') {
            organisationUnit.current_level = SETTING.orgisation_level[3];
            $("label[data-name='organisation-unit']").text("County:");
            destroyChosenDropDownList();
            populateOrgunitList(locationCommon.countiesList);
            initOrganisationUnitChosenDropDown("county");

        } else if (orgUnitLevel == 'constituency') {
            organisationUnit.current_level = SETTING.orgisation_level[2];
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


function setIndicatorValues(indicatorType, indicator, filter) {
    var indicatorValuesToQuery = {};
    indicatorValuesToQuery['what'] = indicatorType;
    indicatorValuesToQuery['filter'] = {'indicator': new Array(indicator)};
    queryParametersList.push(indicatorValuesToQuery);
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

function setIhrisValues(cadreType) {
    if (dslGraph.fetchIhrisData) {
        var humanResourceValuesToQuery = {};
        humanResourceValuesToQuery['what'] = cadreType;
        humanResourceValuesToQuery['filter'] = {};
        var what = '';
        humanResourceValuesToQuery['what'] = humanResourceValuesToQuery['what'] + what;
        queryParametersList.push(humanResourceValuesToQuery);
    }
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

    yearMonthParameters.currentYear = '2015';
    setPeriodValues("monthly", '2015', '2015');
    setIndicatorValues("indicator:average:with_filter", "TB curative Rate");
    setIhrisValues("human_resource:count");
    setKemsaValues("commodity:count");
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
        setIhrisValues("human_resource:count");
        setKemsaValues("commodity:count");
        var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicator, SETTING.graph_year_month);
        getQueryValues(queryPropertiesToSubmit, dslGraph);

    });
});

//on change indicator
$(document).ready(function () {
    $("#indicators li a").click(function (event) {
        var indicator = $(event.target).attr('data-value');
        $("#indicator-name-label").text($(event.target).text());
        if (dslGraph.selectedPeriodType == 'yearly') {
            dslGraph.indicator = indicator;
            console.log("indicator " + indicator);
            getYearRangeData(_getYearRangeData);
        } else {
            var year = yearMonthParameters.currentYear;
            yearMonthParameters.currentYear = year;
            setPeriodValues("monthly", year, year);
            setIndicatorValues("indicator:average:with_filter", indicator);
            setIhrisValues("human_resource:count");
            setKemsaValues("commodity:count");
            var queryPropertiesToSubmit = prepareQueryPropertiesToSubmit(indicator, SETTING.graph_year_month);
            getQueryValues(queryPropertiesToSubmit, dslGraph);

        }
    });
});



/**
 * Random string generator
 * @returns {String} random string
 */
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


//populate table with data
var table = null;
function insertMetadataComponents(data) {

    console.log("the data");
    console.log(data);
    console.log(data.components);


    $.each(data.components, function (index, value) {
        // sm md lg
        console.log("check components");
        console.log(data.components);
        if (!('graph-type' in value)) {
            var theId = makeid();
            var parent = $("#components-area").append("<div id='" + theId + "'></div>");
            var dimensions = value['dimension'];
            var small = dimensions['small'];
            var medium = dimensions['medium'];
            var large = dimensions['large'];

            var gridClasses = "col-sm-" + small + " col-md-" + medium + " col-lg-" + large + " ";

            $('#' + theId).addClass(gridClasses);

            var graphType = value['display'];
            console.log("type of graph");
            console.log(graphType);
            if (graphType == 4) { //table
                $('#' + theId).append("<table class='display'></table>");
                var elem = $('#' + theId + ' > table');
                console.log("the element ")
                console.log(elem);
                //drawDataTable(value['data'], elem);
                drawMultiLineGraph("components-area","titlee", "categoriee", "serie");
            }
            
            if(graphType == 6){
                convertToMultiLine(value);
        
            }

            //graphType = value['graph-type'];
            //console.log("the graph type is " + graphType);
        }
    });

//    if ($.fn.dataTable.isDataTable('#analytics-table')) {
//        try {
//            table.destroy();
//        } catch (err) {
//        }
//        table = populate(data);
//    } else {
//        table = populate(data);
//    }
}

//function drawDataTable(data,theId) {
//    $('#analytics-table').empty();
//    var table = $('#'+theId).DataTable({
//        data: data.data,
//        columns: data.columns,
//        colReorder: true,
//        searching: false
//    });
//
//    return table;
//}

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
        setIhrisValues("human_resource:count");
        setKemsaValues("commodity:count");
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
        setIhrisValues("human_resource:count");
        setKemsaValues("commodity:count");
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
    setIhrisValues("human_resource:count");
    setKemsaValues("commodity:count");
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
            dslGraph.graphData = data;
            var graphType = 1;
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