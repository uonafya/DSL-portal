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



$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url === SETTING.ward_api) {
        $(document).ready(function () {
            $.each(locationCommon.wardsList, function (index, objValue) {
                var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                        <input data-constituency-id="' + objValue.constituencyId + '" data-id="' + objValue.id + '" data-name="' + objValue.name + '" class="pull-right" type="checkbox"></a>';
                $(".ward-list").append(elementToAppend);
            });
        });
    }

    if (settings.url === SETTING.constituency_api) {
        $(document).ready(function () {
            //Fetch constituencies
            $.each(locationCommon.constituenciesList, function (index, objValue) {
                var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                <input data-id="' + objValue.id + '" data-name="' + objValue.name + '" data-county-id="' + objValue.countyId + '" class="pull-right" type="checkbox"></a>';
                $(".constituency-list").append(elementToAppend);
            });
        });
    }


    if (settings.url === SETTING.county_api) {
        $(document).ready(function () {
            //Fetch county
            $.each(locationCommon.countiesList, function (index, objValue) {
                var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                                <input data-id="' + objValue.id + '" data-name="' + objValue.name + '"  class="pull-right" type="checkbox"></a>';
                $(".county-list").append(elementToAppend);
            });
        });
    }

});

$(document).ready(function () {

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