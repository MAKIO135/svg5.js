createSVG(600, 450, 'body')
background('white')

translate(width/2, height/2)
stroke(0, 100)
strokeWidth(.2)
noFill()
noiseSeed(Date.now())
strokeWidth(1)
for(let i = -20; i < 20; i++) {
    for(let j = -30; j < 30; j++) {
        const x = i * 10 - j * 3
        const y = j * 2 + i
        line(x, y + 100,x, y - 100 * (noise(x / 150, y / 150) * .5 + .5))
    }
}