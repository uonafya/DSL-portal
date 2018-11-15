var commodityCommon = {
    commodity_names: ""
};
//   Fetch  commodities
$.ajax({
    type: 'GET', // define the type of HTTP verb we want to use
    url: SETTING.commodity_names, // the url from server we that we want to use
    contentType: 'application/json; charset=utf-8',
    dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function (data, textStatus, jqXHR) {
        commodityCommon.commodity_names = data;
    },
    error: function (response, request) {
        var parsed_data = response.responseText;
    }

});
    