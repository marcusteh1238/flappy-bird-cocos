import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    
    @property({
        type: Label
    })
    public scoreLabel: Label;

    @property({
        type: Label
    })
    public highScoreLabel: Label;
    
    @property({
        type: Label
    })
    public resultEnd: Label;

    maxScore: number = 0;
    currentScore: number = 0;

    updateScore(num: number) {
        this.currentScore = num;
        this.updateScoreLabel();
    }

    updateScoreLabel() {
        this.scoreLabel.string = `${this.currentScore}`;
    }

    
    resetScore() {
        this.updateScore(0);
        this.hideResults();
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.highScoreLabel.string = "High Score: " + this.maxScore;
        this.resultEnd.node.active = true;
    }

    hideResults() {
        this.highScoreLabel.node.active = false;
        this.resultEnd.node.active = false;
    }
}


