import { Game } from './game';

window.addEventListener('DOMContentLoaded', () => {
    // Set global variable for cannonjs physics engine
    let game = new Game('renderCanvas');
    game.createScene();
    game.animate();
  });
