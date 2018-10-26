// Indicators events hooks
var IndicatorGroupEvent = function () {
    this.selectedGroups = {},
            this.loadGroupData = function (selectedGroupItems, type, clickedItem) {
                var myDomElement;
                var indicatorItems;
                if (type == 'add') {
                    myDomElement = $(".indicator-name-list");
                    indicatorItems = $(myDomElement).find("input");

                    $.each(selectedGroupItems, function (index, selectedObjValue) {
                        $.each(indicatorItems, function (index, objValue) {

                            if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-group-id")) {
                                $(objValue).trigger("click");
                            }

                        });

                    });
                    $(".dhis-indicator-name").children(".add").trigger("click");
                } else {
                    myDomElement = $("#indicator-selected-name-list");
                    indicatorItems = $(myDomElement).find("input");
                    $.each(selectedGroupItems, function (index, selectedObjValue) {
                        $.each(indicatorItems, function (index, objValue) {

                            if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-group-id")) {
                                $(objValue).trigger("click");
                            }

                        });

                    });
                    $(".dhis-indicator-name").children(".remove").trigger("click");
                }

            };
};

var IndicatorNameEvent = function () {
    this.selectedNames = {},
            this.loadNameData = function (selectedIndicatorItems, type, clickedItem) {
                var that = this;
                if (type == 'add') {
                    $.each(selectedIndicatorItems, function (index, selectedObjValue) {
                        var name = $(selectedObjValue).attr("data-name");
                        var groupId = $(selectedObjValue).attr("data-group-id");
                        var id = $(selectedObjValue).attr("data-id");
                        that.selectedNames[id] = {'name': name, 'groupId': groupId};
                    });
                } else {
                    $.each(selectedIndicatorItems, function (index, selectedObjValue) {
                        var id = $(selectedObjValue).attr("data-id");
                        delete that.selectedNames[id];
                    });

                }
            };

};

var SelectedIndicatorRadio = function () {
    this.selectedRadioBtn = "";
};


//Facilities  events hooks

var FacilityNameEvent = function () {
    this.selectedFacilityNames = {},
            this.loadFacilityNameData = function (selectedIndicatorItems, type, clickedItem) {
                var data = kmlfViewModel.facilities();
                if (selectedItems['selected']) {
                    this.selectedFacilityNames[selectedItems['id']] = selectedItems['name'];
                    console.log(this.selectedFacilityNames);
                } else {
                    delete this.selectedFacilityNames[selectedItems['id']];
                }
            };
};

var FacilityTypeEvent = function () {
    this.selectedFacilityType = {},
            this.loadFacilityTypeData = function (selectedItems, type, clickedItem) {

                var that = this;
                if (type == 'add') {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var name = $(selectedObjValue).attr("data-name");
                        var id = $(selectedObjValue).attr("data-id");
                        that.selectedFacilityType[id] = {'name': name};
                    });
                } else {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var id = $(selectedObjValue).attr("data-id");
                        delete that.selectedFacilityType[id];
                    });

                }

            };
};

var FacilityLevelEvent = function () {
    this.selectedFacilityLevel = {},
            this.loadFacilityLevelData = function (selectedItems, type, clickedItem) {

                var that = this;
                if (type == 'add') {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var name = $(selectedObjValue).attr("data-name");
                        var id = $(selectedObjValue).attr("data-id");
                        that.selectedFacilityLevel[id] = {'name': name};

                    });
                } else {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var id = $(selectedObjValue).attr("data-id");
                        delete that.selectedFacilityLevel[id];
                        console.log(that.selectedFacilityLevel);
                    });

                }

            };
};

var SelectedFacilityRadio = function () {
    this.selectedRadioBtn = "";
};

//Region(locality)  events hooks

var SelectedCountyRadio = function () {
    this.selectedRadioBtn = "";
};

var SelectedCountituencyRadio = function () {
    this.selectedRadioBtn = "";
};

var selectedCountyRadio = new SelectedCountyRadio();
var selectedCountituencyRadio = new SelectedCountituencyRadio();

var CountyEvent = function () {
    this.selectedCounties = {},
            this.loadCountyData = function (selectedItems, type, clickedItem) {
                var selectedRdio = selectedCountyRadio.selectedRadioBtn;

                if (selectedRdio == 'cascade-constituency') {
                    selectedCountituencyRadio.selectedRadioBtn = "none";
                    addSelectedCounties(selectedItems, type, clickedItem);
                } else if (selectedRdio == 'cascade-all') {
                    selectedCountituencyRadio.selectedRadioBtn = "cascade-wards";
                    addSelectedCounties(selectedItems, type, clickedItem);
                }


            };

};

