var mouth = [
    {
        "color": {"r": 0xEA, "g": 0xE3, "b": 0},
        "glowEffect": true,
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
        "color": {"r": 0xEA, "g": 0xE3, "b": 0},
        "glowEffect": true, 
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

var fish = [
    {
        "color": {"r": 0xEA, "g": 0xE3, "b": 0},
        "glowEffect": true,
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
        "color": {"r": 0xEA, "g": 0xE3, "b": 0},
        "glowEffect": true,
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

var leg = [
    {
        "color": {"r": 0x96, "g": 0x4B, "b": 0x95},
        "glowEffect": true,
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
    }
];

var eyeball = [
    {
        "color": {"r": 0xE6, "g": 0, "b": 0},
        "glowEffect": true,
        "elements": [
            {
                "elementType": "arc",
                "points": [209,146, 39, 0.95*Math.PI,0.6*Math.PI]
            }
        ]
    }
];

window.onload = function () {
    var ctx = document.getElementById("cnv").getContext("2d");
    graphics.init({
        canvasContext: ctx, 
        backgroundColor: '#000'
    });
    // graphics.drawFigure(fish);
    // graphics.drawFigure(leg);
    // graphics.drawFigure(eyeball);
    // graphics.animator.transformFigure(fish, mouth, 1);
    // graphics.animator.rotate(leg, 210, 150, -1440, 5);
    var am = graphics.animationManager(0,0, 400,400);
    am.addMotion(am.getRotateMotion(leg, 210, 150, -720, 8000));
    am.start();
}