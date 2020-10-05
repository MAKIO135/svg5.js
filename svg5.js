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
        function Alea() {
            return (function(args) {
                let s0 = 0
                let s1 = 0
                let s2 = 0
                let c = 1
                
                if (args.length == 0) args = [+new Date]
                let mash = Mash()
                s0 = mash(' ')
                s1 = mash(' ')
                s2 = mash(' ')
                
                for (let i = 0; i < args.length; i++) {
                    s0 -= mash(args[i])
                    if (s0 < 0) s0 += 1
                    s1 -= mash(args[i])
                    if (s1 < 0) s1 += 1
                    s2 -= mash(args[i])
                    if (s2 < 0) s2 += 1
                }
                mash = null
                
                const random = () => {
                    const t = 2091639 * s0 + c * 2.3283064365386963e-10 // 2^-32
                    s0 = s1
                    s1 = s2
                    return s2 = t - (c = t | 0)
                }
                random.uint32 = () => {
                    return random() * 0x100000000 // 2^32
                }
                random.fract53 = () => {
                    return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16 // 2^-53
                }
                random.args = args
                
                return random
            } (Array.prototype.slice.call(arguments)))
        }
        
        function Mash() {
            let n = 0xefc8249d
            const mash = data => {
                data = data.toString();
                for (let i = 0; i < data.length; i++) {
                    n += data.charCodeAt(i)
                    let h = 0.02519603282416938 * n
                    n = h >>> 0
                    h -= n
                    h *= n
                    n = h >>> 0
                    h -= n
                    n += h * 0x100000000 // 2^32
                }
                return (n >>> 0) * 2.3283064365386963e-10 // 2^-32
            }
            
            return mash
        }
        
        return new Alea(seed)
    },
    // SimplexNoise: https://github.com/jwagner/simplex-noise.js
    initSimplexNoise: (seed) => {
        const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
        const G2 = (3.0 - Math.sqrt(3.0)) / 6.0
        const F3 = 1.0 / 3.0
        const G3 = 1.0 / 6.0
        const F4 = (Math.sqrt(5.0) - 1.0) / 4.0
        const G4 = (5.0 - Math.sqrt(5.0)) / 20.0
        
        function SimplexNoise(seed) {
            const random = svg5.initAlea(seed)
            this.p = buildPermutationTable(random)
            this.perm = new Uint8Array(512)
            this.permMod12 = new Uint8Array(512)
            for (let i = 0; i < 512; i++) {
                this.perm[i] = this.p[i & 255]
                this.permMod12[i] = this.perm[i] % 12
            }
            
        }
        SimplexNoise.prototype = {
            grad3: new Float32Array([1, 1, 0,
                -1, 1, 0,
                1, -1, 0,
                
                -1, -1, 0,
                1, 0, 1,
                -1, 0, 1,
                
                1, 0, -1,
                -1, 0, -1,
                0, 1, 1,
                
                0, -1, 1,
                0, 1, -1,
                0, -1, -1
            ]),
            grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
                0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
                1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
                -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
                1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
                -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
                1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
                -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0
            ]),
            noise2D: function(xin, yin) {
                var permMod12 = this.permMod12;
                var perm = this.perm;
                var grad3 = this.grad3;
                var n0 = 0; // Noise contributions from the three corners
                var n1 = 0;
                var n2 = 0;
                // Skew the input space to determine which simplex cell we're in
                var s = (xin + yin) * F2; // Hairy factor for 2D
                var i = Math.floor(xin + s);
                var j = Math.floor(yin + s);
                var t = (i + j) * G2;
                var X0 = i - t; // Unskew the cell origin back to (x,y) space
                var Y0 = j - t;
                var x0 = xin - X0; // The x,y distances from the cell origin
                var y0 = yin - Y0;
                // For the 2D case, the simplex shape is an equilateral triangle.
                // Determine which simplex we are in.
                var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
                if (x0 > y0) {
                    i1 = 1;
                    j1 = 0;
                } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
                else {
                    i1 = 0;
                    j1 = 1;
                } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
                // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
                // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
                // c = (3-sqrt(3))/6
                var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
                var y1 = y0 - j1 + G2;
                var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
                var y2 = y0 - 1.0 + 2.0 * G2;
                // Work out the hashed gradient indices of the three simplex corners
                var ii = i & 255;
                var jj = j & 255;
                // Calculate the contribution from the three corners
                var t0 = 0.5 - x0 * x0 - y0 * y0;
                if (t0 >= 0) {
                    var gi0 = permMod12[ii + perm[jj]] * 3;
                    t0 *= t0;
                    n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
                }
                var t1 = 0.5 - x1 * x1 - y1 * y1;
                if (t1 >= 0) {
                    var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
                    t1 *= t1;
                    n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
                }
                var t2 = 0.5 - x2 * x2 - y2 * y2;
                if (t2 >= 0) {
                    var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
                    t2 *= t2;
                    n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
                }
                // Add contributions from each corner to get the final noise value.
                // The result is scaled to return values in the interval [-1,1].
                return 70.0 * (n0 + n1 + n2);
            },
            // 3D simplex noise
            noise3D: function(xin, yin, zin) {
                var permMod12 = this.permMod12;
                var perm = this.perm;
                var grad3 = this.grad3;
                var n0, n1, n2, n3; // Noise contributions from the four corners
                // Skew the input space to determine which simplex cell we're in
                var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D
                var i = Math.floor(xin + s);
                var j = Math.floor(yin + s);
                var k = Math.floor(zin + s);
                var t = (i + j + k) * G3;
                var X0 = i - t; // Unskew the cell origin back to (x,y,z) space
                var Y0 = j - t;
                var Z0 = k - t;
                var x0 = xin - X0; // The x,y,z distances from the cell origin
                var y0 = yin - Y0;
                var z0 = zin - Z0;
                // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
                // Determine which simplex we are in.
                var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
                var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
                if (x0 >= y0) {
                    if (y0 >= z0) {
                        i1 = 1;
                        j1 = 0;
                        k1 = 0;
                        i2 = 1;
                        j2 = 1;
                        k2 = 0;
                    } // X Y Z order
                    else if (x0 >= z0) {
                        i1 = 1;
                        j1 = 0;
                        k1 = 0;
                        i2 = 1;
                        j2 = 0;
                        k2 = 1;
                    } // X Z Y order
                    else {
                        i1 = 0;
                        j1 = 0;
                        k1 = 1;
                        i2 = 1;
                        j2 = 0;
                        k2 = 1;
                    } // Z X Y order
                }
                else { // x0<y0
                    if (y0 < z0) {
                        i1 = 0;
                        j1 = 0;
                        k1 = 1;
                        i2 = 0;
                        j2 = 1;
                        k2 = 1;
                    } // Z Y X order
                    else if (x0 < z0) {
                        i1 = 0;
                        j1 = 1;
                        k1 = 0;
                        i2 = 0;
                        j2 = 1;
                        k2 = 1;
                    } // Y Z X order
                    else {
                        i1 = 0;
                        j1 = 1;
                        k1 = 0;
                        i2 = 1;
                        j2 = 1;
                        k2 = 0;
                    } // Y X Z order
                }
                // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
                // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
                // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
                // c = 1/6.
                var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
                var y1 = y0 - j1 + G3;
                var z1 = z0 - k1 + G3;
                var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
                var y2 = y0 - j2 + 2.0 * G3;
                var z2 = z0 - k2 + 2.0 * G3;
                var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
                var y3 = y0 - 1.0 + 3.0 * G3;
                var z3 = z0 - 1.0 + 3.0 * G3;
                // Work out the hashed gradient indices of the four simplex corners
                var ii = i & 255;
                var jj = j & 255;
                var kk = k & 255;
                // Calculate the contribution from the four corners
                var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
                if (t0 < 0) n0 = 0.0;
                else {
                    var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
                    t0 *= t0;
                    n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
                }
                var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
                if (t1 < 0) n1 = 0.0;
                else {
                    var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
                    t1 *= t1;
                    n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
                }
                var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
                if (t2 < 0) n2 = 0.0;
                else {
                    var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
                    t2 *= t2;
                    n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
                }
                var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
                if (t3 < 0) n3 = 0.0;
                else {
                    var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
                    t3 *= t3;
                    n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
                }
                // Add contributions from each corner to get the final noise value.
                // The result is scaled to stay just inside [-1,1]
                return 32.0 * (n0 + n1 + n2 + n3);
            },
            // 4D simplex noise, better simplex rank ordering method 2012-03-09
            noise4D: function(x, y, z, w) {
                var perm = this.perm;
                var grad4 = this.grad4;
                
                var n0, n1, n2, n3, n4; // Noise contributions from the five corners
                // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
                var s = (x + y + z + w) * F4; // Factor for 4D skewing
                var i = Math.floor(x + s);
                var j = Math.floor(y + s);
                var k = Math.floor(z + s);
                var l = Math.floor(w + s);
                var t = (i + j + k + l) * G4; // Factor for 4D unskewing
                var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
                var Y0 = j - t;
                var Z0 = k - t;
                var W0 = l - t;
                var x0 = x - X0; // The x,y,z,w distances from the cell origin
                var y0 = y - Y0;
                var z0 = z - Z0;
                var w0 = w - W0;
                // For the 4D case, the simplex is a 4D shape I won't even try to describe.
                // To find out which of the 24 possible simplices we're in, we need to
                // determine the magnitude ordering of x0, y0, z0 and w0.
                // Six pair-wise comparisons are performed between each possible pair
                // of the four coordinates, and the results are used to rank the numbers.
                var rankx = 0;
                var ranky = 0;
                var rankz = 0;
                var rankw = 0;
                if (x0 > y0) rankx++;
                else ranky++;
                if (x0 > z0) rankx++;
                else rankz++;
                if (x0 > w0) rankx++;
                else rankw++;
                if (y0 > z0) ranky++;
                else rankz++;
                if (y0 > w0) ranky++;
                else rankw++;
                if (z0 > w0) rankz++;
                else rankw++;
                var i1, j1, k1, l1; // The integer offsets for the second simplex corner
                var i2, j2, k2, l2; // The integer offsets for the third simplex corner
                var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
                // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
                // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
                // impossible. Only the 24 indices which have non-zero entries make any sense.
                // We use a thresholding to set the coordinates in turn from the largest magnitude.
                // Rank 3 denotes the largest coordinate.
                i1 = rankx >= 3 ? 1 : 0;
                j1 = ranky >= 3 ? 1 : 0;
                k1 = rankz >= 3 ? 1 : 0;
                l1 = rankw >= 3 ? 1 : 0;
                // Rank 2 denotes the second largest coordinate.
                i2 = rankx >= 2 ? 1 : 0;
                j2 = ranky >= 2 ? 1 : 0;
                k2 = rankz >= 2 ? 1 : 0;
                l2 = rankw >= 2 ? 1 : 0;
                // Rank 1 denotes the second smallest coordinate.
                i3 = rankx >= 1 ? 1 : 0;
                j3 = ranky >= 1 ? 1 : 0;
                k3 = rankz >= 1 ? 1 : 0;
                l3 = rankw >= 1 ? 1 : 0;
                // The fifth corner has all coordinate offsets = 1, so no need to compute that.
                var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
                var y1 = y0 - j1 + G4;
                var z1 = z0 - k1 + G4;
                var w1 = w0 - l1 + G4;
                var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
                var y2 = y0 - j2 + 2.0 * G4;
                var z2 = z0 - k2 + 2.0 * G4;
                var w2 = w0 - l2 + 2.0 * G4;
                var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
                var y3 = y0 - j3 + 3.0 * G4;
                var z3 = z0 - k3 + 3.0 * G4;
                var w3 = w0 - l3 + 3.0 * G4;
                var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
                var y4 = y0 - 1.0 + 4.0 * G4;
                var z4 = z0 - 1.0 + 4.0 * G4;
                var w4 = w0 - 1.0 + 4.0 * G4;
                // Work out the hashed gradient indices of the five simplex corners
                var ii = i & 255;
                var jj = j & 255;
                var kk = k & 255;
                var ll = l & 255;
                // Calculate the contribution from the five corners
                var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
                if (t0 < 0) n0 = 0.0;
                else {
                    var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
                    t0 *= t0;
                    n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
                }
                var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
                if (t1 < 0) n1 = 0.0;
                else {
                    var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
                    t1 *= t1;
                    n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
                }
                var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
                if (t2 < 0) n2 = 0.0;
                else {
                    var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
                    t2 *= t2;
                    n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
                }
                var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
                if (t3 < 0) n3 = 0.0;
                else {
                    var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
                    t3 *= t3;
                    n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
                }
                var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
                if (t4 < 0) n4 = 0.0;
                else {
                    var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
                    t4 *= t4;
                    n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
                }
                // Sum up and scale the result to cover the range [-1,1]
                return 27.0 * (n0 + n1 + n2 + n3 + n4);
            }
        }
        
        function buildPermutationTable(random) {
            var i;
            var p = new Uint8Array(256);
            for (i = 0; i < 256; i++) {
                p[i] = i;
            }
            for (i = 0; i < 255; i++) {
                var r = i + ~~(random() * (256 - i));
                var aux = p[i];
                p[i] = p[r];
                p[r] = aux;
            }
            return p;
        }
        SimplexNoise._buildPermutationTable = buildPermutationTable
        return new SimplexNoise(seed)
    },
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
svg5.prng = svg5.initAlea()
svg5.simplex = svg5.initSimplexNoise(svg5.prng)

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
const randomSeed = seed => svg5.prng = svg5.initAlea(seed)
const random = (a, b) => (b || b === 0) ? a + svg5.prng() * (b - a) : svg5.prng() * a
const noiseSeed = seed => svg5.simplex = svg5.initSimplexNoise(seed)
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