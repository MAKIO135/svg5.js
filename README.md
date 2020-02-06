# svg5.js
A small JS library to create SVGs, inspired by p5.js

## Example
```html
<script src="https://raw.git.rest/MAKIO135/svg5.js/master/svg5.js"></script>
<script>
    createSVG(windowWidth, windowHeight)
    //background('red')
    /*
    noStroke()
    ellipse(width/2, height/2, width, height/2)
    fill('black')
    noStroke()
    circle(0, 0, 25)
    stroke('black')

    //line(0,height/2, width, height/2)

    noFill()
    fill('white')
    */
    for(let y = -150; y <= height + 150; y += 5){
        beginShape()
        vertex(-10, height + 100)
        for(let x = -10; x <= width + 10; x += 10){
            vertex(x, y + noise(x/500, y/200) * 150)
        }
        vertex(width + 10, height + 100)
        endShape(CLOSE)
    }

    //noStroke()
    //polygon(width/2, height/2, 3, 50, -Math.PI/2)

    fill('red')
    shape(20, 20, 0, 55, 40, 55)
</script>
```

