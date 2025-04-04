// define Snake class

class Snake {
    head: HTMLElement
    bodies: HTMLCollectionOf<HTMLElement>
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div')!
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
    }

    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }

    set X(value: number) {
        if (this.X === value) {
            return
        }
        if (value < 0 || value > 290) {
            throw new Error('Snake hit the wall!')
        }
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }

    set Y(value: number) {
        if (this.Y === value) {
            return
        }
        if (value < 0 || value > 290) {
            throw new Error('Snake hit the wall!')
        }
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }

    addBody() {
        const newDiv = document.createElement('div')
        this.element.appendChild(newDiv)
    }

    moveBody() {
        console.log(this.X, this.Y)
        for (let i = this.bodies.length - 1; i > 0; i--) {
            const X = this.bodies[i - 1].offsetLeft
            const Y = this.bodies[i - 1].offsetTop
            this.bodies[i].style.left = X + 'px'
            this.bodies[i].style.top = Y + 'px'
        }
    }

    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            const body = this.bodies[i]
            if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
                throw new Error('Snake hit itself!')
            }
        }
    }

    private _direction = 'right'

    get direction() {
        return this._direction
    }

    set direction(value: string) {
        this._direction = value
    }
}

export default Snake