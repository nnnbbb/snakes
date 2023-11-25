class MainScene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.registerAction()
    }
    setup() {
        // Draw the Path
        // this.setupBG()

        // this.setupHUD()
        this.setupInputs()
        // this.setupGameElements()
        this.snake = Snake.new(this.game)
        this.addElement(this.snake)

        this.grid = Grid.new(this.game, this.snake)
        this.addElement(this.grid)

        this.generateFood()

        let result = this.pathFinding()
        this.finding = result

    }
    pathFinding() {
        let gridIn = []
        for (let x = 0; x < this.grid.col; x++) {
            let ya = []
            for (let y = 0; y < this.grid.row; y++) {

                let snakeBody = this.snake.body.some(([sx, sy]) => sx === x && sy === y)
                if (snakeBody) {
                    ya.push(0)
                } else {
                    ya.push(1)
                }
            }
            gridIn.push(ya)
        }
        let [sx, sy] = this.snake.body[0]
        let fx = this.food.x
        let fy = this.food.y
        this.graph = new Graph(gridIn)
        const graphGrid = this.graph.grid
        const start = graphGrid[sx][sy]
        const end = graphGrid[fx][fy]
        let result = astar.search(this.graph, start, end, { closest: true })
        return result
    }

    setupBG() {
        this.bg = GuaImage.new(this.game, 'bg')
        this.addElement(this.bg)
    }
    die() {
        let d = GuaText.new(this.game, "YOU DIE", 200, 200)
        this.addElement(d)
    }
    setupGameElements() {
        let e1 = Enemy.new(this.game, 'enemy')
        e1.y = 200
        this.addElement(e1)
    }
    generateFood() {
        this.food = Food.new(this.game, this.snake)
        this.addElement(this.food)
    }
    setupHUD() {
        this.gun = GuaImage.new(this.game, 'gun')
        this.gun.x = 400
        this.gun.y = 300
        this.addElement(this.gun)
    }
    drawRect(x, y, w, h, color = "#E7700D") {
        let ctx = this.game.context;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    setupInputs() {
        let drag = false
        let ox = 0
        let oy = 0
        this.game.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY

            if (this.gun && this.gun.hasPoint(x, y) && status === "down") {
                this.tower = this.gun.clone()
                ox = Math.abs(x - this.gun.x)
                oy = Math.abs(y - this.gun.y)
                this.addElement(this.tower)
                drag = true
            } else if (status === "move") {
                if (this.tower) {
                    this.tower.x = x - ox
                    this.tower.y = y - oy
                }
            } else {
                this.removeElement(this.tower)
                drag = false
            }

        })
    }
    registerAction() {
        this.game.registerAction('w', () => {
            this.snake.changeDirection('U')
        })
        this.game.registerAction('s', () => {
            this.snake.changeDirection('D')
        })
        this.game.registerAction('a', () => {
            this.snake.changeDirection('L')
        })
        this.game.registerAction('d', () => {
            this.snake.changeDirection('R')
        })
    }
    update() {
        super.update()

        let [sx, sy] = this.snake.body[0]
        let ate = sx === this.food.x && sy === this.food.y
        if (ate) {
            this.snake.eating()
            this.removeElement(this.food)
            this.generateFood()
            this.finding = this.pathFinding()
        }
        if (this.snake.dead === true) {
            this.die()
        }
        try {
            config.autoEat && this.autoEating(sx, sy)
        } catch { }

    }

    autoEating(sx, sy) {
        let px = this.finding[0].x
        let py = this.finding[0].y
        if (px === sx && py === sy) {
            this.finding.pop(0)
        }
        if (px > sx) {
            this.snake.changeDirection('R')
        } else if (px < sx) {
            this.snake.changeDirection('L')
        } else if (py > sy) {
            this.snake.changeDirection('D')
        } else if (py < sy) {
            this.snake.changeDirection('U')
        }
        this.finding = this.pathFinding()
    }
}
