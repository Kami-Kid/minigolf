canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")

const friction = 2;
const levelnum = 6;
const holerad = 10;
let level;
location.search == "" ? level = 0 : level = location.search[5]
let ballvel = [0, 0];
let ball = [];
let ballcurr = [];
let hole = [];
let walls = [];
let sand = [];
let death = [];
let sandy = false

let getmousedown;

let win = false;

let triangleA = 0
let triangleB = 0


let trigstart = [0, 0]

let levels = [
    /* 
    ball start  
    hole pos
    walls
    sands
    deaths
    */
    [
        [10, 10],
        [300, 300],
        [],
        [],
        []
    ],
    [
        [10, 15],
        [300, 300],
        [
            [50, 50, 100, 100],
            [500, 200, 100, 100]
        ],
        [],
        []
    ],
    [
        [10, 15],
        [300, 300],
        [
            [0, 30, 500, 40]
        ],
        [
            [0, 0, 900, 100]
        ],
        []
    ],
    [
        [10, 25],
        [300, 300],
        [],
        [],
        [
            [100, 50, 20, 1000]
        ]
    ],
    [
        [10, 10],
        [300, 300],
        [
            [25, 0, 20, 650],
            [25, 630, 800, 20]
        ],
        [],
        [
            [900, 0, 100, 700]
        ]
    ],
    [
        [15, 10],
        [680, 10],
        [
            [0, 250, 100, 20],
            [150, 170, 20, 400],
            [50, 320, 100, 20],
            [0, 390, 100, 20],
            [50, 460, 100, 20],
            [0, 530, 100, 20]
        ],
        [
            [0, 0, 1000, 700]
        ],
        [
            [0, 100, 600, 20],
            [650, 0, 20, 500],
            [50, 150, 600, 20],
            [220, 550, 450, 200],
            [300, 230, 20, 400],
            [500, 230, 20, 400]
        ]
    ],
    [
        [105, 105],
        [300, 300],
        [
            [120, 120, 150, 150]
        ],
        [],
        []
    ]
]

for (i = 0; i < levelnum; i++) {
    ball[i] = levels[i][0]
    hole[i] = levels[i][1]
    walls[i] = levels[i][2]
    sand[i] = levels[i][3]
    death[i] = levels[i][4]
}

window.addEventListener("mousedown", startTrig)
window.addEventListener("mouseup", releaseBall)

function draw() {
    ctx.fillStyle = "blue"
        //ballcurr = [event.clientX, event.clientY]
    fillCircle(ballcurr, holerad)
}

function fillCircle(pos, rad) {
    ctx.beginPath()
    ctx.arc(pos[0], pos[1], rad, 0, 2 * Math.PI)
        //ctx.stroke()
    ctx.fill()
}

function startTrig() {
    trigstart[0] = event.clientX
    trigstart[1] = event.clientY
    triangleA = 0
    triangleB = 0
    getmousedown = 1
    window.removeEventListener("mousedown", startTrig)
    window.addEventListener("mousemove", drawline)
    window.addEventListener("mouseup", releaseBall)
}

function releaseBall() {
    getmousedown = 0
    window.removeEventListener("mousemove", drawline)
    window.addEventListener("mousedown", startTrig)
    window.removeEventListener("mouseup", releaseBall)
    if (!getInSand()) {
        ballvel = [triangleA / 10, triangleB / 10]
        return
    }

    ballvel = [triangleA / 30, triangleB / 30]


}

function drawline() {
    //redraw()
    //make a triangle that is delta x across and delta y down and find the hypotenuse saying triangle a B and c for the sides
    triangleA = trigstart[0] - event.clientX
    triangleB = trigstart[1] - event.clientY
    triangleC = Math.pow((Math.pow(triangleA, 2), Math.pow(triangleB, 2), 0.5))
        //doing (a^2 + b^2) to the 1/2 power for square root

    //ctx.beginPath()
    //ctx.moveTo(trigstart[0] + triangleA, trigstart[1] + triangleB)
    //    //ctx.lineTo(trigstart[0] + triangleA, trigstart[1])
    //    //ctx.lineTo(trigstart[0] + triangleA, trigstart[1] + triangleB)
    //ctx.lineTo(trigstart[0], trigstart[1])
    //ctx.stroke()
}

function load() {
    ballcurr = ball[level]
}
load()

