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

var CountyEvent = function () {
    this.selectedCounties = {},
            this.loadCountyData = function (selectedItems, type, clickedItem) {

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

            };

};

var WardEvent = function () {
    this.selectedWards = {},
            this.loadWardData = function (selectedItems, type, clickedItem) {

                var that = this;
                if (type == 'add') {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var name = $(selectedObjValue).attr("data-name");
                        var id = $(selectedObjValue).attr("data-id");
                        var constituencyId = $(selectedObjValue).attr("data-constituency-id");
                        that.selectedWards[id] = {'name': name, 'constituency-id': constituencyId};

                    });
                } else {
                    $.each(selectedItems, function (index, selectedObjValue) {
                        var id = $(selectedObjValue).attr("data-id");
                        delete that.selectedWards[id];
                    });

                }

            };
};

var ConstituencyEvent = function () {
    this.selectedConstituencies = {},
            this.loadConstituencyData = function (selectedItems, type, clickedItem) {

                var myDomElement;
                var wardtems;
                if (type == 'add') {
                    myDomElement = $(".ward-list");
                    wardtems = $(myDomElement).find("input");

                    $.each(selectedItems, function (index, selectedObjValue) {
                        $.each(wardtems, function (index, objValue) {

                            if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-constituency-id")) {
                                $(objValue).trigger("click");
                            }

                        });

                    });
                    $(".ward-list-action").children(".add").trigger("click");
                } else {
                    myDomElement = $(".ward-selected-list");
                    wardtems = $(myDomElement).find("input");
                    $.each(selectedItems, function (index, selectedObjValue) {
                        $.each(wardtems, function (index, objValue) {

                            if ($(selectedObjValue).attr("data-id") == $(objValue).attr("data-constituency-id")) {
                                $(objValue).trigger("click");
                            }

                        });

                    });
                    $(".ward-list-action").children(".remove").trigger("click");
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

var updateData = function () {
    var startDate = $('#start-period').val();
    var endDate = $('#end-period').val();

    if (!(startDate)) {
        var alrt = $("#global-danger-alert");
        alrt.find('.alert-msg').text("please ensure the start date is filled").css("font-weight", "Bold");

        if (alrt.css('display') === 'none') {
            alrt.fadeIn(1000).delay(10000).fadeOut(2000);
        }
        return;
    }

    if (!(endDate)) {
        var alrt = $("#global-danger-alert");
        alrt.find('.alert-msg').text("please ensure the end date is filled").css("font-weight", "Bold");

        if (alrt.css('display') === 'none') {
            alrt.fadeIn(1000).delay(10000).fadeOut(2000);
        }
        return;
    }

    var selectedIndicatorNames = indicatorNameEvent.selectedNames;
    var selectedIndicatorGroupNames = indicatorGroupEvent.selectedGroups;

    var valuesToQuery = [];

    if (jQuery.isEmptyObject(selectedIndicatorGroupNames)) {
        var parameter = {'name': 'Indicator name', 'table': 'vw_mohdsl_dhis'}
        var valuesToFilterBy = [];
        $.each(selectedIndicatorNames, function (index, objValueIndicatorNames) {
            valuesToFilterBy.push(objValueIndicatorNames.name);
        });
        parameter['filter_by'] = valuesToFilterBy;
    } else {

        var parameter = {'name': 'Indicator name', 'table': 'dim_dhis_indicatorgroup'}
        var valuesToFilterBy = [];

        valuesToQuery["Indicator name"] = [];
        valuesToQuery["Indicator name"] = []
        $.each(selectedIndicatorNames, function (index, objValueIndicatorNames) {
            $.each(dhisViewModel.indicatorGroups(), function (index, objValue) {
                if (objValue.id == objValueIndicatorNames.groupId) {
                }
            });
        });
    }

    facilityLevelEvent.selectedFacilityLevel;

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