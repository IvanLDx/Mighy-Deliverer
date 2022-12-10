import * as CT from '../constants.js';
import * as SocketHelpers from '../helpers/SocketHelpers.js';
import * as MapHelpers from '../helpers/MapHelpers.js';
import * as Score from './interface/Score.js';
import Player from '../models/Player.js';
import Bullet from '../models/Bullet.js';
var ctx = CT.ctx

const action = (selfId) => {
    ctx.clearRect(0, 0, CT.width, CT.height);
    MapHelpers.drawMap(selfId);
    for (var i in Player.list) Player.list[i].draw();
    for (var i in Bullet.list) Bullet.list[i].draw();
    Score.draw(Player.list[selfId]);
};

export const start = (socket) => {
    ctx.font = '30px Calibri';

    Player.list = {};
    Bullet.list = {};
    
    var selfId = null;
    socket.on('init', data => selfId = SocketHelpers.init(data, selfId));
    socket.on('update', data => SocketHelpers.update(data));
    socket.on('remove', data => SocketHelpers.remove(data));
    
    setInterval(function () {
        if (!selfId) return;
        action(selfId);
    }, 1000/60);
};
