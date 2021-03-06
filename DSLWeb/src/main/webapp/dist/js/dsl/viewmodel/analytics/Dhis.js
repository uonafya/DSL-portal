var IndicatorName = function (name) {
    var self = this;
    self.name = ko.observable(name);

};

var IndicatorGroupName = function (name) {
    var self = this;
    self.name = ko.observable(name);

};

var dhisViewModel = {
    indicatorNames: ko.observableArray(),
    indicatorGroups: ko.observableArray(),
    chosenIndicatorGroups: ko.observableArray(),
    chosenIndicatorNames: ko.observableArray()
};

$(document).ready(function () {

    //Fetch indicator groups
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/indicator_group', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {

//            dhisViewModel.indicatorGroups(data);
//            indicatorGroupEvent.loadGroupData(arguments[1]);

            $.each(data, function (index, objValue) {
                var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                                        <input data-id="' + objValue.id + '" class="pull-right" type="checkbox"></a>';
                $(".indicator-group-list").append(elementToAppend);
            });

        },
        error: function (response, request) {
            //alert("fetch indicators failed");
            //alert(this.url);
            //    console.log("got an error fetching indicator_group");
            var parsed_data = response.responseText;
        }

    });

    //Fetch indicator names
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/indicator_name', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {

            $.each(data, function (index, objValue) {
                var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                                        <input data-id="' + objValue.id + '" data-group-id="' + objValue.groupId + '" data-name="' + objValue.name + '" class="pull-right" type="checkbox"></a>';
                $(".indicator-name-list").append(elementToAppend);
            });
        },
        error: function (response, request) {

            //    console.log("got an error fetching indicator_name");
            var parsed_data = response.responseText;
        }

    });

    //fetch key performance idicators
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/kpi', // the url from server we that we want to use
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jqXHR) {
            //alert("fetch indicators succes");\
            //    console.log("kpi");
//            $.each(data, function (index, objValue) {
//                modelData = data;
//                var content = objValue;
//                // console.log(objValue);
//            });
        },
        error: function (response, request) {

            //   console.log("got an error  fetching kpi");
            var parsed_data = response.responseText;

        }

    });


//    dhis ui hooks

    //radio buttons events
    $("input[name='optradioindicator']").click(function () {
        var radioValue = $("input[name='optradioindicator']:checked").val();

        if (radioValue) {
            selectedIndicatorRadio.selectedRadioBtn=radioValue
        }

    });



});