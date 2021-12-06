export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalId = null;
        this.isPlaying = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.view.renderStartScreen();
    }

    updateView() {
        const state = this.game.getState()

        if(state.isGameOver) {
            this.view.renderEndScreen(state);
            this.isPlaying = false;
        } else if(!this.isPlaying) {
            this.view.renderPauseScreen();
        } else {
            this.view.renderMainScreen(state);
        }
    }

    updateGame() {
        this.game.movePieceDown();
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }


    startTimer() {
        const level = this.game.getState().level
        const speed = 1000 - level * 100
        if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.updateGame();
            }, speed > 0 && level <= 10 ? speed : 100);
        }
    }

    stopTimer() {
        if(this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset() {
        this.game.reset();
        this.play()
    }

    handleKeyDown(e) {
        const state = this.game.getState();
        switch(e.key) {
            case 'Enter': //Enter
                if(state.isGameOver) {
                    this.reset();
                } else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }                
            case 'ArrowLeft': //LEFT ARROW
                if((this.isPlaying || !state.isGameOver) && e.key !== 'Enter') {
                    this.game.movePieceLeft();
                    this.view.renderMainScreen(state);
                }
                break;
            case 'ArrowUp': // UP ARROW
                if(this.isPlaying || !state.isGameOver) {
                    this.game.rotatePiece();
                    this.view.renderMainScreen(state);
                }
                break;
            case 'ArrowRight': //RIGHT ARROW
                if(this.isPlaying || !state.isGameOver) {
                    this.game.movePieceRight();
                    this.view.renderMainScreen(state);
                }
                break;
            case 'ArrowDown': //DOWN ARROW
                if(this.isPlaying || !state.isGameOver) {
                    this.stopTimer();
                    this.game.movePieceDown();
                    this.view.renderMainScreen(state);
                }
                break;
        }
    }

    handleKeyUp(e) {
          const state = this.game.getState();
        switch(e.key) {
            case 'ArrowDown': //DOWN ARROW
                    this.startTimer();
            break;
        }
    }
}