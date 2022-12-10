const ForIn = require('../ForIn');

function onKeyPress(player, data) {
    if (data.inputId === 'left') {
        player.pressingLeft = data.state;
    } else if (data.inputId === 'right') {
        player.pressingRight = data.state;
    } else if (data.inputId === 'up') {
        player.pressingUp = data.state;
    } else if (data.inputId === 'down') {
        player.pressingDown = data.state;
    } else if (data.inputId === 'attack') {
        player.pressingAttack = data.state;
    } else if (data.inputId === 'mouseAngle') {
        player.mouseAngle = data.state;
    }
}

var Player = {};

Player.onConnect = function (params) {
    var player = params.Player(params.socket.id, params.initPack);
    params.socket.on('keyPress', data => onKeyPress(player, data));

    var players = [];
    ForIn(params.Player.list, item => players.push(item.getInitPack()));

    var context = {
        selfId: params.socket.id,
        player: params.Player.getAllInitPack()
    }

    params.socket.emit('init', context);
};

Player.getAllInitPack = function (Player) {
    var players = [];
    ForIn(Player.list, item => players.push(item.getInitPack()));
    return players;
};

Player.onDisconnect = function (Player, socket, removePack) {
    delete Player.list[socket.id];
    removePack.player.push(socket.id);
};

Player.update = function (Player) {
    var pack = [];
    ForIn(Player.list, item => {
        item.update();
        pack.push(item.getUpdatePack());
    });
    return pack;
};

module.exports = Player;
