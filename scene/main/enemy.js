class Enemy extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    static new(...args) {
        return new this(...args)
    }
    setup() {
        this.hp = 3
        this.y = 200
        this.speed = 1
        this.dest = 500
    }

    update() {
        this.x += this.speed
        if (this.x >= this.dest) {
            log("arrive")
        }
    }
}
