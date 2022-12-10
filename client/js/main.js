import * as Sign from './components/Sign.js';
import * as Chat from './components/Chat.js';
import * as Game from './components/Game.js';
import * as Controls from './components/Controls.js';

var socket = io();
Sign.start(socket);
Chat.start(socket);
Game.start(socket);
Controls.start(socket);
