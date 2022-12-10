import * as Entity from './Entity.js';
import * as PlayerHelpers from '../helpers/PlayerHelpers.js';

export default function (initPack, Player, selfId) {
    var self = Entity.Base(initPack);
    self.draw = () => PlayerHelpers.draw(self, selfId);
    Player.list[self.id] = self;
    return self;
}
