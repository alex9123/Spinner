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
    
    calcDivide()
}

let colors = ["blue", "red", "yellow", "brown", "grey", "purple", "pink"]

function calcDivide() {
    let divides = objects.length;
    let angles = 360/divides;
    let startAngle = 0
    let endAngle = angles * Math.PI/180

    

    for (let i=divides; i >= 0; i--) {
        ctx.beginPath();
        ctx.moveTo(circleX, circleY);
        ctx.arc(circleX, circleY, radius, startAngle, endAngle);
           
        ctx.fillStyle = colors[i%7];
        ctx.fill();
        startAngle = endAngle
        endAngle = (angles * Math.PI/180) + startAngle
        console.log(startAngle, endAngle)
            
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
    drawWheel()
}

addInputButton.addEventListener("click", AddThing)


