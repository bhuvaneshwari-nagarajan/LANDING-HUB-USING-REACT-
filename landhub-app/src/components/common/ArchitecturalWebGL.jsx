import { useEffect, useRef, useState } from 'react'
import './ArchitecturalWebGL.css'

/**
 * Interactive WebGL2 Architectural Spatial Backdrop
 * Renders a 3D perspective architectural skyline of monolithic limestone & glass volumes
 * with scroll-driven camera orbit, pointer parallax, and atmospheric horizon lighting.
 * Falls back gracefully to a static architectural gradient if WebGL is unavailable or reduced-motion is set.
 */
export function ArchitecturalWebGL() {
  const canvasRef = useRef(null)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setWebglFailed(true)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })

    if (!gl) {
      setWebglFailed(true)
      return
    }

    const vertexShaderSrc = `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      uniform mat4 uModelView;
      uniform mat4 uProjection;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vec4 mvPos = uModelView * vec4(aPosition, 1.0);
        vWorldPos = aPosition;
        vNormal = aNormal;
        gl_Position = uProjection * mvPos;
      }
    `

    const fragmentShaderSrc = `
      precision mediump float;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      uniform float uTime;
      uniform float uScroll;
      uniform vec3 uAccentColor;

      void main() {
        vec3 n = normalize(vNormal);
        vec3 lightDir = normalize(vec3(0.45, 0.85, 0.55));
        float diff = max(dot(n, lightDir), 0.0);

        // Subtle architectural rim light
        vec3 viewDir = normalize(vec3(0.0, 0.2, 1.0));
        float rim = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);

        // Height-based architectural facade banding
        float floorLine = smoothstep(0.92, 0.98, fract(vWorldPos.y * 2.2));
        vec3 baseCol = vec3(0.09, 0.09, 0.1);
        vec3 litCol = baseCol + diff * vec3(0.16, 0.16, 0.18);
        litCol += rim * uAccentColor * 0.28;
        litCol += floorLine * vec3(0.08, 0.08, 0.09);

        // Atmospheric depth fade
        float distFade = clamp(1.0 - (-vWorldPos.z + 2.0) * 0.045, 0.12, 1.0);
        gl_FragColor = vec4(litCol * distFade, 0.88);
      }
    `

    const compileShader = (type, src) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSrc)
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSrc)
    if (!vs || !fs) {
      setWebglFailed(true)
      return
    }

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglFailed(true)
      return
    }

    // Build procedural architectural monoliths (boxes with normals)
    const positions = []
    const normals = []

    const addBox = (cx, cy, cz, sx, sy, sz) => {
      const hx = sx * 0.5
      const hy = sy * 0.5
      const hz = sz * 0.5
      const faces = [
        // Front
        { n: [0, 0, 1], v: [[-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]] },
        // Back
        { n: [0, 0, -1], v: [[hx, -hy, -hz], [-hx, -hy, -hz], [-hx, hy, -hz], [hx, hy, -hz]] },
        // Left
        { n: [-1, 0, 0], v: [[-hx, -hy, -hz], [-hx, -hy, hz], [-hx, hy, hz], [-hx, hy, -hz]] },
        // Right
        { n: [1, 0, 0], v: [[hx, -hy, hz], [hx, -hy, -hz], [hx, hy, -hz], [hx, hy, hz]] },
        // Top
        { n: [0, 1, 0], v: [[-hx, hy, hz], [hx, hy, hz], [hx, hy, -hz], [-hx, hy, -hz]] },
      ]
      for (const f of faces) {
        const idx = [0, 1, 2, 0, 2, 3]
        for (const i of idx) {
          positions.push(cx + f.v[i][0], cy + f.v[i][1], cz + f.v[i][2])
          normals.push(f.n[0], f.n[1], f.n[2])
        }
      }
    }

    // Curated architectural skyline composition
    const towers = [
      [-5.5, 1.8, -8.5, 1.4, 5.8, 1.4],
      [-3.4, 2.6, -10.0, 1.7, 7.6, 1.6],
      [-1.5, 1.3, -7.0, 1.1, 4.4, 1.1],
      [1.8, 2.9, -9.2, 1.6, 8.2, 1.5],
      [4.2, 2.0, -7.8, 1.3, 6.2, 1.3],
      [6.4, 1.4, -10.5, 1.8, 5.0, 1.7],
      [-7.2, 1.1, -12.0, 2.0, 4.2, 2.0],
      [0.2, 1.0, -12.8, 2.4, 4.6, 1.8],
    ]
    for (const t of towers) {
      addBox(t[0], t[1] - 2.2, t[2], t[3], t[4], t[5])
    }

    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const normBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'aPosition')
    const aNorm = gl.getAttribLocation(program, 'aNormal')
    const uModelView = gl.getUniformLocation(program, 'uModelView')
    const uProjection = gl.getUniformLocation(program, 'uProjection')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uScroll = gl.getUniformLocation(program, 'uScroll')
    const uAccentColor = gl.getUniformLocation(program, 'uAccentColor')

    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0
    let scrollProgress = 0
    let rafId = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const onPointerMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll))
    }

    resize()
    onScroll()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const makePerspective = (fov, aspect, near, far) => {
      const f = 1.0 / Math.tan(fov / 2)
      const nf = 1 / (near - far)
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0,
      ])
    }

    const makeViewMatrix = (tx, ty, tz, rotY, rotX) => {
      const cy = Math.cos(rotY)
      const sy = Math.sin(rotY)
      const cx = Math.cos(rotX)
      const sx = Math.sin(rotX)
      return new Float32Array([
        cy, sy * sx, -sy * cx, 0,
        0, cx, sx, 0,
        sy, -cy * sx, cy * cx, 0,
        tx, ty, tz, 1,
      ])
    }

    const vertexCount = positions.length / 3
    const startTime = performance.now()

    const render = (now) => {
      const elapsed = (now - startTime) * 0.001
      pointerX += (targetX - pointerX) * 0.05
      pointerY += (targetY - pointerY) * 0.05

      gl.clearColor(0.067, 0.067, 0.067, 0.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.enable(gl.DEPTH_TEST)

      gl.useProgram(program)

      const aspect = canvas.width / Math.max(1, canvas.height)
      const proj = makePerspective(0.72, aspect, 0.1, 60.0)
      const camYaw = pointerX * 0.08 + (scrollProgress - 0.5) * 0.28
      const camPitch = pointerY * 0.04 + scrollProgress * 0.08
      const camY = -0.6 + scrollProgress * 1.4
      const camZ = 1.5 - scrollProgress * 1.8
      const mv = makeViewMatrix(-pointerX * 0.35, camY, camZ, camYaw, camPitch)

      gl.uniformMatrix4fv(uProjection, false, proj)
      gl.uniformMatrix4fv(uModelView, false, mv)
      gl.uniform1f(uTime, elapsed)
      gl.uniform1f(uScroll, scrollProgress)
      // Crimson (#A9232B) to subtle Emerald (#267B43) shift by scroll
      const r = 0.66 * (1 - scrollProgress * 0.6) + 0.15 * (scrollProgress * 0.6)
      const g = 0.14 * (1 - scrollProgress * 0.6) + 0.48 * (scrollProgress * 0.6)
      const b = 0.17 * (1 - scrollProgress * 0.6) + 0.26 * (scrollProgress * 0.6)
      gl.uniform3f(uAccentColor, r, g, b)

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer)
      gl.enableVertexAttribArray(aNorm)
      gl.vertexAttribPointer(aNorm, 3, gl.FLOAT, false, 0, 0)

      gl.drawArrays(gl.TRIANGLES, 0, vertexCount)
      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      gl.deleteBuffer(posBuffer)
      gl.deleteBuffer(normBuffer)
      gl.deleteProgram(program)
    }
  }, [])

  if (webglFailed) {
    return <div className="lh-webgl-fallback" aria-hidden="true" />
  }

  return <canvas ref={canvasRef} className="lh-webgl-canvas" aria-hidden="true" />
}
