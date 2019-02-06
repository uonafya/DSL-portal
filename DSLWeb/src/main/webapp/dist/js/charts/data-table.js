function drawDataTable(data,element) {
    var table = element.DataTable({
        data: data.data,
        columns: data.columns,
        colReorder: true,
        searching: false
    });

    return table;
}