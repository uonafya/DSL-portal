$(document).ready(function () {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/get_pub_data/', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
        console.log(data);
            displayHivStatus(data);
           // displayArtStatus(data);
        },
        error: function (response, request) {
            //    console.log("got an error fetching wards");
            displayHivStatus();
            displayArtStatus();
            displayArttStatus();
            //var parsed_data = JSON.parse(response.responseText);
        }

    });
});

function displayHivStatus(){
    
    var data =[ {
        hiv_positive_f: 45,HIV_negative_f: 50,HIV_unknown_status_f: 60,hiv_positive_m:57, HIV_negative_m:68, HIV_unknown_status_m:90
    }];
    $.each(data, function (index, objValue) {
       //var ward=new Ward(objValue.name);
       var elementId="hiv_status_chart";
       var categoriee= ['ART', 'Antenatal', 'Family Planning']
       var titlee = 'Indicators - commodity - 2017';
       var serie = [{
                        name: 'Indicator Rate',
                        data: [objValue.hiv_positive_f, objValue.HIV_negative_f, objValue.HIV_unknown_status_f]
                    }, {
                        name: 'Commodity Supplied',
                        data: [objValue.hiv_positive_m, objValue.HIV_negative_m, objValue.HIV_unknown_status_m]
                    }
                    ];
       stackedBar(elementId,titlee,categoriee,serie);
    });
}


function displayArtStatus(){
    
    var data =[ {
        hiv_positive_f: 45,HIV_negative_f: 50,HIV_unknown_status_f: 60,hiv_positive_m:37, HIV_negative_m:28, HIV_unknown_status_m:14
    }];
    $.each(data, function (index, objValue) {
       //var ward=new Ward(objValue.name);
       var elementId="art_status_chart";
       var categoriee= ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
       var titlee = 'TB curative Rate - 2017';
       var serie = [{
                        name: 'Indicator Rate',
                        data: [objValue.hiv_positive_f, objValue.HIV_negative_f, objValue.HIV_unknown_status_f]
                    }, {
                        name: 'Human Resource',
                        data: [objValue.hiv_positive_m, objValue.HIV_negative_m, objValue.HIV_unknown_status_m]
                    }
                    ];
       stackedBar(elementId,titlee,categoriee,serie);
    });
}



function displayArttStatus(){
    
    var data =[ {
        hiv_positive_f: 45,HIV_negative_f: 50,HIV_unknown_status_f: 60,hiv_positive_m:37, HIV_negative_m:28, HIV_unknown_status_m:14,
       hiv_positive_mm:57, HIV_negative_mm:68, HIV_unknown_status_mm:90 
    }];
    $.each(data, function (index, objValue) {
       //var ward=new Ward(objValue.name);
       var elementId="artt_status_chart";
       var categoriee= ['ART', 'Antenatal', 'Family Planning']
       var titlee = 'Indicators - human resource - commodity - 2017';
       var serie = [{
                        name: 'Indicator Rate',
                        data: [objValue.hiv_positive_f, objValue.HIV_negative_f, objValue.HIV_unknown_status_f]
                    }, {
                        name: 'Human Resource',
                        data: [objValue.hiv_positive_m, objValue.HIV_negative_m, objValue.HIV_unknown_status_m]
                    }, {
                        name: 'Commodity Supplied',
                        data: [objValue.hiv_positive_mm, objValue.HIV_negative_mm, objValue.HIV_unknown_status_mm]
                    }
                    ];
       stackedBar(elementId,titlee,categoriee,serie);
    });
}

