var viewModel = {
//    dhisViewModel: dhisViewModel,
//    locationViewModel: locationViewModel,
//    kmlfViewModel: kmlfViewModel,
//    kemsaViewModel: kemsaViewModel,
//    ihrisViewModel: ihrisViewModel
//               childViewModel3: contentViewModel
};

$(document).ready(function () {

    $('body').on('click', '.add', function (e) {
        var that = this;
        $('.all').prop("checked", false);
        var myDomElement = $(that).parents().eq(0).prev().children('.list-picker-group');
        var items = $(myDomElement).find("input:checked:not('.all')");
//        var items = $("#list1 input:checked:not('.all')");
        var n = items.length;
        if (n > 0) {

            items.each(function (idx, item) {
                var choice = $(item);
//                console.log(choice.parent().prop("name"));
                choice.prop("checked", false);
                choice.parent().appendTo($(that).parents().eq(0).next().children('.list-picker-group')); //list2
            });

            var el = $(e.target).parent();

            if (el.hasClass("dhis-indicator-group")) {
                indicatorGroupEvent.loadGroupData(items, "add", that);
            }

            if (el.hasClass("dhis-indicator-name")) {
                indicatorNameEvent.loadNameData(items, "add", that)
            }

            if (el.hasClass("facility-type-action")) {
                facilityTypeEvent.loadFacilityTypeData(items, "add", that);
            }

            if (el.hasClass("facility-keph-action")) {
                facilityLevelEvent.loadFacilityLevelData(items, "add", that);
            }

            if (el.hasClass("cadre-group-action")) {
                cadreGroupEvent.loadCadreGroupData(items, "add", that);
            }

            if (el.hasClass("cadre-name-action")) {
                cadreEvent.loadCadreData(items, "add", that);
            }

            if (el.hasClass("ward-list-action")) {
                wardEvent.loadWardData(items, "add", that);
            }

            if (el.hasClass("constituency-list-action")) {
                constituencyEvent.loadConstituencyData(items, "add", that);
            }

            if (el.hasClass("county-list-action")) {
                countyEvent.loadCountyData(items, "add", that);
            }


        } else {
            alert("Choose an item from list 1");
        }
    });

    $('body').on('click', '.remove', function (e) {
        var that = this;
        $('.all').prop("checked", false);
        var myDomElement = $(that).parents().eq(0).next().children('.list-picker-group');
        var items = $(myDomElement).find("input:checked:not('.all')");
        items.each(function (idx, item) {
            var choice = $(item);
            choice.prop("checked", false);
            choice.parent().appendTo($(that).parents().eq(0).prev().children('.list-picker-group')); //list1
        });

        var el = $(e.target).parent();

        if (el.hasClass("dhis-indicator-group")) {
            indicatorGroupEvent.loadGroupData(items, "remove", that);
        }

        if (el.hasClass("dhis-indicator-name")) {
            indicatorNameEvent.loadNameData(items, "remove", that)
        }

        if (el.hasClass("facility-type-action")) {
            facilityTypeEvent.loadFacilityTypeData(items, "remove", that);
        }

        if (el.hasClass("facility-keph-action")) {
            facilityLevelEvent.loadFacilityLevelData(items, "remove", that);
        }

        if (el.hasClass("cadre-group-action")) {
            cadreGroupEvent.loadCadreGroupData(items, "remove", that);
        }

        if (el.hasClass("cadre-name-action")) {
            cadreEvent.loadCadreData(items, "remove", that);
        }

        if (el.hasClass("ward-list-action")) {
            wardEvent.loadWardData(items, "remove", that);
        }

        if (el.hasClass("constituency-list-action")) {
            constituencyEvent.loadConstituencyData(items, "remove", that);
        }

        if (el.hasClass("county-list-action")) {
            countyEvent.loadCountyData(items, "remove", that);
        }

    });

    /* toggle all checkboxes in group */
    $('body').on('click', '.all', function (e) {
        e.stopPropagation();
        var $this = $(this);
        if ($this.is(":checked")) {
            $this.parents('.list-group').find("[type=checkbox]").prop("checked", true);
        } else {
            $this.parents('.list-group').find("[type=checkbox]").prop("checked", false);
            $this.prop("checked", false);
        }
    });

    $('body').on('click', '[type=checkbox]', function (e) {
        e.stopPropagation();
    });

    /* toggle checkbox when list group item is clicked */

    $('body').on('click', '.list-group a', function (e) {
        //alert("you");
        e.stopPropagation();

        var $this = $(this).find("[type=checkbox]");
        if ($this.is(":checked")) {
            $this.prop("checked", false);
        } else {
            $this.prop("checked", true);
        }

        if ($this.hasClass("all")) {
            $this.trigger('click');
        }
    });

    //
    $("input:radio[name=optradiotimespan]").click(function (event) {
        var periodTypeSelected=event.target.value;
        if(periodTypeSelected=='monthly'){
            $('.month').show();
            selectedPeriodType.selectedRadioBtn='monthly';
        }else{
            $('.month').hide();
            selectedPeriodType.selectedRadioBtn='yearly';
        }
        
    });
});