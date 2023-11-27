class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.sceneList = {}
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')

        this.context = this.canvas.getContext('2d')


        // this.context.font = '50px serif';
        this.context.font = "55px 'flappy bird'"

        // events
        let self = this
        this.mouseEvents = []
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = 'down'
        })
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = 'up'
        })
        let moveing = false
        window.addEventListener('mousedown', (event) => {
            moveing = true
            for (const a of this.mouseEvents) {
                a(event, 'down')
            }
        })
        window.addEventListener('mousemove', (event) => {
            if (moveing) {
                for (const a of this.mouseEvents) {
                    a(event, 'move')
                }
            }
        })
        window.addEventListener('mouseup', (event) => {
            moveing = false
            for (const a of this.mouseEvents) {
                a(event, 'up')
            }
        })

        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        // img 是一個 GuaImage
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // update
    update() {
        if (window.paused) {
            return
        }
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    registerMouse(callback) {
        this.mouseEvents.push(callback)
    }
    removeAction(key) {
        delete this.actions[key]
    }
    events() {
        let g = this
        let actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            // console.log("actions", actions)
            let key = actions[i]
            let status = g.keydowns[key]
            // log("status", status)
            // log('key', key)
            if (status == 'down') {
                g.actions[key]('down')
                // delete g.actions[key]
            } else if (status == 'up') {
                g.actions[key]('up')
                // 删除这个key 的状态
                g.keydowns[key] = null
            }
            // if (g.keydowns[key]) {
            //     // 如果按键被按下, 调用注册的 action
            //     g.actions[key]()
            // }
        }
    }
    runloop() {
        let g = this

        // events
        g.events()

        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

        // draw
        g.draw()

        // update
        g.update()
        // next run loop
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }
    textureByName(name) {
        let g = this
        // log('image by name', g.images)
        let img = g.images[name]

        return img
    }
    runWithScene(scene) {
        let g = this
        // let s = this.sceneList[scene]
        // console.log("s", s)
        g.scene = scene
        // 开始运行程序
        g.runloop()

    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start() {
        this.runCallback(this)
    }

    init() {
        let g = this

        let loads = []
        // 预先载入所有图片
        let names = Object.keys(g.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    log('load images', g.images)
                    g.__start()
                }
            }
        }
    }
}
