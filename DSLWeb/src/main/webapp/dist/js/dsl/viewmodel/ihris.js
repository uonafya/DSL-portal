var CadreGroup = function (id, name) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
};

var Cadre = function (id, name, cadreGroupId) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.cadreGroupId = ko.observable(cadreGroupId);
};

var CadreAllocation = function (id, name, cadreNumber, mflcode, period) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.cadreNumber = ko.observable(kmflCode);
    self.mflcode = ko.observable(kmflCode);
    self.period = ko.observable(kmflCode);
};


var ihrisViewModel = {
    cadreGroup: ko.observableArray(),
    cadre: ko.observableArray(),
    cadreAllocation: ko.observableArray()
};

$(document).ready(function () {

    //Fetch  cadregroups
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/cadregroups', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
         //   console.log("cadregroups");
       //     ihrisViewModel.cadreGroup(data);
           // kmlfViewModel.facilities.push(facility);
//            $.each(data, function (index, objValue) {
//                console.log("facilities "+index);
//                var facility = new Facility(
//                        objValue.id,
//                        objValue.name,
//                        objValue.kmflcode,
//                        objValue.kephlevel_sk,
//                        objValue.owner_id,
//                        objValue.ward_id,
//                        objValue.sub_county_id
//                        );
//                kmlfViewModel.facilities.push(facility);
//            });
            var cadreGroupEvent = new CadreGroupEvent();
            $('#cadre-group').dropdown({
                data: data,
                input: '<input type="text" maxLength="20" placeholder="Search">',
                searchNoData: '<li style="color:#ddd">No Results</li>',
                choice: function () {
                    cadreGroupEvent.loadCadreGroupData(arguments[1]);
                    //console.log(arguments[1]);
                }
            }).data('dropdown');
        },
        error: function (response, request) {
         //   console.log("got an error fetching cadregroups");
            var parsed_data = JSON.parse(response.responseText);
        }

    });
    
    
    //Fetch cadres
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/cadre', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
         //   console.log("cadres");
     //       ihrisViewModel.cadre(data);
           // kmlfViewModel.facilities.push(facility);
//            $.each(data, function (index, objValue) {
//                console.log("facilities "+index);
//                var facility = new Facility(
//                        objValue.id,
//                        objValue.name,
//                        objValue.kmflcode,
//                        objValue.kephlevel_sk,
//                        objValue.owner_id,
//                        objValue.ward_id,
//                        objValue.sub_county_id
//                        );
//                kmlfViewModel.facilities.push(facility);
//            });
            var cadreEvent = new CadreEvent();
            $('#cadre').dropdown({
                data: data,
                input: '<input type="text" maxLength="20" placeholder="Search">',
                searchNoData: '<li style="color:#ddd">No Results</li>',
                choice: function () {
                    cadreEvent.loadCadreData(arguments[1]);
                    //console.log(arguments[1]);
                }
            }).data('dropdown');
        },
        error: function (response, request) {
        //    console.log("got an error fetching cadres");
            var parsed_data = JSON.parse(response.responseText);
        }

    });
    
    
    //Fetch cadre allocations
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/cadreallocation', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
        //    console.log("cadre allocations");
       //     console.log(data);
    //        ihrisViewModel.cadreAllocation(data);
           // kmlfViewModel.facilities.push(facility);
//            $.each(data, function (index, objValue) {
//                console.log("facilities "+index);
//                var facility = new Facility(
//                        objValue.id,
//                        objValue.name,
//                        objValue.kmflcode,
//                        objValue.kephlevel_sk,
//                        objValue.owner_id,
//                        objValue.ward_id,
//                        objValue.sub_county_id
//                        );
//                kmlfViewModel.facilities.push(facility);
//            });
//            $('#kemsa-commodity').dropdown({
//              data: data
//            });
        },
        error: function (response, request) {
          //  console.log("got an error fetching cadre allocations");
            var parsed_data = JSON.parse(response.responseText);
        }

    });

});