var common_ihris = {
    cadres: ""
};

//Fetch cadres
$.ajax({
    type: 'GET', // define the type of HTTP verb we want to use
    url: SETTING.cadre, // the url from server we that we want to use
    contentType: 'application/json; charset=utf-8',
    dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function (data, textStatus, jqXHR) {
        common_ihris.cadres = data;
    },
    error: function (response, request) {
        //    console.log("got an error fetching cadres");
        var parsed_data = JSON.parse(response.responseText);
    }

});
    