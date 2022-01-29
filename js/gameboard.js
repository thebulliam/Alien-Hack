class Gameboard {
    constructor(ctx, posX, posY,gameSize) {
        this.ctx = ctx
        this.gmPos = {
            x: posX,
            y: posY
        }
        this.gmSize = {
            w: 1200,
            h: 600
        }
        this.gameSize = gameSize
        this.gmImage = 'stones.png'
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.gmImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.gmPos.x, this.gmPos.y, this.gmSize.w, this.gmSize.h)
    }
}