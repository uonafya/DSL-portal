var common_ihris = {
    cadres: "",
    cadresGroups: ""
};

function fetchCadre(_callback) {
    //Fetch cadres
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: SETTING.cadre, // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            common_ihris.cadres = data;
            _callback();
        },
        error: function (response, request) {
            //    console.log("got an error fetching cadres");
            var parsed_data = JSON.parse(response.responseText);
        }

    });

}

function fetchCadresGroups(_callback) {
    //Fetch  cadregroups
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/cadregroups', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            common_ihris.cadresGroups = data;
            _callback();
        },
        error: function (response, request) {
            //   console.log("got an error fetching cadregroups");
            var parsed_data = JSON.parse(response.responseText);
        }

    });
}