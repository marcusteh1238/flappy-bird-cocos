import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

const INITIAL_PIPE_COUNT = 3;

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab
    })
    public pipePrefab: Prefab;

    @property({
        type: Node
    })
    public pipePoolHome: Node;
    public pool = new NodePool();

    initPool() {
        this.pool.clear();
        this.pool = new NodePool();
        for (let i = 0; i < INITIAL_PIPE_COUNT; i++) {
            const pipe = instantiate(this.pipePrefab);
            if (i === 0) {
                this.pipePoolHome.addChild(pipe);
            } else {
                this.pool.put(pipe);
            }
        }

    }

    addPool() {
        let pipe: Node;
        if (this.pool.size() > 0) {
            pipe = this.pool.get();
        } else {
            pipe = instantiate(this.pipePrefab);
        }
        this.pipePoolHome.addChild(pipe);
    }

    reset() {
        this.pipePoolHome.removeAllChildren();
        this.initPool();
    }

    update(deltaTime: number) {
        
    }
}


