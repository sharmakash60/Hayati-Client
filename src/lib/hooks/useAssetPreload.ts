"use client";

import { useState, useEffect } from "react";

interface AssetPreloadOptions {
  criticalImages?: string[];
  minHoldTimeMs?: number;
  maxWaitFallbackMs?: number;
  sessionStorageKey?: string;
}

export function useAssetPreload(options: AssetPreloadOptions = {}) {
  const {
    criticalImages = ["/logo.webp"],
    minHoldTimeMs = 800,
    maxWaitFallbackMs = 4000,
    sessionStorageKey = "hayati_preloader_seen",
  } = options;

  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldSkip, setShouldSkip] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader in this browser session
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        if (sessionStorage.getItem(sessionStorageKey) === "true") {
          setShouldSkip(true);
          setProgress(100);
          setIsComplete(true);
          return;
        }
      }
    } catch {
      // sessionStorage might be restricted (incognito/security), continue normally
    }

    let isCancelled = false;
    const startTime = Date.now();

    // Track list of asset promises
    const assetPromises: Promise<void>[] = [];

    // 1. Font readiness promise
    if (typeof document !== "undefined" && document.fonts) {
      assetPromises.push(
        document.fonts.ready
          .then(() => {})
          .catch(() => {}) // fail-open
      );
    }

    // 2. Critical image preload promises
    criticalImages.forEach((src) => {
      if (typeof window !== "undefined") {
        const imgPromise = new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // fail-open on image 404
          img.src = src;
        });
        assetPromises.push(imgPromise);
      }
    });

    const totalAssets = Math.max(1, assetPromises.length);
    let loadedCount = 0;

    // Track partial progress as each promise settles
    assetPromises.forEach((promise) => {
      promise.finally(() => {
        if (isCancelled) return;
        loadedCount += 1;
        const currentTarget = Math.round((loadedCount / totalAssets) * 85);
        setProgress((prev) => Math.max(prev, currentTarget));
      });
    });

    const completeSequence = () => {
      if (isCancelled) return;
      setProgress(100);

      const elapsed = Date.now() - startTime;
      const remainingHold = Math.max(0, minHoldTimeMs - elapsed);

      setTimeout(() => {
        if (isCancelled) return;
        setIsComplete(true);
        try {
          if (typeof window !== "undefined" && window.sessionStorage) {
            sessionStorage.setItem(sessionStorageKey, "true");
          }
        } catch {
          // Ignore storage errors
        }
      }, remainingHold);
    };

    // Promise.all over all critical assets
    Promise.all(assetPromises)
      .then(() => {
        completeSequence();
      })
      .catch(() => {
        // Fail-open guarantee
        completeSequence();
      });

    // Hard fallback timeout to guarantee TTI under bad networks
    const fallbackTimer = setTimeout(() => {
      completeSequence();
    }, maxWaitFallbackMs);

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, [criticalImages, minHoldTimeMs, maxWaitFallbackMs, sessionStorageKey]);

  return { progress, isComplete, shouldSkip };
}
