

var drawCurves = function() {
    var ctx = document.getElementById("cnv").getContext("2d");

    var simmetryLine = {
        x1: 111,
        y1: 115,
        x2: 339,
        y2: 187
    }

    ctx.moveTo(153, 169);
    //fish
    ctx.quadraticCurveTo(118, 151, 111, 115);
    ctx.quadraticCurveTo(211, 71, 309, 166);
    ctx.quadraticCurveTo(328, 153, 361, 159);
    ctx.quadraticCurveTo(330, 186, 340, 224);
    ctx.quadraticCurveTo(315, 206, 302, 188);
    ctx.quadraticCurveTo(225, 195, 194, 184);

    //leg
    ctx.moveTo(146, 180);
    ctx.quadraticCurveTo(179, 133, 213, 133);
    ctx.quadraticCurveTo(231, 133, 231, 149);
    ctx.quadraticCurveTo(231, 164, 184, 189);
    ctx.quadraticCurveTo(205, 218, 205, 245);
    ctx.lineTo(217, 258);
    ctx.quadraticCurveTo(223, 267, 213, 272);
    ctx.quadraticCurveTo(198, 277, 185, 286);
    ctx.quadraticCurveTo(179, 290, 164, 290);
    ctx.quadraticCurveTo(155, 288, 163, 284);
    ctx.quadraticCurveTo(181, 276, 186, 265);
    ctx.quadraticCurveTo(186, 231, 154, 200);
    ctx.quadraticCurveTo(141, 188, 146, 180);

    //circle
    ctx.moveTo(171, 151);
    ctx.arc(209, 146, 39, 0.95 * Math.PI, 0.6 * Math.PI);

    //arrow
    ctx.moveTo(111, 115);
    ctx.lineTo(85, 105);
    ctx.lineTo(102, 101);
    ctx.moveTo(85, 105);
    ctx.lineTo(94, 118);
    ctx.stroke();
}

window.onload = function () {
    drawCurves();
}