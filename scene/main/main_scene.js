class Line {
    constructor(game) {
        this.game = game
    }
    static new(...args) {
        let i = new this(...args)
        return i
    }

    draw() {
        for (let i = 0; i < 8; i++) {
            let y = i * 50
            this.drawLine(0, y, 600, y)
        }
        for (let j = 0; j < 12; j++) {
            let x = j * 50
            this.drawLine(x, 0, x, 400)
        }
    }
    drawLine(startX, startY, endX, endY) {
        let ctx = this.game.context
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.lineWidth = 1
        ctx.stroke()
    }

    update() { }
}
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
        let line = Line.new(this.game)
        this.addElement(line)

    }
    setupBG() {
        this.bg = GuaImage.new(this.game, 'bg')
        this.addElement(this.bg)
    }
    setupGameElements() {
        let e1 = Enemy.new(this.game, 'enemy')
        e1.y = 200
        this.addElement(e1)
    }

    setupHUD() {
        this.gun = GuaImage.new(this.game, 'gun')
        this.gun.x = 400
        this.gun.y = 300
        this.addElement(this.gun)
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
    }
    update() {
        super.update()
    }
}
