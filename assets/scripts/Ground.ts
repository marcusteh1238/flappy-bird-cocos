import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: 'Ground 1 is here'
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: 'Ground 2 is here'
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: 'Ground 3 is here'
    })
    public ground3: Node;

    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;

    public gameCtrl: GameCtrl = new GameCtrl();
    public gameSpeed: number = this.gameCtrl.speed;

    onLoad() {
        this.startup()
    }

    startup() {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1)
        this.ground2.setPosition(this.tempStartLocation2)
        this.ground3.setPosition(this.tempStartLocation3)
    }

    update(deltaTime: number) {
        this.updateGroundPos(deltaTime, this.tempStartLocation1, this.ground1, this.groundWidth1)
        this.updateGroundPos(deltaTime, this.tempStartLocation2, this.ground2, this.groundWidth2)
        this.updateGroundPos(deltaTime, this.tempStartLocation3, this.ground3, this.groundWidth3)
    }

    updateGroundPos(deltaTime: number, tempStartLocation: Vec3, ground: Node, groundWidth: number) {
        tempStartLocation = ground.position;
        tempStartLocation.x -= this.gameSpeed * deltaTime;
        const scene = director.getScene()
        const canvas = scene.getComponentInChildren(Canvas)
        const diffFromMinOffset = tempStartLocation.x + groundWidth
        if (diffFromMinOffset <= 0) {
            tempStartLocation.x = canvas.getComponent(UITransform).width + diffFromMinOffset;
        }
        ground.setPosition(tempStartLocation)
    }
}


