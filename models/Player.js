var Entity = require('../models/Entity');
var PlayerHelpers = require('../scripts/helpers/PlayerHelpers');

var Player = function (id, Bullet, initPack) {
    var self = Entity.Base();
    self = Entity.Player(self, id, Bullet, initPack);

    Player.list[id] = self;

    initPack.player.push(self.getInitPack());
    return self;
};
Player.list = {};
Player.onConnect = (params) => PlayerHelpers.onConnect(params);
Player.getAllInitPack = () => PlayerHelpers.getAllInitPack(Player);
Player.onDisconnect = (Player, socket, removePack) => PlayerHelpers.onDisconnect(Player, socket, removePack);
Player.update = () => PlayerHelpers.update(Player);

module.exports = Player;