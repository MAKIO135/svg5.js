const svg5 = {
    CLOSE: 1,
    CORNER: 1,
    CENTER: 2,
    _attrRegex: name => new RegExp(`\\s${name}\\=\\"[^"]*\\"`, 'g'),
    // Alea: https://github.com/coverslide/node-alea
    _initAlea: (seed = Date.now()) => {
        function Alea(){return function(a){let b=0,d=0,e=0,f=1;0==a.length&&(a=[+new Date]);let g=Mash();b=g(" "),d=g(" "),e=g(" ");for(let c=0;c<a.length;c++)b-=g(a[c]),0>b&&(b+=1),d-=g(a[c]),0>d&&(d+=1),e-=g(a[c]),0>e&&(e+=1);g=null;const h=()=>{const a=2091639*b+23283064365386963e-26*f;return b=d,d=e,e=a-(f=0|a)};return h.uint32=()=>4294967296*h(),h.fract53=()=>h()+11102230246251565e-32*(0|2097152*h()),h.args=a,h}(Array.prototype.slice.call(arguments))}function Mash(){let a=4022871197;const b=b=>{b=b.toString();for(let c=0;c<b.length;c++){a+=b.charCodeAt(c);let d=.02519603282416938*a;a=d>>>0,d-=a,d*=a,a=d>>>0,d-=a,a+=4294967296*d}return 23283064365386963e-26*(a>>>0)};return b}
        return new Alea(seed)
    },
    // SimplexNoise: https://github.com/jwagner/simplex-noise.js
    _initSimplexNoise: seed => {
        const F2=.5*(Math.sqrt(3)-1),G2=(3-Math.sqrt(3))/6,F3=1/3,G3=1/6,F4=(Math.sqrt(5)-1)/4,G4=(5-Math.sqrt(5))/20;function SimplexNoise(a){const b=svg5._initAlea(a);this.p=buildPermutationTable(b),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let b=0;512>b;b++)this.perm[b]=this.p[255&b],this.permMod12[b]=this.perm[b]%12}SimplexNoise.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(a,b){var c,d,e=this.permMod12,f=this.perm,g=this.grad3,h=0,k=0,l=0,m=(a+b)*F2,n=Math.floor(a+m),i=Math.floor(b+m),j=(n+i)*G2,o=a-(n-j),p=b-(i-j);o>p?(c=1,d=0):(c=0,d=1);var q=o-c+G2,r=p-d+G2,s=o-1+2*G2,t=p-1+2*G2,u=255&n,v=255&i,w=.5-o*o-p*p;if(0<=w){var x=3*e[u+f[v]];w*=w,h=w*w*(g[x]*o+g[x+1]*p)}var y=.5-q*q-r*r;if(0<=y){var z=3*e[u+c+f[v+d]];y*=y,k=y*y*(g[z]*q+g[z+1]*r)}var A=.5-s*s-t*t;if(0<=A){var B=3*e[u+1+f[v+1]];A*=A,l=A*A*(g[B]*s+g[B+1]*t)}return 70*(h+k+l)},noise3D:function(a,b,c){var d,e,f,g,h,l,m,n,o,p,q=this.permMod12,r=this.perm,u=this.grad3,v=(a+b+c)*F3,s=Math.floor(a+v),i=Math.floor(b+v),j=Math.floor(c+v),k=(s+i+j)*G3,t=a-(s-k),w=b-(i-k),x=c-(j-k);t>=w?w>=x?(h=1,l=0,m=0,n=1,o=1,p=0):t>=x?(h=1,l=0,m=0,n=1,o=0,p=1):(h=0,l=0,m=1,n=1,o=0,p=1):w<x?(h=0,l=0,m=1,n=0,o=1,p=1):t<x?(h=0,l=1,m=0,n=0,o=1,p=1):(h=0,l=1,m=0,n=1,o=1,p=0);var y=t-h+G3,z=w-l+G3,A=x-m+G3,B=t-n+2*G3,C=w-o+2*G3,D=x-p+2*G3,E=t-1+3*G3,F=w-1+3*G3,G=x-1+3*G3,H=255&s,I=255&i,J=255&j,K=.6-t*t-w*w-x*x;if(0>K)d=0;else{var L=3*q[H+r[I+r[J]]];K*=K,d=K*K*(u[L]*t+u[L+1]*w+u[L+2]*x)}var M=.6-y*y-z*z-A*A;if(0>M)e=0;else{var N=3*q[H+h+r[I+l+r[J+m]]];M*=M,e=M*M*(u[N]*y+u[N+1]*z+u[N+2]*A)}var O=.6-B*B-C*C-D*D;if(0>O)f=0;else{var P=3*q[H+n+r[I+o+r[J+p]]];O*=O,f=O*O*(u[P]*B+u[P+1]*C+u[P+2]*D)}var Q=.6-E*E-F*F-G*G;if(0>Q)g=0;else{var R=3*q[H+1+r[I+1+r[J+1]]];Q*=Q,g=Q*Q*(u[R]*E+u[R+1]*F+u[R+2]*G)}return 32*(d+e+f+g)},noise4D:function(a,b,c,d){var e,f,g,h,m,n=this.perm,o=this.grad4,p=(a+b+c+d)*F4,q=Math.floor(a+p),i=Math.floor(b+p),j=Math.floor(c+p),k=Math.floor(d+p),l=(q+i+j+k)*G4,r=a-(q-l),s=b-(i-l),t=c-(j-l),u=d-(k-l),v=0,w=0,x=0,y=0;r>s?v++:w++,r>t?v++:x++,r>u?v++:y++,s>t?w++:x++,s>u?w++:y++,t>u?x++:y++;var z,A,B,C,D,E,F,G,H,I,J,K;z=3<=v?1:0,A=3<=w?1:0,B=3<=x?1:0,C=3<=y?1:0,D=2<=v?1:0,E=2<=w?1:0,F=2<=x?1:0,G=2<=y?1:0,H=1<=v?1:0,I=1<=w?1:0,J=1<=x?1:0,K=1<=y?1:0;var L=r-z+G4,M=s-A+G4,N=t-B+G4,O=u-C+G4,P=r-D+2*G4,Q=s-E+2*G4,R=t-F+2*G4,S=u-G+2*G4,T=r-H+3*G4,U=s-I+3*G4,V=t-J+3*G4,W=u-K+3*G4,X=r-1+4*G4,Y=s-1+4*G4,Z=t-1+4*G4,$=u-1+4*G4,_=255&q,aa=255&i,ba=255&j,ca=255&k,da=.6-r*r-s*s-t*t-u*u;if(0>da)e=0;else{var ea=4*(n[_+n[aa+n[ba+n[ca]]]]%32);da*=da,e=da*da*(o[ea]*r+o[ea+1]*s+o[ea+2]*t+o[ea+3]*u)}var fa=.6-L*L-M*M-N*N-O*O;if(0>fa)f=0;else{var ga=4*(n[_+z+n[aa+A+n[ba+B+n[ca+C]]]]%32);fa*=fa,f=fa*fa*(o[ga]*L+o[ga+1]*M+o[ga+2]*N+o[ga+3]*O)}var ha=.6-P*P-Q*Q-R*R-S*S;if(0>ha)g=0;else{var ia=4*(n[_+D+n[aa+E+n[ba+F+n[ca+G]]]]%32);ha*=ha,g=ha*ha*(o[ia]*P+o[ia+1]*Q+o[ia+2]*R+o[ia+3]*S)}var ja=.6-T*T-U*U-V*V-W*W;if(0>ja)h=0;else{var ka=4*(n[_+H+n[aa+I+n[ba+J+n[ca+K]]]]%32);ja*=ja,h=ja*ja*(o[ka]*T+o[ka+1]*U+o[ka+2]*V+o[ka+3]*W)}var la=.6-X*X-Y*Y-Z*Z-$*$;if(0>la)m=0;else{var ma=4*(n[_+1+n[aa+1+n[ba+1+n[ca+1]]]]%32);la*=la,m=la*la*(o[ma]*X+o[ma+1]*Y+o[ma+2]*Z+o[ma+3]*$)}return 27*(e+f+g+h+m)}};function buildPermutationTable(a){var b,c=new Uint8Array(256);for(b=0;256>b;b++)c[b]=b;for(b=0;255>b;b++){var d=b+~~(a()*(256-b)),e=c[b];c[b]=c[d],c[d]=e}return c}SimplexNoise._buildPermutationTable=buildPermutationTable;
        return new SimplexNoise(seed)
    },
    _addElement: (type, params) => {
        svg5.html += `<${type} stroke="${svg5._strokeColor}" stroke-width="${svg5._strokeWidth}" stroke-linecap="${svg5._strokeCap}" stroke-linejoin="${svg5._strokeJoin}"${svg5._strokeDashArray.length ? ` stroke-dasharray="${svg5._strokeDashArray.join(' ')}"` : ''} fill="${svg5._fillColor}" ${params}${svg5._getTransform()}${svg5._opacity !== 1 ? ` opacity="${svg5._opacity}"` : ''}${svg5._attributes} />`
    },
    _addTransform: transform => svg5._transform[svg5._transform.length - 1].push(transform),
    _getTransform: () => svg5._transform[svg5._transform.length - 1].length ? ` transform="${svg5._transform[svg5._transform.length - 1].join(' ')}"` : '',
    _round: n => {
        if (!typeof n === 'number') n = parseFloat(n)
        return svg5._precision === undefined ? n : n.toFixed(svg5._precision)
    },
    _parseColor: function(a, b, c, d) {
        if(typeof arguments[0] === 'string') return arguments[0]

        return arguments.length === 1 ? `rgb(${a | 0}, ${a | 0}, ${a | 0})` : // single grey value from 0 to 255
        arguments.length === 2 ? `rgba(${a | 0}, ${a | 0}, ${a | 0}, ${(b / 255).toFixed(3)})` : // grey, alpha from 0 to 255
        arguments.length === 3 ? `rgb(${a | 0}, ${b | 0}, ${c | 0})` : // r,g,b values from 0 to 255
        arguments.length === 4 ? `rgba(${a | 0}, ${b | 0}, ${c | 0}, ${(d / 255).toFixed(3)})` : // r,g,b,alpha values from 0 to 255
        'black'
    },
}
svg5._prng = svg5._initAlea()
svg5._simplex = svg5._initSimplexNoise(svg5._prng)

