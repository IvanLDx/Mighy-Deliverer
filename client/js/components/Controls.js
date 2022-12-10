export const start = (socket) => {
    document.onkeydown = function (event) {
        if (event.keyCode === 68) // d
            socket.emit('keyPress', {
                inputId: 'right', 
                state: true
            });
        if (event.keyCode === 83) // s
            socket.emit('keyPress', {
                inputId: 'down', 
                state: true
            });
        if (event.keyCode === 65) // a
            socket.emit('keyPress', {
                inputId: 'left', 
                state: true
            });
        if (event.keyCode === 87) // w
            socket.emit('keyPress', {
                inputId: 'up', 
                state: true
            });
    }
    
    document.onkeyup = function (event) {
        if (event.keyCode === 68) // d
            socket.emit('keyPress', {
                inputId: 'right', 
                state: false
            });
        if (event.keyCode === 83) // s
            socket.emit('keyPress', {
                inputId: 'down', 
                state: false
            });
        if (event.keyCode === 65) // a
            socket.emit('keyPress', {
                inputId: 'left', 
                state: false
            });
        if (event.keyCode === 87) // w
            socket.emit('keyPress', {
                inputId: 'up', 
                state: false
            });
    }
    
    document.onmousedown = function (event) {
        socket.emit('keyPress', {inputId: 'attack', state: true});
    };
    
    document.onmouseup = function (event) {
        socket.emit('keyPress', {inputId: 'attack', state: false});
    };
    
    document.onmousemove = function (event) {
        var x = -250 + event.clientX - 8;
        var y = -250 + event.clientY - 8;
        var angle = Math.atan2(y,x) / Math.PI * 180;
        socket.emit('keyPress', {inputId: 'mouseAngle', state: angle});
    };
};
