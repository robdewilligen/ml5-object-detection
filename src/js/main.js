let objectDetector;
let objects = [];
let canvas, ctx;
let width = 300;
let height = 168;
const minimumConfidence = 0.6;

let img = document.getElementById('example');

async function make() {

    img.width = width;
    img.height = height;

    //Load the model
    objectDetector = await ml5.objectDetector('cocossd', startDetecting)

    canvas = createCanvas(width, height);
    ctx = canvas.getContext('2d');
}

//When the dom is loaded, call make();
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

//Draw a rectangle around the found object and label it
function draw() {
    //Clear part of the canvas
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(img, 0, 0);
    for (let i = 0; i < objects.length; i += 1) {
        if(objects[i].confidence <= minimumConfidence) return;

        //Convert confidence in '99,99%' format
        let confidence = objects[i].confidence * 10000;
        confidence = Math.round(confidence) / 100 + '%';

        //Customize font
        ctx.font = "11px Arial";
        ctx.fillStyle = "green";
        //Create text
        txt = objects[i].label + '/n' + confidence;
        //Linebreak text at '/n'
        lines = txt.split('/n')
        //Write text
        for(let j = 0;j < lines.length;j++){
            ctx.fillText(lines[j], objects[i].x + 4, objects[i].y + 11*j);
        }

        //Draw rectangle around object
        ctx.beginPath();
        ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath();
    }
}

//Creates a canvas element
function createCanvas(w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    document.body.appendChild(canvas);
    return canvas;
}