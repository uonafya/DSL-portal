// Indicators
var IndicatorGroupEvent = function () {
    this.selectedGroups = {},
            this.loadGroupData = function (clickedItem) {
                if (clickedItem['selected']) {
                    this.selectedGroups[clickedItem['id']] = clickedItem['name'];
                    var data = dhisViewModel.indicatorNames();
                    $.each(data, function (index, objValue) {
                        if (clickedItem['id'] == objValue.groupId) {
                            dhisViewModel.indicatorNamesDropDown.choose(objValue.id, true);
                        }

                    });

                } else {
                    delete this.selectedGroups[clickedItem['id']];
                    var data = dhisViewModel.indicatorNames();
                    $.each(data, function (index, objValue) {
                        if (clickedItem['id'] == objValue.groupId) {
                            dhisViewModel.indicatorNamesDropDown.choose(objValue.id, false);
                        }

                    });
                }
            };
};

var IndicatorNameEvent = function () {
    this.selectedNames = {},
            this.loadNameData = function (clickedItem) {
                if (clickedItem['selected']) {
                    var groupId = 0;
                    $.each(dhisViewModel.indicatorNames(), function (index, objValue) {
                        if (objValue.id == clickedItem['id']) {
                            groupId = objValue.groupId;
                        }

                    });
                    this.selectedNames[clickedItem['id']] = {'name': clickedItem['name'], 'groupId': groupId};
                } else {
                    delete this.selectedNames[clickedItem['id']];
                }
            };

};


//Facilities

var FacilityNameEvent = function () {
    this.selectedFacilityNames = {},
            this.loadFacilityNameData = function (clickedItem) {
                var data = kmlfViewModel.facilities();
                if (clickedItem['selected']) {
                    this.selectedFacilityNames[clickedItem['id']] = clickedItem['name'];
//            $.each(data, function (index, objValue) {
//                if (clickedItem['id'] == objValue.id) {
//                    kmlfViewModel.facilityNamesDropDown.choose(objValue.id, true);
//                }
//            });
                    console.log(this.selectedFacilityNames);

                } else {
                    delete this.selectedFacilityNames[clickedItem['id']];
//            $.each(data, function (index, objValue) {
//                if (clickedItem['id'] == objValue.id) {
//                    kmlfViewModel.facilityNamesDropDown.choose(objValue.id, false);
//                }
//
//            });
                }
            };
};

var FacilityTypeEvent = function () {
    this.selectedFacilityType = {},
            this.loadFacilityTypeData = function (clickedItem) {
                var data = kmlfViewModel.facilityTypes();
                if (clickedItem['selected']) {
                    this.selectedFacilityType[clickedItem['id']] = clickedItem['name'];

                    console.log(this.selectedFacilityType);

                } else {
                    delete this.selectedFacilityType[clickedItem['id']];

                }
            };

};


var FacilityLevelEvent = function () {
    this.selectedFacilityLevel = {},
            this.loadFacilityLevelData = function (clickedItem) {
                var data = kmlfViewModel.facilityLevels();
                if (clickedItem['selected']) {
                    this.selectedFacilityLevel[clickedItem['id']] = clickedItem['name'];

                    console.log(this.selectedFacilityLevel);

                } else {
                    delete this.selectedFacilityLevel[clickedItem['id']];

                }
            };
};


//Region

var CountyEvent = function () {
    this.selectedCounties = {},
            this.loadCountyData = function (clickedItem) {
                var data = locationViewModel.county();
                if (clickedItem['selected']) {
                    this.selectedCounties[clickedItem['id']] = clickedItem['name'];

                    console.log(this.selectedCounties);

                } else {
                    delete this.selectedCounties[clickedItem['id']];

                }
            };

};

var WardEvent = function () {
    this.selectedWards = {},
            this.loadWardData = function (clickedItem) {
                var data = locationViewModel.ward();
                if (clickedItem['selected']) {
                    this.selectedWards[clickedItem['id']] = clickedItem['name'];

                    console.log(this.selectedWards);

                } else {
                    delete this.selectedWards[clickedItem['id']];

                }
            };
};

var ConstituencyEvent = function () {
    this.selectedConstituencies = {},
            this.loadConstituencyData = function (clickedItem) {
                var data = locationViewModel.contituency();
                if (clickedItem['selected']) {
                    this.selectedConstituencies[clickedItem['id']] = clickedItem['name'];
                    console.log(this.selectedConstituencies);
                } else {
                    delete this.selectedConstituencies[clickedItem['id']];
                }
            };
};


var CadreGroupEvent = function () {
    this.selectedCadreGroups = {},
            this.loadCadreGroupData = function (clickedItem) {
                var data = ihrisViewModel.cadreGroup();
                if (clickedItem['selected']) {
                    this.selectedCadreGroups[clickedItem['id']] = clickedItem['name'];

                    console.log(this.selectedCadreGroups);

                } else {
                    delete this.selectedCadreGroups[clickedItem['id']];
                }
            };
};

var CadreEvent = function () {
    this.selectedCadres = {},
            this.loadCadreData = function (clickedItem) {
                var data = ihrisViewModel.cadre();
                if (clickedItem['selected']) {
                    this.selectedCadres[clickedItem['id']] = clickedItem['name'];
                    console.log(this.selectedCadres);
                } else {
                    delete this.selectedCadres[clickedItem['id']];
                }
            };
};


// DHIS objects
var indicatorGroupEvent = new IndicatorGroupEvent();
var indicatorNameEvent = new IndicatorNameEvent();

//KMFL - facility - objects
var facilityNameEvent = new FacilityNameEvent();
var facilityTypeEvent = new FacilityTypeEvent();
var facilityLevelEvent = new FacilityLevelEvent();

var updateData = function () {
    var selectedIndicatorNames = indicatorNameEvent.selectedNames;
    var selectedIndicatorGroupNames = indicatorGroupEvent.selectedGroups;
    
    var valuesToQuery= [];
    
    if (jQuery.isEmptyObject(selectedIndicatorGroupNames)) {
        var parameter = {'name': 'Indicator name','table': 'vw_mohdsl_dhis'}
        var valuesToFilterBy=[];
        $.each(selectedIndicatorNames, function (index, objValueIndicatorNames) {
            valuesToFilterBy.push(objValueIndicatorNames.name);
        });
        parameter['filter_by']=valuesToFilterBy;
        console.log(parameter);
    } else {
        
        var parameter = {'name': 'Indicator name','table': 'dim_dhis_indicatorgroup'}
        var valuesToFilterBy=[];
        
        valuesToQuery["Indicator name"] = [];
        valuesToQuery["Indicator name"] = []
        $.each(selectedIndicatorNames, function (index, objValueIndicatorNames) {
            console.log(objValueIndicatorNames.name);
            $.each(dhisViewModel.indicatorGroups(), function (index, objValue) {
                if (objValue.id == objValueIndicatorNames.groupId) {
                    console.log(objValue.name);
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
                aggregator: sum(intFormat)(["value"]),
            }
    );

};