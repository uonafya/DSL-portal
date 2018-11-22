
var locationCommon = {
    countiesList: "",
    constituenciesList: "",
    wardsList: ""

};

function fetchWard(_callback) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: SETTING.ward_api, // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            locationCommon.wardsList = data;
            _callback();
        },
        error: function (response, request) {
            //    console.log("got an error fetching wards");
            var parsed_data = JSON.parse(response.responseText);
        }

    });
}


function fetchConstituency(_callback) {
    //Fetch constituencies
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: SETTING.constituency_api, // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            locationCommon.constituenciesList = data;
            _callback();
        },
        error: function (response, request) {
            //  console.log("got an error fetching constituencies");
            var parsed_data = JSON.parse(response.responseText);
        }

    });
}


//Fetch county
function fetchCounties(_callback) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: SETTING.county_api, // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            locationCommon.countiesList = data;
            _callback();
        },
        error: function (response, request) {
            //  console.log("got an error fetching constituencies");
            var parsed_data = JSON.parse(response.responseText);
        }

    });
}