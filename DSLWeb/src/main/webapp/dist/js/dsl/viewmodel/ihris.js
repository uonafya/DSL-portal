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
            
            $.each(data, function (index, objValue) {
                var elementToAppend = '<a href="#" name="' + objValue.id + '" class="list-group-item"><strong>' + objValue.name + '</strong><input class="pull-right" type="checkbox"></a>';
                $(".cadre-group-list").append(elementToAppend);
            });
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

//            var cadreEvent = new CadreEvent();
//            cadreEvent.loadCadreData(arguments[1]);
            
            $.each(data, function (index, objValue) {
                var elementToAppend = '<a href="#" name="' + objValue.id + '" class="list-group-item"><strong>' + objValue.name + '</strong><input class="pull-right" type="checkbox"></a>';
                $(".cadre-list").append(elementToAppend);
            });
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

        },
        error: function (response, request) {
            var parsed_data = JSON.parse(response.responseText);
        }

    });

});