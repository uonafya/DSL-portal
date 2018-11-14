
var locationCommon = {
    countiesList: "",
    constituenciesList: "",
    wardsList: ""

};

$.ajax({
    type: 'GET', // define the type of HTTP verb we want to use
    url: SETTING.ward_api, // the url from server we that we want to use
    contentType: 'application/json; charset=utf-8',
    dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function (data, textStatus, jqXHR) {
        locationCommon.wardsList = data;
    },
    error: function (response, request) {
        //    console.log("got an error fetching wards");
        var parsed_data = JSON.parse(response.responseText);
    }

});

//Fetch constituencies
$.ajax({
    type: 'GET', // define the type of HTTP verb we want to use
    url: SETTING.constituency_api, // the url from server we that we want to use
    contentType: 'application/json; charset=utf-8',
    dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function (data, textStatus, jqXHR) {
        locationCommon.constituenciesList = data;
    },
    error: function (response, request) {

        //  console.log("got an error fetching constituencies");
        var parsed_data = JSON.parse(response.responseText);
    }

});

//Fetch county
$.ajax({
    type: 'GET', // define the type of HTTP verb we want to use
    url: SETTING.county_api, // the url from server we that we want to use
    contentType: 'application/json; charset=utf-8',
    dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function (data, textStatus, jqXHR) {
        locationCommon.countiesList = data;
    },
    error: function (response, request) {
        //  console.log("got an error fetching constituencies");
        var parsed_data = JSON.parse(response.responseText);
    }

});