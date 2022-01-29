class Bullets {
    constructor(ctx, playerPosX, playerPosY, color, mousePos) {
        this.ctx = ctx
        this.posX = playerPosX + 150
        this.posY = playerPosY + 100
        this.radius = 10
        this.color = color
        this.mousePos = mousePos
        this.orgX = this.posX
        this.orgY = this.posY
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
    }

    move() {
        this.posX += (this.mousePos.x - this.orgX) * 0.1
        this.posY += (this.mousePos.y - this.orgY) * 0.1
    }
}

class EnemyBullets extends Bullets {
    constructor(ctx, playerPosX, playerPosY, enemyPosX, enemyPosY, color) {
        super(ctx, playerPosX, playerPosY, color)

        this.playerPosX = playerPosX
        this.playerPosY = playerPosY
        this.enemyPosX = enemyPosX
        this.enemyPosY = enemyPosY
        this.posX = enemyPosX
        this.posY = enemyPosY + 50
        this.orgX = enemyPosX
        this.orgY = enemyPosY
    }
    
    move() {
        this.posX += (this.playerPosX - this.orgX) * 0.2
        this.posY += (this.playerPosY + 50 - this.orgY) * 0.2
    }
}