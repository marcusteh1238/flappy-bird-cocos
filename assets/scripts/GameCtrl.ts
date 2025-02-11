import { _decorator, CCInteger, Component, director, EventKeyboard, input, Input, KeyCode } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: Ground,
        tooltip: 'Ground is here'
    })
    public ground: Ground;

    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 200;

    @property({
        type: Results
    })
    public results: Results;

    @property({
        type: Bird
    })
    public bird: Bird;

    onLoad() {
        this.initListener();
        this.results.resetScore();
        director.pause();
    }

    // TODO: Delete in final version
    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
                break;
            case KeyCode.KEY_P:
                this.results.addScore();
                break;
            case KeyCode.KEY_Q:
                this.resetGame();
                break;
        }
    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(Input.EventType.TOUCH_START, () => {
            this.bird.fly()
        }, this);
    }

    startGame() {
        this.results.hideResults();
        director.resume();
    }

    gameOver() {
        this.results.showResults();
        director.pause();
    }

    resetGame() {
        this.results.resetScore();
        this.bird.resetBird();
        this.startGame();
    }
}


