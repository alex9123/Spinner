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
let colors = ["blue", "red", "green", "brown", "grey", "purple", "orange"]

function drawWheel() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    
    let divides = objects.length;
    let angles = 360/divides;
    let startAngle = 0
    let endAngle = angles * Math.PI/180

    // Draw Wheel
    
    for (let i=0; i < objects.length; i++) {
        ctx.beginPath();
        ctx.moveTo(circleX, circleY);
        ctx.arc(circleX, circleY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i%7];
        ctx.fill();

        startAngle = endAngle
        endAngle = (angles * Math.PI/180) + startAngle
    }   

    // Draw circle in middle

    if (objects.length > 0) {
        ctx.beginPath();
        ctx.fillStyle = "black"
        ctx.arc(circleX, circleY, radius/6, 0, 2 * Math.PI);
        ctx.fill()

        // Text in circle
        ctx.font = "15px Arial"
        ctx.fillStyle = "white"
        ctx.fillText("Click To Spin", circleX - ctx.measureText("Click To Spin").width/2, circleY);
    }

    // Draw Text (separate loop because overlapping for some reason)

    startAngle = 0
    endAngle = angles * Math.PI/180

    for (let i=0; i < objects.length; i++) {
        let space = 15 // Space between word and edge of wheel
        let rotateAngle = (startAngle+endAngle)/2

        ctx.fillStyle = "white"
        ctx.font = calcFont(i, space) + 'px Arial';

        let inputWidth = ctx.measureText(objects[i].text).width // text width

        if (objects.length === 1) { // So first one is not upsidedown
            rotateAngle = 0
        }

        let endX = circleX + (radius - inputWidth - space) * Math.cos(rotateAngle)
        let endY = circleX + (radius - inputWidth - space)* Math.sin(rotateAngle)

        ctx.save()
        ctx.translate(endX, endY)
        ctx.rotate(rotateAngle)
        ctx.fillText(String(objects[i].text), 0, calcFont(i, space)/2);

        ctx.restore()

        startAngle = endAngle
        endAngle = (angles * Math.PI/180) + startAngle
    }
}

function calcFont(currentObject, space) {
    ctx.font = "30px Arial"
    let size = 30 // Defult
    length = ctx.measureText(objects[currentObject].text).width
    while (length >= radius - radius/6 - space) {
        size--
        ctx.font = size + "px Arial"
        length = ctx.measureText(objects[currentObject].text).width
    }
    console.log(size)
  
    return size
}



function AddThing() {
    let input = addObjectInput.value.trim()

    if (input.length > 0) {
        let thing = {
            text: addObjectInput.value
        }
        objects.push(thing)

        let newObject = document.createElement("div");
        let newText = document.createTextNode(addObjectInput.value);
        newObject.style.border = "1px solid black";
        newObject.style.margin = "10px";
        newObject.appendChild(newText);
        objectList.appendChild(newObject);
    }
    drawWheel()
}

addInputButton.addEventListener("click", AddThing)


