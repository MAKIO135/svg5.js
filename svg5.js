const svg5 = {
    fillColor: 'white',
    strokeColor: 'black',
    strokeWidth: 1,
    strokeCap: 'butt', // butt, square or round
    strokeJoin: 'miter', // miter, round or bevel
    strokeDashArray: [],
    opacity: 1,
    transform: '',
    path: [],
    // Alea: https://github.com/coverslide/node-alea
    initAlea: (seed = Date.now()) => {
        function Alea(){return function(a){let b=0,d=0,e=0,f=1;0==a.length&&(a=[+new Date]);let g=Mash();b=g(" "),d=g(" "),e=g(" ");for(let c=0;c<a.length;c++)b-=g(a[c]),0>b&&(b+=1),d-=g(a[c]),0>d&&(d+=1),e-=g(a[c]),0>e&&(e+=1);g=null;const h=()=>{const a=2091639*b+23283064365386963e-26*f;return b=d,d=e,e=a-(f=0|a)};return h.uint32=()=>4294967296*h(),h.fract53=()=>h()+11102230246251565e-32*(0|2097152*h()),h.args=a,h}(Array.prototype.slice.call(arguments))}function Mash(){let a=4022871197;const b=b=>{b=b.toString();for(let c=0;c<b.length;c++){a+=b.charCodeAt(c);let d=.02519603282416938*a;a=d>>>0,d-=a,d*=a,a=d>>>0,d-=a,a+=4294967296*d}return 23283064365386963e-26*(a>>>0)};return b}
        return new Alea(seed)
    },
    // SimplexNoise: https://github.com/jwagner/simplex-noise.js
    initSimplexNoise: (seed) => {
        const F2=.5*(Math.sqrt(3)-1),G2=(3-Math.sqrt(3))/6,F3=1/3,G3=1/6,F4=(Math.sqrt(5)-1)/4,G4=(5-Math.sqrt(5))/20;function SimplexNoise(a){const b=svg5.initAlea(a);this.p=buildPermutationTable(b),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let b=0;512>b;b++)this.perm[b]=this.p[255&b],this.permMod12[b]=this.perm[b]%12}SimplexNoise.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(a,b){var c,d,e=this.permMod12,f=this.perm,g=this.grad3,h=0,k=0,l=0,m=(a+b)*F2,n=Math.floor(a+m),i=Math.floor(b+m),j=(n+i)*G2,o=a-(n-j),p=b-(i-j);o>p?(c=1,d=0):(c=0,d=1);var q=o-c+G2,r=p-d+G2,s=o-1+2*G2,t=p-1+2*G2,u=255&n,v=255&i,w=.5-o*o-p*p;if(0<=w){var x=3*e[u+f[v]];w*=w,h=w*w*(g[x]*o+g[x+1]*p)}var y=.5-q*q-r*r;if(0<=y){var z=3*e[u+c+f[v+d]];y*=y,k=y*y*(g[z]*q+g[z+1]*r)}var A=.5-s*s-t*t;if(0<=A){var B=3*e[u+1+f[v+1]];A*=A,l=A*A*(g[B]*s+g[B+1]*t)}return 70*(h+k+l)},noise3D:function(a,b,c){var d,e,f,g,h,l,m,n,o,p,q=this.permMod12,r=this.perm,u=this.grad3,v=(a+b+c)*F3,s=Math.floor(a+v),i=Math.floor(b+v),j=Math.floor(c+v),k=(s+i+j)*G3,t=a-(s-k),w=b-(i-k),x=c-(j-k);t>=w?w>=x?(h=1,l=0,m=0,n=1,o=1,p=0):t>=x?(h=1,l=0,m=0,n=1,o=0,p=1):(h=0,l=0,m=1,n=1,o=0,p=1):w<x?(h=0,l=0,m=1,n=0,o=1,p=1):t<x?(h=0,l=1,m=0,n=0,o=1,p=1):(h=0,l=1,m=0,n=1,o=1,p=0);var y=t-h+G3,z=w-l+G3,A=x-m+G3,B=t-n+2*G3,C=w-o+2*G3,D=x-p+2*G3,E=t-1+3*G3,F=w-1+3*G3,G=x-1+3*G3,H=255&s,I=255&i,J=255&j,K=.6-t*t-w*w-x*x;if(0>K)d=0;else{var L=3*q[H+r[I+r[J]]];K*=K,d=K*K*(u[L]*t+u[L+1]*w+u[L+2]*x)}var M=.6-y*y-z*z-A*A;if(0>M)e=0;else{var N=3*q[H+h+r[I+l+r[J+m]]];M*=M,e=M*M*(u[N]*y+u[N+1]*z+u[N+2]*A)}var O=.6-B*B-C*C-D*D;if(0>O)f=0;else{var P=3*q[H+n+r[I+o+r[J+p]]];O*=O,f=O*O*(u[P]*B+u[P+1]*C+u[P+2]*D)}var Q=.6-E*E-F*F-G*G;if(0>Q)g=0;else{var R=3*q[H+1+r[I+1+r[J+1]]];Q*=Q,g=Q*Q*(u[R]*E+u[R+1]*F+u[R+2]*G)}return 32*(d+e+f+g)},noise4D:function(a,b,c,d){var e,f,g,h,m,n=this.perm,o=this.grad4,p=(a+b+c+d)*F4,q=Math.floor(a+p),i=Math.floor(b+p),j=Math.floor(c+p),k=Math.floor(d+p),l=(q+i+j+k)*G4,r=a-(q-l),s=b-(i-l),t=c-(j-l),u=d-(k-l),v=0,w=0,x=0,y=0;r>s?v++:w++,r>t?v++:x++,r>u?v++:y++,s>t?w++:x++,s>u?w++:y++,t>u?x++:y++;var z,A,B,C,D,E,F,G,H,I,J,K;z=3<=v?1:0,A=3<=w?1:0,B=3<=x?1:0,C=3<=y?1:0,D=2<=v?1:0,E=2<=w?1:0,F=2<=x?1:0,G=2<=y?1:0,H=1<=v?1:0,I=1<=w?1:0,J=1<=x?1:0,K=1<=y?1:0;var L=r-z+G4,M=s-A+G4,N=t-B+G4,O=u-C+G4,P=r-D+2*G4,Q=s-E+2*G4,R=t-F+2*G4,S=u-G+2*G4,T=r-H+3*G4,U=s-I+3*G4,V=t-J+3*G4,W=u-K+3*G4,X=r-1+4*G4,Y=s-1+4*G4,Z=t-1+4*G4,$=u-1+4*G4,_=255&q,aa=255&i,ba=255&j,ca=255&k,da=.6-r*r-s*s-t*t-u*u;if(0>da)e=0;else{var ea=4*(n[_+n[aa+n[ba+n[ca]]]]%32);da*=da,e=da*da*(o[ea]*r+o[ea+1]*s+o[ea+2]*t+o[ea+3]*u)}var fa=.6-L*L-M*M-N*N-O*O;if(0>fa)f=0;else{var ga=4*(n[_+z+n[aa+A+n[ba+B+n[ca+C]]]]%32);fa*=fa,f=fa*fa*(o[ga]*L+o[ga+1]*M+o[ga+2]*N+o[ga+3]*O)}var ha=.6-P*P-Q*Q-R*R-S*S;if(0>ha)g=0;else{var ia=4*(n[_+D+n[aa+E+n[ba+F+n[ca+G]]]]%32);ha*=ha,g=ha*ha*(o[ia]*P+o[ia+1]*Q+o[ia+2]*R+o[ia+3]*S)}var ja=.6-T*T-U*U-V*V-W*W;if(0>ja)h=0;else{var ka=4*(n[_+H+n[aa+I+n[ba+J+n[ca+K]]]]%32);ja*=ja,h=ja*ja*(o[ka]*T+o[ka+1]*U+o[ka+2]*V+o[ka+3]*W)}var la=.6-X*X-Y*Y-Z*Z-$*$;if(0>la)m=0;else{var ma=4*(n[_+1+n[aa+1+n[ba+1+n[ca+1]]]]%32);la*=la,m=la*la*(o[ma]*X+o[ma+1]*Y+o[ma+2]*Z+o[ma+3]*$)}return 27*(e+f+g+h+m)}};function buildPermutationTable(a){var b,c=new Uint8Array(256);for(b=0;256>b;b++)c[b]=b;for(b=0;255>b;b++){var d=b+~~(a()*(256-b)),e=c[b];c[b]=c[d],c[d]=e}return c}SimplexNoise._buildPermutationTable=buildPermutationTable;
        return new SimplexNoise(seed)
    },
    addElement: (type, params) => {
        svg5.html += `<${type} ${svg5.transform ? `transform="${svg5.transform.split('|').join(' ')}"` : ''} ${svg5.opacity !== 1 ? `opacity="${svg5.opacity}"` : ''} stroke="${svg5.strokeColor}" stroke-width="${svg5.strokeWidth}" stroke-linecap="${svg5.strokeCap}" stroke-linejoin="${svg5.strokeJoin}" ${svg5.strokeDashArray.length ? `stroke-strokedasharray="${svg5.strokeDashArray.join(' ')}"` : ''} fill="${svg5.fillColor}" ${params} />`
    },
    parseColor: function(a, b, c, d){
        if(typeof arguments[0] === 'string') return arguments[0]
        
        return arguments.length === 1 ? `rgb(${a}, ${a}, ${a})` : // single grey value from 0 to 255
        arguments.length === 2 ? `rgba(${a}, ${a}, ${a}, ${(b / 255).toFixed(3)})` : // grey, alpha from 0 to 255
        arguments.length === 3 ? `rgb(${a}, ${b}, ${c})` : // r,g,b values from 0 to 255
        arguments.length === 4 ? `rgba(${a}, ${b}, ${c}, ${(d / 255).toFixed(3)})` : // r,g,b,alpha values from 0 to 255
        'black'
    },
}
svg5.prng = svg5.initAlea()
svg5.simplex = svg5.initSimplexNoise(svg5.prng)

