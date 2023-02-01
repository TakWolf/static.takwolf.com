
(function() {

    window.onload = function(event) {
        adjusPage();
        initCanvas();
    };

    window.onresize = function(event) {
        adjusPage();
    };

    function initCanvas() {
        var canvas = document.getElementById('background');
        canvas.style.width = '100%';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';

        var fps = 60;
        var timeCounter = 0;
        var lastTime = new Date().getTime();
        var run = function() {
            var nowTime = new Date().getTime();
            var deltaTime = nowTime - lastTime;
            if(deltaTime - 1000/fps >= 0) {
                lastTime = nowTime;
                timeCounter += deltaTime;
                if(timeCounter >= 1000) {
                    timeCounter = 0;
                }
                update(canvas, deltaTime/1000);
            }
        };
        window.setInterval(run, 1);
    }

    function adjusPage() {
        //调整作者信息div位置
        var authorInfo = document.getElementById('authorInfo');
        if (window.innerHeight > authorInfo.clientHeight) { //浏览器高度大于中间信息高度
            authorInfo.style.position = 'fixed';
            authorInfo.style.top = (window.innerHeight - authorInfo.clientHeight) / 2 + 'px';
        } else {
            authorInfo.style.position = 'fixed'; //absolute
            authorInfo.style.top = '20px';
        }
        authorInfo.style.left = (window.innerWidth - authorInfo.clientWidth) / 2 + 'px';
        //调整背景位置
        var canvas = document.getElementById('background');
        canvas.height = 512;
        canvas.width = window.innerWidth / window.innerHeight * canvas.height;
    }

    var imgBg = new Image();
    var num = Math.floor(Math.random() * 2);
    imgBg.src = 'img/background' + num + '.png'; //288 * 512
    var bgArr = [];
    for (var n = 0; n < 10; n++) {
        bgArr[n] = n * 288;
    }

    var imgFg = new Image();
    imgFg.src = 'img/foreground.png'; //336 * 112
    var fgArr = [];
    for (var n = 0; n < 10; n++) {
        fgArr[n] = n * 336;
    }

    var imgFgWithBird = new Image();
    imgFgWithBird.src = 'img/foreground_with_bird.png';

    function update(canvas, dt) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); //清屏
        //绘制背景
        for (var n = 0; n < bgArr.length; n++) {
            bgArr[n] -= 1;
            if (bgArr[n] <= -imgBg.width) {
                bgArr[n] = (bgArr.length - 1) * imgBg.width;
            }
            ctx.drawImage(imgBg, 0, 0, imgBg.width, imgBg.height, bgArr[n], 0, imgBg.width, imgBg.height);
        }
        //绘制前景
        for (var n = 0; n < fgArr.length; n++) {
            fgArr[n] -= 2;
            if (fgArr[n] <= -imgFg.width) {
                fgArr[n] = (fgArr.length - 1) * imgFg.width;
            }
            ctx.drawImage(imgFg, 0, 0, imgFg.width, imgFg.height, fgArr[n], canvas.height - imgFg.height, imgFg.width, imgFg.height);
            if (n == 4) { //绘制鸟
                ctx.drawImage(imgFgWithBird, 0, 0, imgFgWithBird.width, imgFgWithBird.height, fgArr[n], canvas.height - imgFgWithBird.height, imgFgWithBird.width, imgFgWithBird.height);
            }
        }
    }

})();
