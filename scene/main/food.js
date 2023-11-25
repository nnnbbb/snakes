class Food {
    constructor(game, snake) {
        this.game = game;

        let [foodX, foodY] = this.randomXY()
        let isSnakeBody = snake.body.some(([x, y]) => x === foodX && y === foodY)

        while (isSnakeBody === true) {
            [foodX, foodY] = this.randomXY()
            isSnakeBody = snake.body.some(([x, y]) => x === foodX && y === foodY)
        }
        this.x = foodX
        this.y = foodY

    }
    static new(...args) {
        let i = new this(...args);
        return i;
    }
    randomXY() {
        let foodX = randomBetween(0, config.canvasWidth / config.gridSize - 1)
        let foodY = randomBetween(0, config.canvasHeight / config.gridSize - 1)
        return [foodX, foodY]
    }
    draw() {
        let x = this.x * config.gridSize
        let y = this.y * config.gridSize
        const size = config.gridSize - config.padding;
        const padding = config.padding / 2

        this.game.scene.drawRect(x + padding, y + padding, size, size, '#61AFEF')
    }

    update() { }
}