let width, height
const CLOSE = true

const createSVG = (w, h) => {
    width = w
    height = h
}

const render = (parentSelector = 'body') => {
    svg5.id = `svg5_${Date.now()}`
    document.querySelector(parentSelector).innerHTML += `<svg id="${svg5.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${svg5.html}</svg>`
    svg5.svg = document.querySelector(`#${svg5.id}`)
    svg5.svg.addEventListener('contextmenu', e => {
        e.preventDefault()
        save()
    }, false)
}

// Styling
const clear = () => svg5.html = ''
const background = c => svg5.html += `<rect stroke="none" fill="${c}" x="0" y="0" width="${width}" height="${height}" />`
const opacity = n => svg5.opacity = n
const fill = (...args) => svg5.fillColor = svg5.parseColor(...args)
const noFill = () => svg5.fillColor = 'none'
const stroke = (...args) => svg5.strokeColor = svg5.parseColor(...args)
const strokeWidth = n => svg5.strokeWidth = n
const strokeWeight = strokeWidth // alias for strokeWidth
const strokeCap = type => svg5.strokeCap = type
const strokeJoin = type => svg5.strokeJoin = type
const noStroke = () => svg5.strokeColor = 'none'

// Shapes
const circle = (cx, cy, diameter) => svg5.addElement('circle', `cx="${cx}" cy="${cy}" r="${diameter/2}"`)
const ellipse = (cx, cy, w, h) => svg5.addElement('ellipse', `cx="${cx}" cy="${cy}" rx="${w/2}" ry="${h/2}"`)
const rect = (x, y, w, h) => svg5.addElement('rect', `x="${x}" y="${y}" width="${w}" height="${h}"`)
const square = (x, y, w) => rect(x, y, w, w)
const point = (x, y) => rect(x, y, 1, 1)
const polyline = (...pts) => svg5.addElement('polyline', `points="${pts.join(' ')}"`)
const line = (x1, y1, x2, y2) => polyline(x1, y1, x2, y2)
const polygon = (...pts) => svg5.addElement('polygon', `points="${pts.join(' ')}"`)
const triangle = (x1, y1, x2, y2, x3, y3) => polygon(x1, y1, x2, y2, x3, y3)
const quad = (x1, y1, x2, y2, x3, y3, x4, y4) => polygon(x1, y1, x2, y2, x3, y3, x4, y4)
const regularPolygon = (cx, cy, nbPoints, radius, angle = 0) => {
    const pts = new Array(nbPoints).fill(0).map((d, i) => {
        const x = cx + Math.cos(i/nbPoints * Math.PI * 2 + angle) * radius
        const y = cy + Math.sin(i/nbPoints * Math.PI * 2 + angle) * radius
        return `${x},${y}`
    })
    polygon(...pts)
}

