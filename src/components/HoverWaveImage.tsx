"use client";

import NextImage, { type ImageProps } from "next/image";
import { type PointerEvent, useEffect, useMemo, useRef, useState } from "react";

interface HoverWaveImageProps {
  src: ImageProps["src"];
  alt: string;
  sizes: string;
  priority?: boolean;
  imageClassName?: string;
  intensity?: number;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform vec2 u_mouse;
  uniform vec2 u_velocity;
  uniform float u_hover;
  uniform float u_time;
  uniform float u_intensity;

  varying vec2 v_uv;

  vec2 containUv(vec2 uv, out float mask) {
    float canvasAspect = u_resolution.x / max(u_resolution.y, 1.0);
    float imageAspect = u_imageResolution.x / max(u_imageResolution.y, 1.0);
    vec2 contained = uv;
    mask = 1.0;

    if (canvasAspect > imageAspect) {
      float drawWidth = imageAspect / canvasAspect;
      contained.x = (uv.x - (1.0 - drawWidth) * 0.5) / drawWidth;
    } else {
      float drawHeight = canvasAspect / imageAspect;
      contained.y = (uv.y - (1.0 - drawHeight) * 0.5) / drawHeight;
    }

    mask *= step(0.0, contained.x) * step(contained.x, 1.0);
    mask *= step(0.0, contained.y) * step(contained.y, 1.0);
    return contained;
  }

