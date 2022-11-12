let SVG = document.getElementById('SVG');
let NS = "http://www.w3.org/2000/svg";

let square;
let circle;
let cntNumarObiecteDesenate = 0;
let eraser = document.getElementById("eraseEverything");
let eraseSpecific = -1;
let btnSquare = document.getElementById("SQUARE");
let btnCircle = document.getElementById("CIRCLE");
let btnLine = document.getElementById("LINE");
let NrObiecteDesenate = document.getElementById("nrObiecteDesenate");
let eraseoneItem = document.getElementById("eraseoneItem");
let want_to_delete = false;

let backgroundSpecific = document.getElementById("backgroundSpecific");

backgroundSpecific.setAttribute("class", "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700");


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
        SVG.appendChild(this.name);
        cntNumarObiecteDesenate++;

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
        SVG.appendChild(this.name);
        cntNumarObiecteDesenate++;

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
        SVG.appendChild(this.name);
        cntNumarObiecteDesenate++;
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
}


btnLine.addEventListener('click', () => {
    let line = new Line_Init("Line", 250, 250, 350, 350, "blue");
    line.drawLine();

    NrObiecteDesenate.innerHTML = cntNumarObiecteDesenate;
});



btnCircle.addEventListener('click', () => {
    let circle = new Circle_Init("Circle", 100, 250, 50, 50, "blue");
    circle.drawCircle();

    NrObiecteDesenate.innerHTML = cntNumarObiecteDesenate;
});

btnSquare.addEventListener('click', () => {
    let square = new Square_Init("Square", 50, 50, 100, 100, "red");
    square.drawSquare();
    NrObiecteDesenate.innerHTML = cntNumarObiecteDesenate;

});

eraser.addEventListener('click', () => {

    cntNumarObiecteDesenate = 0;
    NrObiecteDesenate.innerHTML = cntNumarObiecteDesenate;
    while (SVG.firstChild) {
        SVG.removeChild(SVG.firstChild);
    }
});

SVG.addEventListener('click', (item) => {
    // eraseSpecific = item.target;
});

SVG.addEventListener('mousedown', (item) => {
    if (want_to_delete === true) {
        console.log(eraseSpecific);
    }
});

SVG.addEventListener('mouseup', (item) => {
    if (want_to_delete === true) {
        if (item.target.tagName === "rect" || item.target.tagName === "ellipse" || item.target.tagName === "line") {
            cntNumarObiecteDesenate--;
            NrObiecteDesenate.innerHTML = cntNumarObiecteDesenate;
            SVG.removeChild(item.target);
        }
    }
});
SVG.addEventListener('mousemove', (item) => {

    if (want_to_delete === true) {

        eraseSpecific = item.target;
    }


});

eraseoneItem.addEventListener('click', () => {
    want_to_delete = !want_to_delete;
    if (want_to_delete === true) {
        // console.log('Want to Delete');
        if (want_to_delete === true) {
            backgroundSpecific.setAttribute("style", "background-color:green;");
        }
    } else {
        backgroundSpecific.setAttribute("style", "hover:background-color:rgba(139, 148, 150, 0.205);");
    }
});