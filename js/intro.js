class Intro {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.introPos = {
            x: posX,
            y: posY
        }
        this.introSize = {
            w: 1200,
            h: 900
        }
        this.gameSize = gameSize
        this.introImage = 'start.png'
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.introImage}`
    }

    draw() {
        this.imageInstance.onload = () => this.ctx.drawImage(
            this.imageInstance, 
            this.introPos.x, 
            this.introPos.y, 
            this.introSize.w, 
            this.introSize.h
        )
    }
}