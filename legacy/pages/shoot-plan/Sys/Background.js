/**
 * 背景类
 */
function Background() {
	this.spr_bg = new D2D_Sprite(tex_background,0,0,512,600);
	this.y1 = 0;
	this.y2 = 600;
}

/**
 * 更新
 */
Background.prototype.update = function(dt) {
	this.y1 += dt*100;
	this.y2 += dt*100;
	if(this.y1 >599) {
		this.y1 = -599;
	}
	if(this.y2 >599) {
		this.y2 = -599;
	}
};

/**
 * 显示
 */
Background.prototype.draw = function(e) {
    this.spr_bg.draw(e,0,this.y1);
    this.spr_bg.draw(e,0,this.y2);
};