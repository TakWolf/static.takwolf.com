/**
 * 玩家类
 */
function Player() {
	this.spr_player = new D2D_Sprite(tex_player,0,0,64,64);
    this.spr_player.setOrigin(32,32);
	this.x = 256;
	this.y = 500;
	this.speed = 3;
	
	//开火限制
	this.fireLimit = 0;//为0时可以开火
	//复活时间
	this.rebirth = 0;//为0时复活
	//无敌时间
	this.protect = 0;//不为0无敌
	//尾部火焰时间
	this.fireTime = 0;
	//可视中
	this.visible = true;
	
	this.state = "飞行";
    
	//碰撞盒
	this.box = new D2D_RectBox(this.x,this.y,34,34);
	this.box.setOrigin(17,17);
	
	//创建子弹数组
	this.arrBullet = new Array();
	//尾部火焰数组
	this.arrFire = new Array();
	
}

/**
 * 更新
 */
Player.prototype.update = function(dt,arrEnemy,arrBomb) {
	//移动和开火逻辑
	if( this.state === "飞行"
	  ||this.state === "无敌") {
        //玩家移动逻辑
		if(keyboard.KEY_UP) {
			this.y -= this.speed;
		}
		if(keyboard.KEY_DOWN) {
			this.y += this.speed;
		}
		if(keyboard.KEY_LEFT) {
			this.x -= this.speed;
		}
		if(keyboard.KEY_RIGHT) {
			this.x += this.speed;
		}
		//边界判断
		if(this.x<32) {
			this.x=32;
		}
		if(this.x>512-32) {
			this.x=512-32;
		}
		if(this.y<80) {
			this.y=80;
		}
		if(this.y>600-32) {
			this.y=600-32;
		}
		//更新碰撞盒
		this.box.setPosition(this.x,this.y);
		//开火逻辑
		if(this.fireLimit <= 0) {
			this.arrBullet.push(new Bullet(this.x,this.y-10,5));
			this.fireLimit = 20;
		}
		//生成火焰
		if(this.fireTime <= 0){
			var t_dx = Math.floor(Math.random()*(5+1))-2;
			var t_num = Math.floor(Math.random()*(6+1))+1;
			this.arrFire.push(new Spark(this.x+t_dx,this.y+18,0,1,t_num));
			this.fireTime = 3;
		}
	}
	
	//飞行状态
	if(this.state === "飞行") {
		//更新是否坠毁
		for(var n=0;n<arrEnemy.length;n++){
			if(arrEnemy[n].test(this.box)){
				arrEnemy[n].damage(arrBomb,true);//和敌人同归于尽
				this.state = "消失";
				this.rebirth = 180;//越3秒
				//添加爆炸效果
				arrBomb.push(new Bomb(this.x,this.y));
			}
		}
	}
	//消失状态
	else if(this.state === "消失") {
		this.rebirth --;
		if(this.rebirth<=0) {
			this.state = "无敌";
			this.protect = 200;
			this.x = 256;
			this.y = 500;
		}
	}
	//无敌状态
	else if(this.state === "无敌") {
		//更新是否坠毁
		for(var n=0;n<arrEnemy.length;n++){
			if(arrEnemy[n].test(this.box)){
				arrEnemy[n].damage(arrBomb,true);//敌人消灭
			}
		}
		//无敌计算
		this.protect--;
		//每5计数器一个周期闪烁
		if(this.protect %5 == 0){
			if(this.visible){
				this.visible = false;
				this.spr_player.setAlpha(0.2);
			}else{
				this.visible = true;
				this.spr_player.setAlpha(1);
			}
		}
		if(this.protect<=0) {
			this.state = "飞行";
			this.spr_player.setAlpha(1);
		}
	}
	
	//开火限制
	if(this.fireLimit > 0) {
	    this.fireLimit--;
	}	
	//更新子弹数组
	for(var n=0;n<this.arrBullet.length;n++) {
	    this.arrBullet[n].update(dt,arrEnemy,arrBomb);
	}
	//移除消失子弹
	for(var n=0;n<this.arrBullet.length;n++) {
	    if(this.arrBullet[n].state == "消失") {
			this.arrBullet.splice(n,1);//删除对象
			break;
		}
	}
	//尾部火焰限制
	if(this.fireLimit > 0) {
	    this.fireTime--;
	}
	//更新火焰数组
	for(var n=0;n<this.arrFire.length;n++) {
		this.arrFire[n].update(dt);
	}
	//移除尾部火焰
	for(var n=0;n<this.arrFire.length;n++) {
	    if(this.arrFire[n].state == "消失") {
			this.arrFire.splice(n,1);//删除对象
			break;
		}
	}
	
};

/**
 * 显示
 */
Player.prototype.draw = function(e) {
    //显示玩家
	if(this.state === "飞行" || this.state === "无敌") {
		//显示玩家
		this.spr_player.draw(e,this.x,this.y);
		//显示碰撞盒
		//this.box.draw(e,"#FF0000");
	}
	//显示子弹数组
	for(var n=0;n<this.arrBullet.length;n++) {
	    this.arrBullet[n].draw(e);	
	}
	//显示火焰数组
	for(var n=0;n<this.arrFire.length;n++) {
	    this.arrFire[n].draw(e);
	}
};













