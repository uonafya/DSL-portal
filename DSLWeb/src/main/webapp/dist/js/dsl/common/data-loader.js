
var IndicatorGroupEvent = function () {
    this.selectedGroups = {},
    this.loadGroupData = function(clickedItem) {
        console.log(clickedItem);
        if (clickedItem['selected']) {
            this.selectedGroups[clickedItem['id']] = clickedItem['name'];
            var data=dhisViewModel.indicatorNames();
            $.each(data, function (index, objValue) {
                if(clickedItem['id'] == objValue.groupId){
                    alert("get it now");
                    dhisViewModel.indicatorNamesDropDown.choose(objValue.id,true);
                }
                
            });
            
        } else {
            delete this.selectedGroups[clickedItem['id']];
        }
        var f="";
        for (var propName in this.selectedGroups) {
            console.log(f+propName);
        }
        console.log("---------------------------");
    };
};


var IndicatorNameEvent = function () {
    this.selectedNames = {},
    this.loadNameData = function(clickedItem) {
        console.log(clickedItem);
        if (clickedItem['selected']) {
            this.selectedNames[clickedItem['id']] = clickedItem['name'];
        } else {
            delete this.selectedNames[clickedItem['id']];
        }
        var f="";
        for (var propName in this.selectedNames) {
            //console.log(f+propName);
        }

    };

};