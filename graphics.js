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