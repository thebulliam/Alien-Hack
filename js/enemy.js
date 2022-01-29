class Enemy {
    constructor(ctx, posX, posY, gameWidth, gameHeight) {
        this.ctx = ctx
        this.enemyPos = {
            x: posX,
            y: posY
        }
        this.enemySize = {
            w: 100,
            h: 100
        }
        this.enemyImage = 'alien.png'
        this.imageInstance = undefined
        this.gameSize = {
            w: gameWidth,
            h: gameHeight
        }
        this.lives = 5
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.enemyImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }

    goHide() { //enemy to K4 900 500
        if (this.enemyPos.x < 700 && this.enemyPos.y < 500) {
            this.enemyPos.x += 50
            this.enemyPos.y += 50
        } else if (this.enemyPos.x > 700 && this.enemyPos.y > 500) {
            this.enemyPos.x -= 50
            this.enemyPos.y -= 50
        }
    }
}

class Ufos extends Enemy {
    constructor(ctx, posX, posY,  framesCounter) {
        super(ctx)

        this.ctx = ctx
        this.enemyPos = {
            x: posX,
            y: posY
        }
        this.enemySize = {
            w: 75,
            h: 100
        }
        this.enemyImage = 'ufo.png'
        this.imageInstance = undefined
        this.lives = 1
        this.init()
        this.framesCounter = framesCounter
        this.imageInstance.frames = 3
        this.imageInstance.framesIndex = 0
        this.width = 75
        this.height = 100
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.enemyImage}`
    }

    draw(playerPosX, playerPosY) {
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames),
            0,
            this.imageInstance.width / this.imageInstance.frames,
            this.imageInstance.height,
            this.enemyPos.x,
            this.enemyPos.y,
            this.enemySize.w,
            this.enemySize.h,
            this.move(playerPosX, playerPosY)
        )
        this.animate()
    }

    animate() {
        if (this.framesCounter % 200 === 0) {
            this.imageInstance.framesIndex++
        }
        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
            this.imageInstance.framesIndex = 0
        }
    }

    move(playerPosX, playerPosY) {
        this.enemyPos.x += (playerPosX - this.enemyPos.x) * 0.05
        this.enemyPos.y += (playerPosY - this.enemyPos.y) * 0.05
    }
}