function addSelectedCounties(selectedItems, type, clickedItem) {
    var myDomElement;
    var constituencyItems;
    if (type == 'add') {
        myDomElement = $(".constituency-list");
        constituencyItems = $(myDomElement).find("input");

        $.each(selectedItems, function (index, selectedObjValue) {
            $.each(constituencyItems, function (index, objValue) {
                if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-county-id")) {
                    $(objValue).trigger("click");
                }

            });

        });
        $(".constituency-list-action").children(".add").trigger("click");
    } else {
        myDomElement = $(".constituency-selected-list");
        constituencyItems = $(myDomElement).find("input");
        $.each(selectedItems, function (index, selectedObjValue) {
            $.each(constituencyItems, function (index, objValue) {
                if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-county-id")) {
                    $(objValue).trigger("click");
                }

            });

        });
        $(".constituency-list-action").children(".remove").trigger("click");
    }
}

var ConstituencyEvent = function () {
    this.selectedConstituencies = [],
            this.loadConstituencyData = function (selectedItems, type, clickedItem) {
                var that = this;
                var selectedRdio = selectedCountituencyRadio.selectedRadioBtn;

                if (type == 'add') {
                    addContituencyToList(selectedItems, that.selectedConstituencies);
                } else {
                    removeContituencyFromList(selectedItems, that.selectedConstituencies);
                }

                if (selectedRdio == 'cascade-wards') {
                    if (type == 'add') {
                        cascadeAddContituencyToWard(selectedItems);
                    } else {
                        cascadeRemoveContituencyToWard(selectedItems);
                    }
                }
            };
};

function cascadeAddContituencyToWard(selectedItems) {
    var myDomElement = $(".ward-list");
    var wardtems = $(myDomElement).find("input");
    $.each(selectedItems, function (index, selectedObjValue) {
        $.each(wardtems, function (index, objValue) {
            if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-constituency-id")) {
                $(objValue).trigger("click");
            }
        });
    });
    $(".ward-list-action").children(".add").trigger("click");
}
//removes wards under these contituencies
function cascadeRemoveContituencyToWard(selectedItems) {
    var myDomElement = $(".ward-selected-list");
    var wardtems = $(myDomElement).find("input");
    $.each(selectedItems, function (index, selectedObjValue) {
        $.each(wardtems, function (index, objValue) {

            if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-constituency-id")) {
                $(objValue).trigger("click");
            }
        });
    });
    $(".ward-list-action").children(".remove").trigger("click");
}


function addContituencyToList(selectedItems, selectedConstituencies) {
    $.each(selectedItems, function (index, selectedObjValue) {
        var id = $(selectedObjValue).attr("data-id");
        selectedConstituencies.push(id);
    });
}

function removeContituencyFromList(selectedItems, selectedConstituencies) {
    $.each(selectedItems, function (index, selectedObjValue) {
        var id = $(selectedObjValue).attr("data-id");
        delete selectedConstituencies[id];
        selectedConstituencies.splice($.inArray(id, selectedConstituencies), 1);
    });
}


var WardEvent = function () {
    this.selectedWards = [],
            this.loadWardData = function (selectedItems, type, clickedItem) {

                var that = this;
                if (type == 'add') {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var id = $(selectedObjValue).attr("data-id");
                        that.selectedWards.push(id);
                    });
                } else {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var id = $(selectedObjValue).attr("data-id");
                        that.selectedWards.splice($.inArray(id, that.selectedWards), 1);
                    });

                }

            };
};

//human resource events hooks
var CadreGroupEvent = function () {
    this.selectedCadreGroups = {},
            this.loadCadreGroupData = function (selectedItems, type, clickedItem) {

                var myDomElement;
                var cadreItems;
                if (type == 'add') {
                    myDomElement = $(".cadre-list");
                    cadreItems = $(myDomElement).find("input");

                    $.each(selectedItems, function (index, selectedObjValue) {
                        $.each(cadreItems, function (index, objValue) {

                            if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-group-id")) {
                                $(objValue).trigger("click");
                            }

                        });

                    });
                    $(".cadre-name-action").children(".add").trigger("click");
                } else {
                    myDomElement = $(".cadre-selected-list");
                    cadreItems = $(myDomElement).find("input");
                    $.each(selectedItems, function (index, selectedObjValue) {
                        $.each(cadreItems, function (index, objValue) {

                            if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-group-id")) {
                                $(objValue).trigger("click");
                            }

                        });

                    });
                    $(".cadre-name-action").children(".remove").trigger("click");
                }

            };
};

var CadreEvent = function () {
    this.selectedCadres = {},
            this.loadCadreData = function (selectedItems, type, clickedItem) {

                var that = this;
                if (type == 'add') {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var name = $(selectedObjValue).attr("data-name");
                        var id = $(selectedObjValue).attr("data-id");
                        that.selectedCadres[id] = {'name': name};

                    });
                } else {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var id = $(selectedObjValue).attr("data-id");
                        delete that.selectedCadres[id];
                        console.log(that.selectedCadres);
                    });

                }

            };
};

