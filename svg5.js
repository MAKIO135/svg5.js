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
    Alea: !function(){"use strict";var F=.5*(Math.sqrt(3)-1),N=(3-Math.sqrt(3))/6,H=1/6,hr=(Math.sqrt(5)-1)/4,sr=(5-Math.sqrt(5))/20;function r(r){var t="function"==typeof r?r:r?function(){for(var o,t=0,e=0,n=0,i=1,r=(o=4022871197,function(r){r=r.toString();for(var t=0;t<r.length;t++){var e=.02519603282416938*(o+=r.charCodeAt(t));e-=o=e>>>0,o=(e*=o)>>>0,o+=4294967296*(e-=o)}return 2.3283064365386963e-10*(o>>>0)}),t=r(" "),e=r(" "),n=r(" "),a=0;a<arguments.length;a++)(t-=r(arguments[a]))<0&&(t+=1),(e-=r(arguments[a]))<0&&(e+=1),(n-=r(arguments[a]))<0&&(n+=1);return r=null,function(){var r=2091639*t+2.3283064365386963e-10*i;return t=e,e=n,n=r-(i=0|r)}}(r):Math.random;this.p=o(t),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var e=0;e<512;e++)this.perm[e]=this.p[255&e],this.permMod12[e]=this.perm[e]%12}function o(r){for(var t=new Uint8Array(256),e=0;e<256;e++)t[e]=e;for(e=0;e<255;e++){var o=e+~~(r()*(256-e)),n=t[e];t[e]=t[o],t[o]=n}return t}r.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(r,t){var e,o,n=this.permMod12,i=this.perm,a=this.grad3,f=0,h=0,s=0,u=(r+t)*F,d=Math.floor(r+u),p=Math.floor(t+u),l=(d+p)*N,M=r-(d-l),m=t-(p-l),v=m<M?(e=1,0):(e=0,1),c=M-e+N,y=m-v+N,w=M-1+2*N,g=m-1+2*N,A=255&d,x=255&p,q=.5-M*M-m*m;0<=q&&(f=(q*=q)*q*(a[o=3*n[A+i[x]]]*M+a[1+o]*m));var D,S=.5-c*c-y*y;0<=S&&(h=(S*=S)*S*(a[D=3*n[A+e+i[x+v]]]*c+a[1+D]*y));var U,b=.5-w*w-g*g;return 0<=b&&(s=(b*=b)*b*(a[U=3*n[1+A+i[1+x]]]*w+a[1+U]*g)),70*(f+h+s)},noise3D:function(r,t,e){var o,n,i,a,f,h,s,u,d,p=this.permMod12,l=this.perm,M=this.grad3,m=(r+t+e)*(1/3),v=Math.floor(r+m),c=Math.floor(t+m),y=Math.floor(e+m),w=(v+c+y)*H,g=r-(v-w),A=t-(c-w),x=e-(y-w),q=A<=g?x<=A?(f=a=o=1,i=n=0):a=x<=g?(f=i=n=0,o=1):(f=n=o=0,i=1):A<x?(a=n=o=0,f=i=1):g<x?(a=i=o=0,f=n=1):(f=a=n=1,i=o=0),D=g-o+H,S=A-n+H,U=x-i+H,b=g-a+2*H,F=A-f+2*H,N=x-q+2*H,C=g-1+.5,P=A-1+.5,T=x-1+.5,_=255&v,j=255&c,k=255&y,z=.6-g*g-A*A-x*x,B=.6-D*D-S*S-U*U,E=.6-b*b-F*F-N*N,G=.6-C*C-P*P-T*T;return 32*((z<0?0:(z*=z)*z*(M[h=3*p[_+l[j+l[k]]]]*g+M[1+h]*A+M[2+h]*x))+(B<0?0:(B*=B)*B*(M[s=3*p[_+o+l[j+n+l[k+i]]]]*D+M[1+s]*S+M[2+s]*U))+(E<0?0:(E*=E)*E*(M[u=3*p[_+a+l[j+f+l[k+q]]]]*b+M[1+u]*F+M[2+u]*N))+(G<0?0:(G*=G)*G*(M[d=3*p[1+_+l[1+j+l[1+k]]]]*C+M[1+d]*P+M[2+d]*T)))},noise4D:function(r,t,e,o){var n,i,a,f,h,s,u,d,p,l,M,m,v=this.perm,c=this.grad4,y=(r+t+e+o)*hr,w=Math.floor(r+y),g=Math.floor(t+y),A=Math.floor(e+y),x=Math.floor(o+y),q=(w+g+A+x)*sr,D=r-(w-q),S=t-(g-q),U=e-(A-q),b=o-(x-q),F=0,N=0,C=0,P=0;S<D?F++:N++,U<D?F++:C++,b<D?F++:P++,U<S?N++:C++,b<S?N++:P++,b<U?C++:P++;var T,_,j,k,z,B=D-(n=3<=F?1:0)+sr,E=S-(i=3<=N?1:0)+sr,G=U-(a=3<=C?1:0)+sr,H=b-(f=3<=P?1:0)+sr,I=D-(h=2<=F?1:0)+2*sr,J=S-(s=2<=N?1:0)+2*sr,K=U-(u=2<=C?1:0)+2*sr,L=b-(d=2<=P?1:0)+2*sr,O=D-(p=1<=F?1:0)+3*sr,Q=S-(l=1<=N?1:0)+3*sr,R=U-(M=1<=C?1:0)+3*sr,V=b-(m=1<=P?1:0)+3*sr,W=D-1+4*sr,X=S-1+4*sr,Y=U-1+4*sr,Z=b-1+4*sr,$=255&w,rr=255&g,tr=255&A,er=255&x,or=.6-D*D-S*S-U*U-b*b,nr=.6-B*B-E*E-G*G-H*H,ir=.6-I*I-J*J-K*K-L*L,ar=.6-O*O-Q*Q-R*R-V*V,fr=.6-W*W-X*X-Y*Y-Z*Z;return 27*((or<0?0:(or*=or)*or*(c[T=v[$+v[rr+v[tr+v[er]]]]%32*4]*D+c[1+T]*S+c[2+T]*U+c[3+T]*b))+(nr<0?0:(nr*=nr)*nr*(c[_=v[$+n+v[rr+i+v[tr+a+v[er+f]]]]%32*4]*B+c[1+_]*E+c[2+_]*G+c[3+_]*H))+(ir<0?0:(ir*=ir)*ir*(c[j=v[$+h+v[rr+s+v[tr+u+v[er+d]]]]%32*4]*I+c[1+j]*J+c[2+j]*K+c[3+j]*L))+(ar<0?0:(ar*=ar)*ar*(c[k=v[$+p+v[rr+l+v[tr+M+v[er+m]]]]%32*4]*O+c[1+k]*Q+c[2+k]*R+c[3+k]*V))+(fr<0?0:(fr*=fr)*fr*(c[z=v[1+$+v[1+rr+v[1+tr+v[1+er]]]]%32*4]*W+c[1+z]*X+c[2+z]*Y+c[3+z]*Z)))}},r._buildPermutationTable=o,"undefined"!=typeof define&&define.amd&&define(function(){return r}),"undefined"!=typeof exports?exports.SimplexNoise=r:"undefined"!=typeof window&&(window.SimplexNoise=r),"undefined"!=typeof module&&(module.exports=r)}(),
    // SimplexNoise: https://github.com/jwagner/simplex-noise.js
    SimplexNoise: !function(){"use strict";var F=.5*(Math.sqrt(3)-1),N=(3-Math.sqrt(3))/6,H=1/6,hr=(Math.sqrt(5)-1)/4,ur=(5-Math.sqrt(5))/20;function r(r){var t="function"==typeof r?r:r?function(){var t=0,e=0,o=0,n=1,r=function(){var o=4022871197;return function(r){r=r.toString();for(var t=0;t<r.length;t++){var e=.02519603282416938*(o+=r.charCodeAt(t));e-=o=e>>>0,o=(e*=o)>>>0,o+=4294967296*(e-=o)}return 2.3283064365386963e-10*(o>>>0)}}();t=r(" "),e=r(" "),o=r(" ");for(var i=0;i<arguments.length;i++)(t-=r(arguments[i]))<0&&(t+=1),(e-=r(arguments[i]))<0&&(e+=1),(o-=r(arguments[i]))<0&&(o+=1);return r=null,function(){var r=2091639*t+2.3283064365386963e-10*n;return t=e,e=o,o=r-(n=0|r)}}(r):Math.random;this.p=o(t),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var e=0;e<512;e++)this.perm[e]=this.p[255&e],this.permMod12[e]=this.perm[e]%12}function o(r){for(var t=new Uint8Array(256),e=0;e<256;e++)t[e]=e;for(e=0;e<255;e++){var o=e+~~(r()*(256-e)),n=t[e];t[e]=t[o],t[o]=n}return t}r.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(r,t){var e,o,n=this.permMod12,i=this.perm,a=this.grad3,f=0,h=0,u=0,s=(r+t)*F,d=Math.floor(r+s),p=Math.floor(t+s),l=(d+p)*N,M=r-(d-l),m=t-(p-l),v=m<M?(e=1,0):(e=0,1),c=M-e+N,y=m-v+N,w=M-1+2*N,g=m-1+2*N,A=255&d,x=255&p,q=.5-M*M-m*m;0<=q&&(f=(q*=q)*q*(a[o=3*n[A+i[x]]]*M+a[1+o]*m));var D,S=.5-c*c-y*y;0<=S&&(h=(S*=S)*S*(a[D=3*n[A+e+i[x+v]]]*c+a[1+D]*y));var U,b=.5-w*w-g*g;return 0<=b&&(u=(b*=b)*b*(a[U=3*n[1+A+i[1+x]]]*w+a[1+U]*g)),70*(f+h+u)},noise3D:function(r,t,e){var o,n,i,a,f,h,u,s,d,p=this.permMod12,l=this.perm,M=this.grad3,m=(r+t+e)*(1/3),v=Math.floor(r+m),c=Math.floor(t+m),y=Math.floor(e+m),w=(v+c+y)*H,g=r-(v-w),A=t-(c-w),x=e-(y-w),q=A<=g?x<=A?(f=a=o=1,i=n=0):a=x<=g?(f=i=n=0,o=1):(f=n=o=0,i=1):A<x?(a=n=o=0,f=i=1):g<x?(a=i=o=0,f=n=1):(f=a=n=1,i=o=0),D=g-o+H,S=A-n+H,U=x-i+H,b=g-a+2*H,F=A-f+2*H,N=x-q+2*H,C=g-1+.5,P=A-1+.5,T=x-1+.5,_=255&v,j=255&c,k=255&y,z=.6-g*g-A*A-x*x,B=.6-D*D-S*S-U*U,E=.6-b*b-F*F-N*N,G=.6-C*C-P*P-T*T;return 32*((z<0?0:(z*=z)*z*(M[h=3*p[_+l[j+l[k]]]]*g+M[1+h]*A+M[2+h]*x))+(B<0?0:(B*=B)*B*(M[u=3*p[_+o+l[j+n+l[k+i]]]]*D+M[1+u]*S+M[2+u]*U))+(E<0?0:(E*=E)*E*(M[s=3*p[_+a+l[j+f+l[k+q]]]]*b+M[1+s]*F+M[2+s]*N))+(G<0?0:(G*=G)*G*(M[d=3*p[1+_+l[1+j+l[1+k]]]]*C+M[1+d]*P+M[2+d]*T)))},noise4D:function(r,t,e,o){var n,i,a,f,h,u,s,d,p,l,M,m,v=this.perm,c=this.grad4,y=(r+t+e+o)*hr,w=Math.floor(r+y),g=Math.floor(t+y),A=Math.floor(e+y),x=Math.floor(o+y),q=(w+g+A+x)*ur,D=r-(w-q),S=t-(g-q),U=e-(A-q),b=o-(x-q),F=0,N=0,C=0,P=0;S<D?F++:N++,U<D?F++:C++,b<D?F++:P++,U<S?N++:C++,b<S?N++:P++,b<U?C++:P++;var T,_,j,k,z,B=D-(n=3<=F?1:0)+ur,E=S-(i=3<=N?1:0)+ur,G=U-(a=3<=C?1:0)+ur,H=b-(f=3<=P?1:0)+ur,I=D-(h=2<=F?1:0)+2*ur,J=S-(u=2<=N?1:0)+2*ur,K=U-(s=2<=C?1:0)+2*ur,L=b-(d=2<=P?1:0)+2*ur,O=D-(p=1<=F?1:0)+3*ur,Q=S-(l=1<=N?1:0)+3*ur,R=U-(M=1<=C?1:0)+3*ur,V=b-(m=1<=P?1:0)+3*ur,W=D-1+4*ur,X=S-1+4*ur,Y=U-1+4*ur,Z=b-1+4*ur,$=255&w,rr=255&g,tr=255&A,er=255&x,or=.6-D*D-S*S-U*U-b*b,nr=.6-B*B-E*E-G*G-H*H,ir=.6-I*I-J*J-K*K-L*L,ar=.6-O*O-Q*Q-R*R-V*V,fr=.6-W*W-X*X-Y*Y-Z*Z;return 27*((or<0?0:(or*=or)*or*(c[T=v[$+v[rr+v[tr+v[er]]]]%32*4]*D+c[1+T]*S+c[2+T]*U+c[3+T]*b))+(nr<0?0:(nr*=nr)*nr*(c[_=v[$+n+v[rr+i+v[tr+a+v[er+f]]]]%32*4]*B+c[1+_]*E+c[2+_]*G+c[3+_]*H))+(ir<0?0:(ir*=ir)*ir*(c[j=v[$+h+v[rr+u+v[tr+s+v[er+d]]]]%32*4]*I+c[1+j]*J+c[2+j]*K+c[3+j]*L))+(ar<0?0:(ar*=ar)*ar*(c[k=v[$+p+v[rr+l+v[tr+M+v[er+m]]]]%32*4]*O+c[1+k]*Q+c[2+k]*R+c[3+k]*V))+(fr<0?0:(fr*=fr)*fr*(c[z=v[1+$+v[1+rr+v[1+tr+v[1+er]]]]%32*4]*W+c[1+z]*X+c[2+z]*Y+c[3+z]*Z)))}},r._buildPermutationTable=o,"undefined"!=typeof define&&define.amd&&define(function(){return r}),"undefined"!=typeof exports?exports.SimplexNoise=r:"undefined"!=typeof window&&(window.SimplexNoise=r),"undefined"!=typeof module&&(module.exports=r)}(),
    addElement: (type, params) => {
        svg5.svg.innerHTML += `<${type} 
            ${svg5.transform ? `transform="${svg5.transform.split('|').join(' ')}"` : ''} 
            ${svg5.opacity !== 1 ? `opacity="${svg5.opacity}"` : ''}
            stroke="${svg5.strokeColor}"
            stroke-width="${svg5.strokeWidth}"
            stroke-linecap="${svg5.strokeCap}"
            stroke-linejoin="${svg5.strokeJoin}"
            ${svg5.strokeDashArray.length ? `stroke-strokedasharray="${svg5.strokeDashArray.join(' ')}"` : ''}
            fill="${svg5.fillColor}"
            ${params}
        />`
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
svg5.prng = new svg5.Alea()
svg5.simplex = new svg5.SimplexNoise(svg5.prng())

let width, height
const CLOSE = true

const createSVG = (w, h, parentSelector = 'body') => {
    width = w
    height = h
    const id = `svg5_${Date.now()}`
    document.querySelector(parentSelector).innerHTML += `<svg id="${id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"></svg>`
    svg5.svg = document.querySelector(`#${id}`)
    svg5.svg.addEventListener('contextmenu', e => {
        e.preventDefault()
        save()
    }, false)
}

// Styling
const clear = () => svg5.svg.innerHTML = ''
const background = c => svg5.svg.innerHTML += `<rect stroke="none" fill="${c}" x="0" y="0" width="${width}" height="${height}" />`
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
const randomSeed = seed => svg5.prng = new svg5.Alea(seed)
const random = (a, b) => (b || b === 0) ? a + svg5.prng() * (b - a) : svg5.prng() * a
const noiseSeed = seed => svg5.simplex = new svg5.SimplexNoise(seed)
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
    const svgData = svg5.svg.outerHTML
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = svgUrl
    downloadLink.download = 'export.svg'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
}
