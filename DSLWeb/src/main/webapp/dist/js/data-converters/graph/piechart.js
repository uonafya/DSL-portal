/*
 * functions to convert data source to another for graph display
 */

function convertToPieChart(metadataData, valueData, numm) {

    console.log("piechart converter called " + numm + " " + metadataData);
    console.log(metadataData);

    var subjectIndex = 0, datanameIndex = 0, xaxisIndex = 0;

    $.each(valueData['columns'], function (index, column) {
        if (column['title'].toLowerCase() == metadataData['subject'].toLowerCase()) {
            subjectIndex = index;
        }
        if (column['title'].toLowerCase() == metadataData['dataname'].toLowerCase()) {
            datanameIndex = index;
        }

        if (column['title'] == metadataData['xaxis']) {
            xaxisIndex = index;
        }

    });

    var convertedData = getPieMetaData(metadataData, valueData, xaxisIndex, subjectIndex, datanameIndex);
//    subject - (Installation,Manufacturing,Other)
//    dataname (column with raw data)
//    xaxis what to put in xaxis

    return convertedData;
}

function getPieMetaData(componentMetaData, valueData, xaxisIndex, subjectIndex, datavalueIndex) {
    var xaxis = componentMetaData['xaxis'];
    var title = componentMetaData['title'];
    var xaxisProcess = componentMetaData['xaxis-process'];

    if (xaxisProcess != null && xaxisProcess == 'false') {
        return _getPieDataWIthoutPeriodOption(valueData, subjectIndex, datavalueIndex);
    }

    if (xaxis == 'month') {
        return _getPieDataWithMonthPeriodOption(valueData, componentMetaData, xaxisIndex, subjectIndex, datavalueIndex);
    }

    if (xaxis == 'year') {
        return _getPieDataWithYearlyPeriodOption(valueData, componentMetaData, xaxisIndex, subjectIndex, datavalueIndex);
    }

}


function _getPieDataWIthoutPeriodOption(valueData, subjectIndex, datavalueIndex) {
    var chartPoints = [];
    var pieCharts = [];
    $.each(valueData['data'], function (key, value) {
        var dataPoint = {};
        dataPoint['name'] = value[subjectIndex];
        dataPoint['y'] = Number(value[datavalueIndex]);
        chartPoints.push(dataPoint);

    });
    pieCharts.push(chartPoints);
    return pieCharts;

}

function _getPieDataWithMonthPeriodOption(valueData, componentMetaData, xaxisIndex, subjectIndex, datavalueIndex) {
    var dissagregatedSubjects = componentMetaData['dissagregated-subjects'];
    var subjects = [];
    var graphData = {};
    console.log("valued data ");
    console.log(valueData);
    $.each(valueData['data'], function (index, dataArray) {
        var sub = dataArray[subjectIndex];
        console.log("The month " + dataArray[xaxisIndex]);
        if ($.inArray(sub, subjects) != -1) {
            graphData['' + sub + ''][dataArray[xaxisIndex]] = Number(dataArray[datavalueIndex]);
        } else {
            subjects.push(sub);
            graphData['' + sub + ''] = [null, null, null, null, null, null, null, null, null, null, null, null];
            graphData['' + sub + ''][dataArray[xaxisIndex]] = Number(dataArray[datavalueIndex]);
        }
    });

    console.log("graph data " + graphData);
    console.log(graphData);
    var pieCharts = [];
    var month = 1;
    while (month <= 12) {
        var chartPoints = [];
        $.each(graphData, function (key, value) {
            var dataPoint = {};
            if (dissagregatedSubjects == 'false') {
                dataPoint['name'] = key + " - coverage";
                dataPoint['y'] = Number(value[month]);
                console.log("-------------------------- " + value[month]);
                chartPoints.push(dataPoint);
                dataPoint = {};
                dataPoint['name'] = key;
                console.log("nop ---------------------------------- ");
                console.log(100 - Number(value[month]));
                dataPoint['y'] = 100 - Number(value[month]);
                chartPoints.push(dataPoint);
            } else {
                dataPoint['name'] = key;
                dataPoint['y'] = value[month];
                chartPoints.push(dataPoint);
            }
        });
        month = month + 1;
        pieCharts.push(chartPoints);
    }
    return pieCharts;

}



function _getPieDataWithYearlyPeriodOption(valueData, componentMetaData, xaxisIndex, subjectIndex, datavalueIndex) {
    var dissagregatedSubjects = componentMetaData['dissagregated-subjects'];
    var yearList = [];
    var graphData = {};
    $.each(valueData['data'], function (index, dataArray) {
        var yearNow = dataArray[xaxisIndex];
        var subjectValueMap = {};
//        console.log("years list");
        //console.log(yearList);
        if ($.inArray(yearNow, yearList) != -1) {

            graphData['' + yearNow + ''][dataArray[subjectIndex]] = dataArray[datavalueIndex];

        } else {

            yearList.push(yearNow);
            subjectValueMap[dataArray[subjectIndex]] = dataArray[datavalueIndex];
//            console.log("The graph");
//            console.log(graphData);
//            console.log("The year");
//            console.log(yearNow);
            subjectValueMap[dataArray[subjectIndex]] = dataArray[datavalueIndex];
            graphData['' + yearNow + ''] = subjectValueMap;

        }
    });


    var max = Math.max.apply(Math, yearList); // 3
    var min = Math.min.apply(Math, yearList); // 1

    console.log("the data ");
    console.log(graphData);

    var pieCharts = [];
    var years = [];
    var startYear = min;
    while (startYear <= max) {
        // if ($.inArray(startYear, yearList) != -1) { //check if year to process is in the list
        var chartPoints = [];
        console.log("Got here");
        console.log(graphData[startYear]);
        $.each(graphData[startYear], function (key, valueObj) {
            var dataPoint = {};
            dataPoint['name'] = key;
            dataPoint['y'] = Number(valueObj);
            chartPoints.push(dataPoint);
        });
        pieCharts.push(chartPoints);
        years.push(startYear);
        //}
        startYear = startYear + 1;
        console.log("incremental year");
        console.log(startYear);
    }

    console.log("The pie charts ");
    console.log(pieCharts);
    var yearChartsObject={};
    yearChartsObject['chart']=pieCharts;
    yearChartsObject['years']=years;
    return yearChartsObject;


}
