import { _decorator, CCInteger, Collider2D, Component, Contact2DType, director, EventKeyboard, input, Input, IPhysics2DContact, KeyCode } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
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

    @property({
        type: PipePool
    })
    public pipePool: PipePool;
    private isGameOver = false;

    onLoad() {
        this.initListener();
        this.results.resetScore();
        this.isGameOver = true;
        director.pause();
    }

    initListener() {
        this.node.on(Input.EventType.TOUCH_START, () => {
            if (this.isGameOver) {
                this.resetGame();
            }
            this.bird.fly()
        }, this);
    }

    startGame() {
        this.isGameOver = false;
        this.results.hideResults();
        director.resume();
    }

    gameOver() {
        this.isGameOver = true;
        this.results.showResults();
        director.pause();
    }

    resetGame() {
        this.isGameOver = false;
        this.results.resetScore();
        this.bird.resetBird();
        this.pipePool.reset();
        this.startGame();
    }

    passPipe() {
        this.results.addScore();
    }

    createPipe() {
        this.pipePool.addPool();
    }

    contactGroundPipe() {
        const collider = this.bird.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        if (this.bird.isStruck) {
            this.isGameOver = true;
            this.gameOver();
        }
    }


    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.isStruck = true;
    }

    update() {
        this.contactGroundPipe()
    }
}


