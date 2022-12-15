// INITIALIZE CONTROLS
let SVG = document.getElementById('SVG');
SVG.setAttribute("style", "background-color:" + "rebeccapurple");
let NS = "http://www.w3.org/2000/svg";
let backgroundSpecific = document.getElementById("backgroundSpecific");

//Buttons
let btnSquare = document.getElementById("SQUARE");
let btnCircle = document.getElementById("CIRCLE");
let btnLine = document.getElementById("LINE");
let undoButton = document.getElementById("undoButton");
let redoButton = document.getElementById("redoButton");
let eraseoneItem = document.getElementById("eraseoneItem");
let eraser = document.getElementById("eraseEverything");
let NrObiecteDesenate = document.getElementById("nrObiecteDesenate");
let downloadButton = document.getElementById("download");
let downloadButtonPng = document.getElementById("download_png");
let colorPickerColor = document.getElementById("colorPickerColor");
let makeColorsChangeable = document.getElementById("default-checkbox");
let EnablePoints = document.getElementById("EnablePoints");
let ShouldChangeBackground = document.getElementById("ShouldChangeBackground");
let saveButts = document.getElementById("saveButts");
let getSaved = document.getElementById("getSaved");
let pointsEnabled = false;
//Edit Properties
var heightOfObject = document.getElementById("range");
var widthOfObject = document.getElementById("widthEverything");
var lineStrokeWeight = document.getElementById("lineStrokeWeight");
var backgroundcolorSVG = document.getElementById("backgroundcolorSVG");


//Utils
let square;
let circle;
let countDrawnObjects = 0;
let eraseSpecific = -1;
let selectedItem = 0;
let countDonwloaded = 0;
let arrayDeleted = [];
let shouldBeDragged = false;
let want_to_delete = false;
let isSelectedForColorChange = false;
let selectedForColorChange = 0;

//Objects for indexing
let squareIndexing = {
    xminus: 480,
    yminus: 110
}
let circleIndexing = {
    xminus: 400,
    yminus: 70
}

let lineIndexing = {
    x1minus: 500,
    x2minus: 350,
    y1minus: 500,
    y2minus: 500
}

//Classes
class Square_Init {
    constructor(name, marginLeft, marginTop, width, height, color) {
        this.name = name;
        this.x = marginLeft;
        this.y = marginTop;
        this.width = width;
        this.height = height;
        this.fill = color;
    }

    drawSquare() {

        this.name = document.createElementNS(NS, 'rect');
        this.name.setAttributeNS(null, 'x', this.x);
        this.name.setAttributeNS(null, 'y', this.y);
        this.name.setAttributeNS(null, 'width', this.width);
        this.name.setAttributeNS(null, 'height', this.height);
        this.name.setAttributeNS(null, 'fill', this.fill);

        this.name.addEventListener('click', function(e) {
            selectedForColorChange = this;
            if (makeColorsChangeable.checked === true) {
                selectedForColorChange.setAttribute('fill', colorPickerColor.value);
                selectedForColorChange.setAttribute('height', heightOfObject.value);
                selectedForColorChange.setAttribute('width', widthOfObject.value);
                //  selectedItem.setAttribute("transform", "rotate(45)");
            }
        });

        this.name.addEventListener('mousedown', function(e) {
            shouldBeDragged = !shouldBeDragged;
            if (shouldBeDragged) {
                selectedItem = this;
                console.log(selectedItem.getAttribute('x'), selectedItem.getAttribute('y'));
                SVG.addEventListener('mousemove', function(e) {
                    if (shouldBeDragged && selectedItem != 0) {
                        selectedItem.setAttribute('x', e.clientX - squareIndexing.xminus);
                        selectedItem.setAttribute('y', e.clientY + 2 - squareIndexing.yminus);

                    }
                });
            }
        });

        SVG.appendChild(this.name);
        if (this.name !== "Point")
            countDrawnObjects++;
    }

    getPositionX() {
        return this.x;
    }
    getPositionY() {
        return this.y;
    }
    getColor() {
        return this.color;
    }

    setPosition(x) {
        this.x = x;
    }
    setPosition(y) {
        this.y = y;
    }
    setColor(color) {
        this.fill = color;
    }


    removeObject() {
        SVG.removeChild(this.name);
    }

    toString() {
        console.log(this.name + "\n" +
            this.x + "\n" + this.y + "\n" + this.height + "\n" + this.width + "\n" + this.fill);
    }



}

class Circle_Init {
    constructor(name, marginLeft, marginTop, radiusX, radiusY, color) {
        this.name = name;
        this.x = marginLeft;
        this.y = marginTop;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.fill = color;
    }

