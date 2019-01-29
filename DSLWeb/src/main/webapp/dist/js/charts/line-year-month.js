function drawLineYearMonth(elementId, titlee, categoriee, serie) {
    Highcharts.chart(elementId, {
        xAxis: [{
                tickInterval: 24 * 3600 * 1000 * 28,
                type: "datetime",
                dateTimeLabelFormats: {
                    day: '%d-%b',
                    month: '%b-%Y',
                    year: '%Y'
                },
                labels: {
                    rotation: 300
                }
            }],
        series: [{
                data: [{
                        name: "January",
                        x: 1451624399999,
                        y: 52
                    }, {
                        name: "February",
                        x: 1454302799999,
                        y: 60
                    }]
            }

        ]
    });
}