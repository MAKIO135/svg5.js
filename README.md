# svg5.js
A small JS library to create SVGs, inspired by p5.js

## Example
```html
<script src="https://raw.git.rest/MAKIO135/svg5.js/master/svg5.js"></script>
<script>
    createSVG(windowWidth, windowHeight)
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

</script>
```

