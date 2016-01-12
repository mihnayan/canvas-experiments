var pen = (function () {

    var ctx;
    var posX = 0;
    var posY = 0;
    var angle = 0;

    var changePosition = function (x, y) {
        posX = x;
        posY = y;
    }

    return {
        init: function (params) {
            ctx = params.canvasContext;
        },

        setStyle: function (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
        },

        setLineWidth: function (width) {
            ctx.lineWidth = width;
        },

        move: function (x, y) {
            posX = x;
            posY = y;
        },

        turn: function (degree) {
            angle = angle + Math.PI * degree / 180;
        },

        draw: function (lenght) {
            var x = posX + Math.sin(angle) * lenght;
            var y = posY + Math.cos(angle) * lenght;

            ctx.beginPath();
            ctx.moveTo(posX, posY);
            ctx.lineTo(x, y);
            ctx.stroke();

            changePosition(x, y);
        }
    }
})();

var getRandomColorStyle = function () {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

/**
 * Returns color objects array that represents color transition.
 * Color object is specified in the format { red: 0, green: 0, blue: 0 }.
 * @param beginColor The color object of begin color.
 * @param endColor The color object of end color in transition.
 * @param steps The number of steps in transition.
 * @return Array of color objects.
 */
var getColorTransition = function (beginColor, endColor, steps) {

    var redDelta = (endColor.red - beginColor.red) / steps;
    var greenDelta = (endColor.green - beginColor.green) / steps;
    var blueDelta = (endColor.blue - beginColor.blue) / steps;

    var transition = [];
    for (var i = 0; i <= steps; i++) {
        transition.push(
            {
                red: Math.floor(beginColor.red + redDelta * i),
                green: Math.floor(beginColor.green + greenDelta * i),
                blue: Math.floor(beginColor.blue + blueDelta * i)
            });
    }

    return transition;
}