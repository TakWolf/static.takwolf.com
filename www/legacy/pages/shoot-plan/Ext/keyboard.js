//按键检测的一个思路
keyboard = {
    KEY_UP:false,
    KEY_DOWN:false,
    KEY_LEFT:false,
    KEY_RIGHT:false,
	KEY_FIRE:false
    }
	
window.onkeydown = function(e) {
    var keyID = e.keyCode ? e.keyCode :e.which;//兼容IE
    if(keyID === 38 || keyID === 87)  { // up arrow and W  
        keyboard.KEY_UP = true;
        e.preventDefault(); 
    }
	if(keyID === 40 || keyID === 83)  { // down arrow and S  
        keyboard.KEY_DOWN = true;
        e.preventDefault();
    } 
    if(keyID === 37 || keyID === 65)  { // left arrow and A  
        keyboard.KEY_LEFT = true;
        e.preventDefault();
    }
    if(keyID === 39 || keyID === 68)  { // right arrow and D  
        keyboard.KEY_RIGHT = true;
        e.preventDefault(); 
    }
	if(keyID === 32) { // 空格键
	    keyboard.KEY_FIRE = true;
        e.preventDefault(); 
	}
}

window.onkeyup = function(e) {
    var keyID = e.keyCode ? e.keyCode :e.which;  
    if(keyID === 38 || keyID === 87)  { // up arrow and W  
        keyboard.KEY_UP = false;
        e.preventDefault(); 
    }
	if(keyID === 40 || keyID === 83)  { // down arrow and S  
        keyboard.KEY_DOWN = false;
        e.preventDefault();
    } 
    if(keyID === 37 || keyID === 65)  { // left arrow and A  
        keyboard.KEY_LEFT = false;
        e.preventDefault();
    }
    if(keyID === 39 || keyID === 68)  { // right arrow and D  
        keyboard.KEY_RIGHT = false;
        e.preventDefault(); 
    } 
	if(keyID === 32) { // 空格键
	    keyboard.KEY_FIRE = false;
        e.preventDefault(); 
	}
}
