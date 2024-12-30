"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { pOptions } from "@/config/particle-options";

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container: Container | undefined) => {
    console.log(container);
  };

  return (
    init && (
      <Particles
        id="tsparticles"
        options={pOptions}
        particlesLoaded={particlesLoaded}
      />
    )
  );
};

export default ParticlesComponent;
