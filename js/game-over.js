class GameOver {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.goPos = {
            x: posX,
            y: posY
        }
        this.goSize = {
            w: 1200,
            h: 900
        }
        this.gameSize = gameSize
        this.goImage = 'gameover.png'
        this.imageInstance = undefined
        this.init()
    }
    
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.goImage}`
    }

    draw() {
        this.ctx.drawImage(
            this.imageInstance, 
            this.goPos.x, 
            this.goPos.y,
            this.goSize.w, 
            this.goSize.h
        )
    }
}