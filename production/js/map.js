/**
 * Created by tux on 16-5-20.
 */
$(document).ready(function () {
    //  google map //
    // var map;
    // function initMap() {
    //     map = new google.maps.Map(document.getElementById('map'), {
    //         center: {lat: -34.397, lng: 150.644},
    //         zoom: 8
    //     });
    // }
    // initMap();
});


$(document).ready(function (){

    // Split(['#map', '#echart'], {
    //     direction: 'vertical',
    //     sizes: [50, 50]
    // });

    $.ajax({
        type : "POST",
        url  : "php/table.php",
        data :{
            method : "queryuserroute"
        },
        success: function(response,status,hrx){
            if(response) {
                var resJson = eval("([" + response + "])");
                var routePoints = new Array(resJson[0].pointnum);

                var i = 1;
                var maxlat = resJson[1].lat;
                var minlat = resJson[1].lat;
                var maxlng = resJson[1].lng;
                var minlng = resJson[1].lng;
                var mapcenterLat = maxlat;
                var mapcenterLng = maxlng;
                while (resJson[i]) {
                    if (maxlat < resJson[i].lat) {
                        maxlat = resJson[i].lat;
                    }
                    if (minlat > resJson[i].lat) {
                        minlat = resJson[i].lat;
                    }
                    if (maxlng < resJson[i].lng) {
                        maxlng = resJson[i].lng;
                    }
                    if (minlng > resJson[i].lng) {
                        minlng = resJson[i].lng;
                    }
                    routePoints[i - 1] = new BMap.Point(resJson[i].lat, resJson[i].lng);
                    i++;
                }
                maxlat = parseFloat(maxlat);
                minlat = parseFloat(minlat);
                maxlng = parseFloat(maxlng);
                minlng = parseFloat(minlng);
                mapcenterLat = (maxlat + minlat) / 2;
                mapcenterLng = (maxlng + minlng) / 2;

                var map = new BMap.Map(document.getElementById('map'));    // 创建Map实例

                var view = map.getViewport(eval(routePoints));
                var mapZoom = view.zoom;
                var centerPoint = view.center;
                map.centerAndZoom(centerPoint, mapZoom);
                map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的

                var pt = new BMap.Point(116.417, 39.909);
                var myIcon = new BMap.Icon("images/start-icon.png", new BMap.Size(300, 157));
                var marker2 = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
                map.addOverlay(marker2);              // 将标注添加到地图中

                map.enableScrollWheelZoom(true);
                var polyline = new BMap.Polyline(routePoints, {
                    strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5
                });
                map.addOverlay(polyline);

                $('#echart').highcharts({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Wind speed during two days'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Wind speed (m/s)'
                        },
                        min: 0,
                        minorGridLineWidth: 0,
                        gridLineWidth: 0,
                        alternateGridColor: null

                    },
                    tooltip: {
                        valueSuffix: ' m/s',
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            marker: {
                                enabled: false
                            },
                            pointInterval: 3600000, // one hour
                            pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
                        }
                    },
                    series: [{
                        name: 'Hestavollane',
                        data: [4.3, 5.1, 4.3, 5.2, 5.4, 4.7, 3.5, 4.1, 5.6, 7.4, 6.9, 7.1,
                            7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4,
                            8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5,
                            7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3, 4.4, 4.2,
                            3.0, 3.0]

                    }, {
                        name: 'Voll',
                        data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0,
                            0.0, 0.4, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                            0.0, 0.6, 1.2, 1.7, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3,
                            3.0, 3.3, 4.8, 5.0, 4.8, 5.0, 3.2, 2.0, 0.9, 0.4, 0.3, 0.5, 0.4]
                    }]
                    ,
                    navigation: {
                        menuItemStyle: {
                            fontSize: '10px'
                        }
                    }
                });
            }
        }
    });

});