/**
 * Created by tux on 16-5-20.
 */

//gooogle map custome
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

    // 百度地图API功能
    var map = new BMap.Map(document.getElementById('map'));    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
});


$(document).ready(function (){

    var myChart = echarts.init(document.getElementById('echart'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            },
            formatter: function (params) {
                return params[2].name + '<br />' + params[2].value;
            }
        },
        legend: {
            data:['销量']
        },
        xAxis: {
            type: 'category',
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    // $.get('data/asset/data/confidence-band.json', function (data) {
    //     myChart.hideLoading();
    //
    //     var base = -data.reduce(function (min, val) {
    //         return Math.floor(Math.min(min, val.l));
    //     }, Infinity);
    //     myChart.setOption(option = {
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 animation: false
    //             },
    //             formatter: function (params) {
    //                 return params[2].name + '<br />' + params[2].value;
    //             }
    //         },
    //         grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '3%',
    //             containLabel: true
    //         },
    //         xAxis: {
    //             type: 'category',
    //             data: data.map(function (item) {
    //                 return item.date;
    //             }),
    //             axisLabel: {
    //                 formatter: function (value, idx) {
    //                     var date = new Date(value);
    //                     return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
    //                 }
    //             },
    //             splitLine: {
    //                 show: false
    //             },
    //             boundaryGap: false
    //         },
    //         yAxis: {
    //             axisLabel: {
    //                 formatter: function (val) {
    //                     return (val - base) * 100 + '%';
    //                 }
    //             },
    //             splitNumber: 3,
    //             splitLine: {
    //                 show: false
    //             }
    //         },
    //         series: [{
    //             name: 'L',
    //             type: 'line',
    //             data: data.map(function (item) {
    //                 return item.l + base;
    //             }),
    //             lineStyle: {
    //                 normal: {
    //                     opacity: 0
    //                 }
    //             },
    //             stack: 'confidence-band',
    //             symbol: 'none'
    //         }, {
    //             name: 'U',
    //             type: 'line',
    //             data: data.map(function (item) {
    //                 return item.u - item.l;
    //             }),
    //             lineStyle: {
    //                 normal: {
    //                     opacity: 0
    //                 }
    //             },
    //             areaStyle: {
    //                 normal: {
    //                     color: '#ccc'
    //                 }
    //             },
    //             stack: 'confidence-band',
    //             symbol: 'none'
    //         }, {
    //             type: 'line',
    //             data: data.map(function (item) {
    //                 return item.value + base;
    //             }),
    //             hoverAnimation: false,
    //             symbolSize: 6,
    //             itemStyle: {
    //                 normal: {
    //                     color: '#c23531'
    //                 }
    //             },
    //             showSymbol: false
    //         }]
    //     });
    // });

});