import React, { useEffect, useRef, useState } from "react";
import createREGL from "regl";

export default function WebGLDotRipple() {
  const canvasRef = useRef(null);

  // Forces re-render of WebGL when resizing screen
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log("WebGLDotRipple mounted");

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth * dpr;
    const height = window.innerHeight * dpr;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";

    const regl = createREGL({ canvas });

    // ------------------------------------------------------
    // ✅ Responsive spacing for different screen sizes
    // ------------------------------------------------------
    let spacing;
    if (window.innerWidth < 480) spacing = 55;        // Mobile
    else if (window.innerWidth < 768) spacing = 45;   // Tablet
    else spacing = 30;                                // Desktop

    // Calculate number of points
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    // Generate all grid points
    const points = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = (x * spacing) / width * 2 - 1;
        const posY = (y * spacing) / height * -2 + 1;
        points.push([posX, posY]);
      }
    }

    let mouse = [1000, 1000];

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse = [x, y];
    };

    const handleResize = () => {
      const newWidth = window.innerWidth * dpr;
      const newHeight = window.innerHeight * dpr;
      canvas.width = newWidth;
      canvas.height = newHeight;

      // ------------------------------------------------------
      // ✅ Rebuild entire WebGL grid on resize
      // ------------------------------------------------------
      setVersion(v => v + 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const draw = regl({
      vert: `
        precision highp float;
        attribute vec2 position;
        varying float vBrightness;

        uniform float time;
        uniform vec2 mouse;
        uniform vec2 resolution;

        void main() {
          vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
          vec2 posAspect = position * aspect;
          vec2 mouseAspect = mouse * aspect;

          float dist = distance(posAspect, mouseAspect);
          float maxRadius = 0.30;
          float edgeSoftness = 0.15;

          float rippleWave = sin(dist * 20.0 - time * 4.0) * 0.015;

          float mask = 1.0 - smoothstep(maxRadius - edgeSoftness, maxRadius, dist);

          float baseBrightness = 0.20;
          float rippleBrightness = 0.9;
          vBrightness = baseBrightness + (rippleBrightness * mask);

          float ripple = rippleWave * mask;

          vec2 finalPosition = vec2(position.x, position.y + ripple);
          gl_Position = vec4(finalPosition, 0.0, 1.0);
          gl_PointSize = 2.0 + (3.0 * mask);
        }
      `,
      frag: `
        precision highp float;
        varying float vBrightness;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if(length(coord) > 0.5) discard;

          gl_FragColor = vec4(0.4, 0.4, 0.4, vBrightness * 0.3);
        }
      `,
      attributes: {
        position: points,
      },
      uniforms: {
        time: ({ tick }) => tick * 0.02,
        mouse: () => mouse,
        resolution: () => [canvas.width, canvas.height],
      },
      count: points.length,
      primitive: "points",
    });

    regl.frame(() => {
      regl.clear({ color: [0, 0, 0, 1] });
      draw();
    });

    return () => {
      console.log("WebGLDotRipple cleanup");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      regl.destroy();
    };
  }, [version]); // Re-run effect when version changes

  return (
    <canvas
      key={`webgl-${version}`}
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: "black",
        display: "block",
      }}
    />
  );
}
