'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const SKILLS = [
  { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Flutter',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Next.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'FastAPI',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'PyTorch',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'Docker',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'PostgreSQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Firebase',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Dart',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'Linux',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Redis',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
]

// Load SVG from URL and draw it on canvas, return as texture-ready canvas
function loadSVGToCanvas(url: string, size: number): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    // Dark rounded background
    ctx.beginPath()
    ctx.roundRect(6, 6, size - 12, size - 12, 20)
    ctx.fillStyle = 'rgba(13, 13, 30, 0.85)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(91, 94, 244, 0.35)'
    ctx.lineWidth = 2
    ctx.stroke()

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const padding = size * 0.22
      ctx.drawImage(img, padding, padding, size - padding * 2, size - padding * 2)
      resolve(canvas)
    }
    img.onerror = () => {
      // Fallback: draw skill initial
      ctx.fillStyle = '#5b5ef4'
      ctx.font = `bold ${size * 0.35}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(url.split('/').pop()?.slice(0, 2).toUpperCase() || '?', size / 2, size / 2)
      resolve(canvas)
    }
    img.src = url
  })
}

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let animId: number
    let cleanup: (() => void) | null = null

    Promise.all([
      import('three'),
      ...SKILLS.map(s => loadSVGToCanvas(s.icon, 128))
    ]).then(([THREE, ...iconCanvases]) => {

      // ── Renderer ─────────────────────────────────────────────────────────
      const W = container.clientWidth
      const H = container.clientHeight

      const renderer = new (THREE as any).WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.setClearColor(0x000000, 0)

      const scene = new (THREE as any).Scene()
      const camera = new (THREE as any).PerspectiveCamera(45, W / H, 0.1, 1000)
      camera.position.set(0, 0, 5.5)

      // ── Wireframe Globe ───────────────────────────────────────────────────
      const globeGeo = new (THREE as any).SphereGeometry(1.9, 36, 36)
      const globeMat = new (THREE as any).MeshBasicMaterial({
        color: 0x3a3aaa,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      })
      const globe = new (THREE as any).Mesh(globeGeo, globeMat)
      scene.add(globe)

      // Equator ring
      const ringGeo = new (THREE as any).TorusGeometry(1.92, 0.006, 8, 100)
      const ringMat = new (THREE as any).MeshBasicMaterial({
        color: 0x5b5ef4,
        transparent: true,
        opacity: 0.5,
      })
      const ring = new (THREE as any).Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2
      scene.add(ring)

      // ── Tech icon sprites ─────────────────────────────────────────────────
      const RADIUS = 2.0
      const iconSprites: any[] = []

      SKILLS.forEach((skill, idx) => {
        // Fibonacci lattice for even distribution
        const phi = Math.acos(1 - (2 * (idx + 0.5)) / SKILLS.length)
        const theta = Math.PI * (1 + Math.sqrt(5)) * (idx + 0.5)

        const x = RADIUS * Math.sin(phi) * Math.cos(theta)
        const y = RADIUS * Math.sin(phi) * Math.sin(theta)
        const z = RADIUS * Math.cos(phi)

        const texture = new (THREE as any).CanvasTexture(iconCanvases[idx])

        const mat = new (THREE as any).SpriteMaterial({
          map: texture,
          transparent: true,
          depthTest: false,
          sizeAttenuation: true,
        })
        const sprite = new (THREE as any).Sprite(mat)
        sprite.position.set(x, y, z)
        sprite.scale.set(0.6, 0.6, 1)
        sprite._origPos = new (THREE as any).Vector3(x, y, z)
        sprite._skill = skill

        scene.add(sprite)
        iconSprites.push(sprite)
      })

      // ── Ambient star dots ─────────────────────────────────────────────────
      const starCount = 150
      const starPos = new Float32Array(starCount * 3)
      for (let i = 0; i < starCount; i++) {
        const r = 1.6 + Math.random() * 1.5
        const t = Math.random() * Math.PI * 2
        const p = Math.acos(2 * Math.random() - 1)
        starPos[i * 3]     = r * Math.sin(p) * Math.cos(t)
        starPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t)
        starPos[i * 3 + 2] = r * Math.cos(p)
      }
      const starGeo = new (THREE as any).BufferGeometry()
      starGeo.setAttribute('position', new (THREE as any).BufferAttribute(starPos, 3))
      const starMat = new (THREE as any).PointsMaterial({
        color: 0x6666cc,
        size: 0.02,
        transparent: true,
        opacity: 0.6,
      })
      const stars = new (THREE as any).Points(starGeo, starMat)
      scene.add(stars)

      // ── Mouse ─────────────────────────────────────────────────────────────
      let mouseX = 0
      let mouseY = 0

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      container.addEventListener('mousemove', onMouseMove)

      // ── Tooltip ───────────────────────────────────────────────────────────
      const raycaster = new (THREE as any).Raycaster()
      const mouse2D = new (THREE as any).Vector2()

      const tooltip = document.createElement('div')
      tooltip.style.cssText = `
        position:absolute; pointer-events:none; display:none;
        background:rgba(13,13,30,0.95); color:#e2e2f0;
        border:1px solid rgba(91,94,244,0.5); border-radius:10px;
        padding:5px 12px; font-size:12px; font-family:monospace;
        white-space:nowrap; z-index:100;
        box-shadow:0 4px 20px rgba(91,94,244,0.3);
      `
      container.style.position = 'relative'
      container.appendChild(tooltip)

      const onHover = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycaster.setFromCamera(mouse2D, camera)
        const hits = raycaster.intersectObjects(iconSprites)
        if (hits.length > 0 && hits[0].object._skill) {
          tooltip.textContent = hits[0].object._skill.name
          tooltip.style.display = 'block'
          tooltip.style.left = (e.clientX - rect.left + 14) + 'px'
          tooltip.style.top  = (e.clientY - rect.top  - 10) + 'px'
        } else {
          tooltip.style.display = 'none'
        }
      }
      container.addEventListener('mousemove', onHover)

      // ── Resize ────────────────────────────────────────────────────────────
      const onResize = () => {
        const W2 = container.clientWidth
        const H2 = container.clientHeight
        camera.aspect = W2 / H2
        camera.updateProjectionMatrix()
        renderer.setSize(W2, H2)
      }
      window.addEventListener('resize', onResize, { passive: true })

      // ── Animation loop ────────────────────────────────────────────────────
      let autoRotY = 0
      let autoRotX = 0
      let lastTime = performance.now()

      const tick = (now: number) => {
        animId = requestAnimationFrame(tick)
        const delta = Math.min((now - lastTime) / 1000, 0.05)
        lastTime = now

        autoRotY += delta * 0.20
        autoRotX += delta * 0.03

        const rotY = autoRotY + mouseX * 0.25
        const rotX = autoRotX * 0.5 + mouseY * 0.12

        // Rotate visual meshes
        globe.rotation.y = rotY
        globe.rotation.x = rotX
        ring.rotation.z  = rotY * 0.4
        stars.rotation.y = rotY * 0.5
        stars.rotation.x = rotX * 0.3

        // Move icon sprites with globe rotation
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX)

        iconSprites.forEach((sprite) => {
          const o = sprite._origPos
          // Apply Y rotation
          const x1 =  o.x * cosY + o.z * sinY
          const z1 = -o.x * sinY + o.z * cosY
          // Apply X rotation
          const y2 =  o.y * cosX - z1 * sinX
          const z2 =  o.y * sinX + z1 * cosX

          sprite.position.set(x1, y2, z2)

          // Perspective: front = big & bright, back = small & dim
          const t = (THREE as any).MathUtils.mapLinear(z2, -RADIUS, RADIUS, 0, 1)
          const scale   = 0.28 + t * 0.52
          const opacity = 0.20 + t * 0.80
          sprite.scale.set(scale, scale, 1)
          sprite.material.opacity = opacity
        })

        renderer.render(scene, camera)
      }

      animId = requestAnimationFrame(tick)

      // ── Cleanup ───────────────────────────────────────────────────────────
      cleanup = () => {
        cancelAnimationFrame(animId)
        container.removeEventListener('mousemove', onMouseMove)
        container.removeEventListener('mousemove', onHover)
        window.removeEventListener('resize', onResize)
        if (container.contains(tooltip)) container.removeChild(tooltip)
        globeGeo.dispose(); globeMat.dispose()
        ringGeo.dispose();  ringMat.dispose()
        starGeo.dispose();  starMat.dispose()
        iconSprites.forEach(s => { s.material.map?.dispose(); s.material.dispose() })
        renderer.dispose()
      }
    })

    return () => { cleanup?.() }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default function Skills() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />

      {/* Faint bg word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-bold"
          style={{ color: 'var(--text-1)', opacity: 0.018, fontFamily: 'var(--font-instrument)', whiteSpace: 'nowrap' }}>
          SKILLS
        </span>
      </div>

      <div className="container-main relative z-10" ref={ref}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <span className="num">02.</span>
          <span className="text">Skills</span>
          <div className="line" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <p className="text-xs font-mono uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}>
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-instrument)', color: 'var(--text-1)' }}>
            My <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto"
          style={{ width: '100%', maxWidth: '700px', height: '540px' }}
        >
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(91,94,244,0.12) 0%, transparent 70%)' }} />
          </div>
          <GlobeCanvas />
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-xs font-mono mt-1"
          style={{ color: 'var(--text-3)' }}
        >
          Hover icons · Globe auto-rotates · Move mouse to tilt
        </motion.p>

      </div>
    </section>
  )
}