var SelectedHumanResourceRadio = function () {
    this.selectedRadioBtn = "";
};

//Kemsa events hooks

var SelectedCommodityRadio = function () {
    this.selectedRadioBtn = "";
};

// DHIS objects
var indicatorGroupEvent = new IndicatorGroupEvent();
var indicatorNameEvent = new IndicatorNameEvent();
var selectedIndicatorRadio = new SelectedIndicatorRadio();

//KMFL - facility - objects
var facilityNameEvent = new FacilityNameEvent();
var facilityTypeEvent = new FacilityTypeEvent();
var facilityLevelEvent = new FacilityLevelEvent();
var selectedFacilityRadio = new SelectedFacilityRadio();


//IHRIS objects
var cadreGroupEvent = new CadreGroupEvent();
var cadreEvent = new CadreEvent();
var selectedHumanResourceRadio = new SelectedHumanResourceRadio();

//locality objects
var wardEvent = new WardEvent();
var countyEvent = new CountyEvent();
var constituencyEvent = new ConstituencyEvent();

//Kemsa
var selectedCommodityRadio = new SelectedCommodityRadio();

function displayErrorAlert(msg) {
    var alrt = $("#global-danger-alert");
    alrt.find('.alert-msg').text(msg).css("font-weight", "Bold");

    if (alrt.css('display') === 'none') {
        alrt.fadeIn(1000).delay(10000).fadeOut(2000);
    }
}

function validateDateInput() {
    var startDate = $('#start-period').val();
    var endDate = $('#end-period').val();

    if (!(startDate)) {
        displayErrorAlert("please ensure the start period is filled");
        return false;
    }
    if (!(endDate)) {
        displayErrorAlert("please ensure the end period is filled");
        return false;
    }
    return true;
}

function isFacilitiesSelected() {

    if (selectedFacilityRadio.selectedRadioBtn == 'none') {
        return false;
    } else {
        if (jQuery.isEmptyObject(facilityTypeEvent.selectedFacilityType) &&
                jQuery.isEmptyObject(facilityLevelEvent.selectedFacilityLevel)) {
            return false;
        } else
            return true;
    }
}

function isLocalitySelected() {
    if (jQuery.isEmptyObject(wardEvent.selectedWards) &&
            jQuery.isEmptyObject(countyEvent.selectedCounties) &&
            jQuery.isEmptyObject(constituencyEvent.selectedConstituencies)) {

        return false;
    } else
        return true;
}



function sendQueryParamatersToServer(qParameters) {
    console.log("again " + qParameters);
    //Send  query parameter to server to retrieve database resultset
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/processquery', // the url from server we that we want to use
        dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        data: qParameters,
        success: function (data, textStatus, jqXHR) {

            console.log("All went well");
        },
        error: function (response, request) {
            //   console.log("got an error fetching cadregroups");
            var parsed_data = response.responseText;
        }

    });

}


var table = null;
function populateAnalyticsTable(data) {
    console.log("populating");
    if ($.fn.dataTable.isDataTable('#analytics-table')) {
        try {
            console.log("destroying");
            table.destroy();
            console.log("destroying 2");
        } catch (err) {
            console.log(err);
        }
        table = populate(data);
    } else {
        table = populate(data);
    }
}

function populate(data) {
    $('#analytics-table').empty();
    table = $('#analytics-table').DataTable({
        data: data.data,
        columns: data.columns
    });
    return table;

}

