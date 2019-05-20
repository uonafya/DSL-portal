function drawPie(elementId, titlee, seriee,formatt) {    
    if(formatt==null){
        formatt='<b>{point.name}</b>: {point.percentage:.1f} %';
    }
    
    Highcharts.chart(elementId, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: titlee
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
//        tooltip: {
//            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//        }
        tooltip: {
            pointFormat: '<b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: formatt,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        colors: [
                '#F2784B',
                '#1BA39C',
                '#913D88'
            ],     
        series: seriee
    });
}


