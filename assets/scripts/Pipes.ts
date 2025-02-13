import { _decorator, CCFloat, Component, find, Node, screen, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipes')
export class Pipes extends Component {
    @property({
        type: Node,
        tooltip: 'Top Pipe'
    })
    public topPipe: Node;
    @property({
        type: Node,
        tooltip: 'Bottom Pipe'
    })
    public bottomPipe: Node;
    @property({
        type: CCFloat,
        tooltip: 'Min Gap Height'
    })
    public minGapHeight: number = 175;
    @property({
        type: CCFloat,
        tooltip: 'Max Gap Height'
    })
    public maxGapHeight: number = 200;
    @property({
        type: CCFloat,
        tooltip: 'Max y pos for top pipe'
    })
    public maxYPos: number = 850;
    @property({
        type: CCFloat,
        tooltip: 'Min y pos for top pipe'
    })
    public minYPos: number = 400;
    isPass = false;

    public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
    public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
    public scene = screen.windowSize;
    public game;
    public pipeSpeed: number;
    public tempSpeed: number;

    onLoad() {
        this.game = find('GameCtrl').getComponent('GameCtrl');
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
    }

    initPos() {
        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width)
        this.tempStartLocationDown.x = (this.bottomPipe.getComponent(UITransform).width + this.scene.width)
        this.tempStartLocationUp.y = this.random(this.minYPos, this.maxYPos);
        const gap = this.random(this.minGapHeight, this.maxGapHeight);
        this.tempStartLocationDown.y = this.tempStartLocationUp.y - gap;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);
    }

    private random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    update(deltaTime: number) {
        this.tempSpeed = this.pipeSpeed * deltaTime;
        this.tempStartLocationDown = this.bottomPipe.position;
        this.tempStartLocationUp = this.topPipe.position;

        this.tempStartLocationUp.x -= this.tempSpeed;
        this.tempStartLocationDown.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);

        if (!this.isPass && this.topPipe.position.x < 0) {
            this.isPass = true;
            this.game.passPipe();
        }

        if (this.topPipe.position.x < -this.scene.width) {
            this.game.createPipe();
            this.destroy();
        }
    }
}


