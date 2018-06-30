let loadingRender = (function($) {
    let $loadingBox = $('.loadingBox');
    // 控制图片加载速度，计算滚动条加载长度
    let computed = function() {
        let imgList = ["img/course.png","img/course1.png","img/course2.png","img/course3.png","img/course4.png","img/course5.png","img/course6.png","img/cube1.png","img/cube2.png","img/cube3.png","img/cube4.png","img/cube5.png","img/cube6.png","img/cubeBg.jpg","img/messageArrow1.png","img/messageArrow2.png","img/messageChat.png","img/messageKeyboard.png","img/outline.png","img/phoneBg.jpg","img/phoneDetail.png","img/phoneListen.png","img/return.png"];
            cur = 0, total = imgList.length,
            $run = $loadingBox.find('.run');
            
        imgList.forEach(function(img) {
            let tmpImg = new Image;
            tmpImg.src = img;
            tmpImg.onload = function() {
                cur++; 
                tmpImg = null;
                $run.css('width', cur / total * 100 + '%');
            }
        })
        setTimeout(function() {
            $loadingBox.remove();
            phoneRender.init();
        }, 1500)
    };
    return {
        init: function() {
            $loadingBox.css('display', 'block');
            computed();
        }
    }

})(Zepto);
let phoneRender = (function($) {
    let $phoneBox = $('.phoneBox'),
        $toListen = $phoneBox.find('.toListen'),
        $listening = $phoneBox.find('.listening'),
        $listenNext = $toListen.find('.next'),
        $listeningNext = $listening.find('.next'),
        $time = $phoneBox.find('.time');
    let bell = $('#audioBell')[0],
        say = $('#audioSay')[0];
    let phonePlan = $.Callbacks();
    phonePlan.add(function() {
        $toListen.remove();
        $listening.css('transform', 'translateY(0)');
    });
    phonePlan.add(function() {
        bell.pause();
        say.play();
        $time.css('display', 'block');
        let timer = setInterval(function() {
            let duration = say.duration,
                curr = say.currentTime;
            let minute = Math.floor(curr / 60),
                second = Math.floor(curr - minute * 60);
            minute = minute < 10 ? '0' + minute : minute;
            second = second < 10 ? '0' + second : second;
            // $time.html(minute + ':' + second);
            $time.html(`${minute}:${second}`);
            if(curr >= duration) {
                clearInterval(timer);
                enterNext();
            }
        }, 1000);
    });
    let enterNext = function() {
        say.pause();
        $phoneBox.remove();
        cubeRender.init();
    }

    return {
        init: function() {
            $phoneBox.css('display', 'block');
            bell.play();
            $listenNext.tap(phonePlan.fire);
            $listeningNext.tap(function() {
                enterNext()
            });
        }
    }

})(Zepto);
let messageRender = (function($) {
    $messageBox = $('.messageBox');
    return {
        init: function() {
            $messageBox.css('display', 'block');
        }
    }
})(Zepto);

