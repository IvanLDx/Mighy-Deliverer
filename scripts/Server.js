var express = require('express');
var app = express();
var serv = require('http').Server(app);

const start = (dirname) => {    
    app.get('/', function(req, res) {
        res.sendFile(dirname + '/client/index.html');
    });
    app.use('/client', express.static(dirname + '/client'));

    serv.listen(3000);
};

const self = () => {
    return serv;
};

const socketsConnection = (socket, initPack, removePack, SOCKET_LIST) => {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    var SocketHelpers = require('./helpers/SocketHelpers');
    var Params = require('../models/Params');
    var params = new Params(socket, initPack, removePack, SOCKET_LIST);

    socket.on('signIn', data => SocketHelpers.signIn(data, params));
    socket.on('signUp', data => SocketHelpers.signUp(data, params));
    socket.on('disconnect', () => SocketHelpers.disconnect(params));
    socket.on('sendMsgToServer', data => SocketHelpers.sendMsgToServer(data, params));
    socket.on('evalServer', data => SocketHelpers.evalServer(data, params));
};

module.exports = {
    start,
    self,
    socketsConnection
}
