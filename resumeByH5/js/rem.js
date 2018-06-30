(function(doc, win) {
    let docEl = doc.documentElement;
        // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        recalc = function() {
            // clientWidth 获取当前可见内容的宽度，不包括滚动条，不包括边框
            let clientWidth = Math.min(640, docEl.clientWidth);
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        }
    
    //判断是否支持监听事件 ，不支持则停止
    if (!doc.addEventListener) return;
    // DOM结构加载完毕时触发
    doc.addEventListener('DOMContentLoaded', recalc, false);

    win.addEventListener('resize', recalc, false);
})(document, window)