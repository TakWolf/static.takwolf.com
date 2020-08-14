//=======================================================
//
// EM-X for HTML5 Canvas - v0.0.3
//
// Powered by TakWolf - takgdx@gmail.com
// http://www.takgdx.com/emx-for-html5-canvas
//
//=======================================================
// -2013.10.6-
//=======================================================
// 游戏示例：宇宙巡航机 - By 幻影狼人
//=======================================================
// 初始化引擎
//=======================================================
var e = new D2D_Engine("EMXCanvas",80,512,600);

//载入游戏资源
var tex_player = new D2D_Texture("Dat/player.png");
var tex_fire = new D2D_Texture("Dat/fire.png");
var tex_bullet = new D2D_Texture("Dat/bullet.png");
var tex_enemy1 = new D2D_Texture("Dat/enemy1.png");
var tex_enemy2 = new D2D_Texture("Dat/enemy2.png");
var tex_enemy3 = new D2D_Texture("Dat/enemy3.png");
var tex_background = new D2D_Texture("Dat/background.png");

//创建背景
var bg = new Background();

//创建玩家
var player = new Player();

//创建敌人数组
var arrEnemy = [];
//爆炸数组
var arrBomb = [];


//创建字体
var font = new D2D_Font("arial","20px",true,false);
font.setColor("#FFFFFF");

//创建音效
var BGM = new D2D_Audio("Dat/bgm.ogg");
BGM.setLoop(true);
BGM.play();

//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {
    
	//创建敌人
	var seed = Math.floor(Math.random()*(100+1));
	//创建敌人1类型
	
	if(seed == 1) {
		var x = Math.random()*512;
		var angle = Math.random()*Math.PI;
		var aSpeed = (Math.random()-0.5)/5;
		var dSpeed = Math.random()*4+1;
		var size = Math.random()*2+0.8;
		arrEnemy.push(new Enemy1(x,-50,angle,aSpeed,dSpeed,size));
	} 
	else if(seed == 2) {
		var x = Math.random()*512;
		arrEnemy.push(new Enemy2(x,-50));
	}
	else if(seed == 3) {
		var x = Math.random()*512;
		arrEnemy.push(new Enemy3(x,-50));
	}

	//更新背景
	bg.update(dt);
	//更新敌人数组
	for(var n=0;n<arrEnemy.length;n++) {
	    arrEnemy[n].update(dt,player);	
	}
	//更新玩家
	player.update(dt,arrEnemy,arrBomb);
	//移除死亡敌人
	for(var n=0;n<arrEnemy.length;n++) {
	    if(arrEnemy[n].state == "消失") {
			arrEnemy.splice(n,1);//删除对象
			break;
		}
	}
	//更新爆炸数组
	for(var n=0;n<arrBomb.length;n++) {
	    arrBomb[n].update(dt);	
	}
	//移除爆炸
	for(var n=0;n<arrBomb.length;n++) {
	    if(arrBomb[n].state == "消失") {
			arrBomb.splice(n,1);//删除对象
			break;
		}
	}

};

//=======================================================
// 屏幕渲染
//=======================================================
e.draw = function(dt) {
    		  
    //开始渲染
    this.beginDraw();
    this.clear("#000000");

    //显示背景
	bg.draw(this);

    //显示玩家
	player.draw(this);

	//显示敌人数组
	for(var n=0;n<arrEnemy.length;n++) {
	    arrEnemy[n].draw(this);	
	}
	//显示爆炸数组
	for(var n=0;n<arrBomb.length;n++) {
	    arrBomb[n].draw(this);	
	}

    //参数信息
    font.draw(this,"enemy:"+arrEnemy.length,400,5);
    font.draw(this,"bomb:"+arrBomb.length,400,25);
    font.draw(this,"bullet:"+player.arrBullet.length,400,45);
	font.draw(this,"fire:"+player.arrFire.length,400,65);	
	
    //显示FPS
    font.draw(this,"FPS:"+this.getCurrentFps(),10,5);
	
    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);

















