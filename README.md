# svg5.js
svg5 is a tiny JS library to generate static SVGs for plotters, lasercutting, embroidery and more, based on Processing/p5js syntax.

<img src="https://svg5.glitch.me/svg" width="100%">

## Example
```html
<script src="https://cdn.jsdelivr.net/gh/MAKIO135/svg5.js/svg5.min.js"></script>
<script>
    // Create an SVG element
    createSVG(500, 500)

    // Add content / elements
    background('red')
    stroke('black')
    noFill()
    for(let y = -150; y <= height + 150; y += 5){
        beginShape()
        vertex(-10, height + 100)
        for(let x = -10; x <= width + 10; x += 10){
            vertex(x, y + noise(x/500, y/200) * 50)
        }
        vertex(width + 10, height + 100)
        endShape(CLOSE)
    }

    // Finally, render the svg
    render() 
</script>
```

More examples here:
- https://editor.p5js.org/makio135/sketches/wquU-A1DQ
- https://editor.p5js.org/makio135/sketches/vwqbI49mr
- https://editor.p5js.org/makio135/sketches/J13KRFIJM


## Documentation
Start by creating an SVG element using the `createSVG` function:
- `createSVG(width, height)`
Then, simply draw your elements like a Processing sketch!

### Global variables
- `width`: width of the SVG.
- `height`: height of the SVG.
- `CLOSE`: used to specify if a path should be closed.

### Shapes
- `circle(centerX, centerY, radius)`
- `ellipse(centerX, centerY, width, height)`
- `rect(x, y, width, h)`
- `square(x, y, width)`
- `line(x1, y1, x2, y2)`
- `polyline(x1, y1, x2, y2, x3, y3 [, …, xn, yn])`
- `triangle(x1, y1, x2, y2, x3, y3)`
- `quad(x1, y1, x2, y2, x3, y3, x4, y4)`
- `polygon(x1, y1, x2, y2, x3, y3 [, …, xn, yn])`
- `regularPolygon(centerX, centerY, radius [, startAngle])`: optional `startAngle` is in degrees
- `arc(centerX, centerY, width, height, startAngle, endAngle)`: angles are in degrees

### Styling
- `background(color)`
- `clear()`
- `opacity(amount)` where amount goes from 0 to 1.
- `fill(color)`, 
- `noFill()`
- `stroke(color)`
- `strokeWidth(n)` 
- `strokeWeight(n)` alias for `strokeWidth` to keep p5js naming.
- `strokeCap(style)`
- `strokeJoin(style)`
- `noStroke()`

The `color` parameter for `background`, `fill` and `stroke` functions can be passed either as:
- gray level between 0 (black) and 255 (white): `fill(255)` (white)
- gray and alpha levels between 0 and 255: `fill(255, 100)` (white with alpha)
- red, green and blue levels between 0 and 255: `fill(255, 0, 0)` (red)
- red, green, blue and alpha levels between 0 and 255: `fill(255, 0, 0, 100)` (red with alpha)
- a CSS color string, ie: `fill("red")`, `fill("#ff0000")`, `fill("rgb(255, 0, 0)")`, `fill("rgba(0, 0, 0, 0.5)")`, `fill("hsl(30, 100%, 50%)")`, …

### Vertex shapes
- `beginShape()` [See doc on p5js](https://p5js.org/reference/#/p5/beginShape)
- `vertex(x, y)` [See doc on p5js](https://p5js.org/reference/#/p5/vertex)
- `bezierVertex(x1, y1, x2, y2, x, y)` [See doc on p5js](https://p5js.org/reference/#/p5/bezierVertex)
- `cubicVertex(x2, y2, x, y)` [See doc on p5js](https://p5js.org/reference/#/p5/cubicVertex)
- `quadraticVertex(x1, y1, x, y)` [See doc on p5js](https://p5js.org/reference/#/p5/quadraticVertex)
- `endShape([CLOSE])` [See doc on p5js](https://p5js.org/reference/#/p5/endShape)

### Groups
- `beginGroup()` starts an SVG group `<g>`. Transformations are added to the group (-> cleaner SVG).
- `endGroup()` closes an SVG group `</g>`

### Math helpers
- `lerp(a, b, t)` calculates value between `a` and `b` at a specific increment between 0 and 1.
- `map(n, start1, end1, start2, end2)` re-maps a number from one range to another.
- `constrain(value, min, max)` constrains a value between a minimum and maximum value.
- `radians(degrees)` converts a value in degrees to radians.
- `degrees(radians)` converts a value in radians to degrees.
- `random()` random(max) or random(min, max).
- `randomSeed(seed)` sets the seed value for random().
- `noise1D(x)` computes a value using simplex noise 1D.
- `noise2D(x, y)` computes a value using simplex noise 2D.
- `noise3D(x, y, z)` computes a value using simplex noise 3D.
- `noise4D(x, y, z, w)` computes a value using simplex noise 4D.
- `noise(x [, y , z , w])` computes a value using simplex noise 1D to 4D, depending on number of arguments.
- `noiseSeed(seed)` sets the seed value for noise.

### Matrix transformations
- `translate(x, y)`
- `rotate(degrees)`
- `scale()` scale(n) for uniform scale or scale(x, y).
- `push()` start a new drawing state.
- `pop()` restore previous state.

### Render SVG
- `render([parentCSSSelector])`
You can specify a CSS selector as third parameter to let the library know where to append the SVG. By default, SVG is appended to the `body` of the page.  
**You can simply right click the SVG to download it 🙂**

### Save SVG file
- `save()`

### SVG helpers
- `precision(n)` set the number of digits wanted after floating point
- `getHTML()` returns the SVG as an HTML String

## NPM
svg5 is also available on NPM: `npm i svg5`

```js
const svg5 = require('svg5')
svg5.createSVG(500, 500)
svg5.background(0)
svg5.fill(255)
svg5.noStroke()
svg5.circle(svg5.width/2, svg5/height/2, 200)
```
See https://glitch.com/edit/#!/svg5?path=server.js for example.

## Dependencies
No dependencies but svg5 is using code from [simplex-noise.js](https://github.com/jwagner/simplex-noise.js) from [
Jonas Wagner](https://github.com/jwagner) and [Alea](https://github.com/coverslide/node-alea) from Johannes Baagøe, packaged by [Richard Hoffman](https://github.com/coverslide)

## License
Copyright (c) 2020 Lionel RADISSON, licensed under the MIT License (enclosed)