// 设置根元素的font-size值
var deviceWidth = document.documentElement.clientWidth;
if(deviceWidth > 414) deviceWidth = 414;
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';

// click事件无延迟处理
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}