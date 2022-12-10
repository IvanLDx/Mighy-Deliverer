import * as Entity from './Entity.js';
import * as BulletHelpers from '../helpers/BulletHelpers.js';

export default function (initPack, Bullet, selfId) {
    var self = Entity.Base(initPack);
    self.draw = () =>  BulletHelpers.draw(self, selfId);

    Bullet.list[self.id] = self;
    return self;
};