    drawCircle() {
        this.name = document.createElementNS(NS, 'ellipse');
        this.name.setAttributeNS(null, 'cx', this.x);
        this.name.setAttributeNS(null, 'cy', this.y);
        this.name.setAttributeNS(null, 'rx', this.radiusX);
        this.name.setAttributeNS(null, 'ry', this.radiusY);
        this.name.setAttributeNS(null, 'fill', this.fill);

        this.name.addEventListener('click', function(e) {
            selectedForColorChange = this;
            if (makeColorsChangeable.checked === true) {
                selectedForColorChange.setAttribute('fill', colorPickerColor.value);
                selectedForColorChange.setAttribute('rx', heightOfObject.value - 50);
                selectedForColorChange.setAttribute('ry', widthOfObject.value - 50);
            }

        });

        this.name.addEventListener('mousedown', function(e) {
            shouldBeDragged = !shouldBeDragged;
            if (shouldBeDragged) {
                selectedItem = this;
                //console.log(selectedItem.getAttribute('x'), selectedItem.getAttribute('y'));
                SVG.addEventListener('mousemove', function(e) {
                    if (shouldBeDragged && selectedItem != 0) {
                        selectedItem.setAttribute('cx', e.clientX - circleIndexing.xminus);
                        selectedItem.setAttribute('cy', e.clientY - circleIndexing.yminus);
                    }
                });
            }
        });
        SVG.appendChild(this.name);

        if (this.name !== "Point") {
            countDrawnObjects++;
        }
    }

    getPositionX() {
        return this.x;
    }
    getPositionY() {
        return this.y;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.fill = color;
    }

    removeObject() {
        SVG.removeChild(this.name);
    }

    toString() {
        console.log(this.name + "\n" +
            this.x + "\n" + this.y + "\n" + this.radiusX + "\n" + this.radiusY + "\n" + this.fill);
    }
}



class Point_Init {
    constructor(name, marginLeft, marginTop, radiusX, radiusY, color) {
        this.name = name;
        this.x = marginLeft;
        this.y = marginTop;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.fill = color;
    }

    drawPoints() {
        this.name = document.createElementNS(NS, 'ellipse');
        this.name.setAttributeNS(null, 'cx', this.x);
        this.name.setAttributeNS(null, 'cy', this.y);
        this.name.setAttributeNS(null, 'rx', this.radiusX);
        this.name.setAttributeNS(null, 'ry', this.radiusY);
        this.name.setAttributeNS(null, 'fill', this.fill);

        this.name.addEventListener('click', function(e) {
            selectedForColorChange = this;
            if (makeColorsChangeable.checked === true) {
                selectedForColorChange.setAttribute('fill', colorPickerColor.value);
                selectedForColorChange.setAttribute('rx', heightOfObject.value - 95);
                selectedForColorChange.setAttribute('ry', widthOfObject.value - 95);
            }

        });

        this.name.addEventListener('mousedown', function(e) {
            shouldBeDragged = !shouldBeDragged;
            if (shouldBeDragged) {
                selectedItem = this;
                // console.log(selectedItem.getAttribute('x'), selectedItem.getAttribute('y'));
                SVG.addEventListener('mousemove', function(e) {
                    if (shouldBeDragged && selectedItem != 0) {
                        selectedItem.setAttribute('cx', e.clientX - circleIndexing.xminus - 24);
                        selectedItem.setAttribute('cy', e.clientY - circleIndexing.yminus);
                    }
                });
            }
        });



        SVG.appendChild(this.name);


    }

    getPositionX() {
        return this.x;
    }
    getPositionY() {
        return this.y;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.fill = color;
    }

    removeObject() {
        SVG.removeChild(this.name);
    }

    toString() {
        console.log(this.name + "\n" +
            this.x + "\n" + this.y + "\n" + this.radiusX + "\n" + this.radiusY + "\n" + this.fill);
    }
}


class Line_Init {
    constructor(name, xStarting, xEnding, yStarting, yEnding, color) {
        this.name = name;
        this.xStarting = xStarting;
        this.xEnding = xEnding;
        this.yStarting = yStarting;
        this.yEnding = yEnding;
        this.fill = color;
    }

