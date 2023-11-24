class SceneEnd extends GuaScene {
    constructor(game, mainScene) {
        super(game)
        // this.registerAction()
        this.mainScene = mainScene
        this.firstReplaceScene = false
    }
    draw() {
        // draw labels
        let context = this.game.context
        context.fillStyle = 'black'
        context.globalAlpha = 1
        context.fillRect(0, 0, 1000, 1000)
        context.fillStyle = 'black'

        // setTimeout(() => {
        //     log('replace')
        //     this.game.replaceScene(this.mainScene)
        // }, 100)
        if (!this.firstReplaceScene) {
            setTimeout(() => {
                log('replace scene')
                this.game.replaceScene(this.mainScene)
            }, 100)
            this.firstReplaceScene = true
        }
    }
    registerAction() {
        let game = this.game
        this.game.registerAction('q', () => {
            log('end')
            let scene = MainScene.new(game)
            game.replaceScene(scene)
        })
    }
}
