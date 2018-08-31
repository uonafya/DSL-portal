var Facility = function (id, name, kmflCode, kephlevelSk, ownerId, wardId, subCountyId) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.kmflCode = ko.observable(kmflCode);
    self.kephlevelSk = ko.observable(kephlevelSk);
    self.ownerId = ko.observable(ownerId);
    self.wardId = ko.observable(wardId);
    self.subCountyId = ko.observable(subCountyId);

};

var FacilityLevel = function (id, name) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);

};

var FacilityType = function (id, name) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);

};

var kmlfViewModel = {
    facilities: ko.observableArray(),
    facilityLevels: ko.observableArray(),
    facilityTypes: ko.observableArray()
};

$(document).ready(function () {

    //Fetch  facilities
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/facilities', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
            // console.log("facilities");
            kmlfViewModel.facilities(data);
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
            var facilityNameEvent = new FacilityNameEvent();
            kmlfViewModel.facilityNamesDropDown = $('#facilities').dropdown({
                data: data,
                input: '<input type="text" maxLength="20" placeholder="Search">',
                searchNoData: '<li style="color:#ddd">No Results</li>',
                choice: function () {
                    facilityNameEvent.loadFacilityNameData(arguments[1]);
                    //console.log(arguments[1]);
                }
            }).data('dropdown');
            // console.log(data);
        },
        error: function (response, request) {
            console.log("got an error fetching facilities");
            var parsed_data = JSON.parse(response.responseText);
        }

    });

    //Fetch facility-type
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/facility-type', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
            //   console.log("facility-type");
            kmlfViewModel.facilityTypes(data);
//            $.each(data, function (index, objValue) {
//                var facilityType = new FacilityType(objValue.id, objValue.name);
//                kmlfViewModel.facilityTypes.push(facilityType);
//            });

            var facilityTypeEvent = new FacilityTypeEvent();
            kmlfViewModel.facilityTypesDropDown = $('#facility-types').dropdown({
                data: data,
                input: '<input type="text" maxLength="20" placeholder="Search">',
                searchNoData: '<li style="color:#ddd">No Results</li>',
                choice: function () {
                    facilityTypeEvent.loadFacilityTypeData(arguments[1]);
                    //console.log(arguments[1]);
                }
            }).data('dropdown');
        },
        error: function (response, request) {
            // console.log("got an error fetching facility-type");
            var parsed_data = JSON.parse(response.responseText);
        }

    });
    //Fetch facility-levels
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/facility-levels', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
            //  console.log("facility levels");
            // kmlfViewModel.facilityLevels(data);
//            $.each(data, function (index, objValue) {
//                var facilityLevel = new FacilityLevel(objValue.id,objValue.name);
//                kmlfViewModel.facilityLevels.push(facilityLevel);
//            });
            var facilityLevelEvent = new FacilityLevelEvent();
            kmlfViewModel.facilityTypesDropDown = $('#facility-levels').dropdown({
                data: data,
                input: '<input type="text" maxLength="20" placeholder="Search">',
                searchNoData: '<li style="color:#ddd">No Results</li>',
                choice: function () {
                    facilityLevelEvent.loadFacilityLevelData(arguments[1]);
                    //console.log(arguments[1]);
                }
            }).data('dropdown');
        },
        error: function (response, request) {
            // console.log("got an error fetching facility-levels");
            var parsed_data = JSON.parse(response.responseText);
        }

    });


});