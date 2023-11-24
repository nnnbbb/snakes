class GuaImage {
    constructor(game, name) {
        this.alive = true
        this.game = game
        this.name = name
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height

    }
    static new(...args) {
        return new this(...args)
    }
    draw() {
        this.game.drawImage(this)
    }
    hasPoint(x, y) {
        let xIn = x >= this.x && x <= this.x + this.w
        let yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }

    clone() {
        let clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
        return clone
    }
    debug() {
        // mouse event
        let enableDrag = false
        this.game.canvas.addEventListener('mousedown', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            // 检查是否点中了 ball
            if (this.hasPoint(x, y)) {
                // 设置拖拽状态
                log('hasPoint text', x, y)

                enableDrag = true
            }
        })
        this.game.canvas.addEventListener('mousemove', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            // log(x, y, 'move')
            if (enableDrag) {
                // log(x, y, 'drag')
                this.x = x
                this.y = y
            }
        })
        this.game.canvas.addEventListener('mouseup', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            // log(x, y, 'up')
            enableDrag = false
        })
    }

    update() {
        // this.debug()
    }
}
