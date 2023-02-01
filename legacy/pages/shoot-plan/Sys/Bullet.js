/**
 * 子弹类
 */
function Bullet(x,y,speed) {
	this.ani_bullet = new D2D_Animation(tex_bullet,8,1,30,0,0,32,32);
    this.ani_bullet.setOrigin(16,16);
	this.x = x;
	this.y = y;
	this.speed = speed;

	this.state = "飞行";

    //碰撞盒
	this.box = new D2D_RectBox(this.x,this.y,24,24);
	this.box.setOrigin(12,12);

}

/**
 * 更新
 */
Bullet.prototype.update = function(dt,arrEnemy,arrBomb) {
	//计算位置
	this.y -= this.speed;
	//消失判断
	if(this.y <= -50) {
		this.state = "消失";
	}
	//击中检测
	for(var n=0;n<arrEnemy.length;n++){
		if(arrEnemy[n].test(this.box)){
			arrEnemy[n].damage(arrBomb,false);//击毁敌人
			this.state = "消失";
		}
	}
	//更新碰撞盒
	this.box.setPosition(this.x,this.y);
	//更新动画
	this.ani_bullet.update(dt);
};

/**
 * 显示
 */
Bullet.prototype.draw = function(e) {
    this.ani_bullet.draw(e,this.x,this.y);
	//this.box.draw(e);
};