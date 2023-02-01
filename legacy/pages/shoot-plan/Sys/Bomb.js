/**
 * 爆炸类
 */
function Bomb(x,y) {
	this.x = x;
	this.y = y;
	
	//创建火花组
	this.arrSpark = new Array();
	var t_num = Math.floor(Math.random()*(6+1))+1;
	for(var n=0;n<30;n++) {
		var t_angle = Math.random()*Math.PI*2;
		var t_speed = Math.random()*2+0.3;
		this.arrSpark.push(new Spark(this.x,this.y,t_angle,t_speed,t_num));
	}
	
	this.state = "飞行";
	this.count = 0;
	
}

/**
 * 更新
 */
Bomb.prototype.update = function(dt) {
	//飞行状态更新
	if(this.state == "飞行"){
		//更新火花数组
		for(var n=0;n<this.arrSpark.length;n++) {
			this.arrSpark[n].update(dt);	
		}
		//计时器++
		this.count++;
		//消失
		if(this.count >= 180) {
			this.state = "消失";
		}
	}
	
};

/**
 * 显示
 */
Bomb.prototype.draw = function(e) {
    if(this.state == "飞行") {
		for(var n=0;n<this.arrSpark.length;n++) {
			this.arrSpark[n].draw(e);	
		}
	}
};




