function drawMultipleAxes(elementId, titlee, categoriee, serie) {
    Highcharts.chart(elementId, {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: titlee
        },
//        subtitle: {
//            text: 'Source: WorldClimate.com'
//        },
        xAxis: [{
                categories: categoriee,
                crosshair: true
            }],
        yAxis: [{// Primary yAxis
                labels: {
                    format: '{value}°C',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'commodity_count',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, {// Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'indicator_average',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} mm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }

            }, {// Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'cadre_count',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value} mb',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
        },
        series: serie
    });
}