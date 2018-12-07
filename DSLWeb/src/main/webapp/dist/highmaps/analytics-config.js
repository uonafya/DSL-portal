function loadMap(mtype, mapData){
    if(mtype=='county'){
        mapGeo = '../../dist/maps/county.geojson';
    }else if(mtype=='country'){
        mapGeo = '../../dist/maps/kenya.geojson';
    }else if(mtype=='constituency'){
        mapGeo = '../../dist/maps/constituency.geojson';
    }else if(mtype=='ward'){
        mapGeo = '../../dist/maps/wards.geojson';
    }else{
        $('#gismagic').html('<div class ="alert alert-danger"><strong>Map Error</strong><br/>Failed to load this graph. Wrong map type picked. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        return;
    }
    
    var thetype = mtype.charAt(0).toUpperCase() + mtype.slice(1);
    if(mapData === '' || mapData === [] || mapData ===  null){
        var seriesData = 'none';
    }else{
        var seriesData = [{
                data: mapData,
                keys: ['AREA_CODE', 'value'],
                joinBy: 'AREA_CODE',
                name: thetype,
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.properties.AREA_CODE}'
                }
            }];
    }
    
    $.getJSON(mapGeo, function (geojson) {
        // Initiate the chart
        Highcharts.mapChart('gismagic', {
            chart: {
                map: geojson
            },
            title: {
                text: thetype
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            colorAxis: {
                tickPixelInterval: 100
            },
            series: [{
                data: mapData,
                keys: ['AREA_CODE', 'value'],
                joinBy: 'AREA_CODE',
                name: 'County',
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.properties.AREA_NAME}'
                }
            }]
        });
    });
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


