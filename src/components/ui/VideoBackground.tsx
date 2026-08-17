"use client";

import React, { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  src?: string;
  poster?: string;
  overlayGradient?: string;
  className?: string;
}

export function VideoBackground({
  src,
  poster,
  overlayGradient = "var(--gradient-brand-2)",
  className = "",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Pause video when offscreen to save GPU memory and CPU cycles
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 h-full w-full bg-neutral-950"
          style={{
            backgroundImage: poster ? `url(${poster})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Ambient Gradient Legibility Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: overlayGradient }}
      />
    </div>
  );
}
