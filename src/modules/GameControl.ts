import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'

import { debouncer } from './HelperFunctions'

class GameControl {
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    private _prevDirection: string = '' // previous direction
    private _prevTimer: number = 0 // previous timer

    // game over flag
    isLive = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 10)
        this.init()
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }

    keydownHandler(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (this._prevDirection === 'down') return // prevent snake from going back)
                this.snake.direction = 'up'
                break
            case 'ArrowDown':
            case 's':
            case 'S':
                if (this._prevDirection === 'up') return // prevent snake from going back
                this.snake.direction = 'down'
                break
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (this._prevDirection === 'right') return // prevent snake from going back
                this.snake.direction = 'left'
                break
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (this._prevDirection === 'left') return // prevent snake from going back
                this.snake.direction = 'right'
                break
        }

        this.runImmediately()
    }

    runImmediately = debouncer(() => {
        this._prevTimer && clearTimeout(this._prevTimer) // clear previous timer
        this.run()
    }, 50)

    run() {
        this._prevDirection = this.snake.direction // store the previous direction

        if (!this.isLive) {
            return
        }
        let X = this.snake.X
        let Y = this.snake.Y

        switch (this.snake.direction) {
            case 'up':
                Y -= 10
                break
            case 'down':
                Y += 10
                break
            case 'left':
                X -= 10
                break
            case 'right':
                X += 10
                break
        }

        // check if snake eats food
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change()
            this.snake.addBody()
            this.scorePanel.addScore()
        }

        // check if snake hits wall or itself
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e) {
            alert((e as Error).message + ' GAME OVER!')
            this.isLive = false
        }

        // continue the game if isLive is true
        this.isLive && (this._prevTimer = setTimeout(this.run.bind(this), 500 - (this.scorePanel.level - 1) * 30))
    }
}

export default GameControl