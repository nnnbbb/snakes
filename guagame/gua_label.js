class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.alive = true

    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {
        // 必须有一个update
    }
}