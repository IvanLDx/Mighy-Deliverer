function isValidPassword (params) {
    return params.USERS[params.data.username] === params.data.password;
};

var isUsernameTaken = function (params) {
    return params.USERS[params.data.username];
}

var addUser = function (data) {
    USERS[data.username] = data.password;
}

const signIn = (data, params) => {
    params.data = data;
    if (isValidPassword(params)) {
        params.Player.onConnect(params);
        params.socket.emit('signInResponse', { success: true });
    } else {
        params.socket.emit('signInResponse', { success: false });
    }
};

const signUp = (data, params) => {
    params.data = data;
    if (isUsernameTaken(params)) {
        params.socket.emit('signUpResponse', { success: false });
    } else {
        addUser(params);
        params.socket.emit('signUpResponse', { success: true });
    }
}

const disconnect = (params) => {
    delete params.SOCKET_LIST[params.socket.id];
    params.Player.onDisconnect(params.Player, params.socket, params.removePack);
};

const isSignInEnabled = () => {
    return IS_SIGN_IN_ENABLED;
};

const sendMsgToServer = (data, params) => {
    var playerName = ('' + params.socket.id).slice(2, 7);
    for (var i in params.SOCKET_LIST) {
        params.SOCKET_LIST[i].emit('addToChat', playerName + ': ' + data);
    }
}

const evalServer = (data, params) => {
    if (!params.DEBUG) {
        return;
    }
    var res = eval(params[data]);
    params.socket.emit('evalAnswer', res);
}

module.exports = {
    signIn,
    signUp,
    isSignInEnabled,
    disconnect,
    sendMsgToServer,
    evalServer
}
