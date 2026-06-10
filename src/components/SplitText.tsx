"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  text: string;
  className?: string;
  type?: "chars" | "words";
  animation?: "bounce" | "slide-up" | "fade" | "pop";
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnce?: boolean;
}

export default function SplitText({
  text,
  className = "",
  type = "chars",
  animation = "slide-up",
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
  triggerOnce = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".split-item");
    if (items.length === 0) return;

    // Set initial styles based on animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%", // Starts animating when 85% from top of viewport
        toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
      },
      delay: delay,
    });

    if (animation === "slide-up") {
      gsap.set(items, { y: "110%", opacity: 0 });
      tl.to(items, {
        y: "0%",
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: "power3.out",
      });
    } else if (animation === "bounce") {
      gsap.set(items, { y: "50px", opacity: 0, scaleY: 0.5 });
      tl.to(items, {
        y: "0px",
        opacity: 1,
        scaleY: 1,
        duration: duration,
        stagger: stagger,
        ease: "back.out(2)",
      });
    } else if (animation === "pop") {
      gsap.set(items, { scale: 0, opacity: 0 });
      tl.to(items, {
        scale: 1,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: "back.out(2.5)",
      });
    } else if (animation === "fade") {
      gsap.set(items, { opacity: 0 });
      tl.to(items, {
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: "power2.out",
      });
    }

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [animation, delay, duration, stagger, triggerOnce]);

  if (type === "words") {
    const words = text.split(" ");
    return (
      <span ref={containerRef} className={`inline-block overflow-hidden px-3 -mx-3 py-3 -my-3 ${className}`}>
        {words.map((word, idx) => (
          <span
            key={idx}
            className="split-item inline-block mr-[0.25em] origin-bottom select-none"
          >
            {word}
          </span>
        ))}
      </span>
    );
  }

  // Split into characters (handling spaces correctly)
  const chars = text.split("");
  return (
    <span ref={containerRef} className={`inline-block overflow-hidden px-3 -mx-3 py-3 -my-3 ${className}`}>
      {chars.map((char, idx) => (
        <span
          key={idx}
          className={`split-item inline-block origin-bottom select-none ${
            char === " " ? "w-[0.25em]" : ""
          }`}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
