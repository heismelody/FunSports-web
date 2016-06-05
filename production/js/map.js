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
            if(response){
                var resJson = eval("([" + response + "])");
                var routePoints=new Array(resJson[0].pointnum);
                var map = new BMap.Map(document.getElementById('map'));    // 创建Map实例
                map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
                map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var i = 1;
                while(resJson[i]){
                    routePoints[i-1]=new BMap.Point(resJson[i].lat,resJson[i].lng);
                    i++;
                }

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