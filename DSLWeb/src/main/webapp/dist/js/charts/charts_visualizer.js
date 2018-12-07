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

var yearlyParameters = {
    startYear: "",
    endYear: ""
};


var organisationUnit = {
    current_level: SETTING.orgisation_level[3],
    orgnuinit: "national"
};

DslGraph.prototype.drawGraph = function draw() {
    that = this;
    if (this.type == SETTING.graph_year_month && this.graphType == SETTING.graph_type[1]) {
        drawYearMonthGraph(that);
    } else if (this.type == SETTING.graph_yearly && this.graphType == SETTING.graph_type[1]) {
        drawYearlyGraph(that);
    } else if (this.type == SETTING.graph_yearly && this.graphType == SETTING.graph_type[0]) {
        drawPieChart(that);
    }

};


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
        position = monthPosition;
    } else if (that.type == SETTING.graph_yearly) {
        position = yearPosition;
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
    return dataAttributes;
}

function getGraphSeries(dataAttributes) {
    var serie = [{
            name: 'indicator_value',
            type: 'column',
            yAxis: 1,
            data: dataAttributes['indicator_average'],
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'cadre_count',
            type: 'spline',
            yAxis: 2,
            data: dataAttributes['cadre_count'],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'commodity_count',
            type: 'spline',
            data: dataAttributes['commodity_count'],
            tooltip: {
                valueSuffix: ' units'
            }
        }];
    return serie;
}