var updateData = function () {
    if (!validateDateInput())
        return;
    var isAnyParametersSelected = false;
    var queryParametersList = [];

    //dhis indicators
    var selectedIndicatorNames = indicatorNameEvent.selectedNames;
    var selectedIndicatRadio = selectedIndicatorRadio.selectedRadioBtn;

    if (selectedIndicatRadio != 'none' && selectedIndicatRadio != '' && !jQuery.isEmptyObject(selectedIndicatorNames)) {
        var indicatorValuesToQuery = {};
        indicatorValuesToQuery['what'] = "indicator:" + selectedIndicatRadio;
        indicatorValuesToQuery['filter'] = {'indicator': selectedIndicatorNames};
        queryParametersList.push(indicatorValuesToQuery);
        isAnyParametersSelected = true;
    }

    //facility
    var selectedFacilRadio = selectedFacilityRadio.selectedRadioBtn;

    if (selectedFacilRadio != 'none' && selectedFacilRadio != '') {
        var facilityValuesToQuery = {};
        facilityValuesToQuery['what'] = "facility:" + selectedFacilRadio;
        facilityValuesToQuery['filter'] = {};

        var selectedFacilTypes = facilityTypeEvent.selectedFacilityType;
        if (!jQuery.isEmptyObject(selectedFacilTypes)) {

            facilityValuesToQuery['filter']['facility_type'] = selectedFacilTypes;
        }
        var selectedFacilityLevels = facilityLevelEvent.selectedFacilityLevel;
        if (!jQuery.isEmptyObject(selectedFacilityLevels)) {

            facilityValuesToQuery['filter']['facility_keph_level'] = selectedFacilityLevels;
        }

        queryParametersList.push(facilityValuesToQuery);
        isAnyParametersSelected = true;
    }

    //kemsa commodities

    var selectedCommodtyRadio = selectedCommodityRadio.selectedRadioBtn;
    if (!isFacilitiesSelected() && !isLocalitySelected() && selectedCommodtyRadio != 'none' && selectedCommodtyRadio != '') {

        displayErrorAlert("please ensure you choose a locality or facilities selection");
        return false;
    } else {
        if (selectedCommodtyRadio != 'none' && selectedCommodtyRadio != '') {
            var commodityValuesToQuery = {};
            commodityValuesToQuery['what'] = "commodity:" + selectedCommodtyRadio;
            queryParametersList.push(commodityValuesToQuery);
            isAnyParametersSelected = true;
        }

    }

    //ihris 
    var selectedHumanResrceRadio = selectedHumanResourceRadio.selectedRadioBtn;

    if (selectedHumanResrceRadio != 'none' && selectedHumanResrceRadio != '') {
        var humanResourceValuesToQuery = {};
        humanResourceValuesToQuery['what'] = "human_resource:" + selectedHumanResrceRadio;
        humanResourceValuesToQuery['filter'] = {};

        var selectedCadreTypes = cadreEvent.selectedCadres;
        if (!jQuery.isEmptyObject(selectedCadreTypes)) {

            humanResourceValuesToQuery['filter']['cadre'] = selectedCadreTypes;
        }

        queryParametersList.push(humanResourceValuesToQuery);
        isAnyParametersSelected = true;
    }

    //locality 
    if (isLocalitySelected()) {
        var localityValuesToQuery = {};
        localityValuesToQuery['what'] = 'locality:';
        localityValuesToQuery['filter'] = {};
        var what = '';

        var selectedConstituencies = constituencyEvent.selectedConstituencies;
        console.log("The constituency "+selectedConstituencies);
        if (!jQuery.isEmptyObject(selectedConstituencies)) {
            if (what.length == 0)
                what = what + 'constituency';
            else
                what = what + ':constituency';

            localityValuesToQuery['filter']['constituency'] = selectedConstituencies;
        }
        var selectedWads = wardEvent.selectedWards;
        if (!jQuery.isEmptyObject(selectedWads)) {
            if (what.length == 0)
                what = what + 'ward';
            else
                what = what + ':ward';
            localityValuesToQuery['filter']['ward'] = selectedWads;
        }
        localityValuesToQuery['what'] = localityValuesToQuery['what']+what;
        queryParametersList.push(localityValuesToQuery);
    }


    if (!isAnyParametersSelected) {
        displayErrorAlert("please ensure you choose values from the side-menu to display");
        console.log("terminating");
        return;
    }
    console.log(queryParametersList);
    var queryToSubmit = {"query": queryParametersList};
    var x = JSON.stringify(queryToSubmit);
    //    sendQueryParamatersToServer(queryParametersList);
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use
        url: '/DSLWeb/api/processquery', // the url from server we that we want to use
        dataType: 'json', // what type of data do we expect back from the server
        contentType: 'application/json; charset=utf-8',
        encode: true,
        data: x,
        success: function (data, textStatus, jqXHR) {

            console.log("All went well ");
            console.log(data);
            populateAnalyticsTable(data);
        },
        error: function (response, request) {
            //   console.log("got an error fetching cadregroups");
            var parsed_data = response.responseText;
        }

    });





    var sum = $.pivotUtilities.aggregatorTemplates.sum;
    var numberFormat = $.pivotUtilities.numberFormat;
    var intFormat = numberFormat({digitsAfterDecimal: 0});

    $("#output22").pivot(
            [
                {indicator: "antinatal", facility: "embakasi", value: 20},
                {indicator: "antinatal", facility: "ngara", value: 20},
                {indicator: "antinatal", facility: "shauri-moyo", value: 24},
                {indicator: "antinatal", facility: "zimmerman hospital", value: 40},
                {indicator: "sickle", facility: "embakasi", value: 20},
                {indicator: "sickle", facility: "ngara", value: 20},
                {indicator: "sickle", facility: "shauri-moyo", value: 24},
                {indicator: "sickle", facility: "zimmerman hospital", value: 40}

            ],
            {
                rows: ["indicator"],
                cols: ["facility"],
                renderer: $.pivotUtilities.c3_renderers["Scatter Chart"],
                rendererOptions: {c3: {size: {width: 600, height: 600}}},
                aggregator: sum(intFormat)(["value"])
            }
    );

};