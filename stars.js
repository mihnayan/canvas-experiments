var drawInit = {
    centerX: 450,
    centerY: 370,
    edgeLength: 70
};

var starsInit = [
    { 
        level: 0,
        radius: 20
    },
    { 
        level: 1,
        radius: 49
    },
    {
        level: 2,
        radius: 78
    },
    {
        level: 3,
        radius: 116
    },
    {
        level: 4,
        radius: 174
    }
];

var drawStars = function (stars) {

    if (!Array.isArray(stars)) {
        return;
    }

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

    graphics.clearCanvas();
    var pen = graphics.pen;
    var edgeLength = drawInit.edgeLength;
    var radius = 0;

    pen.move(drawInit.centerX, drawInit.centerY);
    pen.setLineWidth(3);
    pen.turn(30);
    for (var n = 0; n < stars.length; n++) {

        radius = stars[n].radius;      
        edgeLength = 6 * radius / Math.sqrt(3);
        var triangleHeight = edgeLength * Math.cos(Math.PI / 6);
        var angleY = drawInit.centerY + (triangleHeight - radius);

        pen.move(drawInit.centerX, angleY);
        pen.setStyle(graphics.getRandomColorStyle());
        for (var i = 1; i <= 3; i++) {
            pen.turn(120);
            drawKokhLine(edgeLength, stars[n].level);
        }
    }

    pen.turn(-30);
}

var starParametersStore = (function () {

    var store = [];
    
    return {
        add: function (item) {
            store.push(item);
        },
        get: function (id) {
            for (var i = 0; i < store.length; i++) {
                if (store[i].id === id) {
                    return store[i];
                }
            }
        },
        getAll: function () {
            return store.slice();
        },
        remove: function (id) {
            for (var i = 0; i < store.length; i++) {
                if (store[i].id === id) {
                    return store.splice(i, 1)[0];
                }
            }
        }
    }
})();

function reDrawStars() {
    var starParameters = starParametersStore.getAll();
    var stars = [];
    for (var i = 0; i < starParameters.length; i++) {
        var data = {
            level: starParameters[i].level,
            radius: starParameters[i].radius
        };
        stars.push(data);
    }
    drawStars(stars);
}

window.onload = function () {
    var ctx = document.getElementById("cnv").getContext("2d");
    graphics.init({canvasContext: ctx});

    var managePanel = document.getElementById('manage-panel');

    var starNumber = 0;
    var addStarParameters = function (data) {
            starNumber++;
            var starParametersBlock = new StarParametersBlock(starNumber, data);
            starParametersStore.add(starParametersBlock);

            starParametersBlock.bind('removeParameters', function () {
                starParametersStore.remove(starParametersBlock.id);
                managePanel.removeChild(starParametersBlock.blockElement);
                reDrawStars();
            });
            starParametersBlock.bind('changeParameters', reDrawStars);
            managePanel.appendChild(starParametersBlock.blockElement);
    };

    var addButton = managePanel.getElementsByClassName('manage-panel__add-star-button')[0];
    addButton.addEventListener('click', function () {
        addStarParameters({
            level: 0,
            radius: 10
        });
        reDrawStars();
    });

    for (var i = 0; i < starsInit.length; i++) {
        addStarParameters({
            level: starsInit[i].level,
            radius: starsInit[i].radius
        });
    }

    reDrawStars();
}