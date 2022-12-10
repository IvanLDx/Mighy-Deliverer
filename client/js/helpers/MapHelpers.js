import * as CT from '../constants.js';
import Player from '../models/Player.js';
import img from '../models/Images.js';

export var drawMap = (selfId) => {
    var x = CT.width /2 - Player.list[selfId].x;
    var y = CT.height /2 - Player.list[selfId].y;
    CT.ctx.drawImage(img.map, x, y);
};
