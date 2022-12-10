

var Constants = require('../scripts/Constants');

function Params(socket, initPack, removePack, SOCKET_LIST) {
    this.Player = require('./Player');
    this.socket = socket;
    this.initPack = initPack;
    this.removePack = removePack;
    this.USERS = Constants.USERS;
    this.SOCKET_LIST = SOCKET_LIST;
    this.DEBUG = Constants.DEBUG;
}

module.exports = Params;
