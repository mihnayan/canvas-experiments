var starInit = {
    centerX: 450,
    centerY: 370,
    edgeLength: 70
};

var stars = [
    { 
        level: 0,
        decrement: 0
    },
    { 
        level: 1,
        decrement: 100
    },
    {
        level: 2,
        decrement: 100
    },
    {
        level: 3,
        decrement: 133
    },
    {
        level: 4,
        decrement: 200
    }
];

var drawStars = function () {

    graphics.clearCanvas();
    var pen = graphics.pen;

    var drawKokhLine = function (lenght, deep) {
        if (deep == 0) {
            pen.draw(lenght);
            return;
        }

        var linePart = lenght / 3;
        drawKokhLine(linePart, deep - 1);
        pen.turn(-60);
        drawKokhLine(linePart, deep - 1);
        pen.turn(120);
        drawKokhLine(linePart, deep - 1);
        pen.turn(-60);
        drawKokhLine(linePart, deep - 1);
    }

    var edgeLength = starInit.edgeLength;
    var decrement = 0;

    pen.setLineWidth(3);
    pen.turn(30);
    for (var n = 0; n < stars.length; n++) {

        decrement += stars[n].decrement;
        // inscribed circle radius
        var radius = (decrement + starInit.edgeLength) * Math.sqrt(3) / 6;

        if (n !== 0) {
            edgeLength = 6 * radius / Math.sqrt(3);
        }
        var triangleHeight = edgeLength * Math.cos(Math.PI / 6);
        var angleY = starInit.centerY + (triangleHeight - radius);

        pen.move(starInit.centerX, angleY);
        pen.setStyle(graphics.getRandomColorStyle());
        for (var i = 1; i <= 3; i++) {
            pen.turn(120);
            drawKokhLine(edgeLength, stars[n].level);
        }
    }

    pen.turn(-30);
}

var setStarsParameters = function () {
    var starLevelsElements = document.getElementsByClassName('star-levels');
    for (var i = 0; i < starLevelsElements.length; i++) {
        if (i >= stars.length) break;
        stars[i].level = starLevelsElements[i].value;
    }
}

var addStarParameterBlock = function (managePanel) {
    if (typeof managePanel !== 'Object'
            && !managePanel.nodeType 
            && managePanel.nodeType !== managePanel.ELEMENT_NODE) {
        
        return;
    }

    var starNumber = 0;
    return function () {
        starNumber++;
        var starParametersBlock = new StarParametersBlock(starNumber, 
            'Star #' + starNumber + ' parameters');
        starParametersBlock.bind('removeParameters', function () {
            managePanel.removeChild(starParametersBlock.blockElement);
        });
        managePanel.appendChild(starParametersBlock.blockElement);
    };
};

window.onload = function () {
    var ctx = document.getElementById("cnv").getContext("2d");
    graphics.init({canvasContext: ctx});

    var inputElements = document.getElementsByTagName('input');
    for (var i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener('change', function () {
            setStarsParameters();
            drawStars();
        });
    }

    setStarsParameters();
    drawStars();

    var managePanel = document.getElementById('manage-panel');
    var addButton = managePanel.getElementsByClassName('manage-panel__add-star-button')[0];
    addButton.addEventListener('click', addStarParameterBlock(managePanel));

}