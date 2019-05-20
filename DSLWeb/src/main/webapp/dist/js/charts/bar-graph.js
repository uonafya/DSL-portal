function drawBarChart(elementId, titlee, categoriee, serie) {
    var chart = Highcharts.chart(elementId, {

        chart: {
            type: 'column'
        },
        title: {
            text: titlee
        },

        subtitle: {
//            text: 'Plain'
        },
        legend: {
            enabled: true
        },
        xAxis: {
            //  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            categories: categoriee,
            title: {
                text: 'Period'
            }
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
//        series: [{
//                type: 'column',
//                colorByPoint: true,
//                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
//                showInLegend: false
//            }]
//        
        colors: [
                '#F2784B',
                '#1BA39C',
                '#913D88',
                '#4d79ff',
                '#80ff00',
                '#ff8000',
                '#00ffff',
                '#ff4000'
            ],     
        series: serie

    });
}

//function drawBarChart(elementId, titlee, categoriee, serie) {
//    var chart = Highcharts.chart(elementId, {
//        chart: {
//            type: 'column'
//        },
//        title: {
//            text: titlee
//        },
//        subtitle: {
//            text: ''
//        },
//        xAxis: {
//            type: 'category',
//            labels: {
//                rotation: -45,
//                style: {
//                    fontSize: '13px',
//                    fontFamily: 'Verdana, sans-serif'
//                }
//            }
//        },
//        yAxis: {
//            min: 0,
//            title: {
//                text: 'Value'
//            }
//        },
//        legend: {
//            enabled: false
//        },
//        tooltip: {
////        pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
//        },
//        series: [{
//
//                data: serie,
//                dataLabels: {
//                    enabled: true,
//                    rotation: -90,
//                    color: '#FFFFFF',
//                    align: 'right',
//                    format: '{point.y:.1f}', // one decimal
//                    y: 10, // 10 pixels down from the top
//                    style: {
//                        fontSize: '13px',
//                        fontFamily: 'Verdana, sans-serif'
//                    }
//                }
//            }]
//    });
//}