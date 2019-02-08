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


    var convertedData = getMetaData(componentMetaData, xaxisIndex, subjectIndex, datanameIndex);
//    subject - (Installation,Manufacturing,Other)
//    dataname (column with raw data)
//    xaxis what to put in xaxis






    return convertedData;
}

function getMetaData(componentMetaData, xaxisIndex, subjectIndex, datanameIndex) {
    var xaxis = componentMetaData['xaxis'];
    var data = componentMetaData['data'];
    var title=componentMetaData['title'];
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