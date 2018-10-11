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

    //Fetch  commodities
//    $.ajax({
//        type: 'GET', // define the type of HTTP verb we want to use
//        url: '/DSLWeb/api/commodities', // the url from server we that we want to use
//        contentType: 'application/json; charset=utf-8',
//        dataType: 'json', // what type of data do we expect back from the server
//        encode: true,
//        success: function (data, textStatus, jqXHR) {
//            console.log("the data");
//            console.log(data);
//            $.each(data, function (index, objValue) {
//                var elementToAppend = '<a href="#" name="' + objValue.id + '" class="list-group-item"><strong>' + objValue.name + '</strong><input class="pull-right" type="checkbox"></a>';
//                $(".facility-type").append(elementToAppend);
//            });
//        },
//        error: function (response, request) {
//            //  console.log("got an error fetching commodities");
//            var parsed_data = JSON.parse(response.responseText);
//        }
//
//    });
    
    
    //    Kemsa ui hooks    
//
     //radio buttons events
    $("input[name='optradiocommodity']").click(function () {
        var radioValue = $("input[name='optradiocommodity']:checked").val();
        if (radioValue) {
            selectedCommodityRadio.selectedRadioBtn=radioValue;
        }

    });

});