class Snake {
    constructor(game) {
        this.game = game;
        this.body = [
            [3, 2],
            [4, 2],
            [5, 2],
            [6, 2],
            [7, 2],
        ]
        this.initCD = 2
        this.moveCD = this.initCD
        // UDLR
        this.direction = 'L'
        this.eat = false
        this.dead = false
    }
    static new(...args) {
        let i = new this(...args);
        return i;
    }

    draw() {
        this.drawBody()
    }
    drawBody() {
        for (let [i, [x, y]] of this.body.entries()) {
            x = x * config.gridSize
            y = y * config.gridSize
            const size = config.gridSize - config.padding;
            const padding = config.padding / 2
            if (i === 0) {
                this.drawOneBody(x + padding, y + padding, size, size, '#A5C94C')
            } else {
                this.drawOneBody(x + padding, y + padding, size, size)

            }
        }

    }
    drawOneBody(x, y, w, h, color = "#E7700D") {
        this.game.scene.drawRect(x, y, w, h, color)
    }
    changeDirection(direction) {

        let oldDirection = this.direction

        if (oldDirection === 'L' && direction === 'R') {
            return
        } else if (oldDirection === 'R' && direction === 'L') {
            return
        } else if (oldDirection === 'U' && direction === 'D') {
            return
        } else if (oldDirection === 'D' && direction === 'U') {
            return
        }
        this.direction = direction

    }
    eating() {
        this.eat = true
    }
    nextPlace() {
        let direction = this.direction
        let [x, y] = this.body[0]
        let firstBody
        if (direction === 'L') {
            firstBody = [--x, y]

        } else if (direction === 'R') {
            firstBody = [++x, y]

        } else if (direction === 'U') {
            firstBody = [x, --y]

        } else if (direction === 'D') {
            firstBody = [x, ++y]

        }
        return firstBody
    }

    move() {
        let firstBody = this.nextPlace()
        this.body.unshift(firstBody)
        if (this.eat === false) {
            this.body.pop()
        } else {
            this.eat = false
        }
    }
    checkDie() {
        let [nx, ny] = this.nextPlace()
        // 横斜
        let maxY = config.canvasHeight / config.gridSize
        // 竖线
        let maxX = config.canvasWidth / config.gridSize

        for (let i = 1; i < this.body.length; i++) {
            let [cx, cy] = this.body[i]
            if (nx === cx && ny === cy) {
                this.dead = true
                break
            }
        }
        if (nx < 0) {
            this.dead = true
        }
        if (ny < 0) {
            this.dead = true
        }
        if (nx >= maxX ) {
            this.dead = true
        }
        if (ny >= maxY ) {
            this.dead = true
        }


    }
    update() {
        if (this.moveCD === 0) {
            this.moveCD = this.initCD
            this.checkDie()
            this.move()
        }
        if (this.dead === false) {
            this.moveCD--
        }

    }
}
