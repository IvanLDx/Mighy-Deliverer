export const start = (socket) => {
    var chatText = document.querySelector('#chat-text');
    var chatInput = document.querySelector('#chat-input');
    var chatForm = document.querySelector('#chat-form');
    
    socket.on('addToChat', function (data) {
        chatText.innerHTML += '<div>' + data + '</div>';
    });
    
    socket.on('evalAnswer', function (data) {
        console.info(data);
    });
    
    chatForm.onsubmit = function(e) {
        e.preventDefault();
        if (chatInput.value[0] === '/')
            socket.emit('evalServer', chatInput.value.slice(1));
        else 
            socket.emit('sendMsgToServer', chatInput.value);
        chatInput.value = '';
    }
};

