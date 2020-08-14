/**
 * 敌人类1
 */
function Enemy1(x,y,angle,aSpeed,dSpeed,size) {
	this.spr_enemy = new D2D_Sprite(tex_enemy1,0,0,60,60);
    this.spr_enemy.setOrigin(30,30);
	this.x = x;
	this.y = y;
	this.angle = angle;//角度
	this.aSpeed = aSpeed;//角速度
	this.dSpeed = dSpeed;//线速度
	this.size = size;//尺寸
	this.life = size;
	
	this.state = "飞行";
	
    //碰撞盒
	this.box = new D2D_RectBox(this.x,this.y,40*size,40*size);
	this.box.setOrigin(40*size/2,40*size/2);
	
}

/**
 * 更新
 */
Enemy1.prototype.update = function(dt,player) {
	//计算位置
	this.y += this.dSpeed;
	this.angle += this.aSpeed;
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
Enemy1.prototype.draw = function(e) {
    this.spr_enemy.draw(e,this.x,this.y,this.angle,this.size,this.size);
	//this.box.draw(e);
};

/**
 * 碰撞检测
 */
Enemy1.prototype.test = function(box) {
	if(this.state === "飞行" && this.box.testRect(box)) {
		return true;
	}
	return false;
};

/**
 * 损坏
 */
Enemy1.prototype.damage = function(arrBomb,isAtOnce) {
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



