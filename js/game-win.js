class GameWin {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.gwPos = {
            x: posX,
            y: posY
        }
        this.gwSize = {
            w: 1200,
            h: 900
        }
        this.gameSize = gameSize
        this.gwImage = 'win.png'
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.gwImage}`
    }

    draw() {
        this.ctx.drawImage(
            this.imageInstance, 
            this.gwPos.x, 
            this.gwPos.y, 
            this.gwSize.w, 
            this.gwSize.h
        )
    }
}