let log = console.log.bind(console)

let imageFromPath = function(path) {
    let img = new Image()
    img.src = path
    return img
}

let rectIntersects = function(a, b) {
    let o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}


const randomBetween = function (start, end) {
    // Math.random() 函数返回一个浮点,  伪随机数在范围[0，1)
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

let aInb = function (x, x1, x2) {
    return x >= x1 && x <= x2
}

