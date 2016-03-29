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
}

window.onload = function () {

    var starLevelsElements = document.getElementsByClassName('star-levels');
    for (var i = 0; i < starLevelsElements.length; i++) {
        if (i >= stars.length) break;
        stars[i].level = starLevelsElements[i].value;
    }

    var ctx = document.getElementById("cnv").getContext("2d");
    graphics.init({canvasContext: ctx});
    drawStars();
}