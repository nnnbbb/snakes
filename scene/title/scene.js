// const config = {
//     player_speed: 8,
//     cloud_speed: 2,
//     enemy_speed: 5,
//     bullet_speed: 5,
//     fire_cooldown: 9,
// }


class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.Bullet = []
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(this.game, 'sky')
        this.cloud = Cloud.new(this.game, 'cloud')

        this.player = Player.new(this.game)
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addEnemies()
        this.addElement(this.player)
        // add particles
        let ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
    }
    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            let e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    addBullet(b) {
        this.addElement(b)
        this.Bullet.push(b)
    }
    setupInputs() {
        let g = this.game
        let s = this
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('s', function () {
            s.player.moveDown()
        })
        g.registerAction('j', function () {
            s.player.fire()
        })
    }
    update() {
        super.update()
    }
}
