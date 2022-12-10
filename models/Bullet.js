var Entity = require('../models/Entity');
var BulletHelpers = require('../scripts/helpers/BulletHelpers');

const Bullet = (Player, parent, angle, initPack) => {
    var self = Entity.Base();
    self = Entity.Bullet(self, Player, angle, parent);

    Bullet.list[self.id] = self;
    initPack.bullet.push(self.getInitPack());
    return self;
}
Bullet.list = {};
Bullet.update = (removePack) => BulletHelpers.update(Bullet, removePack);
Bullet.getAllInitPack = () => BulletHelpers.getAllInitPack(Bullet);

module.exports = Bullet;
