let enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    // 全局變量window.paused
    window.paused = false
    window.addEventListener('keydown', function (event) {
        let k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        let input = event.target
        window.fps = Number(input.value)
    })

    document.querySelector('#id-input-auto-eat').addEventListener('change', function (event) {
        const checked = this.checked
        config.autoEat = checked
        if (checked) {
            console.log("Checkbox is checked..", checked);
        } else {
            console.log("Checkbox is not checked..", checked);
        }
    })


    game.canvas.addEventListener('click', function (event) {
        let x = event.offsetX
        let y = event.offsetY
        log('x', x, 'y', y)
    })
}

let __main = function () {
    let images = {
        bg: 'img/background.png',
        gun: 'img/gun2.png',
        enemy: 'img/e2.png',
    }
    let game = GuaGame.instance(30, images, function (g) {
        let s = MainScene.new(g)
        // let s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
