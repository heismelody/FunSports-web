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
            if(response){
                var resJson = eval("([" + response + "])");
                var routePoints=new Array(resJson[0].pointnum);

                // var i = 1;
                // var maxlat = resJson[1].lat;
                // var minlat = resJson[1].lat;
                // var maxlng = resJson[1].lng;
                // var minlng = resJson[1].lng;
                // var mapcenterLat = maxlat;
                // var mapcenterLng = maxlng;
                // while(resJson[i]){
                //     if(maxlat < resJson[i].lat){maxlat = resJson[i].lat;}
                //     if(minlat > resJson[i].lat){minlat = resJson[i].lat;}
                //     if(maxlng < resJson[i].lng){maxlng = resJson[i].lng;}
                //     if(minlng > resJson[i].lng){minlng = resJson[i].lng;}
                //     routePoints[i-1]=new BMap.Point(resJson[i].lat,resJson[i].lng);
                //     i++;
                // }
                // maxlat = parseFloat(maxlat);
                // minlat = parseFloat(minlat);
                // maxlng = parseFloat(maxlng);
                // minlng = parseFloat(minlng);
                // mapcenterLat = (maxlat+minlat)/2;
                // mapcenterLng = (maxlng+minlng)/2;

                var map = new BMap.Map(document.getElementById('map'));    // 创建Map实例

                var view = map.getViewport(eval(routePoints));
                var mapZoom = view.zoom;
                var centerPoint = view.center;
                map.centerAndZoom(centerPoint,mapZoom);
                map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的

                var pt = new BMap.Point(116.417, 39.909);
                var myIcon = new BMap.Icon("images/start-icon.png", new BMap.Size(300,157));
                var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
                map.addOverlay(marker2);              // 将标注添加到地图中

                map.enableScrollWheelZoom(true);
                var polyline = new BMap.Polyline(routePoints, {
                    strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5
                });
                map.addOverlay(polyline);

                $('#echart').highcharts({

                    data: resJson,

                    title: {
                        text: 'User Route'
                    },

                    // xAxis: {
                    //     tickInterval: 7 * 24 * 3600 * 1000, // one week
                    //     tickWidth: 0,
                    //     gridLineWidth: 1,
                    //     labels: {
                    //         align: 'left',
                    //         x: 3,
                    //         y: -3
                    //     }
                    // },

                    // yAxis: [{ // left y axis
                    //     title: {
                    //         text: null
                    //     },
                    //     labels: {
                    //         align: 'left',
                    //         x: 3,
                    //         y: 16,
                    //         format: '{value:.,0f}'
                    //     },
                    //     showFirstLabel: false
                    // }, { // right y axis
                    //     linkedTo: 0,
                    //     gridLineWidth: 0,
                    //     opposite: true,
                    //     title: {
                    //         text: null
                    //     },
                    //     labels: {
                    //         align: 'right',
                    //         x: -3,
                    //         y: 16,
                    //         format: '{value:.,0f}'
                    //     },
                    //     showFirstLabel: false
                    // }],
                    //
                    // legend: {
                    //     align: 'left',
                    //     verticalAlign: 'top',
                    //     y: 20,
                    //     floating: true,
                    //     borderWidth: 0
                    // },

                    tooltip: {
                        shared: true,
                        crosshairs: true
                    }

                    //
                    // series: [{
                    //     name: 'All visits',
                    //     lineWidth: 4,
                    //     marker: {
                    //         radius: 4
                    //     }
                    // }, {
                    //     name: 'New visitors'
                    // }]
                });
            }
        }
    });

});