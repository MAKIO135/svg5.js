const {expect} = require('chai')
const fs = require('fs')
const svg5 =  require('../dist/svg5.cjs.js')

console.log('Running tests:')

const tests = {
    _attrRegex: () => {},
    _initAlea: () => {},
    _initSimplexNoise: () => {},
    _addElement: () => {},
    _addTransform: () => {},
    _getTransform: () => {},
    _round: () => {},
    _parseColor: () => {},
    _prng: () => {},
    _simplex: () => {},
    _defs: () => {},
    _attributes: () => {},
    _styles: () => {},
    _fillColor: () => {},
    _strokeColor: () => {},
    _strokeWidth: () => {},
    _strokeCap: () => {},
    _strokeJoin: () => {},
    _strokeDashArray: () => {},
    _opacity: () => {},
    _transform: () => {},
    _path: () => {},
    _rectMode: () => {},
    _ellipseMode: () => {},
    _precision: () => {},
    _svg: () => {},
    _name: () => {},
    _id: () => {},

    createSVG: () => {},
    getHTML: () => {},
    render: () => {},
    precision: () => {},
    addStyle: () => {},
    addDef: () => {},
    clear: () => {},
    background: () => {},
    opacity: () => {},
    fill: () => {},
    noFill: () => {},
    stroke: () => {},
    strokeWidth: () => {},
    strokeWeight: () => {},
    strokeCap: () => {},
    strokeJoin: () => {},
    strokeDashArray: () => {},
    noStroke: () => {},

    setAttribute: () => {},
    removeAttribute: () => {},
    clearAttributes: () => {},

    CORNER: () => {
        expect(svg5.CORNER).to.equal(1)
    },
    CENTER: () => {
        expect(svg5.CENTER).to.equal(2)
    },
    rectMode: () => {},
    rect: () => {},
    square: () => {},
    point: () => {},

    ellipseMode: () => {},
    circle: () => {},
    ellipse: () => {},
    arc: () => {},

    polyline: () => {},
    line: () => {},
    polygon: () => {},
    triangle: () => {},
    quad: () => {},
    regularPolygon: () => {},
    spline: () => {},

    beginShape: () => {},
    lineTo: () => {},
    moveTo: () => {},
    vertex: () => {},
    bezierVertex: () => {},
    cubicVertex: () => {},
    quadraticVertex: () => {},
    endShape: () => {},
    CLOSE: () => {
        expect(svg5.CLOSE).to.equal(1)
    },

    PI: () => {},
    TAU: () => {},
    lerp: () => {},
    norm: () => {},
    map: () => {},
    constrain: () => {},
    radians: () => {},
    degrees: () => {},

    randomSeed: () => {},
    random: () => {},
    randInt: () => {},
    randBool: () => {},
    expRand: () => {},

    noiseSeed: () => {},
    noise1D: () => {},
    noise2D: () => {},
    noise3D: () => {},
    noise4D: () => {},
    noise: () => {},

    beginGroup: () => {},
    endGroup: () => {},

    translate: () => {},
    rotate: () => {},
    scale: () => {},
    push: () => {},
    pop: () => {},

    save: () => {},
    exportPNG: () => {},

    width: () => {
        svg5.createSVG(200, 100)
        expect(svg5.width).to.be.a('number')
        expect(svg5.width).to.equal(200)
    },
    height: () => {
        svg5.createSVG(100, 200)
        expect(svg5.height).to.be.a('number')
        expect(svg5.height).to.equal(200)
    },
    html: () => {
        svg5.createSVG(100, 200)
        expect(svg5.html).to.be.a('string')
    },
}

Object.keys(tests).forEach(key => tests[key]())

// check if some properties aren't tested
Object.keys(svg5).filter(key => !tests[key])
    .forEach(key => console.log(`⚠️ Test missing for ${key}`))