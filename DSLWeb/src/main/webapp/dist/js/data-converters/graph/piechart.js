/*
 * functions to convert data source to another for graph display
 */

function convertToMonthly() {


}

function convertToYearly() {


}

function convertToPieChart(componentMetaData) {

    console.log("piechart converter called " + componentMetaData);
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


    var convertedData = getPieMetaData(componentMetaData, xaxisIndex, subjectIndex, datanameIndex);
//    subject - (Installation,Manufacturing,Other)
//    dataname (column with raw data)
//    xaxis what to put in xaxis

    return convertedData;
}

function getPieMetaData(componentMetaData, xaxisIndex, subjectIndex, datanameIndex) {
    var xaxis = componentMetaData['xaxis'];
    var data = componentMetaData['data'];
    var title = componentMetaData['title'];
    if (xaxis == 'month') {
        var subjects = [];
        var graphData = {};
        $.each(data['data'], function (index, dataArray) {
            var sub = dataArray[subjectIndex];

            if ($.inArray(sub, subjects) != -1) {
                graphData['' + sub + ''][dataArray[xaxisIndex] - 1] = Number(dataArray[datanameIndex]);
            } else {
                subjects.push(sub);
                graphData['' + sub + ''] = [null, null, null, null, null, null, null, null, null, null, null, null];
                graphData['' + sub + ''][dataArray[xaxisIndex] - 1] = Number(dataArray[datanameIndex]);
            }

        });

        var pieCharts = [];
        var month = 1;
        while (month <= 12) {
            var chartPoints = [];
            $.each(graphData, function (key, value) {
                console.log("dic name " + key);
                console.log("data val " + value);

                var dataPoint = {};
                dataPoint['name'] = key;
                dataPoint['y'] = value[month];
                chartPoints.push(dataPoint);

                var t = {}
                t['name'] = key;
                t['y'] = value;
            });
            month = month + 1;
            pieCharts.push(chartPoints);
        }

        console.log("final dataa");
        console.log(pieCharts);
        return pieCharts;
    }
    console.log("the pie charts data");
    console.log(pieCharts);
}