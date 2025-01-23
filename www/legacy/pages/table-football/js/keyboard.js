
var keyboard = {
    KEY_P1_UP : false,
    KEY_P1_DOWN : false,
    KEY_P2_UP : false,
    KEY_P2_DOWN : false
};

window.onkeydown = function(e) {
    var keyID = e.keyCode ? e.keyCode :e.which;//兼容IE
    if(keyID === 38)  { // up arrow and W
        keyboard.KEY_P2_UP = true;
        e.preventDefault();
    }
    if(keyID === 40)  { // down arrow and S
        keyboard.KEY_P2_DOWN = true;
        e.preventDefault();
    }
    if(keyID === 87)  { // up arrow and W
        keyboard.KEY_P1_UP = true;
        e.preventDefault();
    }
    if(keyID === 83)  { // down arrow and S
        keyboard.KEY_P1_DOWN = true;
        e.preventDefault();
    }
};

window.onkeyup = function(e) {
    var keyID = e.keyCode ? e.keyCode :e.which;
    if(keyID === 38)  { // up arrow and W
        keyboard.KEY_P2_UP = false;
        e.preventDefault();
    }
    if(keyID === 40)  { // down arrow and S
        keyboard.KEY_P2_DOWN = false;
        e.preventDefault();
    }
    if(keyID === 87)  { // up arrow and W
        keyboard.KEY_P1_UP = false;
        e.preventDefault();
    }
    if(keyID === 83)  { // down arrow and S
        keyboard.KEY_P1_DOWN = false;
        e.preventDefault();
    }
};
