import { useEffect, useRef, useState } from 'react'
import './ArchitecturalWorld.css'

/**
 * Pure 3D WebGL Architectural Environment
 * Renders a modern cantilevered waterfront pavilion, slender columns, warm-lit glass facade,
 * reflective plaza/water plane, and distant Dubai architectural towers.
 * Camera smoothly interpolates across 5 spatial waypoints driven by scroll, wheel, touch, or keyboard.
 */
export const CAMERA_WAYPOINTS = [
  {
    id: 'arrival',
    pos: [0.0, 2.2, 14.5],
    target: [0.0, 1.4, -2.0],
    fov: 0.72,
    fallbackVideo: '/assets/hero/hero-penthouse.mp4',
    fallbackImg: '/assets/images/image-01.jpeg',
  },
  {
    id: 'architecture',
    pos: [-6.8, 1.35, 8.2],
    target: [0.5, 1.5, -1.5],
    fov: 0.68,
    fallbackVideo: '/assets/experience/experience-villa.mp4',
    fallbackImg: '/assets/images/image-02.jpeg',
  },
  {
    id: 'advisory',
    pos: [6.4, 2.8, 7.6],
    target: [-0.4, 1.8, -2.5],
    fov: 0.7,
    fallbackVideo: '/assets/features/feat-approval.mp4',
    fallbackImg: '/assets/images/image-03.jpeg',
  },
  {
    id: 'residences',
    pos: [1.8, 5.2, 10.5],
    target: [0.0, 2.0, -6.0],
    fov: 0.75,
    fallbackVideo: '/assets/features/feat-elevator.mp4',
    fallbackImg: '/assets/images/image-04.jpeg',
  },
  {
    id: 'desk',
    pos: [0.2, 1.15, 5.8],
    target: [0.0, 1.3, -1.8],
    fov: 0.64,
    fallbackVideo: '/assets/features/feat-keys.mp4',
    fallbackImg: '/assets/images/image-05.jpeg',
  },
]

