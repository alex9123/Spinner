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
let colors = ["blue", "red", "yellow", "brown", "grey", "purple", "pink"]

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

    // Draw Text (separate loop because overlapping for some reason)

    startAngle = 0
    endAngle = angles * Math.PI/180

    for (let i=0; i < objects.length; i++) {
        ctx.fillStyle = "white"
        ctx.font = "30px Arial";
        ctx.save()
        ctx.translate(circleX, circleY)
        let rotateAngle = (startAngle+endAngle)/2
        console.log(rotateAngle)
        if (Math.PI/2 <= rotateAngle || rotateAngle >= Math.PI * 1.5) {
            console.log("go")
            rotateAngle = 0
        }
        ctx.rotate(rotateAngle)
        ctx.fillText(String(objects[i].text), 0, 0);

        ctx.restore()

        startAngle = endAngle
        endAngle = (angles * Math.PI/180) + startAngle
    }
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


