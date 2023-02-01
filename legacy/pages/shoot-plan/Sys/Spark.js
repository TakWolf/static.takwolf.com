/**
 * 火花类
 */
function Spark(x,y,angle,speed,num) {
	this.ani_spark = new D2D_Animation(tex_fire,10,1,6,0,(num-1)*20,20,20);
    this.ani_spark.setOrigin(10,10);
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.speed = speed;

	this.state = "飞行";
}

/**
 * 更新
 */
Spark.prototype.update = function(dt) {
	//计算位置
	this.x -= this.speed * Math.cos(this.angle-Math.PI/2);
	this.y -= this.speed * Math.sin(this.angle-Math.PI/2);
	this.y += dt*50;//向下偏移
	//更新动画
	this.ani_spark.update(dt);
	//变更状态
	if(this.ani_spark.getCurrentFrameX()>=10) {
		this.state = "消失";
	}
};

/**
 * 显示
 */
Spark.prototype.draw = function(e) {
    if(this.state == "飞行"){
		this.ani_spark.draw(e,this.x,this.y,this.angle,1,1);
	}
};