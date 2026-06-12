'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 2600
const DEPTH = 220

/**
 * Night-highway light trails: two streams of particles (amber = headlights,
 * cyan = taillights) rushing toward the camera over a receding grid floor.
 * Mouse moves the camera for parallax. Pure background — renders no text.
 */
export function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0c10, 40, DEPTH * 0.9)

    const camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 3.2, 24)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x0a0c10, 1)
    container.appendChild(renderer.domElement)

    // --- Light-trail particles ---------------------------------------------
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const speeds = new Float32Array(PARTICLE_COUNT)

    const amber = new THREE.Color(0xff8a00)
    const amberHot = new THREE.Color(0xffb133)
    const cyan = new THREE.Color(0x22d3ee)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const lane = Math.random() < 0.62 ? 'amber' : 'cyan'
      // amber stream right of center, cyan stream left — like opposing traffic
      const xCenter = lane === 'amber' ? 5 : -5
      positions[i * 3] = xCenter + (Math.random() - 0.5) * 7
      positions[i * 3 + 1] = Math.random() * 9 - 1.5
      positions[i * 3 + 2] = -Math.random() * DEPTH

      const c = lane === 'amber' ? (Math.random() < 0.4 ? amberHot : amber) : cyan
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      speeds[i] = 0.35 + Math.random() * 0.85
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Soft radial sprite so points render as glowing orbs, not squares
    const spriteCanvas = document.createElement('canvas')
    spriteCanvas.width = spriteCanvas.height = 64
    const ctx2d = spriteCanvas.getContext('2d')!
    const grad = ctx2d.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.3, 'rgba(255,255,255,0.6)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx2d.fillStyle = grad
    ctx2d.fillRect(0, 0, 64, 64)
    const sprite = new THREE.CanvasTexture(spriteCanvas)

    const material = new THREE.PointsMaterial({
      size: 0.7,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // --- Receding grid floor ------------------------------------------------
    const grid = new THREE.GridHelper(400, 60, 0xff8a00, 0x1a1d24)
    grid.position.y = -4
    const gridMat = grid.material as THREE.Material
    gridMat.transparent = true
    gridMat.opacity = 0.16
    scene.add(grid)

    // --- Mouse parallax (refs only — never re-creates the scene) -----------
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let animationId: number
    const pos = geometry.attributes.position.array as Float32Array

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const dt = Math.min(clock.getDelta(), 0.05)

      if (!prefersReduced) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          pos[i * 3 + 2] += speeds[i] * dt * 60
          if (pos[i * 3 + 2] > 26) pos[i * 3 + 2] = -DEPTH
        }
        geometry.attributes.position.needsUpdate = true
        grid.position.z = (grid.position.z + dt * 14) % (400 / 60)
      }

      // Ease camera toward mouse for parallax
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.04
      camera.position.y += (3.2 - mouse.y * 1.6 - camera.position.y) * 0.04
      camera.lookAt(0, 2, -30)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationId)
      geometry.dispose()
      material.dispose()
      sprite.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
}
