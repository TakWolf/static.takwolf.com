
var e = new D2D_Engine("canvas", 80, 900, 600);

var texPitch = new D2D_Texture("img/pitch.png");
var texBall = new D2D_Texture("img/ball.png");
var texP1 = new D2D_Texture("img/p1.png");
var texP2 = new D2D_Texture("img/p2.png");

var sprPitch = new D2D_Sprite(texPitch, 0, 0, 800, 520);
sprPitch.setOrigin(400, 260);
var sprBall = new D2D_Sprite(texBall, 0, 0, 80, 80);
sprBall.setOrigin(40, 40);
var sprP1 = new D2D_Sprite(texP1, 0, 0, 16, 30);
sprP1.setOrigin(8, 15);
var sprP2 = new D2D_Sprite(texP2, 0, 0, 16, 30);
sprP2.setOrigin(8, 15);

var pitchRect = {
    centerX : 450,
    centerY : 300,
    left : -400,
    right : 400,
    top : -260,
    bottom : 260
};

var p1Members = {};
p1Members[0] = { // 守门员
    x : - 329,
    y : 0
};
p1Members[1] = { // 后卫1
    x : - 235,
    y : -100
};
p1Members[2] = { // 后卫2
    x : - 235,
    y : 100
};
p1Members[3] = { // 中锋1
    x : - 47,
    y : 0
};
p1Members[4] = { // 中锋2
    x : - 47,
    y : -100
};
p1Members[5] = { // 中锋3
    x : - 47,
    y : 100
};
p1Members[6] = { // 中锋4
    x : - 47,
    y : -200
};
p1Members[7] = { // 中锋5
    x : - 47,
    y : 200
};
p1Members[8] = { // 前锋1
    x : + 141,
    y : 0
};
p1Members[9] = { // 前锋2
    x : + 141,
    y : -155
};
p1Members[10] = { // 前锋3
    x : + 141,
    y : 155
};

var p2Members = {};
p2Members[0] = { // 守门员
    x : + 329,
    y : 0
};
p2Members[1] = { // 后卫1
    x : + 235,
    y : -100
};
p2Members[2] = { // 后卫2
    x : + 235,
    y : 100
};
p2Members[3] = { // 中锋1
    x : + 47,
    y : 0
};
p2Members[4] = { // 中锋2
    x : + 47,
    y : -100
};
p2Members[5] = { // 中锋3
    x : + 47,
    y : 100
};
p2Members[6] = { // 中锋4
    x : + 47,
    y : -200
};
p2Members[7] = { // 中锋5
    x : + 47,
    y : 200
};
p2Members[8] = { // 前锋1
    x : - 141,
    y : 0
};
p2Members[9] = { // 前锋2
    x : - 141,
    y : -155
};
p2Members[10] = { // 前锋3
    x : - 141,
    y : 155
};

var player1 = {
    pos : 0,
    angle : 0
};

var player2 = {
    pos : 0,
    angle : 0
};

var memberRadius = 26; // 人物半径

var ball = {
    x : 0,
    y : 0,
    radius : 8,
    moveSpeed : 5,
    moveAngle : 0, // 弧度
    moveCoeff : 0.01,
    rotateSpeed : 0,
    rotateAngle : 0
};

e.update = function(dt) {
    
    // 玩家控制
    if (keyboard.KEY_P1_UP && !keyboard.KEY_P1_DOWN && player1.pos > - 136) {
        player1.pos -= 4;
        player1.angle = -Math.PI / 4;
    }
    else if (keyboard.KEY_P1_DOWN && !keyboard.KEY_P1_UP && player1.pos < + 136) {
        player1.pos += 4;
        player1.angle = Math.PI / 4;
    }
    else {
        player1.angle = 0;
    }

    if (keyboard.KEY_P2_UP && !keyboard.KEY_P2_DOWN && player2.pos > -136) {
        player2.pos -= 4;
        player2.angle = -Math.PI / 4 * 3;
    }
    else if (keyboard.KEY_P2_DOWN && !keyboard.KEY_P2_UP && player2.pos < + 136) {
        player2.pos += 4;
        player2.angle = Math.PI / 4 * 3;
    }
    else {
        player2.angle = 0;
    }

    // 人员判断
    for (var n = 0; n < 11; n++) {
        var deltaX = ball.x - p1Members[n].x;
        var deltaY = ball.y - (p1Members[n].y + player1.pos);
        var deltaZ = memberRadius;
        if (Math.pow(deltaX, 2) + Math.pow(deltaY, 2) < Math.pow(deltaZ , 2) && ball.x < p1Members[n].x) {
            ball.x = p1Members[n].x;
            ball.moveSpeed = 8;
            ball.rotateSpeed = 0.2;
            ball.moveAngle = Math.abs(Math.PI / 3.5 * deltaX / deltaZ);
            if (ball.moveAngle < Math.PI / 12) {
                ball.moveAngle = Math.PI / 12;
            }
            if (ball.y < p1Members[n].y) {
                ball.moveAngle = -ball.moveAngle;
            }
            break;
        }
    }
    /*
    for (var n = 0; n < 11; n++) {
        var deltaX = Math.abs(ball.x - p2Members[n].x);
        var deltaY = Math.abs(ball.y - (p2Members[n].y + player2.pos));
        if (Math.pow(deltaX, 2) + Math.pow(deltaY, 2) < Math.pow(ball.radius + memberRadius , 2)) {
            ball.moveSpeed = 8;
            ball.rotateSpeed = -0.2;


            ball.moveAngle = -Math.PI;



            break;
        }
    }*/

    // 墙壁判断
    if (ball.x - ball.radius <= pitchRect.left) {
        ball.moveAngle = Math.PI - ball.moveAngle;
        ball.x = pitchRect.left + ball.radius;
    }
    if (ball.x + ball.radius >= pitchRect.right) {
        ball.moveAngle = Math.PI - ball.moveAngle;
        ball.x = pitchRect.right - ball.radius;
    }
    if (ball.y - ball.radius <= pitchRect.top) {
        ball.moveAngle = - ball.moveAngle;
        ball.y = pitchRect.top + ball.radius;
    }
    if (ball.y + ball.radius >= pitchRect.bottom) {
        ball.moveAngle = - ball.moveAngle;
        ball.y = pitchRect.bottom - ball.radius;
    }

    // 球移动逻辑
    ball.x += ball.moveSpeed * Math.cos(ball.moveAngle);
    ball.y += ball.moveSpeed * Math.sin(ball.moveAngle);
    ball.rotateAngle += ball.rotateSpeed;

    // 减速逻辑
    if (ball.moveSpeed > 1) {
        ball.moveSpeed -= ball.moveCoeff;
    } else {
        ball.moveSpeed = 1;
    }

};

e.draw = function(dt) {

    this.beginDraw();
    this.clear("black");

    // 绘制场地
    sprPitch.draw(this, pitchRect.centerX, pitchRect.centerY);

    // 绘制球
    sprBall.draw(this, pitchRect.centerX + ball.x, pitchRect.centerY + ball.y, ball.rotateAngle, 0.2, 0.2);

    // 绘制Player
    for (var n = 0; n < 11; n++) {
        sprP1.draw(this, pitchRect.centerX + p1Members[n].x, pitchRect.centerY + p1Members[n].y + player1.pos, player1.angle, 0.8, 0.8);
        sprP2.draw(this, pitchRect.centerX + p2Members[n].x, pitchRect.centerY + p2Members[n].y + player2.pos, player2.angle, 0.8, 0.8);
    }

    this.endDraw();

};

startEngine(e);
