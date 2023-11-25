class Grid {
    constructor(game, snake) {
        this.game = game;
        this.snake = snake;
        // 横斜
        this.row = config.canvasHeight / config.gridSize
        // 竖线
        this.col = config.canvasWidth / config.gridSize

    }
    static new(...args) {
        let i = new this(...args);
        return i;
    }

    draw() {
        // 横斜
        let row = this.row
        for (let i = 0; i < row; i++) {
            let y = i * config.gridSize;
            this.drawLine(0, y, config.canvasWidth, y);
        }
        // 竖线
        let col = this.col
        for (let j = 0; j < col; j++) {
            let x = j * config.gridSize;
            this.drawLine(x, 0, x, config.canvasHeight);
        }

    }
    drawLine(startX, startY, endX, endY) {
        let ctx = this.game.context;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    update() { }
}
