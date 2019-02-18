var tableDisplay = null;
function drawDataTable(elementId, data,title) {
    console.log("check length");
    if ($('#graph-table-display').length) {
        //pass
        console.log("table does not exist");
    } else {
        console.log(" creating table");
        $("#" + elementId).append('<div style="width:100%;font-weight: bold; font-size: 20px;text-align: center">'+title+'</div>').append('<table id="graph-table-display" class="display" style="width:100%">   </table>');
    }

    if ($.fn.dataTable.isDataTable('#graph-table-display')) {
        try {
            tableDisplay.destroy();
        } catch (err) {
            console.log(err);
        }
        tableDisplay = _populate(data);
    } else {
        tableDisplay = _populate(data);
    }
}

function _populate(data) {
    $('#graph-table-display').empty();
    tableDisplay = $('#graph-table-display').DataTable({
        data: data.data,
        columns: data.columns,
        colReorder: true
    });
    return tableDisplay;
}