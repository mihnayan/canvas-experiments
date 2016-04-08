var starInit = {
    centerX: 450,
    centerY: 370,
    edgeLength: 70
};

var starsInit = [
    { 
        level: 0,
        increment: 0
    },
    { 
        level: 1,
        increment: 100
    },
    {
        level: 2,
        increment: 100
    },
    {
        level: 3,
        increment: 133
    },
    {
        level: 4,
        increment: 200
    }
];

var drawStars = function (stars) {

    if (!Array.isArray(stars)) {
        return;
    }

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
    var increment = 0;

    pen.setLineWidth(3);
    pen.turn(30);
    for (var n = 0; n < stars.length; n++) {

        increment += stars[n].increment;
        // inscribed circle radius
        var radius = (increment + starInit.edgeLength) * Math.sqrt(3) / 6;

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

var getStarsParameters = function () {
    var starParameters = starParametersStore.getAll();
    var stars = [];
    for (var i = 0; i < starParameters.length; i++) {
        var data = {
            level: starParameters[i].level,
            increment: starParameters[i].increment
        };
        stars.push(data);
    }
    return stars;
}

window.onload = function () {
    var ctx = document.getElementById("cnv").getContext("2d");
    graphics.init({canvasContext: ctx});

    var managePanel = document.getElementById('manage-panel');

    var addStarParameterBlock = (function () {
        if (typeof managePanel !== 'Object'
                && !managePanel.nodeType 
                && managePanel.nodeType !== managePanel.ELEMENT_NODE) {
        
            return;
        }

        var starNumber = 0;
        return function (data) {
            starNumber++;
            var starParametersBlock = new StarParametersBlock(starNumber, data);
            starParametersStore.add(starParametersBlock);

            starParametersBlock.bind('removeParameters', function () {
                starParametersStore.remove(starParametersBlock.id);
                managePanel.removeChild(starParametersBlock.blockElement);
            });
            managePanel.appendChild(starParametersBlock.blockElement);
        };
    })();

    var addButton = managePanel.getElementsByClassName('manage-panel__add-star-button')[0];
    addButton.addEventListener('click', addStarParameterBlock);

    for (var i = 0; i < starsInit.length; i++) {
        addStarParameterBlock({
            level: starsInit[i].level,
            increment: starsInit[i].increment
        });
    }

    drawStars(getStarsParameters());
}