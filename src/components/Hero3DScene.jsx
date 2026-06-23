import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Helper to convert number to binary digits array
function toBinaryDigits(num, bits) {
  return num.toString(2).padStart(bits, '0').split('');
}

function Column3D({ x, yPositions, bits, value, label }) {
  const digits = toBinaryDigits(value, bits);

  return (
    <group position={[x, 0, 0]}>
      {/* Label at the bottom */}
      <Text
        position={[0, -2.6, 0.1]}
        fontSize={0.3}
        color="#7a8479" // var(--text-dim)
        anchorX="center"
        anchorY="middle"
        font="https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.20/files/jetbrains-mono-latin-400-normal.woff2" // Fallback JetBrains Mono font
      >
        {label}
      </Text>

      {/* Grid line indicator down the column */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[0.02, 4.4]} />
        <meshBasicMaterial color="#1f2622" transparent opacity={0.5} />
      </mesh>

      {yPositions.map((y, i) => {
        const isOn = digits[i] === '1';
        return (
          <group key={i} position={[0, y, 0]}>
            {/* Outer ring / socket */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.26, 0.3, 32]} />
              <meshBasicMaterial color="#232b27" side={THREE.DoubleSide} />
            </mesh>

            {/* Glowing sphere */}
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color={isOn ? '#00ff66' : '#0e1411'}
                emissive={isOn ? '#00ff66' : '#000000'}
                emissiveIntensity={isOn ? 3.0 : 0}
                roughness={isOn ? 0.1 : 0.8}
                metalness={isOn ? 0.1 : 0.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function SceneContent({ scrollRef }) {
  const [time, setTime] = useState(new Date());
  const lightRef = useRef();

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  const hY = [1.6, 0.8, 0.0, -0.8, -1.6];
  const mY = [2.0, 1.2, 0.4, -0.4, -1.2, -2.0];
  const sY = [2.0, 1.2, 0.4, -0.4, -1.2, -2.0];

  // Smoothly update camera position based on scroll ref in the render loop
  useFrame((state) => {
    const maxScroll = 800;
    const scrollOffset = Math.min(scrollRef.current / maxScroll, 1.0);

    // Subtle pull back, raise Y slightly, and tilt camera
    const targetX = -scrollOffset * 1.5;
    const targetY = 0.3 + scrollOffset * 1.2;
    const targetZ = 6.2 + scrollOffset * 3.8;

    const targetRotX = -0.05 + scrollOffset * 0.12;
    const targetRotY = -scrollOffset * 0.25;
    const targetRotZ = scrollOffset * 0.06;

    // Smooth interpolation (lerp)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.08);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);

    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotX, 0.08);
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, targetRotY, 0.08);
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, targetRotZ, 0.08);

    // Dynamic light breathing effect
    if (lightRef.current) {
      lightRef.current.intensity = 3.0 + Math.sin(state.clock.elapsedTime * 2.5) * 0.6;
    }
  });

  return (
    <>
      <ambientLight intensity={0.12} color="#d4d8d2" />
      
      {/* Central volumetric light representing clock illumination */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 1.2]}
        intensity={3.5}
        distance={12}
        color="#00ff66"
        decay={2.0}
      />

      <group position={[0, 0.2, 0]}>
        {/* Backplate / Instrument housing */}
        <mesh position={[0, 0, -0.22]}>
          <boxGeometry args={[5.2, 5.0, 0.08]} />
          <meshStandardMaterial color="#0b0e0c" roughness={0.95} metalness={0.1} />
        </mesh>

        {/* Cyber wireframe overlay on the panel */}
        <mesh position={[0, 0, -0.21]}>
          <boxGeometry args={[5.22, 5.02, 0.09]} />
          <meshStandardMaterial color="#1f2622" wireframe />
        </mesh>

        {/* 3D Columns */}
        <Column3D x={-1.6} yPositions={hY} bits={5} value={h} label="HH" />
        <Column3D x={0.0} yPositions={mY} bits={6} value={m} label="MM" />
        <Column3D x={1.6} yPositions={sY} bits={6} value={s} label="SS" />
      </group>

      {/* Grid Floor */}
      <gridHelper 
        args={[40, 40, '#232b27', '#1c221e']} 
        position={[0, -2.8, 0]} 
        rotation={[0, 0, 0]}
      />
    </>
  );
}

export default function Hero3DScene() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.3, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new THREE.Color('#0a0e0c'));
          scene.fog = new THREE.FogExp2('#0a0e0c', 0.07);
        }}
      >
        <SceneContent scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