function redraw() {
    ctx.clearRect(0, 0, 1000, 700)
        //sand
    ctx.fillStyle = "yellow"
    for (i = 0; i < sand[level].length; i++) {
        ctx.fillRect(sand[level][i][0], sand[level][i][1], sand[level][i][2], sand[level][i][3])
    }
    //death
    ctx.fillStyle = "darkblue"
    for (i = 0; i < death[level].length; i++) {
        ctx.fillRect(death[level][i][0], death[level][i][1], death[level][i][2], death[level][i][3])
    }
    //walls
    for (i = 0; i < walls[level].length; i++) {
        ctx.fillStyle = "#A0FFF0"
        ctx.fillRect(walls[level][i][0], walls[level][i][1], walls[level][i][2], walls[level][i][3])
    }
    ctx.fillStyle = "black"
    fillCircle(hole[level], holerad)
    ctx.fillStyle = "blue"
    fillCircle(ballcurr, holerad)

    if (getmousedown) {
        ctx.beginPath()
        ctx.moveTo(trigstart[0] + triangleA, trigstart[1] + triangleB)
        ctx.lineTo(trigstart[0], trigstart[1])
        ctx.stroke()
    }
    if (win) {
        ctx.font = "serif"
        ctx.strokeText("You Win", 450, 200, 100)
    }
}

movereps = 0;

function getInSand() {
    for (i = 0; i < sand[level].length; i++) {
        Sx = sand[level][i][0]
        Sy = sand[level][i][1]
        Sw = sand[level][i][2]
        Sh = sand[level][i][3]

        if (xmove >= Sx && xmove <= Sx + Sw && ymove >= Sy && ymove <= Sy + Sh) {
            return true
        }
        return false

    }
}

function getInDeath() {
    for (i = 0; i < death[level].length; i++) {
        Sx = death[level][i][0]
        Sy = death[level][i][1]
        Sw = death[level][i][2]
        Sh = death[level][i][3]

        if (xmove + holerad >= Sx && xmove - holerad <= Sx + Sw && ymove + holerad >= Sy && ymove - holerad <= Sy + Sh) {
            level--
            nextlvl()
        }

    }
}

function wallbounds() {

    //wall bounds
    for (i = 0; i < walls[level].length; i++) {
        Wx = walls[level][i][0]
        Wy = walls[level][i][1]
        Ww = walls[level][i][2]
        Wh = walls[level][i][3]

        wall = Math.min(Math.abs(Wx - xmove), Math.abs(Wy - ymove), Math.abs((Wx + Ww) - xmove), Math.abs((Wy + Wh) - ymove))

        if (xmove + holerad >= Wx && xmove - holerad <= Wx + Ww && ymove + holerad >= Wy && ymove - holerad < Wy + Wh) {
            if (wall === Math.abs(Wx - xmove) || wall == Math.abs((Wx + Ww) - xmove)) {
                xvel *= -1
            } else {
                if (wall == Math.abs(Wy - ymove) || wall == Math.abs((Wy + Wh) - ymove)) {
                    yvel *= -1

                } else {
                    xvel *= -1
                    yvel *= -1

                }
            }
            console.log(wall)
        }

    }
}

function moveball() {

    movereps = 0

    xvel = ballvel[0]
    yvel = ballvel[1]
    x = ballcurr[0]
    y = ballcurr[1]
    xmove = x + xvel
    ymove = y + yvel

    if (movereps < 10000 && ballvel != [0, 0]) {
        redraw()

        //canvas bounds
        if (xmove <= 0 || xmove >= 1000) {
            xvel *= -1
        }
        if (ymove <= 0 || ymove >= 700) {
            yvel *= -1
        }

        wallbounds()
        getInDeath()

        //take the x position and y position then find the x dist and y dist from the hole pos then use pythag to find direct distance

        pythag1 = hole[level][0] - xmove
        pythag2 = hole[level][1] - ymove

        if (Math.pow((Math.pow(pythag1, 2) + Math.pow(pythag2, 2)), 0.5) - holerad / 2 <= holerad) { // square roots the addition of a^2 + b^2

            nextlvl()

        }
        x += xvel
        y += yvel

        xvel *= 0.92
        yvel *= 0.92

        //if (Math.abs(xvel) <= 0.5) {
        //    xvel = 0
        //}
        //
        //if (Math.abs(yvel) <= 0.5) {
        //    yvel = 0
        //}


        ballvel = [xvel, yvel]
        ballcurr = [x, y]

        movereps++
        return
    }
}

function nextlvl() {

    if (level < 5) {

        xvel = 0
        yvel = 0
        level++
        x = levels[level][0][0]
        y = levels[level][0][1]
    } else {
        level = 6
        win = true
    }


}
setInterval(moveball, 1000 * (1 / 60))