svg5.createSVG = (w = 100, h = 100, name) => {
    svg5.width = w
    svg5.height = h
    svg5._name = name || `svg5_${Date.now()}`
    svg5._id = svg5._name.toLowerCase().trim()
        .replace(/\s+/g, '-')             // Replace spaces with -
        .replace(/[^a-zA-Z0-9_\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-')           // Replace multiple - with single -
    svg5.html = ''
    svg5._defs = []
    svg5._attributes = ''
    svg5._styles = []
    svg5._fillColor = 'white'
    svg5._strokeColor = 'black'
    svg5._strokeWidth = 1
    svg5._strokeCap = 'butt' // butt, square or round
    svg5._strokeJoin = 'miter' // miter, round or bevel
    svg5._strokeDashArray = []
    svg5._opacity = 1
    svg5._transform = [[]]
    svg5._path = []
    svg5._pathIsCurve = false // used for curveVertex
    svg5._pathCurvePts = [] // used for curveVertex
    svg5._curveTightness = 1 // used for curveVertex
    svg5._rectMode = 1
    svg5._ellipseMode = 2
    svg5._precision = undefined
}

if(typeof window !== "undefined") {
    window.createSVG = (w, h, name) => {
        svg5.createSVG(w, h, name)
        Object.keys(svg5).filter(k => !k.startsWith('_')).forEach(k => window[k] = svg5[k])
    }
}

svg5.getHTML = () => `<svg id="${svg5._id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg5._round(svg5.width)} ${svg5._round(svg5.height)}" width="${svg5._round(svg5.width)}" height="${svg5._round(svg5.height)}">${svg5._styles.length ? `<style>${svg5._styles.join(' ')}</style>` : ''}${svg5._defs.length ? `<defs>${svg5._defs.join(' ')}</defs>` : ''}${svg5.html}</svg>`

svg5.render = (parentSelector = 'body', attachEvents = true) => {
    document.querySelector(parentSelector).innerHTML += svg5.getHTML()

    if(attachEvents) {
        svg5._svg = document.querySelector(`#${svg5._id}`)

        svg5._svg.addEventListener('contextmenu', e => {
            e.preventDefault()
            svg5.save()
        }, false)

        let attach = true
        svg5._svg.addEventListener('focus', function() {
            if(attach) {
                this.addEventListener('keyup', e => {
                    console.log(e.keyCode)
                    e.preventDefault()
                    svg5.exportPNG()
                })
                attach = false
            }
        })
    }
}

svg5.precision = n => svg5._precision = Math.max(0, ~~n)

// add content to <style>…</style>
svg5.addStyle = style => svg5._styles.push(typeof style === 'string' ? style : style.toString())

// add content to <defs>…</defs>
svg5.addDef = def => svg5._defs.push(typeof def === 'string' ? def : def.toString())


// Styling
svg5.clear = () => svg5.html = ''
svg5.background = (...args) => svg5.html += `<rect stroke="none" fill="${svg5._parseColor(...args)}" x="0" y="0" width="${svg5._round(svg5.width)}" height="${svg5._round(svg5.height)}" />`
svg5.opacity = n => svg5._opacity = n
svg5.fill = (...args) => svg5._fillColor = svg5._parseColor(...args)
svg5.noFill = () => svg5._fillColor = 'none'
svg5.stroke = (...args) => svg5._strokeColor = svg5._parseColor(...args)
svg5.strokeWeight = svg5.strokeWidth = n => svg5._strokeWidth = n
svg5.strokeCap = type => svg5._strokeCap = type
svg5.strokeJoin = type => svg5._strokeJoin = type
svg5.strokeDashArray = (...values) => svg5._strokeDashArray = values
svg5.noStroke = () => svg5._strokeColor = 'none'

svg5.setAttribute = (name, value) => svg5._attributes.match(svg5._attrRegex(name)) ? svg5._attributes = svg5._attributes.replace(svg5._attrRegex(name), ` ${name}="${value}"`) : svg5._attributes += ` ${name}="${value}"`
svg5.removeAttribute = name => svg5._attributes = svg5._attributes.replace(svg5._attrRegex(name), '')
svg5.clearAttributes = () => svg5._attributes = ''


// Shapes
svg5.ellipseMode = mode => svg5._ellipseMode = mode
svg5.circle = (cx, cy, diameter) => svg5._addElement('circle', `cx="${svg5._round(svg5._ellipseMode === svg5.CORNER ? cx + diameter/2 : cx)}" cy="${svg5._round(svg5._ellipseMode === svg5.CORNER ? cy + diameter/2 : cy)}" r="${svg5._round(diameter/2)}"`)
svg5.ellipse = (cx, cy, w, h) => svg5._addElement('ellipse', `cx="${svg5._round(svg5._ellipseMode === svg5.CORNER ? cx + w/2 : cx)}" cy="${svg5._round(svg5._ellipseMode === svg5.CORNER ? cy + h/2 : cy)}" rx="${svg5._round(w/2)}" ry="${svg5._round(h/2)}"`)
svg5.rectMode = mode => svg5._rectMode = mode
svg5.rect = (x, y, w, h, rx, ry) => svg5._addElement('rect', `x="${svg5._round(svg5._rectMode === svg5.CENTER ? x - w/2 : x)}" y="${svg5._round(svg5._rectMode === svg5.CENTER ? y - h/2 : y)}" width="${svg5._round(w)}" height="${svg5._round(h)}"${rx !== undefined ? ` rx="${svg5._round(rx)}"` : ''}${ry !== undefined ? ` ry="${svg5._round(ry)}"` : ''}`)
svg5.square = (x, y, w, rx, ry) => svg5.rect(x, y, w, w, rx, ry)
svg5.point = (x, y) => svg5.line(x, y, x, y)
svg5.polyline = (...pts) => svg5._addElement('polyline', `points="${pts.map(svg5._round).join(' ')}"`)
svg5.line = (x1, y1, x2, y2) => svg5._addElement('line', `x1="${svg5._round(x1)}" y1="${svg5._round(y1)}" x2="${svg5._round(x2)}" y2="${svg5._round(y2)}"`) 
svg5.polygon = (...pts) => svg5._addElement('polygon', `points="${pts.map(svg5._round).join(' ')}"`)
svg5.triangle = (x1, y1, x2, y2, x3, y3) => svg5.polygon(x1, y1, x2, y2, x3, y3)
svg5.quad = (x1, y1, x2, y2, x3, y3, x4, y4) => svg5.polygon(x1, y1, x2, y2, x3, y3, x4, y4)
svg5.regularPolygon = (cx, cy, nbPoints, radius, angle = 0) => {
    const pts = new Array(nbPoints).fill(0).map((d, i) => {
        const rads = i / nbPoints * Math.PI * 2 + svg5.radians(angle)
        const x = cx + Math.cos(rads) * radius
        const y = cy + Math.sin(rads) * radius
        return `${x},${y}`
    })
    svg5.polygon(...pts)
}
svg5.arc = (cx, cy, w, h, a1, a2) => {
    if(Math.abs(a1-a2) >= 360) return svg5.ellipse(cx, cy, w, h)

    if(svg5._ellipseMode === svg5.CORNER) {
        cx = cx + w/2
        cy = cy + h/2
    }

    const _a1 = svg5.radians(a1)
    const _a2 = svg5.radians(a2)
    const rw = svg5._round(w / 2)
    const rh = svg5._round(h / 2)
    const p1 = {
        x: svg5._round(cx + Math.cos(_a1) * rw),
        y: svg5._round(cy + Math.sin(_a1) * rh)
    }
    const p2 = {
        x: svg5._round(cx + Math.cos(_a2) * rw),
        y: svg5._round(cy + Math.sin(_a2) * rh)
    }

    svg5._addElement('path', `d="M ${p1.x} ${p1.y} A ${rw} ${rh} 0 ${Math.abs(a2 - a1) > 180 ? 1 : 0} ${a2 < a1 ? 0 : 1} ${p2.x} ${p2.y}"`)
}
svg5.spline = (...pts) => {
    let smoothness = 1
    let isClosed = false

    if(pts.length % 2 == 1) {
        smoothness = pts.pop()
    }
    else if(typeof pts[pts.length - 1] === 'boolean') {
        isClosed = pts.pop()
        smoothness = pts.pop()
    }

    pts = pts.reduce((acc, curr, i) => {
        if(!acc[i/2|0]) acc[i/2|0] = {}
        acc[i/2|0][['x', 'y'][i%2]] = curr
        return acc
    }, [])

    const centers = []
    for(let i = 0; i < pts.length - (isClosed ? 0 : 1); i++) {
        const {x: x1, y: y1} = pts[i % pts.length]
        const {x: x2, y: y2} = pts[(i + 1) % pts.length]
        centers[i % pts.length] = {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2
        }
    }

    const ctrls = isClosed ? [] : [[pts[0], pts[0]]]
    for(let i = isClosed ? 0 : 1; i < centers.length; i++) {
        const pt = pts[i]
        const c0 = centers[(centers.length + i - 1) % centers.length]
        const c1 = centers[i]
        const dx = (c0.x - c1.x) / 2
        const dy = (c0.y - c1.y) / 2

        ctrls[i] = [
            {
                x: pt.x + smoothness * dx,
                y: pt.y + smoothness * dy
            },
            {
                x: pt.x - smoothness * dx,
                y: pt.y - smoothness * dy
            }
        ]
    }

    if(!isClosed) {
        ctrls.push([
            pts[pts.length - 1],
            pts[pts.length - 1]
        ])
    }

    svg5._addElement('path', `d="M ${pts[0].x},${pts[0].y} ${centers.map((d, i) => `C ${ctrls[i][1].x}, ${ctrls[i][1].y} ${ctrls[(i + 1) % pts.length][0].x}, ${ctrls[(i + 1) % pts.length][0].y} ${pts[(i + 1) % pts.length].x}, ${pts[(i + 1) % pts.length].y}`).join(' ')}"`)
}

// Vertex shapes
svg5.beginShape = () => svg5._path = []
svg5.lineTo = (x, y) => svg5._path.push(`L${svg5._round(x)},${svg5._round(y)}`)
svg5.moveTo = (x, y) => svg5._path.push(`M${svg5._round(x)},${svg5._round(y)}`)
svg5.vertex = (x, y) => svg5._path.length == 0 ? svg5.moveTo(x, y) : svg5.lineTo(x, y)
svg5.bezierVertex = (x1, y1, x2, y2, x, y) => svg5._path.push(`C ${svg5._round(x1)} ${svg5._round(y1)}, ${svg5._round(x2)} ${svg5._round(y2)}, ${svg5._round(x)} ${svg5._round(y)}`)
svg5.cubicVertex = (x2, y2, x, y) => svg5._path.push(`S ${svg5._round(x2)} ${svg5._round(y2)}, ${svg5._round(x)} ${svg5._round(y)}`)
svg5.quadraticVertex = (x1, y1, x, y) => svg5._path.push(`Q ${svg5._round(x1)} ${svg5._round(y1)}, ${svg5._round(x)} ${svg5._round(y)}`)
svg5.arcVertex = (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) => svg5._path.push(`A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`)
svg5.curveTightness = n => svg5._curveTightness = n
svg5.curveVertex = (x, y) => {
    svg5._pathIsCurve = true
    svg5._pathCurvePts.push([x, y])
}
svg5.endShape = closed => {
    if(svg5._pathIsCurve) {
        svg5.spline(...svg5._pathCurvePts.flat(), svg5._curveTightness, closed)
        svg5._pathCurvePts = []
        svg5._pathIsCurve = false
    }
    else svg5._addElement('path', `d="${svg5._path.join(' ')}${closed ? ' Z' : ''}"`)
}
svg5.beginPath = svg5.beginShape
svg5.endPath = svg5.endShape


// Math helpers
svg5.PI = Math.PI
svg5.TAU = Math.PI * 2
svg5.E = Math.E
svg5.LN2 = Math.LN2
svg5.LN10 = Math.LN10
svg5.LOG2E = Math.LOG2E
svg5.LOG10E = Math.LOG10E
svg5.SQRT1_2 = Math.SQRT1_2
svg5.SQRT2 = Math.SQRT2
svg5.abs = Math.abs
svg5.acos = Math.acos
svg5.acosh = Math.acosh
svg5.asin = Math.asin
svg5.asinh = Math.asinh
svg5.atan = Math.atan
svg5.atan2 = Math.atan2
svg5.atanh = Math.atanh
svg5.cbrt = Math.cbrt
svg5.ceil = Math.ceil
svg5.clz32 = Math.clz32
svg5.cos = Math.cos
svg5.cosh = Math.cosh
svg5.exp = Math.exp
svg5.expm1 = Math.expm1
svg5.floor = Math.floor
svg5.fround = Math.fround
svg5.hypot = Math.hypot
svg5.imul = Math.imul
svg5.int = Math.floor
svg5.log = Math.log
svg5.log1p = Math.log1p
svg5.log2 = Math.log2
svg5.log10 = Math.log10
svg5.max = Math.max
svg5.min = Math.min
svg5.pow = Math.pow
svg5.random = Math.random
svg5.round = Math.round
svg5.sign = Math.sign
svg5.sin = Math.sin
svg5.sinh = Math.sinh
svg5.sqrt = Math.sqrt
svg5.tan = Math.tan
svg5.tanh = Math.tanh
svg5.trunc = Math.trunc
svg5.lerp = (a, b, t) => a * (1 - t) + b * t
svg5.norm = (n, a, b) => (n - a) / (b - a)
svg5.map = (n, a, b, c, d) => svg5.lerp(c, d, svg5.norm(n, a, b))
svg5.constrain = (a, min, max) => a < min ? min : a > max ? max : a
svg5.radians = degrees => degrees / 360 * svg5.TAU
svg5.degrees = radians => radians / svg5.TAU * 360

// Randomness
svg5.randomSeed = seed => svg5._prng = svg5._initAlea(seed)
svg5.random = (a, b) => {
    if (a === undefined) return svg5._prng()
    if (a.length) return a[svg5._prng() * a.length | 0]
    return (b || b === 0) ? a + svg5._prng() * (b - a) : svg5._prng() * a
}
svg5.randInt = (a, b) => svg5.random(a, b) | 0
svg5.randBool = (threshold = .5) => svg5._prng() < threshold
svg5.expRand = (a, b, p = 2) => {
    if (a === undefined) return svg5._prng() ** p
    return (b || b === 0) ? a + (svg5._prng() ** p) * (b - a) : (svg5._prng() ** p) * a
}

// Simplex Noise
svg5.noiseSeed = seed => svg5._simplex = svg5._initSimplexNoise(seed)
svg5.noise1D = x => svg5._simplex.noise2D(x, 0)
svg5.noise2D = (x, y) => svg5._simplex.noise2D(x, y)
svg5.noise3D = (x, y, z) => svg5._simplex.noise3D(x, y, z)
svg5.noise4D = (x, y, z, w) => svg5._simplex.noise4D(x, y, z, w)
svg5.noise = function() {
    return svg5._simplex[`noise${svg5.constrain(arguments.length, 1, 4)}D`](...arguments)
}


// Group
svg5.beginGroup = () => {
    svg5.html += `<g${svg5._getTransform()}${svg5._attributes}${svg5._opacity !== 1 ? ` opacity="${svg5._opacity}"`: ''}>`
    svg5._transform.push([])
}
svg5.endGroup = () => {
    svg5._transform.pop()
    svg5.html += `</g>`
}

// Matrix transformations
svg5.translate = (x, y) => svg5._addTransform(`translate(${svg5._round(x)}, ${svg5._round(y)})`)
svg5.rotate = angle => svg5._addTransform(`rotate(${svg5._round(angle)})`)
svg5.scale = (x, y) => svg5._addTransform(y ? `scale(${svg5._round(x)}, ${svg5._round(y)})` : `scale(${svg5._round(x)})`)
svg5.push = svg5.beginGroup
svg5.pop = svg5.endGroup


// Save SVG file
svg5.save = () => {
    const svgBlob = new Blob([svg5.getHTML()], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = svgUrl
    downloadLink.download = `${svg5._name}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
}

// Export PNG file
svg5.exportPNG = () => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = img.width = svg5.width
    canvas.height = img.height = svg5.height

    img.onload = () => {
        ctx.drawImage(img, 0, 0, svg5.width, svg5.height)
        URL.revokeObjectURL(url)

        canvas.toBlob(blob => {
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            link.href = url
            link.download = `${svg5._name}.png`
            link.click()
        })
    }

    const svgBlob = new Blob([svg5.getHTML()], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    img.src = url
}

export default svg5