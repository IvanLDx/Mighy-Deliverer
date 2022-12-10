var Server = require('./scripts/Server');
var io = require('socket.io')(Server.self(), {});
var Player = require('./models/Player');
var Bullet = require('./models/Bullet');
Server.start(__dirname);

var SOCKET_LIST = {};

io.sockets.on('connection', socket => Server.socketsConnection(socket, initPack, removePack, SOCKET_LIST));

var initPack = { player: [], bullet: [] };
var removePack = { player: [], bullet: [] };

setInterval(function() {
    var pack = {
        player: Player.update(),
        bullet: Bullet.update(removePack)
    };

    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('init',initPack);
        socket.emit('update', pack);
        socket.emit('remove', removePack);
    }

    initPack.player = [];
    initPack.bullet = [];
    removePack.player = [];
    removePack.bullet = [];
}, 1000/25);