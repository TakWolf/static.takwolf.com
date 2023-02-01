/**
 * 敌人类3
 */
function Enemy3(x,y) {
	
	this.spr_enemy = new D2D_Sprite(tex_enemy3,0,0,48,48);
    this.spr_enemy.setOrigin(24,24);
	this.x = x;
	this.y = y;
	this.angle = 0;//角度
	this.speed = 4;//线速度
	this.life = 1;
	
	this.state = "飞行";
	
    //碰撞盒
	this.box = new D2D_RectBox(this.x,this.y,40,40);
	this.box.setOrigin(20,20);

}

/**
 * 更新
 */
Enemy3.prototype.update = function(dt,player) {
	if(this.y <player.y-50){
		//计算角度
		var dx = player.x - this.x;
		var dy = player.y - this.y;
		var dz = Math.sqrt(dx*dx + dy*dy);
		this.angle = Math.asin(dy/dz) - Math.PI/2;
		if(dx<0){
			this.angle *= -1;
		}
	}
	//移动
	this.x -= this.speed * Math.cos(this.angle-Math.PI/2);
	this.y -= this.speed * Math.sin(this.angle-Math.PI/2);
	this.y += 2;


	//消失判断
	if(this.y>=600+50) {
		this.state = "消失";
	}
    //更新碰撞盒
	this.box.setPosition(this.x,this.y);
};

/**
 * 显示
 */
Enemy3.prototype.draw = function(e) {
    this.spr_enemy.draw(e,this.x,this.y,this.angle,1,1);
	//this.box.draw(e);
};

/**
 * 碰撞检测
 */
Enemy3.prototype.test = function(box) {
	if(this.state === "飞行" && this.box.testRect(box)) {
		return true;
	}
	return false;
};

/**
 * 损坏
 */
Enemy3.prototype.damage = function(arrBomb,isAtOnce) {
	if(isAtOnce === true){
		this.state = "消失";
		//添加爆炸效果
		arrBomb.push(new Bomb(this.x,this.y));
	}else{
		this.life -= 1;
		if(this.life<=0){
			this.state = "消失";
			//添加爆炸效果
		    arrBomb.push(new Bomb(this.x,this.y));
		}
	}
};