    drawLine() {
        this.name = document.createElementNS(NS, 'line');
        this.name.setAttributeNS(null, 'stroke', this.fill);
        this.name.setAttributeNS(null, 'x1', this.xStarting);
        this.name.setAttributeNS(null, 'y1', this.xEnding);
        this.name.setAttributeNS(null, 'x2', this.yStarting);
        this.name.setAttributeNS(null, 'y2', this.yEnding);

        if (makeColorsChangeable.checked === true) {
            this.name.setAttributeNS(null, 'stroke-width', lineStrokeWeight.value);

        } else {
            this.name.setAttributeNS(null, 'stroke-width', 8);

        }

        this.name.addEventListener('click', function(e) {
            selectedForColorChange = this;
            if (makeColorsChangeable.checked === true) {
                selectedForColorChange.setAttribute('stroke-width', lineStrokeWeight.value);
                selectedForColorChange.setAttribute('stroke', colorPickerColor.value);
            }

        });

        this.name.addEventListener('mousedown', function(e) {
            shouldBeDragged = !shouldBeDragged;
            selectedItem = this;
            // console.log(selectedItem.getAttribute('x1'), e.clientX - 200);
            if (shouldBeDragged) {
                SVG.addEventListener('mousemove', function(e) {
                    if (shouldBeDragged && selectedItem != 0) {

                        selectedItem.setAttribute('x1', e.clientX - 430);
                        selectedItem.setAttribute('y1', e.clientY + 20 - 100);
                        selectedItem.setAttribute('x2', e.clientX - 430 + 100);
                        selectedItem.setAttribute('y2', e.clientY + 100 - 100);
                    }
                });
            }
        });


        SVG.appendChild(this.name);
        if (this.name !== "Point")
            countDrawnObjects++;
    }

    getStartingX() {
        return this.xStarting;
    }

    getEndingX() {
        return this.xEnding;
    }
    getStartingY() {
        return this.yStarting;
    }

    getEndingY() {
        return this.yEnding;
    }

    getColor() {
        return this.fill;
    }

    setColor(color) {
        this.color = color;
    }

    removeObject() {
        SVG.removeChild(this.name);
    }

    toString() {
        console.log(this.name + "\n" +
            this.xStarting + "\n" + this.xEnding + "\n" + this.yStarting + "\n" + this.yEnding + "\n" + this.fill);
    }
}


// Click Listeners
btnLine.addEventListener('click', () => {
    let line = new Line_Init("Line", 250, 250, 350, 330, colorPickerColor.value);
    line.drawLine();
    NrObiecteDesenate.innerHTML = countDrawnObjects;
});

btnCircle.addEventListener('click', () => {
    let circle;
    if (makeColorsChangeable.checked === true) {
        circle = new Circle_Init("Circle", 100, 250, widthOfObject.value - 50, heightOfObject.value - 50, colorPickerColor.value);
    } else {
        circle = new Circle_Init("Circle", 100, 250, 50, 50, colorPickerColor.value);
    }
    circle.drawCircle();
    NrObiecteDesenate.innerHTML = countDrawnObjects;
});

btnSquare.addEventListener('click', () => {
    let square;
    if (makeColorsChangeable.checked === true) {
        square = new Square_Init("Square", 50, 50, widthOfObject.value, heightOfObject.value, colorPickerColor.value);

    } else {
        square = new Square_Init("Square", 50, 50, 100, 100, colorPickerColor.value);

    }
    square.drawSquare();
    NrObiecteDesenate.innerHTML = countDrawnObjects;
});

//Delete all objects
eraser.addEventListener('click', () => {
    countDrawnObjects = 0;
    NrObiecteDesenate.innerHTML = countDrawnObjects;
    while (SVG.firstChild) {
        SVG.removeChild(SVG.firstChild);
    }
});


// You can change the background color of the svg
SVG.addEventListener('click', (item) => {
    if (ShouldChangeBackground.checked === true) {
        SVG.setAttribute("style", "background-color:" + backgroundcolorSVG.value);
    }
    //makeColorsChangeable.checked = false;
    //console.log(ShouldChangeBackground.checked);
});


// Get back the last objects and also append to the deleted items list
undoButton.addEventListener('click', (event) => {
    if (SVG.lastChild) {
        arrayDeleted.push(SVG.lastChild);

        if (!(SVG.lastChild.getAttribute('rx') == 5)) {
            countDrawnObjects--;
        }

        SVG.removeChild(SVG.lastChild);

        NrObiecteDesenate.innerHTML = countDrawnObjects;
    } else {
        console.log("Sunteti la final");
    }
});

//We let the user draw points
EnablePoints.addEventListener('click', () => {
    pointsEnabled = !pointsEnabled;
});

// Put back the deleted items
redoButton.addEventListener('click', () => {
    SVG.appendChild(arrayDeleted.pop());
    if (!(SVG.lastChild.getAttribute('rx') == 5)) {
        countDrawnObjects++;

    }
    NrObiecteDesenate.innerHTML = countDrawnObjects;

});




// When we press click down
SVG.addEventListener('mousedown', (item) => {
    if (want_to_delete === true) {
        console.log(eraseSpecific);
    }
});



