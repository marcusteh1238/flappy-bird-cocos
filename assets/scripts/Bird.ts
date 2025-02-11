import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({
        type: CCFloat,
        tooltip: 'how high bird can fly'
    })
    public jumpHeight: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'how long bird can fly'
    })
    public jumpDuration: number = 3.5;

    @property({
        type: Vec3,
        tooltip: 'starting point of bird'
    })
    public initialBirdLocation: Vec3 = new Vec3(-150, 0, 0);
    
    // @property({
    //     type: Animation,
    //     tooltip: 'bird animation'
    // })
    public birdAnimation: Animation;
    public birdLocation: Vec3;

    onLoad() {
        this.birdAnimation = this.node.getComponent(Animation);
        this.resetBird();
    }

    resetBird() {
        this.birdLocation = new Vec3(this.initialBirdLocation);
        this.node.setPosition(this.birdLocation);
        this.birdAnimation.play();
    }

    fly() {
        this.birdAnimation.stop();
        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(
                this.node.position.x,
                this.node.position.y + this.jumpHeight,
                this.node.position.z
            ), { 
                easing: 'smooth',
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.setPosition(target);
                }
            })
            .start();
    }
}


