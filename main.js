canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")

const friction = 2;
const levelnum = 11;
const holerad = 10;
let level = 0;
let ballvel = [0, 0];
let ball = [];
let ballcurr = [];
let hole = [];
let walls = [];
let sand = [];
let death = [];

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
        [10, 20],
        [300, 300],
        [],
        [],
        []
    ],
    [
        [10, 25],
        [300, 300],
        [],
        [],
        []
    ],
    [
        [10, 30],
        [300, 300],
        [],
        [],
        []
    ],
    [
        [15, 10],
        [300, 300],
        [],
        [],
        []
    ],
    [
        [20, 10],
        [300, 300],
        [],
        [],
        []
    ],
    [
        [25, 10],
        [300, 300],
        [],
        [],
        []
    ],
    [
        [30, 10],
        [300, 300],
        [],
        [],
        []
    ],
    [
        [35, 35],
        [300, 300],
        [],
        [],
        []
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
    if (!getinsand()) {
        ballvel = [triangleA / 10, triangleB / 10]
    } else {
        ballvel = [triangleA / 30, triangleB / 30]
    }

    window.removeEventListener("mousemove", drawline)
    window.addEventListener("mousedown", startTrig)
    window.removeEventListener("mouseup", releaseBall)
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
    ctx.fillStyle = "black"
    fillCircle(hole[level], holerad)
        //walls
    for (i = 0; i < walls[level].length; i++) {
        ctx.fillStyle = "#A0FFF0"
        ctx.fillRect(walls[level][i][0], walls[level][i][1], walls[level][i][2], walls[level][i][3])
    }
    //sand
    for (i = 0; i < sand[level].length; i++) {
        ctx.fillRect(sand[level][i][0], sand[level][i][1], sand[level][i][2], sand[level][i][3])
    }
    //death
    for (i = 0; i < death[level].length; i++) {
        ctx.fillRect(death[level][i][0], death[level][i][1], death[level][i][2], death[level][i][3])
    }
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

function getinsand() {

}

let vertex = [0, 0]

function wallbounds() {
    fix = 0

    //wall bounds
    for (i = 0; i < walls[level].length; i++) {
        Wx = walls[level][i][0]
        Wy = walls[level][i][1]
        Ww = walls[level][i][2]
        Wh = walls[level][i][3]

        vertices = [];
        //calculate closest vertex
        for (j = 0; j < 4; j++) {
            switch (j) {
                case 0:
                    vertex = [Wx, Wy]
                    break;
                    //console.log(vertex)
                case 1:
                    vertex = [Wx + Ww, Wy]
                    break;
                    //console.log(vertex)
                case 2:
                    vertex = [Wx, Wy + Wh]
                    break;
                    //console.log(vertex)
                case 3:
                    vertex = [Wx + Ww, Wy + Wh]
                    break;
                    //console.log(vertex)

            }
            vertices.push(Math.pow(Math.pow(vertex[0] - xmove, 2) + Math.pow(vertex[1] - ymove, 2), 0.5))
        }

        smol = vertices.splice(vertices.findIndex(function(a) { return a == Math.min(vertices[0], vertices[1], vertices[2], vertices[3]) }), 1)
        smol1 = vertices.splice(vertices.findIndex(function(a) { return a == Math.min(vertices[0], vertices[1], vertices[2]) }), 1)

        corner1 = 0
        corner2 = 0

        /*
            0--------1
            |        |
            |        |
            2--------3
        */

        smol == Wx ? corner1 = 0 : smol == Wx + Ww ? corner1 = 1 : smol == Wy ? corner1 = 2 : corner1 = 3
        smol1 == Wx ? corner2 = 0 : smol1 == Wx + Ww ? corner2 = 1 : smol1 == Wy ? corner2 = 2 : corner2 = 3


        if (xmove + holerad >= Wx && ymove + holerad >= Wy && xmove - holerad < Wx + Ww && ymove - holerad <= Wy + Wh) {

            switch (corner1 + corner2) {
                case 1:
                    yvel *= -1
                case 2:
                    xvel *= -1
                case 5:
                    yvel *= -1
                case 4:
                    xvel *= -1
            }

            fix = 1
            console.log("hiii")
        }
        //if (xmove >= Wx && ymove + holerad >= Wy && xmove - holerad < Wx + Ww && ymove - holerad <= Wy + Wh && !fix) {
        //    yvel *= -1
        //    console.log("hiii")
        //}
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

    if (level < 9) {

        xvel = 0
        yvel = 0
        level++
        x = 0
        y = 0
    } else {
        level = 10
        win = true
    }


}
setInterval(moveball, 1000 * (1 / 60))