  void main() {
    float baseMask;
    vec2 textureUv = containUv(v_uv, baseMask);
    if (baseMask < 0.5) {
      discard;
    }

    vec2 delta = v_uv - u_mouse;
    delta.x *= u_resolution.x / max(u_resolution.y, 1.0);
    float dist = length(delta);
    float radius = 0.48;
    float falloff = smoothstep(radius, 0.0, dist) * u_hover;

    vec2 uvDirection = normalize(v_uv - u_mouse + vec2(0.0001));
    vec2 tangent = vec2(-uvDirection.y, uvDirection.x);
    float ripple = sin(dist * 42.0 - u_time * 5.6);
    float secondaryRipple = cos(dist * 26.0 + u_time * 3.2);

    vec2 displacement =
      uvDirection * ripple * 0.72 +
      tangent * secondaryRipple * 0.22 +
      u_velocity * 0.62;

    textureUv -= displacement * falloff * u_intensity;

    float displacedMask = 1.0;
    displacedMask *= step(0.0, textureUv.x) * step(textureUv.x, 1.0);
    displacedMask *= step(0.0, textureUv.y) * step(textureUv.y, 1.0);

    vec4 color = texture2D(u_texture, textureUv);
    float liquidHighlight = falloff * (0.055 + 0.035 * secondaryRipple);
    color.rgb += vec3(liquidHighlight);
    color.a *= displacedMask;

    gl_FragColor = color;
  }
`;

function resolveImageSrc(src: ImageProps["src"]) {
  if (typeof src === "string") return src;
  if ("src" in src) return src.src;
  return src.default.src;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createShaderProgram(gl: WebGLRenderingContext) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function HoverWaveImage({
  src,
  alt,
  sizes,
  priority = false,
  imageClassName = "object-contain",
  intensity = 22,
}: HoverWaveImageProps) {
  const imageSrc = useMemo(() => resolveImageSrc(src), [src]);
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRenderRef = useRef<() => void>(() => {});
  const pointerRef = useRef({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    hover: 0,
    targetHover: 0,
    velocityX: 0,
    velocityY: 0,
    targetVelocityX: 0,
    targetVelocityY: 0,
  });
  const [canvasReady, setCanvasReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
      }) || canvas.getContext("experimental-webgl");

    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      setWebglFailed(true);
      return;
    }

    const program = createShaderProgram(gl);
    if (!program) {
      setWebglFailed(true);
      return;
    }

    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    if (!buffer || !texture) {
      setWebglFailed(true);
      return;
    }

    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const uniforms = {
      texture: gl.getUniformLocation(program, "u_texture"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      imageResolution: gl.getUniformLocation(program, "u_imageResolution"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      velocity: gl.getUniformLocation(program, "u_velocity"),
      hover: gl.getUniformLocation(program, "u_hover"),
      time: gl.getUniformLocation(program, "u_time"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
    };

    let disposed = false;
    let frame = 0;
    let running = false;
    let imageWidth = 1;
    let imageHeight = 1;
    let textureReady = false;
    const shaderIntensity = Math.max(0.006, Math.min(0.065, intensity * 0.00125));

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      return { width, height };
    };

    const drawFrame = (time: number) => {
      const { width, height } = resizeCanvas();
      const pointer = pointerRef.current;

      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;
      pointer.hover += (pointer.targetHover - pointer.hover) * 0.09;
      pointer.velocityX += (pointer.targetVelocityX - pointer.velocityX) * 0.12;
      pointer.velocityY += (pointer.targetVelocityY - pointer.velocityY) * 0.12;
      pointer.targetVelocityX *= 0.9;
      pointer.targetVelocityY *= 0.9;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.texture, 0);
      gl.uniform2f(uniforms.resolution, width, height);
      gl.uniform2f(uniforms.imageResolution, imageWidth, imageHeight);
      gl.uniform2f(uniforms.mouse, pointer.x, pointer.y);
      gl.uniform2f(uniforms.velocity, pointer.velocityX, pointer.velocityY);
      gl.uniform1f(uniforms.hover, pointer.hover);
      gl.uniform1f(uniforms.time, time * 0.001);
      gl.uniform1f(uniforms.intensity, shaderIntensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      return (
        pointer.hover > 0.01 ||
        pointer.targetHover > 0.01 ||
        Math.abs(pointer.velocityX) > 0.0005 ||
        Math.abs(pointer.velocityY) > 0.0005
      );
    };

    const renderLoop = (time: number) => {
      if (disposed || !textureReady) return;

      const shouldContinue = drawFrame(time);
      if (shouldContinue) {
        frame = window.requestAnimationFrame(renderLoop);
        return;
      }

      running = false;
      frame = 0;
    };

    const startRenderLoop = () => {
      if (disposed || !textureReady || running) return;

      running = true;
      frame = window.requestAnimationFrame(renderLoop);
    };

    startRenderRef.current = startRenderLoop;

    const image = new window.Image();
    image.decoding = "async";
    if (/^https?:\/\//.test(imageSrc)) {
      image.crossOrigin = "anonymous";
    }

    image.onload = () => {
      if (disposed) return;

      imageWidth = image.naturalWidth || 1;
      imageHeight = image.naturalHeight || 1;

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      textureReady = true;
      setCanvasReady(true);
      drawFrame(performance.now());
    };

    image.onerror = () => {
      if (!disposed) setWebglFailed(true);
    };

    image.src = imageSrc;

    return () => {
      disposed = true;
      startRenderRef.current = () => {};
      window.cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    };
  }, [imageSrc, intensity]);

  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const shell = shellRef.current;
    if (!shell) return;

    const rect = shell.getBoundingClientRect();
    const nextX = (event.clientX - rect.left) / rect.width;
    const nextY = 1 - (event.clientY - rect.top) / rect.height;
    const pointer = pointerRef.current;

    pointer.targetVelocityX = (nextX - pointer.targetX) * 2.4;
    pointer.targetVelocityY = (nextY - pointer.targetY) * 2.4;
    pointer.targetX = Math.min(1, Math.max(0, nextX));
    pointer.targetY = Math.min(1, Math.max(0, nextY));
    pointer.targetHover = 1;
    startRenderRef.current();
  };

  const calmPointer = () => {
    pointerRef.current.targetHover = 0;
    pointerRef.current.targetVelocityX = 0;
    pointerRef.current.targetVelocityY = 0;
    startRenderRef.current();
  };

  return (
    <div
      ref={shellRef}
      className="hover-wave-image absolute inset-0"
      onPointerEnter={updatePointer}
      onPointerMove={updatePointer}
      onPointerLeave={calmPointer}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        draggable={false}
        className={`${imageClassName} transition-opacity duration-300 ${
          canvasReady && !webglFailed ? "opacity-0" : "opacity-100"
        }`}
        sizes={sizes}
        priority={priority}
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`hover-displace-image__canvas absolute inset-0 h-full w-full ${imageClassName} ${
          canvasReady && !webglFailed ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
