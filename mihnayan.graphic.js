'use strict'

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
};

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

    var getElementDrawer = function (context) {

        var drawFunctions = {
            curveByPoints: function (points) {
                var p_len = points.length;
                if (p_len < 4) return;

                context.moveTo(points[0], points[1]);
                if (p_len < 6) {
                    context.lineTo(points[2], points[3]);
                    return;
                }

                for (var i = 2; i < p_len - 4; i += 2) {
                    var xc = (points[i] + points[i + 2]) / 2;
                    var yc = (points[i + 1] + points[i + 3]) / 2;
                    context.quadraticCurveTo(points[i], points[i + 1], xc, yc);
                }
 
                context.quadraticCurveTo(points[i], points[i + 1], points[i + 2], points[i + 3]);
            },
            quadraticCurve: function (points) {
                context.moveTo(points[0], points[1]);
                context.quadraticCurveTo(points[2], points[3], points[4], points[5]);
            },
            quadraticCurveTo: function (points) {
                for (var i = 0; i < points.length; i += 4) {
                    context.quadraticCurveTo(points[i], points[i+1], points[i+2], points[i+3]);
                }
            },
            arc: function (points) {
                context.arc(points[0], points[1], points[2], points[3], points[4]);
            },
            line: function (points) {
                context.moveTo(points[0], points[1]);
                context.lineTo(points[2], points[3]);
            },
            lineTo: function (points) {
                context.lineTo(points[0], points[1]);
            },
            circle: function (points) {
                context.arc(points[0], points[1], points[2], 0, 2*Math.PI);
            },
            circleBy2Points: function (points) {
                var x0 = (points[0] + points[2]) / 2;
                var y0 = (points[1] + points[3]) / 2;
                var r = 0.5 * Math.sqrt(
                    Math.pow((points[2] - points[0]), 2) + Math.pow((points[3] - points[1]), 2));
                context.arc(x0, y0, r, 0, 2*Math.PI);
            }
        };

        return {
            draw: function (element) {
                drawFunctions[element.elementType](element.points);
            }
        };
    };

    var Figure = function (paths) {

        var rotation = {
            x: 0,
            y: 0,
            angle: 0
        };

        var drawData = function () {
            var elementDrawer = getElementDrawer(ctx);

            var drawPath = function (path) {
                ctx.beginPath();
                ctx.strokeStyle = getRGBString(path.color.r, path.color.g, path.color.b);
                ctx.lineWidth = 1;
                path.elements.forEach(elementDrawer.draw);
                ctx.stroke();
                if (path.fillStyle) {
                    ctx.closePath();
                    ctx.fillStyle = path.fillStyle;
                    ctx.fill();
                }
            };

            var drawGlowPath = function (path) {
                for (var i = 5; i >= 0; i--) {
                    ctx.beginPath();
                    ctx.lineCap = 'round';
                    ctx.lineWidth = (i * 2) + 1;
                    ctx.strokeStyle = getRGBString(path.color.r, path.color.g, path.color.b, 0.07);
                    path.elements.forEach(elementDrawer.draw);
                    ctx.stroke();
                }
                drawPath(path);
                ctx.lineCap = 'butt';
            };

            paths.forEach(function (path) {
                path.glowEffect ? drawGlowPath(path) : drawPath(path);
            });
        }

        /**
         * Returns copy of figure paths
         * @return Figure paths in JSON format
         */
        this.getPaths = function () {
            return paths.map(function (path) {
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
        };

        /**
         * Draw figure.
         * @return self-reference
         */
        this.draw = function () {
            if (rotation.angle == 0) {
                drawData();
            } else {
                ctx.save();
                ctx.translate(rotation.x, rotation.y);
                ctx.rotate(Math.PI * rotation.angle / 180);
                ctx.translate(-rotation.x, -rotation.y);
                drawData();
                ctx.restore();
            }
            return this;
        };

        /**
         * Sets rotation parameters. The parameters will applied while invoke draw() method.
         * @param x x-coordinate of rotation center
         * @param y y-coordinate of rotation center
         * @param angle Angle of rotation, in degrees. If angle equal 0, then parameters not applied.
         * @return self-reference
         */
        this.setRotation = function (x, y, angle) {
            rotation.x = x;
            rotation.y = y;
            rotation.angle = angle;
            return this;
        };
    };

    var clearRect = function (x, y, w, h) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x, y, w, h);
    };

    var pen = function () {

        var posX = 0;
        var posY = 0;
        var angle = 0;

        var changePosition = function (x, y) {
            posX = x;
            posY = y;
        };

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
        };
    };

    var animator = function(x, y, w, h) {

        var FPS = 25;
        var started = false;
        var delay = Math.floor(1000 / FPS);

        //TODO: need another method to keep Motions (possible strong growth of the array if frequently deletion/insertion are occurring)
        var motions = [];

        var clear = function () {
            clearRect(x, y, w, h);
        };

        var getRotationMove = function (figure, x, y, angle) {

            return {
                doStep: function (diff) {
                    figure.setRotation(x, y, angle * diff).draw();
                }
            };
        };

        var canTransformPaths = function (sourcePaths, targetPaths) {

            var message = ["Can't transform fugure."];

            var isSimilarElements = function (srcElements, trgElements) {
                if (srcElements.length === trgElements.length) {
                    return srcElements.every(function (element, index) {
                        var similarElements = 
                                (element.elementType === trgElements[index].elementType)
                                && (element.points.length === trgElements[index].points.length);
                        if (!similarElements) {
                            message.push("Elements #" + index + " must be similar.");
                        }
                        return similarElements;
                    });
                } else {
                    message.push("Path must contain same number of elements");
                }
                return false;
            }

            var canTransform = sourcePaths.length === targetPaths.length;

            if (canTransform) {
                canTransform = sourcePaths.every(function (path, index) {
                    var similarElements = isSimilarElements(path.elements, targetPaths[index].elements);
                    if (!similarElements) {
                        message.push("Elements in path #" + index + " must be similar.");
                    }
                    return similarElements;
                });
            } else {
                message.push("Source and target figure must contain the same number of paths");
            }

            if (!canTransform) {
                console.log(message.join(" "));
            }

            return canTransform;
        }

        var getTransformationMove = function (sourcePaths, targetPaths) {

            for (var path_indx = 0; path_indx < sourcePaths.length; path_indx++) {
                var workPath = sourcePaths[path_indx];
                var targetPath = targetPaths[path_indx];

                for (var elem_indx = 0; elem_indx < workPath.elements.length; elem_indx++) {
                    var workElement = workPath.elements[elem_indx];
                    var targetElement = targetPath.elements[elem_indx];
                    var workPoints = workElement.points;
                    var targetPoints = targetElement.points;

                    workElement.srcPoints = workPoints.slice();
                    workElement.deltas = workPoints.map(function (point, index) {
                        return targetPoints[index] - point;
                    });
                }
            }
    
            return {
                doStep: function (diff) {
                    sourcePaths.forEach(function (path) {
                        path.elements.forEach(function (elem) {
                            elem.srcPoints.forEach(function (point, i) {
                                elem.points[i] = point + elem.deltas[i] * diff;
                            });
                        });
                    });
                    new Figure(sourcePaths).draw();
                }
            };

        };

        var getStatic = function (figure) {

            return {
                doStep: function (diff) {
                    figure.draw();
                }
            };
        };

        var getMotion = function (motion, inTime) {

            var paused = false;
            var started = false;
            var ended = false;

            var stopTime = 0;
            var lastTime = 0;

            return {
                start: function () {
                    if (started) return;
                    started = true;
                    lastTime = Date.now();
                    stopTime = inTime + lastTime;
                },
                pause: function () { paused = true; },
                resume: function () { paused = false; },
                stop: function () {
                    paused = true;
                    started = false;
                },
                repeat: function () {
                    if (!ended) return;
                    ended = started = false;
                    this.start();
                },
                move: function () {
                    if (!started) return;
                    var diff = 1;
                    if (!ended) {
                        var now = Date.now();                   
                        if (paused) {
                            stopTime += (now - lastTime);
                        }
                        lastTime = now;
                        if (now < stopTime) {
                            diff = (inTime + now - stopTime) / inTime;
                        } else {
                            ended = true;
                            if (typeof this.onEnd === 'function') this.onEnd(this);
                        }
                    }
                    motion.doStep(diff);
                },
                onEnd: function () {}
            };
        };

        var animate = function () {

            if (!started) return;

            clear();
            motions.forEach(function (elem) {
                if (elem) elem.move();
            });

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
                return motions.length - 1;
            },
            deleteMotion: function (motionId) {
                motions[motionId] = null;
            },
            getRotateMotion: function (figure, x, y, angle, inTime) {
                return getMotion(getRotationMove(figure, x, y, angle), inTime);
            }, 

            getTransformMotion: function (sourceFigure, targetFigure, inTime) {
                var sourcePaths = sourceFigure.getPaths();
                var targetPaths = targetFigure.getPaths();
                if (canTransformPaths(sourcePaths, targetPaths)) {
                    return getMotion(getTransformationMove(sourcePaths, targetPaths), inTime);
                }
            },

            getStaticMotion: function (figure) {
                return getMotion(getStatic(figure));
            }
        };
    };

    var eventManager = function (debugMode) {
        var eventCanvas = document.createElement('canvas');
        var eventCtx = eventCanvas.getContext('2d');

        eventCanvas.height = ctx.canvas.height;
        eventCanvas.width = ctx.canvas.width;

        if (debugMode) {
            document.getElementsByTagName('body')[0].appendChild(eventCanvas);
        }

        var _id = 0;

        var _observedFigures = [];

        var _callbacks = {
            'mousemove': [],
            'click': []
        };

        var getRGBStringById = function (id) {
            var r = (id >> 16) & 255;
            var g = (id >> 8) & 255;
            var b = id & 255;
            return getRGBString(r, g, b);
        };

        var idByImageData = function (imageData) {
            return (imageData.data[0] << 16) + (imageData.data[1] << 8) + imageData.data[2];
        };

        var runEventAction = function (eventName, eventObject) {
            var x = eventObject.clientX;
            var y = eventObject.clientY;
            var id = idByImageData(eventCtx.getImageData(x, y, 1, 1));
            var callback = _callbacks[eventName][id];
            if (callback && (typeof callback === 'function')) callback();
        };

        ctx.canvas.addEventListener('mousemove', function (evnt) {
           runEventAction('mousemove', evnt);
        });

        ctx.canvas.addEventListener('click', function (evnt) {
            runEventAction('click', evnt);
        });

        var addEvent = function (figureId, eventName, callback) {
            if (_callbacks[eventName]) {
                _callbacks[eventName][figureId] = callback;
            }
        };

        var drawObservedFigures = function () {

            var elementDrawer = getElementDrawer(eventCtx);

            var drawPath = function (path, rgbString) {
                eventCtx.beginPath();
                eventCtx.strokeStyle = rgbString;
                eventCtx.lineWidth = 2;
                path.elements.forEach(elementDrawer.draw);
                eventCtx.stroke();
                eventCtx.closePath();
                eventCtx.fillStyle = rgbString;
                eventCtx.fill();
            };

            eventCtx.clearRect(0,0, eventCanvas.width, eventCanvas.height);

            _observedFigures.forEach(function (figure, id) {
                if (figure) {
                    figure.forEach(function (path) {
                        drawPath(path, getRGBStringById(id));
                    });
                }
            });
        };

        return {
            addObservedFigure: function (figure) {
                _id++;
                _observedFigures[_id] = figure.getPaths();
                drawObservedFigures();
                return _id;
            },
            deleteObservedFigure: function (figureId) {
                _observedFigures[figureId] = null;
                drawObservedFigures();
            },
            addFigureEvent: function (figureId, eventName, callback) {
                addEvent(figureId, eventName, callback);
            },
            deleteEvent: function (figureId, eventName) {
                addEvent(figureId, eventName, null);
            }
        };
    };

    return {
        init: function (params) {
            ctx = params.canvasContext;
            backgroundColor = params.backgroundColor;
            if (!backgroundColor) {
                backgroundColor = '#fff';
            }
            this.clearCanvas();
        },

        clearCanvas: function () {
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

        createFigure: function (paths) {
            if (!Array.isArray(paths)) {
                throw new SyntaxError ("Figure data must be an array of paths.");
            }
            return new Figure(paths);
        },

        getEventManager: eventManager
    };
    
})();