var Constituency = function (name) {
    var self = this;
    self.name = ko.observable(name);

};

var Ward = function (name) {
    var self = this;
    self.name = ko.observable(name);

};

var County = function (name) {
    var self = this;
    self.name = ko.observable(name);

};

var locationViewModel = {
    ward: ko.observableArray(),
    contituency: ko.observableArray(),
    county: ko.observableArray(),
    chosenWards: ko.observableArray(),
    chosenContituencys: ko.observableArray(),
    chosenCountys: ko.observableArray()
};

$(document).ready(function () {

    //Fetch  wards
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/ward', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
        //    console.log("wards");
            //       locationViewModel.ward(data);
//            $.each(data, function (index, objValue) {
//                var ward=new Ward(objValue.name);
//                locationViewModel.ward.push(ward); 
//            });
            $('#wardList').dropdown({
                data: data,
                input: '<input type="text" maxLength="20" placeholder="Search">',
                searchNoData: '<li style="color:#ddd">No Results</li>'
            });
        },
        error: function (response, request) {
        //    console.log("got an error fetching wards");
            var parsed_data = JSON.parse(response.responseText);
        }

    });

    //Fetch constituencies
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/constituency', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
         //   console.log("constituencies");
            //      locationViewModel.contituency(data);
//            $.each(data, function (index, objValue) {
//                var constituency=new Constituency(objValue.name); 
//                locationViewModel.contituency.push(constituency); 
//            });           
            $('#constituencyList').dropdown({
                data: data,
                input: '<input type="text" maxLength="20" placeholder="Search">',
                searchNoData: '<li style="color:#ddd">No Results</li>'
            });
        },
        error: function (response, request) {

          //  console.log("got an error fetching constituencies");
            var parsed_data = JSON.parse(response.responseText);
        }

    });

    //Fetch county
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/county', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
         //   console.log("counties");
            //     locationViewModel.county(data);
//            $.each(data, function (index, objValue) {             
//                var county=new County(objValue.name);
//                locationViewModel.county.push(county);               
//            });
            $('#countyList').dropdown({
                data: data,
                input: '<input type="text" maxLength="20" placeholder="Search">',
                searchNoData: '<li style="color:#ddd">No Results</li>'
            });
        },
        error: function (response, request) {
          //  console.log("got an error fetching constituencies");
            var parsed_data = JSON.parse(response.responseText);
        }

    });


});