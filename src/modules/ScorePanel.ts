class ScorePanel {
    score = 0
    level = 1
    scoreElement: HTMLElement
    levelElement: HTMLElement

    maxLevel: number
    levelUpThresholdScore: number

    constructor(maxLevel: number = 10, levelThresholdScore: number = 10) {
        const theScoreElement = document.getElementById('score')
        const theLevelElement = document.getElementById('level')
        if (!theScoreElement) {
            throw new Error('Score element not found in the DOM')
        }
        if (!theLevelElement) {
            throw new Error('Level element not found in the DOM')
        }
        this.scoreElement = theScoreElement
        this.levelElement = theLevelElement

        this.maxLevel = maxLevel
        this.levelUpThresholdScore = levelThresholdScore
    }

    addScore() {
        this.scoreElement.innerHTML = ++this.score + ''
        if (this.score % this.levelUpThresholdScore === 0) {
            this._addLevel()
        }
    }

    private _addLevel() {
        if (this.level < this.maxLevel) {
            this.levelElement.innerHTML = ++this.level + ''
        }
    }
}

//const scorePanel = new ScorePanel()
//for (let i = 0; i < 355; i++) {
//    scorePanel.addScore()
//}

export default ScorePanel