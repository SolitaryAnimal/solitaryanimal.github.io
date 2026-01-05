<script setup lang="ts">
import { vElementSize } from '@vueuse/components'
import { useElementSize } from '@vueuse/core'
import * as THREE from 'three'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const props = withDefaults(defineProps<{ shader: string }>(), {})

const rootRef = useTemplateRef('root')
const canvasRef = useTemplateRef('canvasRef')
const canvasSize = useElementSize(rootRef)

let renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  mesh: THREE.Mesh,
  geometry: THREE.BufferGeometry,
  material: THREE.ShaderMaterial,
  animationId: number

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

function initThree() {
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value!,
    alpha: true,
    antialias: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(canvasSize.width.value, canvasSize.height.value)

  scene = new THREE.Scene()
  camera = new THREE.Camera()

  geometry = new THREE.PlaneGeometry(2, 2)
  material = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(
          canvasSize.width.value,
          canvasSize.height.value,
        ),
      },
    },
    vertexShader,
    fragmentShader: props.shader,
    transparent: true,
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const animate = (time: number) => {
    material!.uniforms!.u_time!.value = time * 0.001
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate(0)
}

onMounted(() => {
  initThree()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
  geometry.dispose()
})

function onResize({ width, height}: { width: number, height: number }) {
  renderer.setSize(width, height)
}
</script>

<template>
  <div ref="root" v-element-size="onResize" class="component-root-single-shader-canvas" style="overflow: hidden;">
    <canvas ref="canvasRef" style="position: absolute;" />
  </div>
</template>
