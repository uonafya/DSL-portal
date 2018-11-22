var CadreGroup = function (id, name) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
};

var Cadre = function (id, name, cadreGroupId) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.cadreGroupId = ko.observable(cadreGroupId);
};

var CadreAllocation = function (id, name, cadreNumber, mflcode, period) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.cadreNumber = ko.observable(kmflCode);
    self.mflcode = ko.observable(kmflCode);
    self.period = ko.observable(kmflCode);
};


var ihrisViewModel = {
    cadreGroup: ko.observableArray(),
    cadre: ko.observableArray(),
    cadreAllocation: ko.observableArray()
};

$(document).ready(function () {

    //Fetch  cadregroups
    function populateCadreGroups() {
        console.log("called");
        $.each(common_ihris.cadresGroups, function (index, objValue) {
            var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                                       <input data-id="' + objValue.id + '" data-name="' + objValue.name + '" class="pull-right" type="checkbox"></a>';
            $(".cadre-group-list").append(elementToAppend);
            console.log("called 2");
        });
    }
    fetchCadresGroups(populateCadreGroups);
    
    
    //Fetch cadres
    function populateCadres() {
        $.each(common_ihris.cadres , function (index, objValue) {
            var elementToAppend = '<a href="#" class="list-group-item"><strong>' + objValue.name + '</strong>\n\
                                       <input data-id="' + objValue.id + '" data-name="' + objValue.name + '" data-group-id="' + objValue.cadreGroupId + '" class="pull-right" type="checkbox"></a>';
            $(".cadre-list").append(elementToAppend);
        });
        
    }
    
    fetchCadre(populateCadres);
    
    //ihris ui hooks    
    //radio buttons events
    $("input[name='optradiohresource']").click(function () {
        var radioValue = $("input[name='optradiohresource']:checked").val();
        if (radioValue) {
            selectedHumanResourceRadio.selectedRadioBtn = radioValue;
        }

    });

    //radio buttons events
    $('body').on('click', 'input[name="optradiocadres"]', function (e) {
        var radioValue = $("input[name='optradiocadres']:checked").val();

        if (radioValue) {
            selectedHumanResourceCascadeButton.selectedRadioBtn = radioValue;
        }

    });

});