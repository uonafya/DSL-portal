//load county list
$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url === SETTING.county_api) {
        destroyChosenDropDownList();
        // 
        populateOrgunitList(locationCommon.countiesList)
        initOrganisationUnitChosenDropDown("county");
    }
    //load commodity names list
    if (settings.url === SETTING.commodity_names) {
        $("#organisation-unit").empty();
        $.each(commodityCommon.commodity_names, function (index, objValue) {
            var elementToAppend = ' <li><a href="#" data-name="' + objValue + '">' + objValue + '</a></li>';
            // $("#commodity-names").append(elementToAppend);
        });
    }

    //load cadre names list

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


function setIhrisValues(cadreType) {
    var humanResourceValuesToQuery = {};
    humanResourceValuesToQuery['what'] = cadreType;
    humanResourceValuesToQuery['filter'] = {};
    var what = '';
    humanResourceValuesToQuery['what'] = humanResourceValuesToQuery['what'] + what;
    queryParametersList.push(humanResourceValuesToQuery);
    return queryParametersList;
}


function setKemsaValues(commodityType) {

    var commodityValuesToQuery = {};
    commodityValuesToQuery['what'] = commodityType;
    queryParametersList.push(commodityValuesToQuery);
    return queryParametersList;

}

// ########### init function ##########
// ###########                ##########
//initial date values to start visualization

var dslGraph;
init();

function init() {

    yearMonthAttributesSetter("TB curative Rate", '2015');

}


/// end of init function

function yearMonthAttributesSetter(currentIndicator, date) {
    yearMonthParameters.currentYear = date;
    //period selected
    var currentIndicator = currentIndicator;
    setPeriodValues("monthly",date, date);
    setIndicatorValues("indicator:average:with_filter", currentIndicator);
    setIhrisValues("human_resource:count");
    setKemsaValues("commodity:count");
    var queryToSubmit = {"query": queryParametersList};
    var x = JSON.stringify(queryToSubmit);
    console.log(queryToSubmit);
    dslGraph = new DslGraph();
    dslGraph.type = SETTING.graph_year_month;
    dslGraph.elementId = "test-graph";
    dslGraph.indicator = currentIndicator;
    getQueryValues(x, dslGraph);
}


function yearlyAttributesSetter(currentIndicator, startYear, endYear) {
    yearlyParameters.startYear = startYear;
    yearlyParameters.endYear = endYear
    //period selected
    var currentIndicator = currentIndicator;
    setPeriodValues("yearly",startYear, endYear);
    setIndicatorValues("indicator:average:with_filter", currentIndicator);
    setIhrisValues("human_resource:count");
    setKemsaValues("commodity:count");
    var queryToSubmit = {"query": queryParametersList};
    var x = JSON.stringify(queryToSubmit);
    console.log(queryToSubmit);
    dslGraph = new DslGraph();
    dslGraph.type = SETTING.graph_yearly;
    dslGraph.elementId = "test-graph";
    dslGraph.indicator = currentIndicator;
    getQueryValues(x, dslGraph);
}

$(document).ready(function () {
    $('#start_year').change(function () {
        var year = $(this).val();
        var indicator = dslGraph.indicator;
        yearMonthAttributesSetter(indicator, year);

    });
});


$(document).ready(function () {

    $("#indicators li a").click(function (event) {

        var year = yearMonthParameters.currentYear;
        var indicator = $(event.target).attr('data-value');
        yearMonthAttributesSetter(indicator, year);

    });

});



var table = null;
var count = 0;
function populateAnalyticsTable(data) {
    if ($.fn.dataTable.isDataTable('#analytics-table')) {
        try {
            table.destroy();
        } catch (err) {
        }
        table = populate(data);
    } else {
        table = populate(data);
    }
}

function populate(data) {
    $('#analytics-table').empty();
    table = $('#analytics-table').DataTable({
        data: data.data,
        columns: data.columns,
        colReorder: true,
        searching: false
    });
    if (count == 0) { //hack to load counties/constituency in drop downist b4 bugfix
        $("a[data-value='county']").trigger("click");
        count = 1;
    }

    return table;
}


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

//get year range data
$(document).ready(function () {
    $("#filter").click(function () {
        var startYear = $("#start-time").val();
        var endYear = $("#end-time").val();
        var valid = _validateYearRange(startYear, endYear);
        if (valid) {
            var indicator = dslGraph.indicator;
            yearlyAttributesSetter(indicator, startYear, endYear);
        }

    });
});

function getQueryValues(x, dslGraph) {
    $('#table-status').show();
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/processquery', // the url from server we that we want to use
        dataType: 'json', // what type of data do we expect back from the server
        contentType: 'application/json; charset=utf-8',
        encode: true,
        data: x,
        success: function (data, textStatus, jqXHR) {
            console.log("Data is: " + JSON.stringify(data));
            dslGraph.graphData = data;
            dslGraph.drawGraph();
            populateAnalyticsTable(data);

            //populateAnalyticsTable(data);
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