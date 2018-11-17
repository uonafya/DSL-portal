function DslGraph() {
    type = '';
    graphData = '';
    elementId = '';
    indicator = '';
}

DslGraph.prototype.drawGraph = function draw() {
    that = this;
    if (SETTING.graph_year_month == this.type) {
        drawYearMonthGraph(that);
    }
};

function drawYearMonthGraph(that) {
    console.log(that.graphData);
    var elementId = that.elementId;
    var titlee = that.indicator + ' - 2015';
    var categoriee = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var dataAttributes = {};
    var monthPosition = 0;
    var yearPosition = '';
    var year = '';
    var indicatorName = that.indicator;
    var headerPositionMapping = {};
    $.each(that.graphData['columns'], function (index, objValue) {

        if (!(objValue['title'] == 'month' || objValue['title'] == 'year' || objValue['title'] == 'indicator_name')) {
            console.log("De val " + objValue['title']);
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

    console.log("Month position " + monthPosition);
    $.each(that.graphData['data'], function (index, objValue) {
        //var ward=new Ward(objValue.name);
        year = objValue[yearPosition];
        $.each(objValue, function (dataRowIndex, dataRow) {
            try {
                var valueName = headerPositionMapping[dataRowIndex];
                if (dataRow.trim().length != 0)
                    dataAttributes[valueName].splice(objValue[monthPosition] - 1, 1, Number(dataRow));
            } catch (err) {

            }

        });

    });
    console.log([dataAttributes['indicator_average']]);
    var serie = [{
            name: 'indicator_value',
            type: 'column',
            yAxis: 1,
            data: dataAttributes['indicator_average'],
            tooltip: {
                valueSuffix: ' mm'
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
                valueSuffix: ' mb'
            }

        }, {
            name: 'commodity_count',
            type: 'spline',
            data: dataAttributes['commodity_count'],
            tooltip: {
                valueSuffix: ' °C'
            }
        }];



    drawMultipleAxes('test-graph', indicatorName + "-" + year, categoriee, serie);
}

function displayHivStatus() {
    var data = [{
            hiv_positive_f: 45, HIV_negative_f: 50, HIV_unknown_status_f: 60, hiv_positive_m: 57, HIV_negative_m: 68, HIV_unknown_status_m: 90
        }];
    $.each(data, function (index, objValue) {
        //var ward=new Ward(objValue.name);
        var elementId = "hiv_status_chart";
        var categoriee = ['ART', 'Antenatal', 'Family Planning']
        var titlee = 'Indicators - commodity - 2017';
        var serie = [{
                name: 'Indicator Rate',
                data: [objValue.hiv_positive_f, objValue.HIV_negative_f, objValue.HIV_unknown_status_f]
            }, {
                name: 'Commodity Supplied',
                data: [objValue.hiv_positive_m, objValue.HIV_negative_m, objValue.HIV_unknown_status_m]
            }
        ];
        stackedBar(elementId, titlee, categoriee, serie);
    });
}


function displayArtStatus() {

    var data = [{
            hiv_positive_f: 45, HIV_negative_f: 50, HIV_unknown_status_f: 60, hiv_positive_m: 37, HIV_negative_m: 28, HIV_unknown_status_m: 14
        }];
    $.each(data, function (index, objValue) {
        //var ward=new Ward(objValue.name);
        var elementId = "art_status_chart";
        var categoriee = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var titlee = 'TB curative Rate - 2017';
        var serie = [{
                name: 'Indicator Rate',
                data: [objValue.hiv_positive_f, objValue.HIV_negative_f, objValue.HIV_unknown_status_f]
            }, {
                name: 'Human Resource',
                data: [objValue.hiv_positive_m, objValue.HIV_negative_m, objValue.HIV_unknown_status_m]
            }
        ];
        stackedBar(elementId, titlee, categoriee, serie);
    });
}



function displayArttStatus() {

    var data = [{
            hiv_positive_f: 45, HIV_negative_f: 50, HIV_unknown_status_f: 60, hiv_positive_m: 37, HIV_negative_m: 28, HIV_unknown_status_m: 14,
            hiv_positive_mm: 57, HIV_negative_mm: 68, HIV_unknown_status_mm: 90
        }];
    $.each(data, function (index, objValue) {
        //var ward=new Ward(objValue.name);
        var elementId = "artt_status_chart";
        var categoriee = ['ART', 'Antenatal', 'Family Planning']
        var titlee = 'Indicators - human resource - commodity - 2017';
        var serie = [{
                name: 'Indicator Rate',
                data: [objValue.hiv_positive_f, objValue.HIV_negative_f, objValue.HIV_unknown_status_f]
            }, {
                name: 'Human Resource',
                data: [objValue.hiv_positive_m, objValue.HIV_negative_m, objValue.HIV_unknown_status_m]
            }, {
                name: 'Commodity Supplied',
                data: [objValue.hiv_positive_mm, objValue.HIV_negative_mm, objValue.HIV_unknown_status_mm]
            }
        ];
        stackedBar(elementId, titlee, categoriee, serie);
    });
}

