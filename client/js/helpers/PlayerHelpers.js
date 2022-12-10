import * as constants from '../constants.js';
import img from '../models/Images.js';

export const draw = (self, Player, selfId) => {
    var x = self.x - Player.list[selfId].x + constants.WIDTH / 2;
    var y = self.y - Player.list[selfId].y + constants.HEIGHT /2;

    var hpWidth = 30 * self.hp / self.hpMax;
    constants.CTX.fillStyle = 'brown';
    constants.CTX.fillRect(
        x - hpWidth / 2,
        y - 40,
        hpWidth, 4);
    
    var width = img.player.width * 2;
    var height = img.player.height * 2;


    constants.CTX.drawImage(img.player,
        0, 0, img.player.width, img.player.height,
        x - width / 2, y-height / 2, width, height);
};
