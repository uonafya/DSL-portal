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
                    this.selectedNames[clickedItem['id']] = clickedItem['name'];
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