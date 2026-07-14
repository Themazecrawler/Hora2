/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { CyclePhase, PhaseInfo } from '../types';

interface SeasonalHeaderProps {
  phase: PhaseInfo;
}

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADERS: Record<CyclePhase, string> = {
  spring: `
    precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }

    void main() {
        vec2 uv = v_texCoord;
        
        // Base colors for Spring (Watercolor hills)
        vec3 skyColor = vec3(0.86, 0.96, 0.86); // Soft morning light
        vec3 hillColor1 = vec3(0.298, 0.686, 0.314); // #4CAF50
        vec3 hillColor2 = vec3(0.867, 0.961, 0.867); // #DDF5DD
        
        // Animated rolling hills
        float hill1 = noise(vec2(uv.x * 2.0 + u_time * 0.1, 0.0)) * 0.3 + 0.4;
        float hill2 = noise(vec2(uv.x * 1.5 - u_time * 0.05, 10.0)) * 0.2 + 0.5;
        
        vec3 color = skyColor;
        
        if (uv.y < hill2) {
            color = mix(hillColor2, hillColor1, uv.y / hill2);
        }
        if (uv.y < hill1) {
            color = mix(hillColor1, hillColor2 * 0.8, uv.y / hill1);
        }
        
        // Delicate "blossoms" particles
        float blossom = noise(uv * 10.0 + u_time * 0.5);
        if (blossom > 0.95) {
            color = mix(color, vec3(1.0, 0.8, 0.9), (blossom - 0.95) * 20.0);
        }

        gl_FragColor = vec4(color, 1.0);
    }
  `,
  summer: `
    precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }

    void main() {
        vec2 uv = v_texCoord;
        
        // Summer Colors
        vec3 skyColor = vec3(0.529, 0.808, 0.922); // Warm blue sky
        vec3 sunColor = vec3(1.0, 0.9, 0.4); // Gentle sunlight
        
        // Gradient sky
        vec3 color = mix(skyColor, vec3(0.7, 0.9, 1.0), uv.y);
        
        // Sun glow
        float dist = length(uv - vec2(0.8, 0.8));
        float glow = exp(-dist * 4.0);
        color += sunColor * glow * 0.5;
        
        // Floating light particles (Summer heat/pollen)
        float particles = noise(uv * 15.0 + u_time * 0.2);
        if (particles > 0.97) {
            color = mix(color, vec3(1.0, 1.0, 0.8), (particles - 0.97) * 30.0);
        }
        
        // Heat shimmer
        float shimmer = sin(uv.y * 20.0 + u_time * 2.0) * 0.002;
        color += vec3(shimmer);

        gl_FragColor = vec4(color, 1.0);
    }
  `,
  autumn: `
    precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }

    void main() {
        vec2 uv = v_texCoord;
        
        // Autumn Colors
        vec3 skyColor = vec3(0.96, 0.87, 0.78); // Warm evening light
        vec3 treeColor1 = vec3(0.85, 0.42, 0.23); // #D96C3A (Autumn Primary)
        vec3 treeColor2 = vec3(0.98, 0.87, 0.78); // #F9DDC8 (Autumn Secondary)
        
        // Rolling amber hills/trees
        float hills = noise(vec2(uv.x * 1.5 + u_time * 0.05, 0.0)) * 0.4 + 0.3;
        
        vec3 color = skyColor;
        if (uv.y < hills) {
            color = mix(treeColor1, treeColor2, uv.y / hills);
        }
        
        // Falling leaves particles
        vec2 leafUV = uv * vec2(10.0, 5.0) + vec2(u_time * 0.1, u_time * 0.3);
        float leaf = noise(leafUV);
        if (leaf > 0.94) {
            color = mix(color, vec3(0.6, 0.2, 0.1), (leaf - 0.94) * 15.0);
        }

        gl_FragColor = vec4(color, 1.0);
    }
  `,
  winter: `
    precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }

    void main() {
        vec2 uv = v_texCoord;
        
        // Winter Colors
        vec3 skyColor = vec3(0.93, 0.97, 1.0); // Pale blue misty sky
        vec3 snowColor = vec3(1.0, 1.0, 1.0);
        vec3 hillColor = vec3(0.43, 0.66, 0.85); // #6EA8D9 (Winter Primary)
        
        // Snow covered hills
        float hills = noise(vec2(uv.x * 1.0 + u_time * 0.02, 10.0)) * 0.3 + 0.4;
        
        vec3 color = mix(skyColor, vec3(0.8, 0.85, 0.9), uv.y);
        
        if (uv.y < hills) {
            color = mix(hillColor, snowColor, uv.y / hills);
        }
        
        // Quiet snowfall
        vec2 snowUV = uv * 20.0 + vec2(u_time * 0.05, u_time * 0.5);
        float snow = hash(floor(snowUV));
        if (snow > 0.98) {
            float flake = 1.0 - length(fract(snowUV) - 0.5) * 2.0;
            color += vec3(clamp(flake, 0.0, 1.0)) * 0.5;
        }
        
        // Mist overlay
        float mist = noise(uv * 3.0 + u_time * 0.1) * 0.2;
        color = mix(color, vec3(0.9, 0.95, 1.0), mist);

        gl_FragColor = vec4(color, 1.0);
    }
  `
};

export const SeasonalHeader: React.FC<SeasonalHeaderProps> = ({ phase }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL is not supported in this environment.');
      return;
    }

    // Handle resizing to look high-res
    const handleResize = () => {
      const width = canvas.parentElement?.clientWidth || canvas.clientWidth || 600;
      const height = canvas.parentElement?.clientHeight || canvas.clientHeight || 280;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Shader creation helper
    const createShader = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compiler error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Compile active shaders
    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADERS[phase.id]);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('WebGL linker error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering full screen clip coordinates)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    // Rendering loop
    const startTime = performance.now();
    const render = () => {
      const elapsedMs = performance.now() - startTime;
      gl.useProgram(program);
      
      if (timeLoc) {
        gl.uniform1f(timeLoc, elapsedMs * 0.001);
      }
      if (resolutionLoc) {
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Cleanup WebGL program and elements
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [phase.id]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
        style={{ filter: 'brightness(1.02) contrast(0.98)' }}
      />
    </div>
  );
};
