var viewModel = {
//    dhisViewModel: dhisViewModel,
//    locationViewModel: locationViewModel,
//    kmlfViewModel: kmlfViewModel,
//    kemsaViewModel: kemsaViewModel,
//    ihrisViewModel: ihrisViewModel
//               childViewModel3: contentViewModel
};

$(document).ready(function () {
    $('.add').click(function () {
        var that = this;
        $('.all').prop("checked", false);
        var myDomElement = $(that).parents().eq(0).prev().children('.list-picker-group');
        var items = $(myDomElement).find("input:checked:not('.all')");
//        var items = $("#list1 input:checked:not('.all')");
        var n = items.length;
        if (n > 0) {
            items.each(function (idx, item) {
                var choice = $(item);
                choice.prop("checked", false);
                choice.parent().appendTo($(that).parents().eq(0).next().children('.list-picker-group')); //list2
            });
        } else {
            alert("Choose an item from list 1");
        }
    });

    $('.remove').click(function () {
        var that = this;
        $('.all').prop("checked", false);
        var myDomElement = $(that).parents().eq(0).next().children('.list-picker-group');
        var items = $(myDomElement).find("input:checked:not('.all')");
//        var items = $("#list2 input:checked:not('.all')");
        items.each(function (idx, item) {
            var choice = $(item);
            choice.prop("checked", false);
            choice.parent().appendTo($(that).parents().eq(0).prev().children('.list-picker-group')); //list1
        });
    });

    /* toggle all checkboxes in group */
    $('.all').click(function (e) {
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

});