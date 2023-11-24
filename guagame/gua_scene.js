class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnable = false
        this.elements = []
    }
    static new(...args) {
        let i = new this(...args)
        return i
    }
    addElement(element) {
        element.scene = this
        this.elements.push(element)
    }
    removeElement(element) {
        this.elements = this.elements.filter((e) => e != element)
    }
    draw() {

        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            // this.game.drawImage(e)
            // elements是guaImage
            e.draw()
        }
    }
    update() {
        if (this.debugModeEnable) {
            for (let i = 0; i < this.elemements.length; i++) {
                let e = this.elemements[i]
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
        }
        // log("Scene", this)
    }
}
