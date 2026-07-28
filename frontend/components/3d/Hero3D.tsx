'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Environment } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';

function House3D() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        {/* Main building body */}
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[2.5, 1.5, 4]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, -0.5, 1.51]}>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color="#1A202C" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-0.8, 0.2, 1.51]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#63B3ED" />
      </mesh>
      <mesh position={[0.8, 0.2, 1.51]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#63B3ED" />
      </mesh>
    </Float>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-900"></div>
    </div>
  );
}

export function Hero3D() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 6]} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <House3D />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
