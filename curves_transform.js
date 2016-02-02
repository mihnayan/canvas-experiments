var figure11 = [
    {
        "color": {
            "r": 0xEA,
            "g": 0xE3,
            "b": 0
        },
        "elements": [
            {
                "elementType": "curveByPoints",
                "points": [111,115, 141,103, 175,99, 203,102, 223,108, 248,120, 269,133, 289,148, 
                    309,166, 309,166, 319,161, 331,158, 346,157, 361,159, 361,159, 346,173, 339,187,
                    337,208, 340,224]
            },
            {
                "elementType": "quadraticCurve",
                "points": [340,224, 315,206, 302,188]
            },
            {
                "elementType": "quadraticCurve",
                "points": [302,188, 225,195, 194,184]
            },
            {
                "elementType": "quadraticCurve",
                "points": [153,169, 118,151, 111,115]
            }
        ]
    },
    {
        "color": {
            "r": 0xE6,
            "g": 0,
            "b": 0
        },
        "elements": [
            {
                "elementType": "arc",
                "points": [209,146, 39, 0.95*Math.PI,0.6*Math.PI]
            }
        ]
    },
    {
        "color": {
            "r": 0x96,
            "g": 0x4B,
            "b": 0x95
        },
        "elements": [
            {
                "elementType": "quadraticCurve",
                "points": [146,180, 179,133, 213,133]
            },
            {
                "elementType": "quadraticCurve",
                "points": [213,133, 231,133, 231,149]
            },
            {
                "elementType": "quadraticCurve",
                "points": [231,149, 231,164, 184,189]
            },
            {
                "elementType": "quadraticCurve",
                "points": [184,189, 205,218, 205,245]
            },
            {
                "elementType": "line",
                "points": [205,245, 217,258]
            },
            {
                "elementType": "quadraticCurve",
                "points": [217,258, 223,267, 213,272]
            },
            {
                "elementType": "quadraticCurve",
                "points": [213,272, 198,277, 185,286]
            },
            {
                "elementType": "quadraticCurve",
                "points": [185,286, 179,290, 164,290]
            },
            {
                "elementType": "quadraticCurve",
                "points": [164,290, 155,288, 163,284]
            },
            {
                "elementType": "quadraticCurve",
                "points": [163,284, 181,276, 186,265]
            },
            {
                "elementType": "quadraticCurve",
                "points": [186,265, 186,231, 154,200]
            },
            {
                "elementType": "quadraticCurve",
                "points": [154,200, 141,188, 146,180]
            }
        ]
    },
    {
        "color": {
            "r": 0xEA,
            "g": 0xE3,
            "b": 0
        },
        "elements": [
            {
                "elementType": "line",
                "points": [111,115, 85,105]
            },
            {
                "elementType": "line",
                "points": [85,105, 102,101]
            },
            {
                "elementType": "line",
                "points": [85,105, 94,118]
            }
        ]
    }
];

var figure12 = [
    {
        "elements": [
            {
                "elementType": "curveByPoints",
                "points": [85,105, 133,89, 176,83, 204,91, 223,108, 223,108, 239,104, 258,107, 
                    274,114, 285,123, 295,132, 306,143, 315,152, 324,166, 331,175, 337,184, 337,184,
                    320,189, 306,193]
            },
            {
                "elementType": "quadraticCurve",
                "points": [306,193, 289,197, 265,198]
            },
            {
                "elementType": "quadraticCurve",
                "points": [265,198, 229,199, 188,188]
            },
            {
                "elementType": "quadraticCurve",
                "points": [153,169, 112,143, 85,105]
            }
        ]
    },
    {
        "elements": [
            {
                "elementType": "arc",
                "points": [209,146, 39, 0.95*Math.PI,0.6*Math.PI]
            }
        ]
    },
    {
        "elements": [
            {
                "elementType": "quadraticCurve",
                "points": [146,180, 179,133, 213,133]
            },
            {
                "elementType": "quadraticCurve",
                "points": [213,133, 231,133, 231,149]
            },
            {
                "elementType": "quadraticCurve",
                "points": [231,149, 231,164, 184,189]
            },
            {
                "elementType": "quadraticCurve",
                "points": [184,189, 205,218, 205,245]
            },
            {
                "elementType": "line",
                "points": [205,245, 217,258]
            },
            {
                "elementType": "quadraticCurve",
                "points": [217,258, 223,267, 213,272]
            },
            {
                "elementType": "quadraticCurve",
                "points": [213,272, 198,277, 185,286]
            },
            {
                "elementType": "quadraticCurve",
                "points": [185,286, 179,290, 164,290]
            },
            {
                "elementType": "quadraticCurve",
                "points": [164,290, 155,288, 163,284]
            },
            {
                "elementType": "quadraticCurve",
                "points": [163,284, 181,276, 186,265]
            },
            {
                "elementType": "quadraticCurve",
                "points": [186,265, 186,231, 154,200]
            },
            {
                "elementType": "quadraticCurve",
                "points": [154,200, 141,188, 146,180]
            }
        ]
    },
    {
        "elements": [
            {
                "elementType": "line",
                "points": [85,105, 59,95]
            },
            {
                "elementType": "line",
                "points": [59,95, 76,91]
            },
            {
                "elementType": "line",
                "points": [59,95, 68,108]
            }
        ]
    }
];

var drawFigure = function (ctx, figure, clear) {
    
    var drawElements = {
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
            ctx.stroke();
        },
        quadraticCurve: function (points) {
            ctx.moveTo(points[0], points[1]);
            ctx.quadraticCurveTo(points[2], points[3], points[4], points[5]);
            ctx.stroke();
        },
        arc: function (points) {
            ctx.arc(points[0], points[1], points[2], points[3], points[4]);
        },
        line: function (points) {
            ctx.moveTo(points[0], points[1]);
            ctx.lineTo(points[2], points[3]);
        }
    };

    for (var i = 0; i < figure.length; i++) {
        var curFig = figure[i];
        ctx.beginPath();
        if (clear) {
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 20;
        } else {
            ctx.strokeStyle = 'rgb(' 
                    + curFig.color.r + ','
                    + curFig.color.g + ','
                    + curFig.color.b + ')';
            ctx.lineWidth = 1;
        }

        for (var j = 0; j < curFig.elements.length; j++) {
            var curElem = curFig.elements[j];
            drawElements[curElem.elementType](curElem.points);
        }
        ctx.stroke();
    }
};

var linearTransformation = function (ctx, source, target, steps) {

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
        var next = [];
        for (var path_index = 0; path_index < current.length; path_index++) {
            curElms = current[path_index].elements;
            next.push({});
            next[path_index].color = current[path_index].color;
            next[path_index].elements = [];
            for (var elm_index = 0; elm_index < curElms.length; elm_index++) {
                next[path_index].elements.push({});
                curElm = next[path_index].elements[elm_index];
                curElm.elementType = curElms[elm_index].elementType;
                curElm.points = getIncPoints(curElms[elm_index].points,
                    deltaPoints[path_index].elements[elm_index].delta);
            }
        }
        drawFigure(ctx, current, true);
        drawFigure(ctx, next);
        current = next;
        if (step > 1) {
            setTimeout(function () {
                transform(--step);
            }, 50);
        }
    }

    setTimeout(function () {
            transform(steps);
        }, 300);
}

window.onload = function () {
    var ctx = document.getElementById("cnv").getContext("2d");

    drawFigure(ctx, figure11);
    linearTransformation(ctx, figure11, figure12, 20);
}