// Vertex shapes
const beginShape = () => svg5.path = []
const vertex = (x, y) => svg5.path.push(`${svg5.path.length == 0 ? 'M' : 'L'}${x},${y}`)
const bezierVertex = (x1, y1, x2, y2, x, y) => svg5.path.push(`C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`)
const cubicVertex = (x2, y2, x, y) => svg5.path.push(`S ${x2} ${y2}, ${x} ${y}`)
const quadraticVertex = (x1, y1, x, y) => svg5.path.push(`Q ${x1} ${y1}, ${x} ${y}`)
const endShape = closed => svg5.addElement('path', `d="${svg5.path.join(' ')}${closed ? ' Z' : ''}"`)

// Math helpers
const lerp = (a, b, t) => a * (1 - t) + b * t
const map = (n, a, b, c, d) => lerp(c, d, (n - a) / (b - a))
const constrain = (a, min, max) => a < min ? min : a > max ? max : a 
const randomSeed = seed => svg5.prng = svg5.initAlea(seed)
const random = (a, b) => (b || b === 0) ? a + svg5.prng() * (b - a) : svg5.prng() * a
const noiseSeed = seed => svg5.simplex = svg5.initSimplexNoise(seed)
const noise1D = x => svg5.simplex.noise1D(x)
const noise2D = (x, y) => svg5.simplex.noise2D(x, y)
const noise3D = (x, y, z) => svg5.simplex.noise3D(x, y, z)
const noise4D = (x, y, z, w) => svg5.simplex.noise4D(x, y, z, w)
const noise = function() { 
    return svg5.simplex[`noise${constrain(arguments.length, 1, 4)}D`](...arguments)
}

// Matrix transformations
const translate = (x, y) => svg5.transform += `translate(${x}, ${y})`
const rotate = angle => svg5.transform += `rotate(${angle})`
const scale = (x, y) => svg5.transform += y ? y : x`scale(${x})`
const push = () => svg5.transform += `|`
const pop = () => {
    let tmp = svg5.transform.split('|')
    tmp.pop()
    svg5.transform = tmp.join('|')
}

// Save SVG file
const save = () => {
    const svgBlob = new Blob([svg5.html], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = svgUrl
    downloadLink.download = `${svg5.id}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
}