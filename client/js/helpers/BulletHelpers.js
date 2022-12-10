import * as CT from '../constants.js';
import img from '../models/Images.js';

export const draw = (self, Player, selfId) => {
    var width = img.bullet.width / 2;
    var height = img.bullet.height / 2;

    var x = self.x - Player.list[selfId].x + CT.width / 2;
    var y = self.y - Player.list[selfId].y + CT.height /2;

    CT.ctx.drawImage(img.bullet,
        0, 0, img.bullet.width, img.bullet.height,
        x - width / 2, y - height / 2, width, height);
};
