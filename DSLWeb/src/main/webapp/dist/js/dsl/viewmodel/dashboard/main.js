
$(document).ajaxComplete(function (event, xhr, settings) {
    console.log("county event");
    console.log($("#organisation-unit"));
    if (settings.url === SETTING.county_api) {
        $.each(locationCommon.countiesList, function (index, objValue) {
            var elementToAppend = '<option data-id="' + objValue.id + '" data-name="' + objValue.name + '">' + objValue.name + '</option>';
            $("#organisation-unit").append(elementToAppend);
        });
        $("#organisation-unit").chosen({
            width: "15%"
        });
    }

});


function getSelectedPeriod() {
    //period selected


    var startDate = $('#start_year').val();
    var endDate = $('#start_year').val();


    var dateValuesToQuery = {};
    dateValuesToQuery['filter'] = {};
    dateValuesToQuery['what'] = 'date:yearly';

    dateValuesToQuery['filter']['start_year'] = new Array(startDate);
    dateValuesToQuery['filter']['end_year'] = new Array(endDate);

    queryParametersList.push(dateValuesToQuery);

}

$(document).ready(function () {

    var queryParametersList = [];

    $("#indicators li a").click(function (event) {
        queryParametersList = [];
        getSelectedPeriod();
        var indicatorName = $(event.target).attr('data-value');
        var selectedIndicatorNames = [indicatorName];


//dhis indicators

        var indicatorValuesToQuery = {};
        indicatorValuesToQuery['what'] = "indicator:average:with_filter";
        indicatorValuesToQuery['filter'] = {'indicator': selectedIndicatorNames};
        queryParametersList.push(indicatorValuesToQuery);


        var queryToSubmit = {"query": queryParametersList};
        var x = JSON.stringify(queryToSubmit);

        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use
            url: '/DSLWeb/api/processquery', // the url from server we that we want to use
            dataType: 'json', // what type of data do we expect back from the server
            contentType: 'application/json; charset=utf-8',
            encode: true,
            data: x,
            success: function (data, textStatus, jqXHR) {

                console.log("All went well ");
                console.log("Data is: " + JSON.stringify(data));
                //populateAnalyticsTable(data);
                $('#table-status').hide();
            },
            error: function (response, request) {
                //   console.log("got an error fetching cadregroups");
                $('#table-status').hide();
                var parsed_data = response.responseText;

            }

        });

    });

});


