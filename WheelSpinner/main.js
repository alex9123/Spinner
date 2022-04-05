let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 610;
cnv.height = 610;
let circleX = cnv.width/2
let circleY = cnv.height/2
let radius = 300;

let addInputButton = document.getElementById("AddButton")
let addObjectInput = document.getElementById("AddObjectInput")
let objectList = document.getElementById("ObjectList")

let objects = []

function drawWheel() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = "blue";
    ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
    ctx.fill()
    
    
    calcDivide()
    
    
    
    requestAnimationFrame(drawWheel);
}


function calcDivide() {
    let divides = objects.length;
    let angles = 360/divides;
    let currentAngle = 0;
    
    if (divides > 1) {
        for (let i=divides; i > 0; i--) {
            currentAngle = currentAngle + angles;
            let currentRadian = currentAngle / 180 * Math.PI;
            let endX = circleX + radius * Math.cos(currentRadian);
            let endY = circleY - radius * Math.sin(currentRadian);
    
            ctx.beginPath();
            ctx.moveTo(circleX, circleY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }
}

function AddThing() {
    let input = addObjectInput.value.trim()

    if (input.length > 0) {
        let newObject = document.createElement("div");
        let newText = document.createTextNode(addObjectInput.value);
        objects.push(addObjectInput.value)
        newObject.style.border = "1px solid black";
        newObject.style.margin = "10px";
        newObject.appendChild(newText);
        objectList.appendChild(newObject);
    }
}

addInputButton.addEventListener("click", AddThing)


requestAnimationFrame(drawWheel);