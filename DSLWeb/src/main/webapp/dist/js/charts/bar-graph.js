function drawBarChart(elementId, titlee, categoriee, serie) {
    var chart = Highcharts.chart(elementId, {

        title: {
            text: titlee
        },

        subtitle: {
//            text: 'Plain'
        },

        xAxis: {
            //  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            categories: categoriee
        },

//        series: [{
//                type: 'column',
//                colorByPoint: true,
//                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
//                showInLegend: false
//            }]
//        
        series: serie

    });
}