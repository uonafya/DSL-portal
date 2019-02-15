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
function convertToMultiLine(metadataData,valueData) {

    console.log("converter called " + metadataData);
    console.log(metadataData);
    var subjectIndex = 0, datanameIndex = 0, xaxisIndex = 0;



    $.each(valueData['columns'], function (index, column) {
        console.log("all "+column['title']);
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
        if (column['title'] == metadataData['xaxis']) {
            console.log("index 3");
            xaxisIndex = index;
        }


    });


    var convertedData = getMultilineMetaData(metadataData,valueData, xaxisIndex, subjectIndex, datanameIndex);
//    subject - (Installation,Manufacturing,Other)
//    dataname (column with raw data)
//    xaxis what to put in xaxis



    return convertedData;
}

function getMultilineMetaData(componentMetaData,valueData, xaxisIndex, subjectIndex, datanameIndex) {
    var xaxis = componentMetaData['xaxis'];
    var title=componentMetaData['title'];
    if (xaxis == 'month') {
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
        return [processedGraphData, categories,title];
    }

    return categories;

}