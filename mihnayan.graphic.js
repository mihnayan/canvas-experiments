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

    var copyFigure = function (figure) {
        var newFigure = figure.map(function (path) {
            var pathCopy = {
                color: {r: path.color.r, g: path.color.g, b: path.color.b},
                elements: path.elements.map(function (elem) {
                    return {
                        elementType: elem.elementType,
                        points: elem.points.slice()
                    };
                })
            };
            if (path.glowEffect) pathCopy.glowEffect = path.glowEffect;
            if (path.fillStyle) pathCopy.fillStyle = path.fillStyle;
            return pathCopy;
        });
        return newFigure;
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
            quadraticCurveTo: function (points) {
                ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
            },
            arc: function (points) {
                ctx.arc(points[0], points[1], points[2], points[3], points[4]);
            },
            line: function (points) {
                ctx.moveTo(points[0], points[1]);
                ctx.lineTo(points[2], points[3]);
            },
            lineTo: function (points) {
                ctx.lineTo(points[0], points[1]);
            },
            circle: function (points) {
                ctx.arc(points[0], points[1], points[2], 0, 2*Math.PI);
            },
            circleBy2Points: function (points) {
                var x0 = (points[0] + points[2]) / 2;
                var y0 = (points[1] + points[3]) / 2;
                var r = 0.5 * Math.sqrt(
                    Math.pow((points[2] - points[0]), 2) + Math.pow((points[3] - points[1]), 2));
                ctx.arc(x0, y0, r, 0, 2*Math.PI);
            }
        };

        var drawElements = function (elements) {
            elements.forEach(function (elem) {
                drawElement[elem.elementType](elem.points);
            });
        }

        var drawPath = function (path) {
            ctx.beginPath();
            ctx.strokeStyle = getRGBString(path.color.r, path.color.g, path.color.b);
            ctx.lineWidth = 1;
            drawElements(path.elements);
            ctx.stroke();
            if (path.fillStyle) {
                ctx.closePath();
                ctx.fillStyle = path.fillStyle;
                ctx.fill();
            }
        }

        var drawGlowPath = function (path) {
            for (var i = 5; i >= 0; i--) {
                ctx.beginPath();
                ctx.lineCap = 'round';
                ctx.lineWidth = (i * 2) + 1;
                ctx.strokeStyle = getRGBString(path.color.r, path.color.g, path.color.b, 0.07);
                drawElements(path.elements);
                ctx.stroke();
            }
            drawPath(path);
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

        figure.forEach(function (path) {
            path.glowEffect ? drawGlowPath(path) : drawPath(path);
        })
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

    var animator = function(x, y, w, h) {

        var FPS = 25;
        var started = false;
        var delay = Math.floor(1000 / FPS);

        var motions = [];
        var staticFigures = [];

        var clear = function () {
            clearRect(x, y, w, h);
        };

        var getRotationMove = function (figure, x, y, angle) {

            return function (diff) {
                rotate(figure, x, y, angle * diff);
            }
        };

        var getTransformationMove = function (source, target) {

                var errorFunc = function (msg) {
                    return function () {
                        console.log(msg);
                    }
                }

                if (source.length !== target.length) {
                    return errorFunc("Can't transform figure: source and target figure must contain the same number of paths");
                }

                var workFigure = copyFigure(source);

                for (var path_indx = 0; path_indx < workFigure.length; path_indx++) {
                    var workPath = workFigure[path_indx];
                    var trgPath = target[path_indx];
                    if (workPath.elements.length !== trgPath.elements.length) {
                        return errorFunc("Can't transform figure: figures must same number of elements in path #" 
                            + path_indx);
                    }

                    for (var elem_indx = 0; elem_indx < workPath.elements.length; elem_indx++) {
                        var workElem = workPath.elements[elem_indx];
                        var trgElem = trgPath.elements[elem_indx];
                        if (workElem.elementType !== trgElem.elementType) {
                            return errorFunc("Can't transform element type \"" 
                                + workElem.elementType
                                + "\" to \"" + trgtElem.elementType + "\" in path #"
                                + path_indx + "element #" + elem_indx);
                        }
                        var workPoints = workElem.points;
                        var trgPoints = trgElem.points;
                        if (workPoints.length !== trgPoints.length) {
                            return errorFunc("Can't transform element #" + elem_indx + " in path #"
                                + path_indx +": elements must contain same number of points");
                        }

                        workElem.srcPoints = workElem.points.slice();
                        workElem.deltas = [];
                        workPoints.forEach(function (point, i) {
                            workElem.deltas.push(trgPoints[i] - point);
                        })
                    }
                }
    
                return function (diff) {

                    workFigure.forEach(function (path) {
                        path.elements.forEach(function (elem) {
                            elem.srcPoints.forEach(function (point, i) {
                                elem.points[i] = point + elem.deltas[i] * diff;
                            })
                        })
                    });
                    drawFigure(workFigure);
                }

            };

        var getMotion = function (move, inTime) {

            var paused = true;
            var started = false;

            var stopTime;
            var lastTime;

            return {
                start: function () {
                    paused = false;
                    if (started) return;
                    started = true;
                    lastTime = Date.now();
                    stopTime = inTime + lastTime;
                },
                pause: function () { paused = true; },
                stop: function () {
                    paused = true;
                    started = false;
                },
                move: function () {
                    if (!started) return;
                    var now = Date.now();                   
                    if (paused) {
                        stopTime += (now - lastTime);
                    }
                    lastTime = now;
                    var diff = 1;
                    if (now < stopTime) {
                        diff = (inTime + now - stopTime) / inTime
                    }
                    move(diff);
                }
            };
        };

        var animate = function () {

            if (!started) return;

            clear();
            motions.forEach(function (elem) {
                elem.move();
            });
            staticFigures.forEach(drawFigure);

            setTimeout(animate, delay);
        };

        return {
            start: function () {
                if (started) return;
                started = true;
                motions.forEach(function (elem) {
                    elem.start();
                });
                animate();
            },

            stop: function () {
                started = false;
                motions.forEach(function (elem) {
                    elem.stop();
                });
            },

            addMotion: function (motion) {
                motions.push(motion);
            },

            getRotateMotion: function (figure, x, y, angle, inTime) {
                return getMotion(getRotationMove(figure, x, y, angle), inTime);
            }, 

            getTransformMotion: function (sourceFigure, targetFigure, inTime) {
                return getMotion(getTransformationMove(sourceFigure, targetFigure), inTime);
            },

            addStaticFigure: function (figure) {
                staticFigures.push(figure);
            }
        };
    }

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

        animator: animator,

        getRandomColorStyle: function () {
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        },

        drawFigure: drawFigure,

        copyFigure: copyFigure,

        rotate: rotate
    };
    
})();