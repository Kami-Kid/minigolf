canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")

const friction = 2;
const levelnum = 10;
const holerad = 10;
let level = 0;
let ball = [];
let ballcurr = [];
let hole = [];
let walls = [];
let sand = [];
let death = [];

let trigstart = [0, 0]

let levels = {
    /* 
    ball start  
    hole pos
    walls
    sands
    deaths
    */
    l1: [
        [10, 10],
        [300, 300],
        [],
        [],
        []
    ],
    l2: [
        [10, 15],
        [300, 300],
        [],
        [],
        []
    ],
    l3: [
        [10, 20],
        [300, 300],
        [],
        [],
        []
    ],
    l4: [
        [10, 25],
        [300, 300],
        [],
        [],
        []
    ],
    l5: [
        [10, 30],
        [300, 300],
        [],
        [],
        []
    ],
    l6: [
        [15, 10],
        [300, 300],
        [],
        [],
        []
    ],
    l7: [
        [20, 10],
        [300, 300],
        [],
        [],
        []
    ],
    l8: [
        [25, 10],
        [300, 300],
        [],
        [],
        []
    ],
    l9: [
        [30, 10],
        [300, 300],
        [],
        [],
        []
    ],
    l10: [
        [35, 35],
        [300, 300],
        [],
        [],
        []
    ]
}

for (i = 0; i < levelnum; i++) {
    ball[i] = levels.l1[0]
    hole[i] = new Array(2)
    walls[i] = new Array(4)
    sand[i] = new Array(4)
    death[i] = new Array(4)
}

window.addEventListener("mousemove", draw)
window.addEventListener("mousedown", startTrig)
window.addEventListener("mouseup", finishTrig)

function draw() {
    ctx.fillStyle = "blue"
        //ballcurr = [event.clientX, event.clientY]
    fillCircle(ballcurr, holerad)
}

function fillCircle(pos, rad) {
    ctx.fillStyle = "blue"
    ctx.beginPath()
    ctx.arc(pos[0], pos[1], rad, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
}

function startTrig() {
    trigstart[0] = event.clientX
    trigstart[1] = event.clientY
}

function finishTrig() {
    //make a triangle that is delta x across and delta y down and find the hypotenuse saying triangle a B and c for the sides
    triangleA = trigstart[0] - event.clientX
    triangleB = trigstart[1] - event.clientY
    triangleC = Math.pow((Math.pow(triangleA, 2), Math.pow(triangleB, 2), 0.5))
        //doing (a^2 + b^2) to the 1/2 power for square root

    ctx.beginPath()
    ctx.moveTo(trigstart[0], trigstart[1])
    ctx.lineTo(trigstart[0] + triangleA, trigstart[1])
    ctx.lineTo(trigstart[0] + triangleA, trigstart[1] + triangleB)
    ctx.lineTo(trigstart[0], trigstart[1])
    ctx.stroke()
}

function load() {
    ballcurr = ball[level]
}
load()