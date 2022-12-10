import Player from '../models/Player.js';

export var init = (data, selfId) => {
    console.info(data)
    if (data.selfId)
        selfId = data.selfId;
    for (var i = 0; i < data.player.length; i++) {
        new Player(data.player[i], Player, selfId);
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
};

export var remove = (data) => {
    for (var i = 0; i < data.player.length; i++) {
        delete Player.list[data.player[i]];
    }
};
