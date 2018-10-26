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
           
            $.each(data, function (index, objValue) {
                var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                        <input data-constituency-id="' + objValue.constituencyId + '" data-id="' + objValue.id + '" data-name="' + objValue.name + '" class="pull-right" type="checkbox"></a>';
                $(".ward-list").append(elementToAppend);
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

            $.each(data, function (index, objValue) {

                var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                <input data-id="' + objValue.id + '" data-name="' + objValue.name + '" data-county-id="' + objValue.countyId + '" class="pull-right" type="checkbox"></a>';
                $(".constituency-list").append(elementToAppend);
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

            $.each(data, function (index, objValue) {
                var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                                <input data-id="' + objValue.id + '" data-name="' + objValue.name + '"  class="pull-right" type="checkbox"></a>';
                $(".county-list").append(elementToAppend);
            });
        },
        error: function (response, request) {
            //  console.log("got an error fetching constituencies");
            var parsed_data = JSON.parse(response.responseText);
        }

    });


    //radio buttons events
    $('body').on('click', 'input[name="optradioconstituency"]', function (e) {
        var radioValue = $("input[name='optradioconstituency']:checked").val();

        if (radioValue) {
            selectedCountituencyRadio.selectedRadioBtn = radioValue;
        }

    });

    //radio buttons events
    $('body').on('click', 'input[name="optradiocounties"]', function (e) {
        var radioValue = $("input[name='optradiocounties']:checked").val();

        if (radioValue) {
            selectedCountyRadio.selectedRadioBtn = radioValue;
        }

    });

});