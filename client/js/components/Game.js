import * as constants from '../constants.js';
import * as Entity from '../models/Entity.js';
import * as PlayerHelpers from '../helpers/PlayerHelpers.js';
import * as BulletHelpers from '../helpers/BulletHelpers.js';
import img from '../models/Images.js';

export const start = (socket) => {
    var ctx = document.querySelector('#ctx').getContext('2d');
    ctx.font = '30px Calibri';
    
    var Player = function (initPack) {
        var self = Entity.Base(initPack);
        self.draw = () => PlayerHelpers.draw(self, Player, selfId);
        Player.list[self.id] = self;
        return self;
    }
    Player.list = {};
    
    var Bullet = function (initPack) {
        var self = Entity.Base(initPack);
        self.draw = () =>  BulletHelpers.draw(self, Player, selfId);
    
        Bullet.list[self.id] = self;
        return self;
    }
    Bullet.list = {};
    
    var selfId = null;
    socket.on('init', function (data) {
        if (data.selfId)
            selfId = data.selfId;
        for (var i = 0; i < data.player.length; i++) {
            new Player(data.player[i]);
        }
        for (var i = 0; i < data.bullet.length; i++) {
            new Bullet(data.bullet[i]);
        }
    });
    
    socket.on('update', function (data) {
        for (var i = 0; i < data.player.length; i++) {
            var pack = data.player[i];
            var p = Player.list[pack.id];
            if (p) {
                if (pack.x !== undefined)
                    p.x = pack.x;
                if (pack.y !== undefined)
                    p.y = pack.y;
                if (pack.hp !== undefined)
                    p.hp = pack.hp;
                if (pack.score !== undefined)
                    p.score = pack.score;
            }
        }
    
        for (var i = 0; i < data.bullet.length; i++) {
            var pack = data.bullet[i];
            var b = Bullet.list[data.bullet[i].id];
            if (b) {
                if (pack.x !== undefined)
                    b.x = pack.x;
                if (pack.y !== undefined)
                    b.y = pack.y;
            }
        }
    });
    
    socket.on('remove', function (data) {
        for (var i = 0; i < data.player.length; i++) {
            delete Player.list[data.player[i]];
        }
        for (var i = 0; i < data.bullet.length; i++) {
            delete Bullet.list[data.bullet[i]];
        }
    });
    
    setInterval(function () {
        if (!selfId)
            return;
        ctx.clearRect(0, 0, 500, 500);
        drawMap();
        for (var i in Player.list) {
            Player.list[i].draw();
        }
    
        for (var i in Bullet.list) {
            Bullet.list[i].draw();
        }
        drawScore();
    }, 1000/60);
    
    var drawMap = function () {
        var x = constants.WIDTH /2 - Player.list[selfId].x;
        var y = constants.HEIGHT /2 - Player.list[selfId].y;
        ctx.drawImage(img.map, x, y);
    };
    
    var drawScore = function () {
        ctx.fillStyle = 'white';
        ctx.fillText(Player.list[selfId].score, 10, 30);
    };
};
