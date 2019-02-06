/*
 * functions to convert data source to another for graph display
 */

function convertToMonthlyColumn() {


}

function convertToYearlyColumn() {


}

function convertToMultiLine(componentMetaData) {

    console.log("converter called " + componentMetaData);
    console.log(componentMetaData);

    var data = componentMetaData['data'];

    var subjectIndex = 0, datanameIndex = 0, xaxisIndex = 0;



    $.each(data['columns'], function (index, column) {
        if (column['title'] == componentMetaData['subject']) {
            subjectIndex = index;
        }
        if (column['title'] == componentMetaData['dataname']) {
            datanameIndex = index;
        }
        if (column['title'] == componentMetaData['xaxis']) {
            xaxisIndex = index;
        }


    });

    var subjects = [];
    var lineData = [];
    var graphData = {};
    $.each(data['data'], function (index, dataArray) {
        var sub = dataArray[subjectIndex];
        if ($.inArray(sub, subjects) != -1) {
            graphData['' + sub + ''].push(dataArray[datanameIndex]);
        } else {
            subjects.push(sub);
            graphData['' + sub + ''] = [];
            graphData['' + sub + ''].push(dataArray[datanameIndex]);
        }

    });
    console.log("final dataa");
    console.log(graphData);
//    subject - (Installation,Manufacturing,Other)
//    dataname (column with raw data)
//    xaxis what to put in xaxis




//    [{
//        name: 'Installation',
//        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
//    }, {
//        name: 'Manufacturing',
//        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
//    }, {
//        name: 'Sales & Distribution',
//        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
//    }, {
//        name: 'Project Development',
//        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
//    }, {
//        name: 'Other',
//        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
//    }]
    var convertedData;
    return convertedData;
}