// define food class
class Food {
    private element: HTMLElement
    constructor() {
        const theFoodElement = document.getElementById('food')
        if (!theFoodElement) {
            throw new Error('Food element not found in the DOM')
        }
        this.element = theFoodElement
    }

    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    change() {
        const top = Math.round(Math.random() * 29) * 10
        const left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

//const food = new Food()
//console.log(food.X, food.Y)
//food.change()
//console.log(food.X, food.Y)

// define score panel class

export default Food