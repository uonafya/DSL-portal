/*
 * functions to convert data source to another for graph display
 */

function convertToMonthlyColumn() {


}

function convertToYearlyColumn() {


}
/**
 * 
 * @param {type} metadataData the metadata object within the received json data
 * @param {type} valueData the actual data for the indicator
 * @returns {Array}
 */
function convertToBarGraph(metadataData, valueData) {
    console.log("bar graph converter called " + metadataData);
    console.log(metadataData);
    var subjectIndex = 0, datanameIndex = 0, xaxisIndex = 0;



    $.each(valueData['columns'], function (index, column) {
        console.log("all " + column['title']);
        console.log(metadataData['subject']);
        console.log(metadataData['dataname']);
        console.log(metadataData['xaxis']);
        if (column['title'] == metadataData['subject']) {
            console.log("index 1");
            console.log(index);
            subjectIndex = index;
        }
        if (column['title'] == metadataData['dataname']) {
            console.log("index 2");
            datanameIndex = index;
        }

        if (metadataData['xaxis-process'] == 'false' && column['title'] == metadataData['xaxis-alternative']) {
            console.log("index 3");
            xaxisIndex = index;
        } else if (column['title'] == metadataData['xaxis']) {
            console.log("index 3");
            xaxisIndex = index;
        } else {
            console.log("no multiline metadata");
        }

    });

    var convertedData = getBarGraphMetaData(metadataData, valueData, xaxisIndex, subjectIndex, datanameIndex);
//    subject - (Installation,Manufacturing,Other)
//    dataname (column with raw data)
//    xaxis what to put in xaxis

    return convertedData;
}

function getBarGraphMetaData(componentMetaData, valueData, xaxisIndex, subjectIndex, datanameIndex) {
    var xaxis = componentMetaData['xaxis'];
    var title = componentMetaData['title'];
    var xaxisProcess = componentMetaData['xaxis-process'];
    if (xaxis == 'month' && xaxisProcess != 'false') {
        return _getMonthlyBarGraphMetaData(valueData, subjectIndex, xaxisIndex, datanameIndex, title)
    }
    if (xaxisProcess == 'false') {
        xaxis = componentMetaData['xaxis-alternative'];
        return _getNoAxixProcessBarGraphMetaData(valueData, subjectIndex, xaxisIndex, datanameIndex, title)
    }
    return categories;

}


function _getMonthlyBarGraphMetaData(valueData, subjectIndex, xaxisIndex, datanameIndex, title) {
    var subjects = [];
    var graphData = {};
    $.each(valueData['data'], function (index, dataArray) {
        var sub = dataArray[subjectIndex];
        console.log("throwing error for period "+dataArray[xaxisIndex]);
        if ($.inArray(sub, subjects) != -1) {
            graphData['' + sub + ''][Number(dataArray[xaxisIndex]) - 1] = Number(dataArray[datanameIndex]);
        } else {
            subjects.push(sub);
            graphData['' + sub + ''] = [null, null, null, null, null, null, null, null, null, null, null, null];
            graphData['' + sub + ''][Number(dataArray[xaxisIndex]) - 1] = Number(dataArray[datanameIndex]);
        }

    });

    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var processedGraphData = [];

    $.each(graphData, function (key, value) {
        console.log("dic name " + key);
        console.log("data val " + value);
        var t = {}
        t['name'] = key;
        t['data'] = value;
        processedGraphData.push(t);
    });

    console.log("final dataa");
    console.log(processedGraphData);
    return [processedGraphData, categories, title];
}

//generate multiline metadata for graph with no time period xaxis
function _getNoAxixProcessBarGraphMetaData(valueData, subjectIndex, xaxisIndex, datanameIndex, title) {
    var subjects = [];
    var graphData = {};

    var categories = [];
    var arryWithData = []; //array to be used by all subjects to initialize individial arrays
    $.each(valueData['data'], function (index, dataArray) {
        var sub = dataArray[subjectIndex];
        if ($.inArray(sub, categories) != -1) {
            // graphData['' + sub + ''][dataArray[xaxisIndex] - 1] = Number(dataArray[datanameIndex]);
        } else {
            categories.push(sub);
            arryWithData.push(null);
        }

    });

    $.each(valueData['data'], function (index, dataArray) {
        var sub = dataArray[subjectIndex];
        if ($.inArray(sub, subjects) != -1) {
            var subIndex = categories.indexOf(sub);
            graphData['' + sub + ''][subIndex-1] = Number(dataArray[datanameIndex]);
        } else {
            subjects.push(sub);
            graphData['' + sub + ''] = JSON.parse(JSON.stringify(arryWithData));
            var subIndex = categories.indexOf(sub);
            graphData['' + sub + ''][subIndex-1] = Number(dataArray[datanameIndex]);
        }

    });

    var processedGraphData = [];

    $.each(graphData, function (key, value) {
        var t = {}
        t['name'] = key;
        t['data'] = value;
        processedGraphData.push(t);
    });

    console.log("final dataa");
    console.log(processedGraphData);
    return [processedGraphData, categories, title];
}