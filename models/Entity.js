const Base = function () {
    var self = {
        x: 250,
        y: 250,
        spdX: 0,
        spdY: 0,
        id: ''
    }
    self.update = function () {
        self.updatePosition()
    };
    self.updatePosition = function () {
        self.x += self.spdX;
        self.y += self.spdY;
    };
    self.getDistance = function (pt) {
        return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
    }
    return self;
}

const Player = (self, id, Bullet, initPack) => {
    self.id = id;
    self.number = '' + Math.floor(10 * Math.random());
    self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;
    self.pressingAttack = false;
    self.mouseAngle = 0;
    self.maxSpd = 10;
    self.hp = 10;
    self.hpMax = 10;
    self.score = 0;

    var super_update = self.update;
    self.update = function () {
        self.updateSpd();
        super_update();

        if (self.pressingAttack) {
            self.shootBullet(self.mouseAngle, initPack);
        }
    };

    self.shootBullet = function (angle, initPack) {
        var b = Bullet(require('./Player'), self.id, angle, initPack);
        b.x = self.x;
        b.y = self.y;
    }

    self.updateSpd = function () {
        if (self.pressingRight) {
            self.spdX = self.maxSpd;
        } else if (self.pressingLeft) {
            self.spdX = -self.maxSpd;
        } else {
            self.spdX = 0;
        }

        if (self.pressingUp) {
            self.spdY = -self.maxSpd;
        } else if (self.pressingDown) {
            self.spdY = self.maxSpd;
        } else {
            self.spdY = 0;
        }
    };

    self.getInitPack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number,
            hp: self.hp,
            hpMax: self.hpMax,
            score: self.score
        };
    };

    self.getUpdatePack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            hp: self.hp,
            score: self.score
        };
    };

    return self;
}

const Bullet = (self, Player, angle, parent) => {
    self.id = Math.random();
    self.spdX = Math.cos(angle/180*Math.PI) * 10;
    self.spdY = Math.sin(angle/180*Math.PI) * 10;
    self.parent = parent;
    self.timer = 0;
    self.toRemove = false;

    var super_update = self.update;
    self.update = function () {
        if (self.timer++ > 100)
            self.toTemove = true;
        super_update();

        for (var i in Player.list) {
            var p = Player.list[i];
            if (self.getDistance(p) < 32 && self.parent !== p.id) {
                p.hp -= 1;

                if (p.hp <= 0) {
                    var shooter = Player.list[self.parent];
                    if (shooter) {
                        shooter.score += 1;
                    }
                    p.hp = p.hpMax;
                    p.x = Math.random() * 500;
                    p.y = Math.random() * 500;
                }
                self.toRemove = true;
            }
        }
    }

    self.getInitPack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number
        };
    };

    self.getUpdatePack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number
        };
    };

    return self;
}

module.exports = {
    Base,
    Player,
    Bullet
}