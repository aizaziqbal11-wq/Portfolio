'use client'

import { useEffect, useRef } from 'react'

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    let animId: number
    let cleanupFn: (() => void) | null = null

    import('three').then((THREE) => {
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'low-power',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
      camera.position.set(0, 0, 30)

      const COUNT = 600
      const positions = new Float32Array(COUNT * 3)
      const scales = new Float32Array(COUNT)
      const speeds = new Float32Array(COUNT)
      const phases = new Float32Array(COUNT)

      for (let i = 0; i < COUNT; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 12 + Math.random() * 22
        positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = r * Math.cos(phi) - 10
        scales[i] = 0.4 + Math.random() * 1.4
        speeds[i] = 0.1 + Math.random() * 0.4
        phases[i] = Math.random() * Math.PI * 2
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
      geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
      geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#5b5ef4') },
          uOpacity: { value: 0.55 },
        },
        vertexShader: `
          attribute float aScale;
          attribute float aSpeed;
          attribute float aPhase;
          uniform float uTime;
          void main() {
            vec3 pos = position;
            pos.y += sin(uTime * aSpeed + aPhase) * 0.8;
            pos.x += cos(uTime * aSpeed * 0.7 + aPhase) * 0.4;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aScale * (280.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d) * uOpacity;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      })

      const points = new THREE.Points(geometry, material)
      scene.add(points)

      let mouseX = 0, mouseY = 0, camX = 0, camY = 0

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 6
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 4
      }
      window.addEventListener('mousemove', onMouseMove, { passive: true })

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize, { passive: true })

      let lastTime = performance.now()

      const tick = (now: number) => {
        animId = requestAnimationFrame(tick)
        const delta = Math.min((now - lastTime) / 1000, 0.05)
        lastTime = now
        material.uniforms.uTime.value += delta
        camX += (mouseX - camX) * 0.04
        camY += (mouseY - camY) * 0.04
        camera.position.x = camX
        camera.position.y = camY
        points.rotation.y += delta * 0.012
        points.rotation.x += delta * 0.006
        renderer.render(scene, camera)
      }

      animId = requestAnimationFrame(tick)

      cleanupFn = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    })

    return () => { cleanupFn?.() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}