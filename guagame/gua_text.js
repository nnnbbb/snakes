class GuaText {
    constructor(game, content, x, y) {
        this.game = game
        this.content = content
        this.y = y
        this.x = x
    }
    static new(...args) {
        let i = new this(...args)
        return i
    }
    draw() {
        // draw labels
        let context = this.game.context
        context.strokeStyle = 'black'
        context.lineWidth = 6
        context.strokeText(this.content, this.x, this.y)
        context.fillText(this.content, this.x, this.y)
        context.fillStyle = '#ffffff'
    }
    setFontsize() {}
    updateContent(content) {
        this.content = content
    }
    update() {
    }
}