// 只要在移动端浏览器中实现滑动操作，都需要把浏览器默认的滑动行为禁止掉
// $(document).on('touchstart touchmove touchend', function(e) {
//     e.preventDefault();
// });
let cubeRender = (function($) {
    let $cubeBox = $('.cubeBox'),
        $box = $cubeBox.find('.box');
    let touchBegin = function(e) {
        let point = e.changedTouches[0];
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            isMove: false,
            changeX: 0,
            changeY: 0
        })
    }
    let touchMove = function(e) {
        let point = e.changedTouches[0],
            me = $(this);
        let changeX = point.clientX - me.attr('strX'),
            changeY = point.clientY - me.attr('strY');
        if(Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
            me.attr({
                isMove: true,
                changeX: changeX,
                changeY: changeY
            })
        } 
    }
    let touchEnd = function(e) {
        let me  = $(this);
        if(me.attr('isMove') === 'true') {
            let rotateX = parseFloat(me.attr('rotateX')) - parseFloat(me.attr('changeY') / 3),
                rotateY = parseFloat(me.attr('rotateY')) + parseFloat(me.attr('changeX') / 3);
            me.css('transform', `scale(.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
              .attr({
                  isMove: false,
                  rotateX: rotateX,
                  rotateY: rotateY
              });

        }
    }
    return {
        init: function() {
            $cubeBox.css('display', 'block');
            $box.attr({
                rotateX: -30,
                rotateY: 45
            }).on({
                touchstart: touchBegin,
                touchmove: touchMove,
                touchend: touchEnd,
            });
            $box.find('li').tap(function(i) {
                $cubeBox.css('display', 'none');
                let index = $(this).index();
                swiperRender.init(index);
            })
        }
    }
})(Zepto);

let swiperRender = (function($) {
    let $swiperBox = $('.swiperBox'),
        $cubeBox = $('.cubeBox'),
        $return = $swiperBox.find('.return'),
        $makisuBox = $('#makisuBox'),
        mySwiper = null;
    
    // 音乐播放页
    let $musicPage = $swiperBox.find('.page4'),
        musicRoad = $('#road')[0],
        $musicWrapper = $musicPage.find('.wrapper'),
        $curTime = $musicPage.find('.curTime'),
        $totalTime = $musicPage.find('.totalTime'),
        $runPro = $musicPage.find('.runBox .run'),
        $switch = $musicPage.find('.control i:nth-child(2)');

    let musicPlan = $.Callbacks();
    let musicPause = function() {
        musicRoad.pause()
        $switch.removeClass('icon-pause').addClass('icon-iconbofang')
    }
    let change = function(mySwiper) {
        let {slides, activeIndex} = mySwiper;
        // page1 事件
        if(activeIndex === 0) {
            $makisuBox.makisu({
                selector: 'dd',
                speed: 0.8
            })
            $makisuBox.makisu('open')
        }else {
            $makisuBox.makisu({
                selector: 'dd',
                speed: 0
            })
            $makisuBox.makisu('close')
        }
        if(activeIndex === 3) {
            musicPlan.fire()
        }else{
            musicPause()
        }
        // Array.prototype.slice.call(arrayLike) 将arrayLike对象转换成一个Array对象  
        // Array.prototype.slice.call(slides).map(function(item, index) {
        [].map.call(slides, function(item, index) {
            if(index === activeIndex) {
                item.id = 'page' + (index+1)
                return
            }
            item.id = null
        })
    }
    // 读歌词 并渲染到wrapper容器中
    musicPlan.add(() => {
        $.ajax({
            url: './audio/lyric.txt',
            dataType: 'text',
            success: function(res) {
                // console.log(res)
                let arr = []
                res.replace(/\[(\d+):(.+)\](.+)/g, (...arg) => {
                    let [,minutes,seconds,string] = arg
                    arr.push({
                        minutes: minutes,
                        seconds: seconds,
                        string: string
                    })
                })
                let html = []
                arr.forEach(item => {
                    let time = parseFloat(item.minutes)*60 + parseFloat(item.seconds)
                    html.push(`<p data-time=${time}>${item.string}</p>`)
                })
                $musicWrapper.html(html.join(''))
            }
        })
    })
    // 控制歌曲暂停播放
    musicPlan.add(() => {
        musicRoad.play() // 进来先播放
        $switch.addClass('icon-pause').removeClass('icon-iconbofang')
        // oncanplay 资源可能没有加载完成 随播放随加载
        // musicRoad.oncanplay = () => {}      
    })
    // 格式化时间 mm:ss
    let computedTime = function(time) {
        let min = Math.floor(time / 60),
            sec = Math.round(time - min * 60);
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec
        return min + ':' + sec
    }
    let progressFn = (dur, cur) => {
        $totalTime.html(computedTime(dur))
        $curTime.html(computedTime(cur))
        // 计算进度条
        let percent = 100*(cur / dur) + '%'
        $runPro.css('width',percent)
    }
    // 控制歌词对应
    let toActive = function(cur) {
        let pList = $musicWrapper.find('p');
        let curP = null
        pList.each((i, e) => {
            if(Math.abs($(e).attr('data-time') - cur) <= 1) {
                curP = $(e)
                return false
            }
        })
        if(curP) {
            curP.addClass('active').siblings().removeClass('active')
            let index = curP.index()
            if(index >= 4) {
                let h = $musicWrapper.attr('data-h') - 0.84
                $musicWrapper.attr('data-h', h).css('transform',`translateY(${h}rem)`)
            }
        }
    }
    // 计算歌曲播放时间
    musicPlan.add(() => {
        let timer = setInterval(() => {
            let cur = musicRoad.currentTime
            let duration = musicRoad.duration
            // 播放进步条和时间
            progressFn(duration, cur)
            // 歌词对应
            toActive(cur)
            // 播放完成结束
            if(cur >= duration) {
                clearInterval(timer) // 清除定时器
                musicPause()
            }
        }, 1000)
    })

    return {
        init: function(index=0) {
            $swiperBox.css('display', 'block');
            if(!mySwiper) {
                mySwiper = new Swiper('.swiper-container', {
                    effect: 'coverflow',
                    on: {
                        init: function() {
                            change(this)
                        },
                        slideChange: function() {
                            change(this)
                        }
                    },
                });
                // return 点击事件 只绑定一次
                $return.tap(function() {
                    $cubeBox.css('display', 'block');
                    $swiperBox.css('display', 'none');
                    musicPause();
                });
                $switch.tap(function() {
                    if(musicRoad.paused) {
                        musicRoad.play()
                        $(this).addClass('icon-pause').removeClass('icon-iconbofang')
                    }else{
                        musicRoad.pause()
                        $(this).removeClass('icon-pause').addClass('icon-iconbofang')
                    }
                })
            }
            index = Math.min(5, index);
            mySwiper.slideTo(index, 0 ,false);           
        }
    }
})(Zepto);

cubeRender.init();