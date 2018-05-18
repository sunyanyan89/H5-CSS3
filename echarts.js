(function() {
    var time = parseInt(Math.random()*10)+10
    document.getElementById('time').innerHTML = time
    var creData = function () {
        var arr = [];
        for(var i = 0;i < time; i++) {
            arr.push(parseInt(Math.random()*100))
        }
        return arr;
    }
    // 基于准备好的dom，初始化echarts实例
    var barEchart = echarts.init(document.getElementById('barEchart'));
    var lineEchart = echarts.init(document.getElementById('lineEchart'));
    var pieEchart = echarts.init(document.getElementById('pieEchart'));
    // var lineEchart = echarts.init(document.getElementById('lineEchart'));
    // 指定图表的配置项和数据
    var barOption = {
        title: { 
            text: 'Echarts入门示例--柱状图', // 主标题文本
            link: 'www.baidu.com', // 主标题超链接
            target: 'blank', // 'self' 'blank' 指定打开超链接的窗口
            itemGap: 20, // number 主副标题之间的间距
            subtext: 'this is subtitle', // 副标题文本
            sublink: 'www.baidu.com', // 副标题超链接
            subtarget: 'blank', // 'self' 'blank' 指定打开超链接的窗口
            x: 'left',
            top: 10,
        },
        tooltip: {},
        legend: {
            align: 'left', // 图例标记和文本的对齐 left : 图例在左 right: 图例在右
            left: 'right', // number/string 距离容器左侧的距离
            // top: 20, // 
            orient: 'vertical' // 图例列表的布局朝向
        },
        grid: {
            top: 120, // grid组件距离容器上侧的距离
        },
        xAxis: { data: creData() },
        yAxis: {},
        series: [{
            name: '销量1',
            type: 'bar',
            data: creData()
        },{
            name: '销量2',
            type: 'bar',
            data: creData()
        },{
            name: '销量3',
            type: 'bar',
            data: creData()
        }]
    }

    var lineOption = {
        title: { 
            text: 'Echarts入门示例--折线图',
            x: 'center',
            top: 10 
        },
        legend: { 
            data: ['销量1', '销量2'],
            top: 20,
            right: 0

        },
        xAxis: { data: creData() },
        yAxis: {},
        series: [{
            name: '销量1',
            type: 'line',
            data: creData()
        },{
            name: '销量2',
            type: 'line',
            data: creData()
        }]
    }
    
    // 饼图和折线图、柱状图有一点区别，主要是参数和数据绑定上，饼图没有x轴和y轴坐标，数据绑定也是采用value和name相对应的形式
    var pieOption = {
        // 背景色 文本颜色 是全局的 所以直接在 option 下设置
        backgroundColor: '#2c343c',    
        // textStyle: { color: 'rgba(255, 255, 255, 0.3)' },                    
        title: { text: 'Echarts入门示例--饼图' },
        legend: { data: ['访问量'] },
        series: [{
            name: '访问量',
            type: 'pie',
            roseType: 'angle', // 南丁格尔图 通过半径表示数据的大小
            radius: '60%',
            data: [
                {value:100,name:'Mac'},
                {value:500,name:'Android'},
                {value:200,name:'IOS'},
                {value:360,name:'PC',itemStyle:{color:'#c23531'}},
                {value:100,name:'Ohter'}
            ],
            itemStyle: { // 通用样式 阴影、透明度、颜色、边框颜色、边框宽度等
                normal: {
                    // color: '#c23531', // 设置扇形的颜色
                    shadowBlur: 200, // 阴影大小
                    shadowOffsetX: 0, // 阴影水平方向上的位移
                    shadowOffsetY: 0, // 阴影垂直方向上的位移
                    shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
                },
                emphasis: { // 鼠标hover时的高亮样式
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }

            },
            // label: {
            //     normal: {
            //         textStyle: {
            //             color: 'rgba(255, 255, 255, 0.3)'
            //         }
            //     }
            // },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            }
        }]
    }

    // 使用刚刚指定的配置项和数据来显示图表
    barEchart.setOption(barOption);
    lineEchart.setOption(lineOption);
    pieEchart.setOption(pieOption);

    // echarts 中通过实现异步数据的更新非常简单，在图表初始化后不管任何时候 只要通过jquery等工具异步获取数据后通过setOption填入数据和配置即可
    var echart4 = echarts.init(document.getElementById('echart4'));
    // 可以先init 然后获取数据后，通过setOption填入数据和配置即可
    // 也先设置其他样式，显示一个空的直角坐标系 然后获取数据后填入数据
    echart4.setOption({
        title: {
            text: '这是一个异步获取数据的图表'
        },
        legend: {

        },
        xAxis: {
            data: ['12', '34', '56', '78']
        },
        yAxis: {
            
        },
        series: [{
            name: '销量',
            type: 'bar',
            data: ['32', '54', '46', '28']
        }]

    })
    echart4.showLoading();
    // 模拟数据
    var data = [[49, 95, 89, 51, 28, 69, 74, 55, 33, 44, 22, 76], [13, 56, 55, 53, 25, 26, 46, 73, 32, 63, 69, 90], [44, 24, 50, 58, 10, 74, 16, 98, 12, 17, 48, 11]]
    // 
    setTimeout(() => {
        echart4.hideLoading()
        echart4.setOption({
            xAxis: {
                data: data[0]
            },
            series: [{
                name: '销量',
                type: 'line',
                data: data[1]
            }]
        })
    },1500)
})()