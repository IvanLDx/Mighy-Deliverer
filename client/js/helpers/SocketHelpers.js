import Player from '../models/Player.js';
import Bullet from '../models/Bullet.js';

export var init = (data, selfId) => {
    if (data.selfId)
        selfId = data.selfId;
    for (var i = 0; i < data.player.length; i++) {
        new Player(data.player[i], Player, selfId);
    }
    for (var i = 0; i < data.bullet.length; i++) {
        new Bullet(data.bullet[i], Bullet, selfId);
    }

    return selfId;
};

export var update = (data) => {
    for (var i = 0; i < data.player.length; i++) {
        var pack = data.player[i];
        var p = Player.list[pack.id];
        if (!p) return;

        p.x = pack.x ? pack.x : p.x;
        p.y = pack.y ? pack.y : p.y;
        p.hp = pack.hp ? pack.hp : p.hp;
        p.score = pack.score ? pack.score : p.score;
    }

    for (var i = 0; i < data.bullet.length; i++) {
        var pack = data.bullet[i];
        var b = Bullet.list[data.bullet[i].id];
        if (!b) return;

        b.x = pack.x ? pack.x : b.x;
        b.y = pack.y ? pack.y : b.y;
    }
};

export var remove = (data) => {
    for (var i = 0; i < data.player.length; i++) {
        delete Player.list[data.player[i]];
    }
    for (var i = 0; i < data.bullet.length; i++) {
        delete Bullet.list[data.bullet[i]];
    }
};
