class Wall {
    constructor(ctx, posX, posY, Width, Height, gameWidth, gameHeight, playerPos) {
        this.ctx = ctx
        this.wallPos = {
            x: posX,
            y: posY
        }
        this.wallSize = {
            w: Width,
            h: Height
        }
        this.wallImage = 'barricade.png'
        this.imageInstance = undefined
        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.lives = 20
        this.playerPos = playerPos
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.wallImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.wallPos.x, this.wallPos.y, this.wallSize.w, this.wallSize.h)
    }
}