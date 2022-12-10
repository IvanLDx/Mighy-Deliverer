import * as CT from '../../constants.js';

export var draw = (selfPlayer) => {
    CT.ctx.fillStyle = 'white';
    CT.ctx.fillText(selfPlayer.score, 10, 30);
};
