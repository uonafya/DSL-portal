function DslGraph() {
    var type = '';
    var graphData = '';
    var elementId = '';
    var indicator = '';
    var fetchKemsaData = false;
    var fetchIhrisData = false;
    var selectedPeriodType = "monthly"; //currently either yearly or monthly string is set here
    var graphType; // pie chart, bargraph, multiplex etc
}

var yearMonthParameters = {
    currentYear: 2015
};

window.yearlyParameters = {
    startYear: "",
    endYear: ""
};


var organisationUnit = {
    current_level: SETTING.orgisation_level[3],
    orgnuinit: "national"
};

DslGraph.prototype.drawGraph = function draw() {
    that = this;
    if (this.type == SETTING.graph_year_month && this.graphType == SETTING.graph_type[0]) { //monthly pie chart
        drawMontlyPieChart(that);
        // drawYearMonthGraph(that);
    } else if (this.type == SETTING.graph_year_month && this.graphType == SETTING.graph_type[5]) { //table
        drawTable(that);
    } else if (this.type == SETTING.graph_yearly && this.graphType == SETTING.graph_type[5]) { //table
        drawTable(that);
    } else if (this.type == SETTING.graph_yearly && this.graphType == SETTING.graph_type[1]) { //multiplex
        drawYearlyGraph(that);
    } else if (this.type == SETTING.graph_yearly && this.graphType == SETTING.graph_type[0]) { //yearly pie chart
        drawPieChart(that);
    } else if (this.type == SETTING.graph_year_month && this.graphType == SETTING.graph_type[4]) {  //bar graph
        var metadataData = getMetadataObject(that.graphData);
        var convertedData = convertToBarGraph(metadataData, that.graphData);
        drawBarChart(that.elementId, convertedData[2], convertedData[1], convertedData[0]);

    } else if (this.type == SETTING.graph_year_month && this.graphType == SETTING.graph_type[6]) { //monthly multiline
        var metadataData = getMetadataObject(that.graphData);
        var convertedData = convertToMultiLine(metadataData, that.graphData);
        drawMultiLineGraph(that.elementId, convertedData[2], convertedData[1], convertedData[0]);
        
    }  else if (this.type == SETTING.graph_yearly && this.graphType == SETTING.graph_type[6]) { //yearly multiline
        var metadataData = getMetadataObject(that.graphData);
        var convertedData = convertToMultiLine(metadataData, that.graphData);
        drawMultiLineGraph(that.elementId, convertedData[2], convertedData[1], convertedData[0]);
        
    } else if (this.type == SETTING.graph_yearly && this.graphType == SETTING.graph_type[4]) {
        var metadataData = getMetadataObject(that.graphData);
        var convertedData = convertToBarGraph(metadataData, that.graphData);
        drawBarChart(that.elementId, convertedData[2], convertedData[1], convertedData[0]);
    }
};

//gets the metadata object part from the received data
function getMetadataObject(data) {
    var val = null;
    $.each(data.components, function (index, value) {
        // sm md lg
        console.log("check components");
        console.log(data.components);
        if ('graph-type' in value) {
            console.log("graph iko");
            console.log(value);
            val = value;
            return;
        }
    });
    return val;
}

function drawPieChart(that) {
    console.log("data outut");
    console.log(that.graphData);

    var data = [];
    $.each(that.graphData['data'], function (index, objValue) {
        var dt = {};
        dt['name'] = objValue[1];
        dt['y'] = Number(objValue[0]);
        data.push(dt);
    });
    console.log(data);
    var seriee = [{
            name: 'Cadre',
            colorByPoint: true,
            data: data
        }];
    drawPie(that.elementId, that.indicator, seriee);
}


function drawBarGraph(that) {
    console.log("drawing bar graph");
    //var elementId = "test-graph1";
    var elementId = that.elementId;
    var titlee = that.indicator + ' - ' + yearMonthParameters.currentYear;
    var categoriee = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var dataAttributes = {};
    var monthPosition = 0;
    var yearPosition = '';
    var indicatorName = that.indicator;
    var headerPositionMapping = {};
    $.each(that.graphData['columns'], function (index, objValue) {
        if (!(objValue['title'] == 'month' || objValue['title'] == 'year' || objValue['title'] == 'indicator_name')) {
            dataAttributes[objValue['title']] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            headerPositionMapping[index] = objValue['title'];
        }
        if (objValue['title'] == 'month') {
            monthPosition = index;
        }
        if (objValue['title'] == 'year') {
            yearPosition = index;
        }
    });
    dataAttributes = getDataValuesForChartDisplay(that, yearPosition, monthPosition, headerPositionMapping, dataAttributes);
    var serie = getBarGraphSeries(dataAttributes);

    console.log("-------------------");
    console.log(serie);

    drawBarChart(elementId, indicatorName + "-" + yearMonthParameters.currentYear, categoriee, serie);
}



function drawYearlyGraph(that) {
    var elementId = that.elementId;
    var titlee = that.indicator + ' - ' + yearlyParameters.startYear + " - " + yearlyParameters.endYear;

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
    $.each(that.graphData['columns'], function (index, objValue) {

        if (!(objValue['title'] == 'year' || objValue['title'] == 'indicator_name')) {
            dataAttributess[objValue['title']] = initDataValues.slice(0); //clone array to avoid same object reference
            headerPositionMapping[index] = objValue['title'];
        }
        if (objValue['title'] == 'year') {
            yearPosition = index;
        }

    });

    dataAttributess = getYearlyDataValuesForChartDisplay(that, yearPosition, yearPositionMapper, headerPositionMapping, dataAttributess);
    console.log("The attributes");
    console.log(dataAttributess);
    var serie = getGraphSeries(dataAttributess);

    drawMultipleAxes(elementId, titlee, categoriee, serie);
}


