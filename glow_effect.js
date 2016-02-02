
var drawGlowLine = function (ctx, r, g, b, drawFunction) {
    for (var i = 5; i >= 0; i--) {
        ctx.beginPath();
        ctx.lineWidth = (i * 4) + 1;
        if (i === 0) {
            ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        } else {
            ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + 0.07 + ')';
        }
        drawFunction();
        ctx.stroke();
    }
}

window.onload = function () {
    var ctx = document.getElementById("cnv").getContext("2d");

    drawGlowLine(ctx, 255, 0, 0, function () {
        ctx.moveTo(100,100);
        ctx.lineTo(600,200);
        ctx.quadraticCurveTo(800,250, 700,50)
    });

    drawGlowLine(ctx, 0xcc, 0xcc, 0xcc, function () {
        ctx.arc(200, 100, 50, 0.95 * Math.PI, 0.6 * Math.PI)
    })

    drawGlowLine(ctx, 255, 155, 0, function () {
        ctx.moveTo(600,100);
        ctx.lineTo(200,200);
    });

    drawGlowLine(ctx, 0, 255, 0, function () {
        ctx.moveTo(300,50);
        ctx.lineTo(400, 200);
    });

    drawGlowLine(ctx, 0, 0, 255, function () {
        ctx.moveTo(500,75);
        ctx.lineTo(250, 250);
    });
}