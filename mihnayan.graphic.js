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

var graphics = (function () {

    var ctx;
    var backgroundColor;

    var getRGBString = function (r, g, b, a) {
        var rgb = [r, g, b];
        var str = 'rgb(';
        if (typeof(a) === 'number') {
            rgb.push(a);
            str = 'rgba(';
        }
        return str + rgb.join(',') + ')';
    };
    
    var drawFigure = function (figure, clear) {
    
        var drawElement = {
            curveByPoints: function (points) {
                var p_len = points.length;
                if (p_len < 4) return;

                ctx.moveTo(points[0], points[1]);
                if (p_len < 6) {
                    ctx.lineTo(points[2], points[3]);
                    return;
                }

                for (var i = 2; i < p_len - 4; i += 2) {
                    var xc = (points[i] + points[i + 2]) / 2;
                    var yc = (points[i + 1] + points[i + 3]) / 2;
                    ctx.quadraticCurveTo(points[i], points[i + 1], xc, yc);
                }
 
                ctx.quadraticCurveTo(points[i], points[i + 1], points[i + 2], points[i + 3]);
            },
            quadraticCurve: function (points) {
                ctx.moveTo(points[0], points[1]);
                ctx.quadraticCurveTo(points[2], points[3], points[4], points[5]);
            },
            arc: function (points) {
                ctx.arc(points[0], points[1], points[2], points[3], points[4]);
            },
            line: function (points) {
                ctx.moveTo(points[0], points[1]);
                ctx.lineTo(points[2], points[3]);
            }
        };

        var drawElements = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                drawElement[element.elementType](element.points);
            }
        }

        var drawPath = function (path) {
            ctx.beginPath();
            ctx.strokeStyle = getRGBString(path.color.r, path.color.g, path.color.b);
            ctx.lineWidth = 1;
            drawElements(path.elements);
            ctx.stroke();
        }

        var drawGlowPath = function (path) {
            for (var i = 5; i >= 0; i--) {
                ctx.beginPath();
                ctx.lineCap = 'round';
                ctx.lineWidth = (i * 2) + 1;
                if (i === 0) {
                    ctx.strokeStyle = getRGBString(path.color.r, path.color.g, path.color.b);
                } else {
                    ctx.strokeStyle = getRGBString(path.color.r, path.color.g, path.color.b, 0.07);
                }
                drawElements(path.elements);
                ctx.stroke();
            }
            ctx.lineCap = 'butt';
        };

        var clearPath = function (path) {
            ctx.beginPath();
            ctx.strokeStyle = backgroundColor;
            ctx.lineWidth = 30;
            ctx.lineCap = 'square';
            drawElements(path.elements);
            ctx.stroke();
            ctx.lineCap = 'butt';
        }

        for (var i = 0; i < figure.length; i++) {
            var path = figure[i];
            clear ? clearPath(path) : drawGlowPath(path);
        }
    };

    var clearRect = function (x, y, w, h) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x, y, w, h);
    };

    var rotate = function (figure, x0, y0, angle) {
        ctx.save();
        ctx.translate(x0, y0);
        ctx.rotate(Math.PI * angle / 180);
        ctx.translate(-x0, -y0);
        drawFigure(figure);
        ctx.restore();  
    };

    var pen = function () {

        var posX = 0;
        var posY = 0;
        var angle = 0;

        var changePosition = function (x, y) {
            posX = x;
            posY = y;
        }

        return {
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
    };

    var animator = function () {

        var fps = 25;
        var delay = 1000 / fps;
        var graphicsRotate = rotate;

        return {
            transformFigure: function (source, target, speed) {

                var steps = Math.floor(fps * speed);

                var getDelta = function (srcPoints, trgtPoints) {
                    var res = {
                        "delta": []
                    };
                    for (var i = 0; i < srcPoints.length; i++) {
                        var dp = (trgtPoints[i] - srcPoints[i]) / steps;
                        res.delta.push(dp);
                    }
                    return res;
                }

                if (source.length !== target.length) {
                    console.log("Can't transform figure: source and target figure must contain the same number of paths");
                    return;
                }

                var deltaPoints = [];

                for (var path_index = 0; path_index < source.length; path_index++) {
                    var srcElms = source[path_index].elements;
                    var trgtElms = target[path_index].elements;        
                    if (srcElms.length !== trgtElms.length) {
                        console.log("Can't transform figure: figures must contain same number of elements in path #" 
                            + path_index);
                        return;
                    }
                    deltaPoints.push({});
                    deltaPoints[path_index].elements = [];

                    for (var elm_index = 0; elm_index < srcElms.length; elm_index++) {
                        if (srcElms[elm_index].elementType !== trgtElms[elm_index].elementType) {
                            console.log("Can't transform element type \"" + srcElms[elm_index].elementType
                                + "\" to \"" + trgtElms[elm_index].elementType + "\" in path #"
                                + path_index + "element #" + elm_index);
                            return;
                        }
                        var srcPoints = srcElms[elm_index].points;
                        var trgtPoints = trgtElms[elm_index].points;
                        if (srcPoints.length !== trgtPoints.length) {
                            console.log("Can't transform element #" + elm_index + " in path #"
                                + path_index +": elements must contain same number of points");
                            return;
                        }
                        deltaPoints[path_index].elements.push(getDelta(srcPoints, trgtPoints));
                    }
                }

                var getIncPoints = function (points, deltas) {
                    var res = [];
                    for (var i = 0; i < points.length; i++) {
                        res.push(points[i] + deltas[i]);
                    }
                    return res;
                }
    
                var current = source;
                var transform = function (step) {

                    if (step === 0) {
                        drawFigure(current, true);
                        drawFigure(target);
                        return;
                    }

                    var next = [];
                    for (var path_index = 0; path_index < current.length; path_index++) {
                        curElms = current[path_index].elements;
                        next.push({});
                        next[path_index].color = current[path_index].color;
                        next[path_index].glowEffect = current[path_index].glowEffect;
                        next[path_index].elements = [];
                        for (var elm_index = 0; elm_index < curElms.length; elm_index++) {
                            next[path_index].elements.push({});
                            curElm = next[path_index].elements[elm_index];
                            curElm.elementType = curElms[elm_index].elementType;
                            curElm.points = getIncPoints(curElms[elm_index].points,
                                deltaPoints[path_index].elements[elm_index].delta);
                        }
                    }
                    drawFigure(current, true);
                    drawFigure(next);
                    current = next;
                    setTimeout(function () {
                        transform(--step);
                    }, delay);
                }

                transform(steps);
            },

            rotate: function (figure, x, y, angle, speed) {

                var steps = Math.floor(fps * speed);
                var deltaAngle = angle / steps;
                var currentAngle = 0;

                var goRotate = function (step) {
                    if (step === 0) return;
                    currentAngle += deltaAngle;
                    clearRect(0,0, 600,500);
                    graphicsRotate(figure, x, y, currentAngle);
                    setTimeout(function () {
                        goRotate(--steps);
                    }, delay);
                }

                goRotate(steps);
            }
        }
    };

    return {
        init: function (params) {
            ctx = params.canvasContext;
            backgroundColor = params.backgroundColor;
            if (!backgroundColor) {
                backgroundColor = '#fff';
            }
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
        },

        pen: pen(),

        animator: animator(),

        getRandomColorStyle: function () {
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        },

        drawFigure: drawFigure,

        rotate: rotate
    };
    
})();