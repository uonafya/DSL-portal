function drawMultiLineGraph(elementId, titlee, categoriee, serie) {
    console.log("drawinggggg");
    Highcharts.chart(elementId, {

        title: {
            text: titlee
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Values'
            }
        },

        xAxis: {
              categories: categoriee,
           // categories: categoriee,
            title: {
                text: 'Period'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

//        plotOptions: {
//            series: {
//                label: {
//                    connectorAllowed: false
//                },
//                pointStart: 2010
//            }
//        },

        series: serie,

        responsive: {
            rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
        }

    });
}