export function ArchitecturalWorld({ activeStep = 0 }) {
  const canvasRef = useRef(null)
  const targetStepRef = useRef(activeStep)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    targetStepRef.current = activeStep
  }, [activeStep])

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setUseFallback(true)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    })

    if (!gl) {
      setUseFallback(true)
      return
    }

    const vsSource = `
      attribute vec3 aPos;
      attribute vec3 aNorm;
      attribute float aMat;
      uniform mat4 uView;
      uniform mat4 uProj;
      varying vec3 vPos;
      varying vec3 vNorm;
      varying float vMat;
      void main() {
        vPos = aPos;
        vNorm = aNorm;
        vMat = aMat;
        gl_Position = uProj * uView * vec4(aPos, 1.0);
      }
    `

    // Material IDs: 0 = limestone/concrete, 1 = dark architectural glass, 2 = warm interior glow, 3 = reflective water/plaza, 4 = crimson accent
    const fsSource = `
      precision highp float;
      varying vec3 vPos;
      varying vec3 vNorm;
      varying float vMat;
      uniform vec3 uCamPos;
      uniform float uTime;

      void main() {
        vec3 n = normalize(vNorm);
        vec3 v = normalize(uCamPos - vPos);
        vec3 sunDir = normalize(vec3(0.55, 0.42, 0.72));
        vec3 fillDir = normalize(vec3(-0.6, 0.5, -0.3));

        float diffSun = max(dot(n, sunDir), 0.0);
        float diffFill = max(dot(n, fillDir), 0.0);
        float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.2);

        vec3 halfVec = normalize(sunDir + v);
        float spec = pow(max(dot(n, halfVec), 0.0), 48.0);

        vec3 color = vec3(0.067);

        if (vMat < 0.5) {
          // Architectural limestone & dark concrete
          vec3 stone = vec3(0.14, 0.14, 0.15);
          color = stone * (0.28 + diffSun * 0.72 + diffFill * 0.22) + vec3(0.08) * fresnel;
        } else if (vMat < 1.5) {
          // Dark architectural curtain-wall glass with mullion grid
          float gx = smoothstep(0.92, 0.98, fract(vPos.x * 0.85));
          float gy = smoothstep(0.92, 0.98, fract(vPos.y * 0.65));
          float mullion = max(gx, gy);
          vec3 glass = vec3(0.05, 0.07, 0.09);
          vec3 skyRefl = vec3(0.24, 0.22, 0.26) * fresnel;
          color = mix(glass + skyRefl + spec * vec3(0.65, 0.58, 0.55), vec3(0.04), mullion * 0.7);
        } else if (vMat < 2.5) {
          // Warm interior architectural illumination
          float pulse = 0.94 + 0.06 * sin(uTime * 0.8 + vPos.x * 0.5);
          color = vec3(0.82, 0.64, 0.44) * pulse * (0.65 + 0.35 * diffSun);
        } else if (vMat < 3.5) {
          // Reflective obsidian water & plaza plane
          float ripple = sin(vPos.x * 1.4 + uTime * 0.9) * cos(vPos.z * 1.4 - uTime * 0.7) * 0.03;
          vec3 wn = normalize(vec3(ripple, 1.0, ripple * 0.8));
          float wSpec = pow(max(dot(wn, halfVec), 0.0), 64.0);
          float distFromCenter = length(vPos.xz);
          float poolGlow = exp(-distFromCenter * 0.14) * 0.16;
          color = vec3(0.035, 0.038, 0.042) + vec3(0.28, 0.22, 0.20) * wSpec + vec3(0.45, 0.35, 0.25) * poolGlow;
        } else {
          // Subtle LAND HUB crimson architectural detail (#A9232B)
          color = vec3(0.66, 0.137, 0.169) * (0.45 + 0.55 * diffSun);
        }

        // Atmospheric horizon fog into #111111
        float dist = length(uCamPos - vPos);
        float fog = 1.0 - exp(-dist * dist * 0.0014);
        vec3 fogColor = vec3(0.067, 0.067, 0.072);
        color = mix(color, fogColor, clamp(fog, 0.0, 1.0));

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s)
        return null
      }
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, vsSource)
    const fs = compile(gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) {
      setUseFallback(true)
      return
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setUseFallback(true)
      return
    }

    // Build detailed architectural geometry
    const pos = []
    const norm = []
    const mat = []

    const addBox = (cx, cy, cz, sx, sy, sz, m) => {
      const hx = sx * 0.5
      const hy = sy * 0.5
      const hz = sz * 0.5
      const faces = [
        { n: [0, 0, 1], v: [[-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]] },
        { n: [0, 0, -1], v: [[hx, -hy, -hz], [-hx, -hy, -hz], [-hx, hy, -hz], [hx, hy, -hz]] },
        { n: [-1, 0, 0], v: [[-hx, -hy, -hz], [-hx, -hy, hz], [-hx, hy, hz], [-hx, hy, -hz]] },
        { n: [1, 0, 0], v: [[hx, -hy, hz], [hx, -hy, -hz], [hx, hy, -hz], [hx, hy, hz]] },
        { n: [0, 1, 0], v: [[-hx, hy, hz], [hx, hy, hz], [hx, hy, -hz], [-hx, hy, -hz]] },
        { n: [0, -1, 0], v: [[-hx, -hy, -hz], [hx, -hy, -hz], [hx, -hy, hz], [-hx, -hy, hz]] },
      ]
      for (const f of faces) {
        const idx = [0, 1, 2, 0, 2, 3]
        for (const i of idx) {
          pos.push(cx + f.v[i][0], cy + f.v[i][1], cz + f.v[i][2])
          norm.push(f.n[0], f.n[1], f.n[2])
          mat.push(m)
        }
      }
    }

    // 1. Reflective Ground & Water Plaza
    addBox(0, -0.05, -8, 90, 0.1, 90, 3)

    // 2. Main Cantilevered Waterfront Pavilion
    // Stepped plinth terrace
    addBox(0, 0.15, -1.8, 9.6, 0.3, 6.2, 0)
    addBox(0, 0.35, -2.0, 8.4, 0.12, 5.2, 0)

    // Warm glowing interior core
    addBox(0, 1.35, -2.1, 6.2, 1.9, 3.4, 2)

    // Recessed glass curtain walls
    addBox(0, 1.4, -0.35, 6.8, 2.0, 0.08, 1)
    addBox(0, 1.4, -3.85, 6.8, 2.0, 0.08, 1)
    addBox(-3.4, 1.4, -2.1, 0.08, 2.0, 3.5, 1)
    addBox(3.4, 1.4, -2.1, 0.08, 2.0, 3.5, 1)

    // Slender architectural columns
    for (const x of [-4.0, -1.4, 1.4, 4.0]) {
      addBox(x, 1.4, 0.25, 0.14, 2.05, 0.14, 0)
      addBox(x, 1.4, -4.3, 0.14, 2.05, 0.14, 0)
    }

    // Lower cantilevered roof slab + subtle crimson architectural fascia
    addBox(0.3, 2.52, -1.9, 10.4, 0.22, 6.0, 0)
    addBox(0.3, 2.52, 1.12, 10.4, 0.05, 0.06, 4)

    // Upper Sky-Suite Cantilever
    addBox(-1.2, 3.35, -2.5, 4.4, 1.45, 2.8, 2)
    addBox(-1.2, 3.35, -1.08, 4.8, 1.48, 0.08, 1)
    addBox(-1.0, 4.18, -2.5, 6.2, 0.18, 4.2, 0)

    // 3. Distant Architectural Skyline Towers
    const towers = [
      [-11.5, 4.5, -16.0, 2.8, 9.0, 2.8],
      [-7.2, 6.2, -20.0, 3.2, 12.4, 3.0],
      [7.8, 7.0, -18.5, 3.0, 14.0, 3.0],
      [12.4, 4.8, -15.5, 2.6, 9.6, 2.6],
      [-2.5, 8.2, -26.0, 3.6, 16.4, 3.4],
      [3.2, 6.8, -24.0, 3.4, 13.6, 3.2],
      [-16.0, 3.5, -22.0, 3.5, 7.0, 3.5],
      [17.0, 4.0, -23.0, 3.5, 8.0, 3.5],
    ]
    for (const t of towers) {
      addBox(t[0], t[1], t[2], t[3], t[4], t[5], 1)
      // Structural corner fins
      addBox(t[0] - t[3] * 0.48, t[1], t[2] + t[5] * 0.48, 0.18, t[4], 0.18, 0)
      addBox(t[0] + t[3] * 0.48, t[1], t[2] + t[5] * 0.48, 0.18, t[4], 0.18, 0)
    }

    const posBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)

    const normBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, normBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm), gl.STATIC_DRAW)

    const matBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, matBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mat), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(prog, 'aPos')
    const aNorm = gl.getAttribLocation(prog, 'aNorm')
    const aMat = gl.getAttribLocation(prog, 'aMat')
    const uView = gl.getUniformLocation(prog, 'uView')
    const uProj = gl.getUniformLocation(prog, 'uProj')
    const uCamPos = gl.getUniformLocation(prog, 'uCamPos')
    const uTime = gl.getUniformLocation(prog, 'uTime')

    // Math helpers
    const perspective = (fov, aspect, near, far) => {
      const f = 1 / Math.tan(fov / 2)
      const nf = 1 / (near - far)
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0,
      ])
    }

    const lookAt = (eye, center) => {
      let zx = eye[0] - center[0]
      let zy = eye[1] - center[1]
      let zz = eye[2] - center[2]
      const zLen = Math.hypot(zx, zy, zz) || 1
      zx /= zLen; zy /= zLen; zz /= zLen

      let xx = zz
      let xy = 0
      let xz = -zx
      const xLen = Math.hypot(xx, xy, xz) || 1
      xx /= xLen; xy /= xLen; xz /= xLen

      const yx = zy * xz - zz * xy
      const yy = zz * xx - zx * xz
      const yz = zx * xy - zy * xx

      return new Float32Array([
        xx, yx, zx, 0,
        xy, yy, zy, 0,
        xz, yz, zz, 0,
        -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
        -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
        -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
        1,
      ])
    }

    let camPos = [...CAMERA_WAYPOINTS[0].pos]
    let camTarget = [...CAMERA_WAYPOINTS[0].target]
    let camFov = CAMERA_WAYPOINTS[0].fov
    let pointerX = 0
    let pointerY = 0
    let targetPX = 0
    let targetPY = 0
    let rafId = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const onPointerMove = (e) => {
      targetPX = (e.clientX / window.innerWidth - 0.5) * 2
      targetPY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const vertexCount = pos.length / 3
    const start = performance.now()

    const render = (now) => {
      const t = (now - start) * 0.001
      const wp = CAMERA_WAYPOINTS[targetStepRef.current] || CAMERA_WAYPOINTS[0]

      pointerX += (targetPX - pointerX) * 0.05
      pointerY += (targetPY - pointerY) * 0.05

      // Smooth cinematic camera damping
      const lerp = 0.045
      for (let i = 0; i < 3; i++) {
        camPos[i] += (wp.pos[i] - camPos[i]) * lerp
        camTarget[i] += (wp.target[i] - camTarget[i]) * lerp
      }
      camFov += (wp.fov - camFov) * lerp

      const eye = [
        camPos[0] + pointerX * 0.75 + Math.sin(t * 0.25) * 0.12,
        camPos[1] - pointerY * 0.35 + Math.cos(t * 0.2) * 0.06,
        camPos[2],
      ]

      gl.clearColor(0.067, 0.067, 0.072, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.enable(gl.DEPTH_TEST)

      gl.useProgram(prog)

      const aspect = canvas.width / Math.max(1, canvas.height)
      gl.uniformMatrix4fv(uProj, false, perspective(camFov, aspect, 0.1, 120.0))
      gl.uniformMatrix4fv(uView, false, lookAt(eye, camTarget))
      gl.uniform3fv(uCamPos, eye)
      gl.uniform1f(uTime, t)

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, normBuf)
      gl.enableVertexAttribArray(aNorm)
      gl.vertexAttribPointer(aNorm, 3, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, matBuf)
      gl.enableVertexAttribArray(aMat)
      gl.vertexAttribPointer(aMat, 1, gl.FLOAT, false, 0, 0)

      gl.drawArrays(gl.TRIANGLES, 0, vertexCount)
      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      gl.deleteBuffer(posBuf)
      gl.deleteBuffer(normBuf)
      gl.deleteBuffer(matBuf)
      gl.deleteProgram(prog)
    }
  }, [])

  const wp = CAMERA_WAYPOINTS[activeStep] || CAMERA_WAYPOINTS[0]

  if (useFallback) {
    return (
      <div className="lh-world-fallback" aria-hidden="true">
        <video
          key={wp.fallbackVideo}
          className="lh-world-fallback-video"
          autoPlay
          muted
          loop
          playsInline
          poster={wp.fallbackImg}
        >
          <source src={wp.fallbackVideo} type="video/mp4" />
        </video>
        <div className="lh-world-fallback-scrim" />
      </div>
    )
  }

  return <canvas ref={canvasRef} className="lh-world-canvas" aria-hidden="true" />
}