function drawYearMonthGraph(that) {
    //var elementId = "test-graph1";
    var elementId = that.elementId;
    var titlee = that.indicator + ' - ' + yearMonthParameters.currentYear;
    var categoriee = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var dataAttributes = {};
    var monthPosition = 0;
    var yearPosition = '';
    var indicatorName = that.indicator;
    var headerPositionMapping = {};
    $.each(that.graphData['columns'], function (index, objValue) {

        if (!(objValue['title'] == 'month' || objValue['title'] == 'year' || objValue['title'] == 'indicator_name')) {
            dataAttributes[objValue['title']] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            headerPositionMapping[index] = objValue['title'];
        }
        if (objValue['title'] == 'month') {
            monthPosition = index;
        }
        if (objValue['title'] == 'year') {
            yearPosition = index;
        }

    });
    dataAttributes = getDataValuesForChartDisplay(that, yearPosition, monthPosition, headerPositionMapping, dataAttributes);
    var serie = getGraphSeries(dataAttributes);
    console.log("seriee " + serie);
    console.log(serie);
    drawMultipleAxes(elementId, indicatorName + "-" + yearMonthParameters.currentYear, categoriee, serie);
}


function getYearlyDataValuesForChartDisplay(that, yearPosition, yearPositionMapper, headerPositionMapping, dataAttributes) {
    var position = yearPosition;
    $.each(that.graphData['data'], function (index, individualArrayWithData) {

        $.each(individualArrayWithData, function (dataRowIndex, dataRow) {
            var yr = individualArrayWithData[position];
            var yrIndex = yearPositionMapper[yr];
            try {
                var valueName = headerPositionMapping[dataRowIndex];
                if (dataRow.trim().length != 0) {
                    dataAttributes[valueName].splice(yrIndex, 1, Number(dataRow));
                }
            } catch (err) {

            }

        });
    });
    return dataAttributes;
}


function getDataValuesForChartDisplay(that, yearPosition, monthPosition, headerPositionMapping, dataAttributes) {
    var position = "";
    if (that.type == SETTING.graph_year_month) {
        position = Number(monthPosition);
    } else if (that.type == SETTING.graph_yearly) {
        position = Number(yearPosition);
    }
    $.each(that.graphData['data'], function (index, individualArrayWithData) {
        var year = individualArrayWithData[yearPosition];
        $.each(individualArrayWithData, function (dataRowIndex, dataRow) {

            try {

                var valueName = headerPositionMapping[dataRowIndex];
                if (dataRow.trim().length != 0)
                    dataAttributes[valueName].splice(individualArrayWithData[position] - 1, 1, Number(dataRow));
            } catch (err) {
            }

        });

    });
    console.log("data row");
    console.log(dataAttributes);
    return dataAttributes;
}



//        series: [{
//                type: 'column',
//                colorByPoint: true,
//                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
//                showInLegend: false
//            }]



function drawMontlyPieChart(that) {
    var metadataData = getMetadataObject(that.graphData);
    var processMonths = metadataData['xaxis-process'];
    var dissagregatedSubjects = metadataData['dissagregated-subjects'];
    var dat = {};
    dat['data'] = that.graphData['data'];
    dat['columns'] = that.graphData['columns'];
    console.log("the pie data");
    console.log(that.graphData['components']);
    console.log("the pie data data");
    console.log(dat);
    var componts = null;
    var title = "";
    $.each(that.graphData['components'], function (index, value) {
        console.log("check components");
        console.log(value);
        if ('graph-type' in value) {
            componts = value;
            title = value['title'];
        }
    });

    var pieCharts = convertToPieChart(componts, dat, 2);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $("#" + that.elementId).empty();
    $.each(pieCharts, function (index, chart) {
        if (processMonths == 'false') { //do not split by month, draw only one pie chart
            drawPie(that.elementId, title, [{data: chart}]);
            return false;
        }

        var componentId = makeid();
        $("#" + that.elementId).append("<div class='col-sm-6 col-lg-6 col-xm-12' style='margin-bottom: 5px;' id='" + componentId + "'></div>");

        if (dissagregatedSubjects == 'false') {
            drawPie(componentId, title + " ( month - " + months[index] + " )", [{data: chart}], '<b>{point.name}</b>: {point.y:.2f}');
        } else {
            drawPie(componentId, title + " ( month - " + months[index] + " )", [{data: chart}]);
        }
    });
}


function drawTable(that) {
    var metadataData = getMetadataObject(that.graphData);
    var processMonths = metadataData['xaxis-process'];
    var dissagregatedSubjects = metadataData['dissagregated-subjects'];
    $("#" + that.elementId).empty();
    console.log("data table data ");
    var dat = {};
    dat['data'] = that.graphData['data'];
    dat['columns'] = that.graphData['columns'];
    var componts = null;
    var title = "";
    console.log(dat);
    $.each(that.graphData['components'], function (index, value) {
        console.log("check components");
        console.log(value);
        if ('graph-type' in value) {
            componts = value;
            title = value['title'];
        }
    });
    drawDataTable(that.elementId, dat, title);

}