var mouthData = [
    {
        color: {r: 0xEA, g: 0xE3, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "quadraticCurve",
                points: [85,105, 161,76, 197,87]
            },
            {
                elementType: "quadraticCurveTo",
                points: [211,92, 224,107,
                        242,102, 258,107,
                        292,117, 337,184,
                        268,206, 190,185,
                        136,167, 85,105]
            }
        ]
    },
    {
        color: {r: 0xEA, g: 0xE3, b: 0},
        glowEffect: true, 
        elements: [
            {
                elementType: "line",
                points: [85,105, 59,95]
            }
        ]
    },
    {
        color: {r: 0xEA, g: 0xE3, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "line",
                points: [76,91, 59,95]
            },
            {
                elementType: "lineTo",
                points: [68,108]
            }
        ]
    }
];

var fishData = [
    {
        color: {r: 0xEA, g: 0xE3, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "quadraticCurve",
                points: [111,115, 170,90, 224,108]
            },
            {
                elementType: "quadraticCurveTo",
                points: [262,120, 309,166,
                        327,153, 361,159,
                        325,187, 340,223,
                        315,206, 302,188,
                        157,209, 111,115]
            }
        ]
    },
    {
        color: {r: 0xEA, g: 0xE3, b: 0},
        glowEffect: true, 
        elements: [
            {
                elementType: "line",
                points: [111,115, 85,105]
            }
        ]
    },
    {
        color: {r: 0xEA, g: 0xE3, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "line",
                points: [102,101, 85,105]
            },
            {
                elementType: "lineTo",
                points: [94,118]
            }
        ]
    }
];

var legData = [
    {
        color: {r: 0x96, g: 0x4B, b: 0x95},
        glowEffect: true,
        elements: [
            {
                elementType: "quadraticCurve",
                points: [146,180, 179,133, 213,133]
            },
            {
                elementType: "quadraticCurveTo",
                points: [231,133, 231,149,
                        231,164, 184,189,
                        205,218, 205,245]
            },
            {
                elementType: "lineTo",
                points: [217,258]
            },
            {
                elementType: "quadraticCurveTo",
                points: [223,267, 213,272,
                        198,277, 185,286,
                        179,290, 164,290,
                        155,288, 163,284,
                        181,276, 186,265,
                        186,231, 154,200,
                        141,188, 146,180]
            },
        ]
    }
];

var straightLegData = [
    {
        color: {r: 0x96, g: 0x4B, b: 0x95},
        glowEffect: true,
        elements: [
            {
                elementType: "quadraticCurve",
                points: [187,211, 179,161, 199,138]
            },
            {
                elementType: "quadraticCurveTo",
                points: [212,121, 225,139,
                        233,150, 218,207,
                        230,241, 223,275]
            },
            {
                elementType: "lineTo",
                points: [231,292]
            },
            {
                elementType: "quadraticCurveTo",
                points: [234,303, 222,304,
                        206,303, 193,307,
                        184,310, 169,305,
                        160,300, 170,299,
                        193,296, 199,286,
                        207,257, 194,228,
                        187,218, 187,211]
            }
        ]
    }
];

var eyeballData = [
    {
        color: {r: 0xE6, g: 0, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "circleBy2Points",
                points: [225,111, 187,181]
            }
        ]
    }
];

var hatData = [
    {
        color: {r: 0, g: 0xff, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "quadraticCurve",
                points: [427,181, 428,166, 445,151]
            },
            {
                elementType: "quadraticCurveTo",
                points: [464,135, 510,143,
                        556,151, 596,116,
                        625,92, 645,92,
                        671,92, 683,108,
                        667,104, 657,109,
                        644,116, 634,157,
                        618,219, 569,227,
                        526,234, 493,194,
                        470,165, 455,165,
                        439,165, 427,181]
            }
        ]
    },
    {
        color: {r: 0, g: 0xff, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "line",
                points: [569,227, 576,263]
            }
        ]
    },
    {
        color: {r: 0, g: 0xff, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "line",
                points: [583,245, 576,263]
            },
            {
                elementType: "lineTo",
                points: [563,250]
            }
        ]
    }
];

var hatEyeballData = [
    {
        color: {r: 0xE6, g: 0, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "circleBy2Points",
                points: [568,224, 556,147]
            }
        ]
    }
];

var handData = [
    {
        color: {r: 0xff, g: 0xff, b: 0},
        glowEffect: true,
        elements: [
            {
                elementType: "quadraticCurve",
                points: [581,138, 550,134, 529,125]
            },
            {
                elementType: "quadraticCurveTo",
                points: [527,124, 525,124]
            },
            {
                elementType: "lineTo",
                points: [515,124]
            },
            {
                elementType: "quadraticCurveTo",
                points: [511,124, 510,126]
            },
            {
                elementType: "lineTo",
                points: [495,133]
            },
            {
                elementType: "quadraticCurveTo",
                points: [489,135, 492,129]
            },
            {
                elementType: "lineTo",
                points: [499,125]
            },
            {
                elementType: "quadraticCurveTo",
                points: [506,121, 498,121,
                        477,122, 471,118,
                        465,114, 474,115,
                        481,117, 484,116,
                        489,114, 485,113,
                        469,109, 466,105,
                        465,101, 468,102,
                        482,108, 490,108,
                        492,108, 489,105,
                        475,101, 471,96,
                        469,92, 473,93,
                        484,100, 489,100,
                        492,100, 490,98,
                        481,93, 478,89,
                        477,86, 481,87,
                        493,96, 499,96,
                        503,96, 520,104,
                        523,106, 532,106,
                        590,112, 608,124,
                        621,133, 609,157,
                        590,194, 554,194,
                        546,193, 543,189,
                        533,176, 545,164,
                        548,160, 557,157,
                        572,151, 581,138]
            }
        ]
    }
];
