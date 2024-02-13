let objectDetector;
let status;
let objects = [];
let canvas, ctx;
const width = 278;
const height = 181;
const imgPath = '../public/img/img.png';

img = document.getElementById('example');

async function make() {
    // img = new Image();
    // img.src = imgPath;
    img.width = width;
    img.height = height;

    objectDetector = await ml5.objectDetector('cocossd', startDetecting)

    canvas = createCanvas(width, height);
    ctx = canvas.getContext('2d');
}

// when the dom is loaded, call make();
window.addEventListener('DOMContentLoaded', function () {
    make();
});

function startDetecting() {
    console.log('model ready')
    detect();
}

function detect() {
    objectDetector.detect(img, function (err, results) {
        if (err) {
            console.log(err);
            return
        }
        objects = results;
        console.log(objects);

        if (objects) {
            draw();
        }
    });
}

function draw() {
    // Clear part of the canvas
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(img, 0, 0);
    for (let i = 0; i < objects.length; i += 1) {

        ctx.font = "16px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(objects[i].label, objects[i].x + 4, objects[i].y + 16);

        ctx.beginPath();
        ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath();
    }
}


function createCanvas(w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    document.body.appendChild(canvas);
    return canvas;
}