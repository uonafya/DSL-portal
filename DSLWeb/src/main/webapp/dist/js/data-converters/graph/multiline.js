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
function convertToMultiLine(metadataData, valueData) {
    console.log("converter called ");
    var subjectIndex = 0, datanameIndex = 0, xaxisIndex = 0;

    $.each(valueData['columns'], function (index, column) {
        if (column['title'] == metadataData['subject']) {
            subjectIndex = index;
        }
        if (column['title'] == metadataData['dataname']) {
            console.log("index 2");
            datanameIndex = index;
        }
        if (metadataData['xaxis-process'] == 'false' && column['title'] == metadataData['xaxis-alternative']) {
            xaxisIndex = index;
        } else if (column['title'] == metadataData['xaxis']) {
            xaxisIndex = index;
        } else {
            console.log("no multiline metadata");
        }
    });

    var convertedData = getMultilineMetaData(metadataData, valueData, xaxisIndex, subjectIndex, datanameIndex);
//    subject - (Installation,Manufacturing,Other)
//    dataname (column with raw data)
//    xaxis what to put in xaxis

    return convertedData;
}

function getMultilineMetaData(componentMetaData, valueData, xaxisIndex, subjectIndex, datanameIndex) {
    var xaxis = componentMetaData['xaxis'];
    var title = componentMetaData['title'];
    var xaxisProcess = componentMetaData['xaxis-process'];
    if (xaxis == 'month' && xaxisProcess != 'false') {
        return _getMonthlyMultilineMetaData(valueData, subjectIndex, xaxisIndex, datanameIndex, title)
    }
    if (xaxis == 'year' && xaxisProcess != 'false') {
        console.log("year here");
        return _getYearlyBarGraphMetaData(componentMetaData, valueData, subjectIndex, xaxisIndex, datanameIndex, title);
    }
    if (xaxisProcess == 'false') {
        xaxis = componentMetaData['xaxis-alternative'];
        return _getNoAxixProcessMultilineMetaData(valueData, subjectIndex, xaxisIndex, datanameIndex, title)
    }
    return categories; //if error thrown here, check if name was monthly instead of month, or yearly instead of year

}


function _getYearlyMultilineGraphMetaData(metadataData, valueData, subjectIndex, xaxisIndex, datanameIndex, title) {

    console.log("process line chart yearly");
    var categoriee = [];
    var initDataValues = [];
    var yearPositionMapper = {};

    var x;
    var count = 0;
    for (x = yearlyParameters.startYear; x <= yearlyParameters.endYear; x++) {
        categoriee.push(x.toString());
        initDataValues.push("0");

        yearPositionMapper[x] = count;
        count = count + 1;
    }

    var dataAttributess = {};
    var yearPosition = '';
    var headerPositionMapping = {};

    $.each(valueData['columns'], function (index, objValue) {
        if (!(objValue['title'] == 'year' || objValue['title'] == metadataData['subject'])) {
            dataAttributess[objValue['title']] = initDataValues.slice(0); //clone array to avoid same object reference
            headerPositionMapping[index] = objValue['title'];
        }
        if (objValue['title'] == 'year') {
            yearPosition = index;
        }

    });

    $.each(valueData['data'], function (index, individualArrayWithData) {
        $.each(individualArrayWithData, function (dataRowIndex, dataRow) {
            var yr = individualArrayWithData[yearPosition];
            var yrIndex = yearPositionMapper[yr];
            try {
                var valueName = headerPositionMapping[dataRowIndex];
                if (dataRow.trim().length != 0) {
                    dataAttributess[valueName].splice(yrIndex, 1, Number(dataRow));
                }
            } catch (err) {

            }

        });
    });

    var processedGraphData = [];
    //make into a highcharts format
    $.each(dataAttributess, function (key, value) {
        console.log("dic name " + key);
        console.log("data val " + value);
        var t = {}
        t['name'] = key;
        t['data'] = value;
        processedGraphData.push(t);
    });

    return [processedGraphData, categoriee, title];
}



function _getMonthlyMultilineMetaData(valueData, subjectIndex, xaxisIndex, datanameIndex, title) {
    var subjects = [];
    var graphData = {};
    $.each(valueData['data'], function (index, dataArray) {
        var sub = dataArray[subjectIndex];
        if ($.inArray(sub, subjects) != -1) {
            graphData['' + sub + ''][dataArray[xaxisIndex] - 1] = Number(dataArray[datanameIndex]);
        } else {
            subjects.push(sub);
            graphData['' + sub + ''] = [null, null, null, null, null, null, null, null, null, null, null, null];
            graphData['' + sub + ''][dataArray[xaxisIndex] - 1] = Number(dataArray[datanameIndex]);
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
function _getNoAxixProcessMultilineMetaData(valueData, subjectIndex, xaxisIndex, datanameIndex, title) {
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
            graphData['' + sub + ''][subIndex] = Number(dataArray[datanameIndex]);
        } else {
            subjects.push(sub);
            graphData['' + sub + ''] = JSON.parse(JSON.stringify(arryWithData));
            var subIndex = categories.indexOf(sub);
            graphData['' + sub + ''][subIndex] = Number(dataArray[datanameIndex]);
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