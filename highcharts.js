(function() {
    console.log('highcharts')
    let createData = (num=10) => {
        let arr = []
        for(let i = 0; i < num; i++) {
            arr.push(parseInt(Math.random()*100))
        }
        return arr
    }
    // 全局配置 针对页面上所有图表有效
    Highcharts.setOptions({
        credits: { enabled: false },
        tooltip: { enabled: false },
    })
    let options = [{
        chart: { 
            renderTo: 'charts', // 在配置里指定图表容器
            // 如果series没有指定type,图表的类型就由给属性确定
            type: 'bar', // 指定图表的类型 默认是折线图(line)
            events: {
                load: function() {

                }
            }
        },
        title: { 
            text: 'this is title',
            align: 'left',
         }, // 标题
        subtitle: { text: 'this is subTitle' }, // 副标题
        // 通常情况下 x轴显示在图标的底部，y轴显示在图表的左侧
        // 多个数据项可以共用同一个坐标轴
        xAxis: { 
            title: { text: 'x轴标题' }, // x轴标题
            categories: createData(8), // x轴刻度
        }, 
        yAxis: { title: { text: 'y轴标题' } }, // y轴标题
        // 数据列 即图表上的一个或多个数据列 比如曲线图中的一条曲线 柱状图中的一个柱形
        series: [{   // 数据列
            name: 'amy', // 数据列名
            color: '#f2c345', 
            data: createData(8) // 数据
        },{
            name: 'david',
            color: '#36cbff',
            data: createData(8)
        }],
        // Tooltip 悬浮提示框  
        tooltip: {
            
        },
        // legend 图例 用不同形状、颜色、文字等标示不同数据列 通过点击可以显示或隐藏该数据列
        legend: {

        },
        // 版权标签 显示在图表右下方的包含链接的文字，默认是Highcharts官网地址。通过指定credits.enabled=false即可不显示该信息。
        credits: { enabled: true }, 
    }, {
        chart: { 
            type: 'spline',
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },
            // inverted: true,            
        },
        tooltip: {
            enabled: true,
        },
        plotOptions: {
            series: {
                animation: false, // 加载图表时不动画
            }
        },
        title: { 
            text: 'second highcharts',
            floating: true, // 标题浮动 设置为true 不占用图表区位置
        },
        xAxis: { 
            title: { text: 'x轴标题' },
            // categories: createData(18), // 不设置categories 默认从0自增 或者是根据 pointStart 及 pointInterval 自增
        },
        yAxis: [{
            title: { text: 'qqq' }
        },{
            title: { text: 'aaa' },
            opposite: true, // 该轴位置反转 即为y轴时显示在左侧 为x轴时显示在顶部
        }],
        // legend: { enabled: false },
        series: [{
            yAxis: 0, // y轴下标（从0开始）
            name: 'amy',
            color: '#f2c345',
            animation: true, // 设置当前数据列动画 另一条由于plotOptions的设置不会动画
            data: createData(18),
            dashStyle: 'longdash', // 线条样式
            showInLegend: false,
            zones: [{ // 默认针对y轴设置分区
                value: 30, // 表示对于小于这个值的区域有效(或区域上界)
                color: '#f7a35c', // 对当前范围设置颜色
                dashStyle: 'dot', // 对当前范围设置线条样式
                // fillColor 对当前区域设置填充颜色（针对面积图）
            }, {
                value: 60,
                color: '#7cb5ec',
                dashtyle: '',
            }, {
                color: '#90ed7d'
            }]
        },{
            yAxis: 1,
            name: 'david',
            color: '#36cbff',
            // arr.push(ele1,ele2,...) 返回新的长度
            // arr.concat(arrX,arrY,...) 返回一个新的数组 arrX可以是具体的值 或者 数组对象
            data: createData(18).concat({
                y: 66,
                color: "#BF0B23"
            })
        }]
    }, {
        chart: { 
            type: 'column',
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },
        },
        title: { text: 'third highcharts' },
        xAxis: { 
            title: { text: 'x轴标题' },
            categories: createData(6),
        },
        yAxis: [{
            title: { text: 'y轴标题' },
            labels: { // 坐标轴刻度标签
                // 格式化标签
                formatter: function() {
                   if(this.value >= 0) {
                        return "第一等级(" + this.value + ")"
                   }else if(this.value >= 50) {
                        return "第二等级(" + this.value + ")"
                   }else if(this.value >= 100) {
                        return "第三等级(" + this.value + ")"
                   }else {
                       return "第四等级(" + this.value + ")"
                   }
                }
            }
        }],
        // 针对所有图表有效 通用配置
        plotOptions: {
            series: {
                stacking: 'normal'
            }
		},
        series: [{
            type: 'column',            
            name: 'amy',
            color: '#f2c345', 
            data: createData(6),
            colorByPoint: true
        },{
            type: 'column',            
            name: 'david',
            color: '#36cbff',
            data: createData(6)
        }]
    }, {
        title: { text: 'forth highcharts' },
        series: [{
            type: 'pie',
            name: '浏览器访问量占比',
            data: [
                ['Firefox', 45.0],
                ['IE', 26.8],
                {   // 数据点对象
                    name: 'Chrome',
                    y: 12.8,
                    color : "#BF0B23", // 该点颜色
                    sliced: true,  // 默认突出
                    selected: true // 默认选中 
                },
                ['Safari', 8.5],
                ['Opera', 6.2],
                ['其他', 0.7]
            ]
        }]
    }]
    // 初始化图标
    let chart = Highcharts.chart(options[0])
    let chart1 = Highcharts.chart('charts1', options[1])
    let chart2 = Highcharts.chart('charts2', options[2])
    let chart3 = Highcharts.chart('charts3', options[3])
    
    setTimeout(() => {
        chart.setTitle({
            useHTML: true,
            text: '我是新标题 | <a href="http://baidu.com">链接</a>',
            style: { color: '#dd3333' }
        }, {
            text: '我是新副标题',
            style: { color: '#bbb' },
            align: 'left',
        });
        chart1.setTitle(null, {
            text: '我是新副标题',
            style: { color: '#dd3333' },
            align: 'left',
            floating: true,
        });
        chart2.setTitle({
            text: null
        });
    },2000)

    console.log(chart1)
})()