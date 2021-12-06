import Game from "./src/game.js";
import View from './src/view.js';

const root = document.querySelector('#root')

const game = new Game();
const view = new View(root, 480, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', e => {
    switch(e.keyCode) {
        case 37: //LEFT ARROW
            game.movePieceLeft();
            view.renderMainScreen(game.getState())
            break;
        case 38: // UP ARROW
            game.rotatePiece();
            view.renderMainScreen(game.getState())
            break;
        case 39: //RIGHT ARROW
            game.movePieceRight();
            view.renderMainScreen(game.getState())
            break;
        case 40: //DOWN ARROW
            game.movePieceDown();
            view.renderMainScreen(game.getState())
            break;
    }
});
