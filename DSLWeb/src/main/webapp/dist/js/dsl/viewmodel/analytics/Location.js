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

function loadFacilities() {
    $.each(locationCommon.facilitiesList, function (index, objValue) {
        var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                        <input data-constituency-id="' + objValue.id + '" data-id="' + objValue.id + '" data-name="' + objValue.name + '" class="pull-right" type="checkbox"></a>';
        $(".facility-list").append(elementToAppend);
    });
}

function loadWards() {
    $.each(locationCommon.wardsList, function (index, objValue) {
        var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                        <input data-constituency-id="' + objValue.constituencyId + '" data-id="' + objValue.id + '" data-name="' + objValue.name + '" class="pull-right" type="checkbox"></a>';
        $(".ward-list").append(elementToAppend);
    });
}


function loadConstituency() {
    //Fetch constituencies
    $.each(locationCommon.constituenciesList, function (index, objValue) {
        var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                <input data-id="' + objValue.id + '" data-name="' + objValue.name + '" data-county-id="' + objValue.countyId + '" class="pull-right" type="checkbox"></a>';
        $(".constituency-list").append(elementToAppend);
    });
}


function loadCounties() {
    //Fetch county
    $.each(locationCommon.countiesList, function (index, objValue) {
        var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                                <input data-id="' + objValue.id + '" data-name="' + objValue.name + '"  class="pull-right" type="checkbox"></a>';
        $(".county-list").append(elementToAppend);
    });
}


$(document).ready(function () {
    fetchCounties(loadCounties);
    fetchConstituency(loadConstituency);
    fetchWard(loadWards);
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