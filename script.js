// INITIALIZE CONTROLS
let SVG = document.getElementById('SVG');
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
let colorPickerColor = document.getElementById("colorPickerColor");
let makeColorsChangeable = document.getElementById("default-checkbox");


//Utils
let square;
let circle;
let countDrawnObjects = 0;
let eraseSpecific = -1;
let selectedItem = 0;
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
            if (makeColorsChangeable.checked === true)
                selectedForColorChange.setAttribute('fill', colorPickerColor.value);
        });


        this.name.addEventListener('mousedown', function(e) {
            shouldBeDragged = !shouldBeDragged;
            if (shouldBeDragged) {
                selectedItem = this;
                console.log(selectedItem.getAttribute('x'), selectedItem.getAttribute('y'));
                SVG.addEventListener('mousemove', function(e) {
                    if (shouldBeDragged && selectedItem != 0) {
                        selectedItem.setAttribute('x', e.clientX - squareIndexing.xminus);
                        selectedItem.setAttribute('y', e.clientY - squareIndexing.yminus);
                    }
                });
            }
        });


        SVG.appendChild(this.name);
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
            if (makeColorsChangeable.checked === true)
                selectedForColorChange.setAttribute('fill', colorPickerColor.value);
        });

        this.name.addEventListener('mousedown', function(e) {
            shouldBeDragged = !shouldBeDragged;
            if (shouldBeDragged) {
                selectedItem = this;
                console.log(selectedItem.getAttribute('x'), selectedItem.getAttribute('y'));
                SVG.addEventListener('mousemove', function(e) {
                    if (shouldBeDragged && selectedItem != 0) {
                        selectedItem.setAttribute('cx', e.clientX - circleIndexing.xminus);
                        selectedItem.setAttribute('cy', e.clientY - circleIndexing.yminus);
                    }
                });
            }
        });


        SVG.appendChild(this.name);
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
        this.name.setAttributeNS(null, 'stroke-width', 8);

        this.name.addEventListener('click', function(e) {
            selectedForColorChange = this;
            if (makeColorsChangeable.checked === true)
                selectedForColorChange.setAttribute('fill', colorPickerColor.value);
        });

        this.name.addEventListener('mousedown', function(e) {
            shouldBeDragged = !shouldBeDragged;
            if (shouldBeDragged) {
                selectedItem = this;
                SVG.addEventListener('mousemove', function(e) {
                    if (shouldBeDragged && selectedItem != 0) {

                        console.log(selectedItem.getAttribute('y'), e.clientY - lineIndexing.x1minus);

                        selectedItem.setAttribute('x1', e.clientX - lineIndexing.x1minus);
                        selectedItem.setAttribute('x2', e.clientX - lineIndexing.x2minus);
                        selectedItem.setAttribute('y1', e.clientY - lineIndexing.y1minus);
                        selectedItem.setAttribute('y2', e.clientY - lineIndexing.y2minus);
                    }
                });
            }
        });


        SVG.appendChild(this.name);
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
    let line = new Line_Init("Line", 250, 250, 350, 350, colorPickerColor.value);
    line.drawLine();
    NrObiecteDesenate.innerHTML = countDrawnObjects;
});

btnCircle.addEventListener('click', () => {
    let circle = new Circle_Init("Circle", 100, 250, 50, 50, colorPickerColor.value);
    circle.drawCircle();
    NrObiecteDesenate.innerHTML = countDrawnObjects;
});

btnSquare.addEventListener('click', () => {
    let square = new Square_Init("Square", 50, 50, 100, 100, colorPickerColor.value);
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

SVG.addEventListener('click', (item) => {
    // eraseSpecific = item.target;
});


// Get back the last objects and also append to the deleted items list
undoButton.addEventListener('click', () => {
    if (SVG.lastChild) {
        arrayDeleted.push(SVG.lastChild);
        SVG.removeChild(SVG.lastChild);
        countDrawnObjects--;
        NrObiecteDesenate.innerHTML = countDrawnObjects;
    } else {
        console.log("Sunteti la final");
    }
});

// Put back the deleted items
redoButton.addEventListener('click', () => {
    SVG.appendChild(arrayDeleted.pop());
    countDrawnObjects++;
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
    console.log(colorPickerColor.value);
});






//Ability to download the svg
function downloadSVG() {
    const blob = new Blob([SVG.toString()]);
    const element = document.createElement("a");
    element.download = "project.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
}
downloadButton.addEventListener('click', downloadSVG);