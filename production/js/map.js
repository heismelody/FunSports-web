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
    $.ajax({
        type : "POST",
        url  : "php/table.php",
        data :{
            method : "queryuserroute"
        },
        success: function(response,status,hrx){
            if(response) {
                var map = new BMap.Map(document.getElementById('map'));
                var resJson = eval("([" + response + "])");
                var routePoints = new Array(resJson[0].pointnum);
                var routeDistanceFromLast = new Array(resJson[0].pointnum-1);
                var routeRequestStr = "";

                var i = 1;
                while (resJson[i]) {
                    routePoints[i - 1] = new BMap.Point(resJson[i].lat, resJson[i].lng);
                    if(i > 1){
                        routeDistanceFromLast[i-2] = map.getDistance(routePoints[i-1],routePoints[i-2]).toFixed(2);
                    }
                    if(i != (resJson[0].pointnum)){
                        routeRequestStr += resJson[i].lng+","+resJson[i].lat+"|";
                    }else {
                        routeRequestStr += resJson[i].lng+","+resJson[i].lat;
                    }
                    i++;
                }

                var view = map.getViewport(eval(routePoints));
                var mapZoom = view.zoom;
                var centerPoint = view.center;
                map.centerAndZoom(centerPoint, mapZoom);
                map.setCurrentCity("北京");          // 设置地图显示的城市,此项是必须设置的
                map.enableScrollWheelZoom(true);

                var polyline = new BMap.Polyline(routePoints, {
                    strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5
                });
                map.addOverlay(polyline);


                var endpoint = new BMap.Point(resJson[resJson[0].pointnum].lat, resJson[resJson[0].pointnum].lng);
                var startpoint = new BMap.Point(resJson[1].lat, resJson[1].lng);
                var point = new BMap.Point(116.417, 39.909);
                var starticon = new BMap.Icon("/main/production/images/start.png", new BMap.Size(24,24));
                var endicon = new BMap.Icon("/main/production/images/end.png", new BMap.Size(24,24));
                var processicon = new BMap.Icon("/main/production/images/process.png", new BMap.Size(24,24));
                var startmarker = new BMap.Marker(startpoint,{icon:starticon});
                var endmarker = new BMap.Marker(endpoint,{icon:endicon});
                map.addOverlay(startmarker);
                map.addOverlay(endmarker);


                $.ajax({
                    type: 'GET',
                    url: 'https://maps.googleapis.com/maps/api/elevation/json',

                    // The 'contentType' property sets the 'Content-Type' header.
                    // The JQuery default for this property is
                    // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
                    // a preflight. If you set this value to anything other than
                    // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
                    // you will trigger a preflight request.
                    contentType: 'text/plain',

                    xhrFields: {
                        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                        // This can be used to set the 'withCredentials' property.
                        // Set the value to 'true' if you'd like to pass cookies to the server.
                        // If this is enabled, your server must respond with the header
                        // 'Access-Control-Allow-Credentials: true'.
                        withCredentials: false
                    },

                    headers: {
                        // Set any custom headers here.
                        // If you set any non-simple headers, your server must include these
                        // headers in the 'Access-Control-Allow-Headers' response header.
                    },
                    data:
                        "locations="+routeRequestStr
                    ,
                    success: function(response, status, hrx) {
                        var i = 0;
                        var routeElevation = new Array(resJson[0].pointnum);
                        var routeEleXY = new Array(resJson[0].pointnum);
                        var routeDisFromStart = new Array(resJson[0].pointnum);


                        while (i < resJson[0].pointnum) {
                            if(i == 0){
                                routeDisFromStart[i] = 0;
                            }else {
                                routeDisFromStart[i] = parseInt(routeDisFromStart[i-1]) + parseInt(routeDistanceFromLast[i-1]);
                            }
                            routeElevation[i] = response.results[i].elevation;
                            routeEleXY[i] = [routeDisFromStart[i],routeElevation[i]];
                            i++;
                        }

                        $('#echart').highcharts({
                            chart: {
                                type: 'spline'
                            },
                            title: {
                                text: ' '
                            },
                            xAxis: {
                                title: {
                                    text: 'Distance (m)'
                                },
                                type: 'liner'
                            },
                            yAxis: {
                                title: {
                                    text: 'Elevation (m)'
                                },
                                min: 0,
                                minorGridLineWidth: 0,
                                gridLineWidth: 0
                            },
                            tooltip: {
                                valueSuffix: ' m',
                                crosshairs: true,
                                shared: true,
                                hideDelay:0
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
                                    pointStart: 0
                                }
                            },
                            series: [{
                                name: 'Elevation',
                                data: routeEleXY
                            }],
                            labels: {                  //图表标签
                                exporting: {
                                    enabled: false  //设置导出按钮不可用
                                }
                            },
                            exporting: { enabled: false }

                        });
                    },
                    error: function() {
                        // Here's where you handle an error response.
                        // Note that if the error was due to a CORS issue,
                        // this function will still fire, but there won't be any additional
                        // information about the error.
                    }
                });
            }
        }
    });


});