const alienHack = {
    appName: 'ALIEN HACK',
    authors: ['Guillermo Perez', 'Eduardo Gordillo'],
    version: '1.0.0',
    license: 'GNU',
    gameSize: { w: undefined, h: undefined },
    ctx: undefined,
    FPS: 60,
    framesCounter: 0,
    intro: undefined,
    gameWin: undefined,
    gameOver: undefined,
    background: undefined,
    gameBoard: undefined,
    player: undefined,
    enemy: [],
    ufos: [],
    wall: [],
    bullets: [],
    mousePosition: { x: 555, y: 666 },
    audio: undefined,
    gun: undefined, 
    laser: undefined,
    image: undefined,

    init() {
        this.setContext()
        this.setSize()
        this.createIntro()
        this.createGameWin()
        this.createGameOver()
        this.start()
        this.createBackGround()
        this.createGameboard()
        this.createPlayer()
        this.createEnemy()
        this.createWall()
        this.shoot()
    },
    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
        console.log(this.ctx)
    },
    setSize() {
        this.gameSize = {
            w: 1200,
            h: 900
        }
        document.querySelector('#myCanvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#myCanvas').setAttribute('height', this.gameSize.h)
    },
    
    //////////////////////////////EVENTS/////////////////////////////////////////////

    start() {
        this.intro.draw()
        document.addEventListener("keydown", event => {
            const keyname = event.key
            if (keyname === 'Enter') {
                this.drawAll()
                this.audio = document.querySelector('.music')
                this.audio.play()
            }
        })
    },
    win() {
        clearInterval(this.interval)
        this.clearAll()
        this.enemy = []
        this.wall = []
        this.ufos = []
        this.gameWin.draw()
        setTimeout(() => {
           location.reload() 
        }, 5000);
    },
    lose() {
        clearInterval(this.interval)
        this.clearAll()
        this.enemy = []
        this.wall = []
        this.ufos = []
        this.player = undefined,
        this.gameOver.draw()
        setTimeout(() => {
            location.reload()
        }, 5000);
    },
   
    /////////////////////// INSTANCE ///////////////////////////////
    createIntro() {
        this.intro = new Intro(this.ctx, 0, 0, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createGameWin() {
        this.gameWin = new GameWin(this.ctx, 0, 0, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createGameOver() {
        this.gameOver = new GameOver(this.ctx, 0, 0, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createBackGround() {
        this.background = new Background(this.ctx, 0, 0, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createGameboard() {
        this.gameBoard = new Gameboard(this.ctx, 0, 200, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize)
    },
    createPlayer() {
        this.player = new Player(
            this.ctx, 
            0, 
            100, 
            0, 
            0, 
            this.gameSize.w,
            this.gameSize.h, 
            this.gameSize, 
            100, 
            this.framesCounter
        )
    },
    createEnemy() {
        this.enemy.push(new Enemy(this.ctx, 800, 300, 0, 0, this.gameSize.w, this.gameSize.h, this.gameSize))
    },
    createUfos() {
        if (this.framesCounter % 100 === 0) {
            this.ufos.push(new Ufos(this.ctx, 700, -300, this.gameSize.w, this.gameSize.h, this.gameSize))
        }
    },
    createWall() {
        this.wall.push(new Wall(this.ctx, 500, 400, 100, 100, this.gameSize.w, this.gameSize.h, this.gameSize))
        this.wall.push(new Wall(this.ctx, 500, 150, 100,190, this.gameSize.h, this.gameSize))
        this.wall.push(new Wall(this.ctx, 700, 575, 100, 225, this.gameSize.h, this.gameSize))
    },
    createBullets() {
        
        this.bullets.push(new Bullets(
            this.ctx, 
            this.player.playerPos.x, 
            this.player.playerPos.y, 
            'orange', 
            this.mousePosition)
        );
    },
    enemyBullets() {
        this.bullets.push(new EnemyBullets(
            this.ctx, 
            this.player.playerPos.x, 
            this.player.playerPos.y, 
            this.enemy[0].enemyPos.x, 
            this.enemy[0].enemyPos.y, 
            'green')
        )
    },
    drawAll() {
         this.interval = setInterval(() => {
            this.clearAll()
            this.background.draw()
            this.gameBoard.draw()
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.enemyObjetives()
            this.enemyCollision()
            this.player.frameCollision()
            this.wallCollision()
            this.bulletCollisionW()
            this.bulletCollisionE()
            this.bulletCollisionP()
            this.ufoCollisionP()
            this.ufoCollisionB()
            this.bullets.forEach(elm => elm.draw())
            this.enemy.forEach(elm => elm.draw())
            this.wall.forEach(elm => elm.draw())
            this.ufos.forEach(elm => elm.draw(this.player.playerPos.x, this.player.playerPos.y))
            this.enemyIntervalShoot()
            this.clearBullets()
            this.createUfos()
            this.player.draw()
        }, 6000 / this.FPS)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },
    clearEnemy() {
        this.enemy = this.enemy.filter(elm => elm.enemyPos.x >= 0)
    },
    clearWall() {
        this.wall = this.wall.filter(elm => elm.wallPos.x >= 0)
    },
    clearBullets() {
        this.bullets = this.bullets.filter(elm => elm.posX <= this.gameSize.w)
    },

    ////////////////////////////////// COLLISIONS//////////////////////////////////////
    enemyCollision() {   ////PLAYER VS ENEMY
        return this.enemy.some(elm => {
            if (
                this.player.playerPos.x < elm.enemyPos.x + elm.enemySize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elm.enemyPos.x &&
                this.player.playerPos.y < elm.enemyPos.y + elm.enemySize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elm.enemyPos.y
                ) {
                return true
            }
        })
    },
    ufoCollisionP() {   ////PLAYER VS UFO
        return this.ufos.some(elm => {
            if (
                this.player.playerPos.x < elm.enemyPos.x + elm.enemySize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elm.enemyPos.x &&
                this.player.playerPos.y < elm.enemyPos.y + elm.enemySize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elm.enemyPos.y
            ) {
                this.ufos = []
                this.player.lives--
                return true
            }
        })
    },
    ufoCollisionB() {   ////UFO VS PLAYER BULLETS
        return this.bullets.some(elm => {
            for (let i = 0; i < this.ufos.length; i++) {
                if (this.ufos[i].enemyPos.x < elm.posX &&
                    this.ufos[i].enemyPos.x + this.ufos[i].enemySize.w > elm.posX &&
                    this.ufos[i].enemyPos.y < elm.posY &&
                    this.ufos[i].enemySize.h + this.ufos[i].enemyPos.y > elm.posY
                ) {
                    this.bullets = []
                    this.ufos = []
                    return true
                }
            }
        })
    },
    wallCollision() {  ////PLAYER VS WALL
        return this.wall.some(elm => {
            if (
                this.player.playerPos.x < elm.wallPos.x + elm.wallSize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elm.wallPos.x &&
                this.player.playerPos.y < elm.wallPos.y + elm.wallSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elm.wallPos.y
            ) {
                return true
            }
        })
    },
    bulletCollisionW() { ///// BULLETS VS WALL
        return this.bullets.some(elm => {
            for (let i = 0; i < this.wall.length; i++) {
                if (this.wall[i].wallPos.x < elm.posX +20 &&
                    this.wall[i].wallPos.x + this.wall[i].wallSize.w > elm.posX &&
                    this.wall[i].wallPos.y < elm.posY +20 &&
                    this.wall[i].wallSize.h + this.wall[i].wallPos.y > elm.posY
                ) { 
                    this.wall[i].lives--
                    if (this.wall[i].lives <= 0) {
                        this.wall.splice(i,1)
                        this.bullets = []}
                    return true
                }
            }
        })
    },
    bulletCollisionE() { //// BULLETS VS ENEMY
        return this.bullets.some(elm => {
            for (let i = 0; i < this.enemy.length; i++) {
                if (this.enemy[i].enemyPos.x < elm.posX  &&
                    this.enemy[i].enemyPos.x + this.enemy[i].enemySize.w > elm.posX &&
                    this.enemy[i].enemyPos.y < elm.posY &&
                    this.enemy[i].enemySize.h + this.enemy[i].enemyPos.y > elm.posY) {
                    this.bullets = []
                    this.enemy[i].lives--
                    this.enemyLives()
                    this.enemy[i].goHide()
                    if (this.enemy[i].lives <= 0) {
                        this.enemy = []
                        this.win()
                        this.audio.pause()
                    }
                    return true
                }
            }
        })
    },
    bulletCollisionP() { ///// BULLETS VS PLAYER
        return this.bullets.some(elm => {
            if (this.player.playerPos.x < elm.posX + 20 &&
                this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                this.player.playerPos.y < elm.posY +20 &&
                this.player.playerSize.h + this.player.playerPos.y > elm.posY) {
                this.bullets = []
                this.player.lives--
                this.playerLives()
                if (this.player.lives <= 0) {
                    this.lose()
                    this.audio.pause()
                }
                return true
            }
        })
    },
    playerLives() {
        const playerLife = document.querySelector('.player')
        const playerIcon = document.querySelector('.player i')
        playerLife.removeChild(playerIcon)
    },
    enemyLives() {
        const enemyLife = document.querySelector('.enemy')
        const enemyIcon = document.querySelector('.enemy i')
        enemyLife.removeChild(enemyIcon)
    },

    //////////////////////////////// MOVEMENTS ///////////////////////////////////
    enemyObjetives() {
        if (this.player.playerPos.x === 200 && this.player.playerPos.y === 400) {
            this.enemyMove1()
            console.log('move1')
        }
        if (this.player.playerPos.x <= 500 && this.player.playerPos.y === 600) {
            this.enemyMove2()
            console.log('move2')
        }
        if (this.player.playerPos.x === 400 && this.player.playerPos.y === 500) {
            this.enemyMove3()
            console.log('move3')
        }
        
        if (this.player.playerPos.x <= 500 && this.player.playerPos.y === 500) {
            this.enemyMove4()
            console.log('move4')
        }
        if (this.player.playerPos.x === 200 && this.player.playerPos.y === 200) {
            this.enemyMove5()
            console.log('move5')
        }
        
    },
    enemyMove1() {
        setTimeout(() => {
            this.enemy.forEach(elm => {
                if (elm.enemyPos.x < 500 && elm.enemyPos.y < 200) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 500 && elm.enemyPos.y > 200) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })
        }, 500)
        setTimeout(() => { this.enemy[0].goHide() }, 4000)
    },
    enemyMove2() {
        setTimeout(() => {
            this.enemy.forEach(elm => {
                if (elm.enemyPos.x < 1000 && elm.enemyPos.y < 600) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 1000 && elm.enemyPos.y > 600) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })
        }, 1000)
        setTimeout(() => { this.enemy[0].goHide() }, 4000)
    },
    enemyMove3() {
        setTimeout(() => {
            this.enemy.forEach(elm => {
                if (elm.enemyPos.x < 700 && elm.enemyPos.y < 600) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 700 && elm.enemyPos.y > 600) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })
        }, 1000)
        setTimeout(() => { this.enemy[0].goHide() }, 4000)
    },
    enemyMove4() {
        setTimeout(() => {
            this.enemy.forEach(elm => {
                if (elm.enemyPos.x < 1100 && elm.enemyPos.y < 600) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 1100 && elm.enemyPos.y > 600) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })
        }, 1000)
        setTimeout(() => { this.enemy[0].goHide() }, 4000)
    },
    enemyMove5() {
        setTimeout(() => {
            this.enemy.forEach(elm => {
                if (elm.enemyPos.x < 900 && elm.enemyPos.y < 100) {
                    elm.enemyPos.x += 50
                    elm.enemyPos.y += 50
                } else if (elm.enemyPos.x > 900 && elm.enemyPos.y > 100) {
                    elm.enemyPos.x -= 50
                    elm.enemyPos.y -= 50
                }
            })
        }, 1000)
        setTimeout(() => { this.enemy[0].goHide() }, 4000)
    },
    /////////////////////////Shooots/////////////////////////////////
    shoot() {
        document.querySelector('#myCanvas').addEventListener('click', event => {
            //instance Bullets
            this.createBullets()
            //play Gun's Bullets Sound
            this.gun = document.querySelector('.gun')
            this.gun.play()
            
            //get Mouse position
            this.mouseX = event.clientX
            this.mouseY = event.clientY

            this.mousePosition.x = this.mouseX
            this.mousePosition.y = this.mouseY
        })
    },
    enemyIntervalShoot() {
        if (this.framesCounter % 20 === 0) {
            this.enemyBullets()
            this.laser = document.querySelector('.laser')
            this.laser.play()
        }
    }
}