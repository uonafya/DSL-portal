var Commodity = function (id, name, kmflCode, orderQuantity, orderYear, orderMonth) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.kmflCode = ko.observable(kmflCode);
    self.orderQuantity = ko.observable(orderQuantity);
    self.orderYear = ko.observable(orderYear);
    self.orderMonth = ko.observable(orderMonth);
};


var kemsaViewModel = {
    commodity: ko.observableArray()
};

$(document).ready(function () {

    //Fetch  facilities
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/commodities', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
            console.log("commodities");
            kemsaViewModel.commodity(data);
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
            $('#kemsa-commodity').dropdown({});
        },
        error: function (response, request) {
            console.log("got an error fetching commodities");
            var parsed_data = JSON.parse(response.responseText);
        }

    });

});