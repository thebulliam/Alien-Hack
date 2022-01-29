class Background {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.bgPos = {
            x: posX,
            y: posY
        }
        this.bgSize = {
            w: 1200,
            h: 200
        }
        this.gameSize = gameSize
        this.bgImage = 'acera.png'
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.bgImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.bgPos.x, this.bgPos.y, this.bgSize.w, this.bgSize.h)
    }
}