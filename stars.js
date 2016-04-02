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

// var ManagePanelFactory = function () {

//     var managePanel = document.getElementById('manage-panel');
//     var starParameters = document.getElementsByClassName('star-parameters_hidden')[0];
    
//     return {
//         addStarParameterBlock: function () {
//             newStarParameters = starParameters.cloneNode();

//             managePanel.appendChild(newStarParameters);
//         }
//     }
// }


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

    var addButton = document.getElementById('add-star-button');
    var starNumber = 0;
    addButton.addEventListener('click', function () {
        starNumber++;
        var fragment = starParametersBlock.getNewBlock(starNumber, 
            'Star #' + starNumber + ' parameters');
        var managePanel = document.getElementById('manage-panel');
        managePanel.appendChild(fragment);
    });

    // addStarParameterBlock();
}