// We set the boolean variable to true
eraseoneItem.addEventListener('click', () => {
    want_to_delete = !want_to_delete;
    if (want_to_delete === true) {
        if (want_to_delete === true) {
            backgroundSpecific.setAttribute("style", "background-color:green;");
        }
    } else {
        backgroundSpecific.setAttribute("style", "hover:background-color:rgba(139, 148, 150, 0.205);");
    }
});

// Delete specific item after we let go of the mouse
SVG.addEventListener('mouseup', (item) => {
    if (want_to_delete === true) {
        if (item.target.tagName === "rect" || item.target.tagName === "ellipse" || item.target.tagName === "line") {
            countDrawnObjects--;
            NrObiecteDesenate.innerHTML = countDrawnObjects;
            arrayDeleted.push(item.target);
            SVG.removeChild(item.target);
        }
    }
});

// Find position to delete
SVG.addEventListener('mousemove', (item) => {
    if (want_to_delete === true) {
        eraseSpecific = item.target;
    }

});


SVG.addEventListener('mouseup', (elem) => {
    elem.preventDefault();
    shouldBeDragged = false;
    //console.log(colorPickerColor.value);
});

heightOfObject.addEventListener('mouseup', () => {
    console.log(heightOfObject.value);
});


window.addEventListener('mousemove', (mousePosition) => {
    if (pointsEnabled === true) {
        let point = new Point_Init("Point", mousePosition.clientX - 270, mousePosition.clientY - 70, 5, 5, colorPickerColor.value);
        point.drawPoints();

    }

});


//Save Items to local Storage
saveButts.addEventListener('click', () => {

    localStorage.clear();
    let arrayRect = [];
    let arrayEllipse = [];
    let arrayLine = [];
    SVG.childNodes.forEach(node => {
        //console.log(node);
        if (node.nodeName === 'rect') {
            arrayRect.push({
                x: node.getAttribute('x'),
                y: node.getAttribute('y'),
                width: node.getAttribute('width'),
                height: node.getAttribute('height'),
                fill: node.getAttribute('fill')
            });
        } else
        if (node.nodeName === 'ellipse') {
            arrayEllipse.push({
                cx: node.getAttribute('cx'),
                cy: node.getAttribute('cy'),
                rx: node.getAttribute('rx'),
                ry: node.getAttribute('ry'),
                fill: node.getAttribute('fill')
            });
        } else
        if (node.nodeName === 'line') {
            arrayLine.push({
                x1: node.getAttribute('x1'),
                y1: node.getAttribute('y1'),
                x2: node.getAttribute('x2'),
                y2: node.getAttribute('y2'),
                stroke: node.getAttribute('stroke')
            });
        }
    });

    localStorage.setItem("arrayRect", JSON.stringify(arrayRect));
    localStorage.setItem("arrayEllipse", JSON.stringify(arrayEllipse));
    localStorage.setItem("arrayLine", JSON.stringify(arrayLine));
    localStorage.setItem("backgroundColor", JSON.stringify(backgroundcolorSVG.value));
    localStorage.setItem("countOfElements", countDrawnObjects);

});


//Retrieve Items From LocalStorage
getSaved.addEventListener('click', () => {

    let objectReceivedRect = JSON.parse(localStorage.getItem('arrayRect'));
    let objectReceivedEllipse = JSON.parse(localStorage.getItem('arrayEllipse'));
    let objectReceivedLine = JSON.parse(localStorage.getItem('arrayLine'));
    let bckGround = JSON.parse(localStorage.getItem('backgroundColor'));
    let nrObjectsDD = JSON.parse(localStorage.getItem('countOfElements'));

    backgroundcolorSVG.value = bckGround;
    NrObiecteDesenate.innerHTML = nrObjectsDD > 0 ? nrObjectsDD : 0;
    console.log(bckGround);
    if (bckGround === "#000000") {
        SVG.setAttribute("style", "background-color:" + "rebbecapurple");
    } else
        SVG.setAttribute("style", "background-color:" + bckGround);
    for (rect of objectReceivedRect) {

        let r = new Square_Init("Square", rect.x, rect.y, rect.width, rect.height, rect.fill);
        r.drawSquare();
    }
    for (ellipse of objectReceivedEllipse) {
        let e = new Circle_Init("Circle", ellipse.cx, ellipse.cy, ellipse.rx, ellipse.ry, ellipse.fill);
        e.drawCircle();
    }

    for (line of objectReceivedLine) {
        let l = new Line_Init("Line", line.x1, line.y1, line.x2, line.y2, line.stroke);
        l.drawLine();
    }

});

//Download Drawing as SVG File
function downloadSvg(name) {
    var svg = document.getElementById('SVG');
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, source], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


downloadButton.addEventListener('click', () => {

    countDonwloaded++;
    downloadSvg("SVG_EDITOR_" + countDonwloaded)
});