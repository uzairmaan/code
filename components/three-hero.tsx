'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

export function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.7), 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    camera.position.z = 5
    renderer.setSize(window.innerWidth, window.innerHeight * 0.7)
    renderer.setClearColor(0x0a0c10, 1)
    containerRef.current.appendChild(renderer.domElement)

    // Create animated geometry
    const geometry = new THREE.IcosahedronGeometry(2, 4)
    const material = new THREE.MeshPhongMaterial({
      color: 0xff8a00,
      emissive: 0xff8a00,
      wireframe: false,
      shininess: 100,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Add wireframe overlay
    const wireframeGeometry = new THREE.IcosahedronGeometry(2, 4)
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      linewidth: 2,
      transparent: true,
      opacity: 0.3,
    })
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(wireframeGeometry), wireframeMaterial)
    mesh.add(wireframe)

    // Lighting
    const light1 = new THREE.PointLight(0xff8a00, 1, 100)
    light1.position.set(5, 5, 5)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x22d3ee, 0.8, 100)
    light2.position.set(-5, -5, 5)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / (window.innerHeight * 0.7)) * 2 + 1
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotation
      mesh.rotation.x += 0.002
      mesh.rotation.y += 0.003

      // Mouse interaction
      mesh.rotation.x += (mousePos.y * 0.5 - mesh.rotation.x) * 0.05
      mesh.rotation.y += (mousePos.x * 0.5 - mesh.rotation.y) * 0.05

      // Pulsing scale
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1
      mesh.scale.set(scale, scale, scale)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = window.innerWidth
      const height = window.innerHeight * 0.7

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [mousePos])

  return (
    <div ref={containerRef} className="relative w-full h-[70vh] bg-gradient-to-b from-midnight-light to-midnight">
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-6xl md:text-7xl font-clash font-bold tracking-wide mb-4">FreightFlow</h1>
          <p className="text-xl text-slate-300">Premium Truck Dispatch Platform</p>
        </motion.div>
      </div>
    </div>
  )
}
