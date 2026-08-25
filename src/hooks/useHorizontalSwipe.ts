"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

interface UseHorizontalSwipeOptions {
  onNext: () => void;
  onPrev: () => void;
  onInteraction?: () => void;
  dragDistanceThreshold?: number; // default: 35px
  velocityThreshold?: number; // default: 0.25 px/ms
  trackpadThreshold?: number; // default: 40px
}

export function useHorizontalSwipe({
  onNext,
  onPrev,
  onInteraction,
  dragDistanceThreshold = 35,
  velocityThreshold = 0.22,
  trackpadThreshold = 40,
}: UseHorizontalSwipeOptions) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const currentXRef = useRef(0);
  const isHorizontalGestureRef = useRef<boolean | null>(null);
  const dragLockRef = useRef(false);

  // Trackpad refs
  const trackpadAccumulatorRef = useRef(0);
  const trackpadLockRef = useRef(false);
  const trackpadDecayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Inform parent of interaction (to pause autoplay)
  const notifyInteraction = useCallback(() => {
    if (onInteraction) onInteraction();
  }, [onInteraction]);

  // =========================================================================
  // 1. POINTER / TOUCH / MOUSE DRAG HANDLERS
  // =========================================================================
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only primary mouse button or touch
      if (e.button !== 0 && e.pointerType === "mouse") return;

      isPointerDownRef.current = true;
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
      currentXRef.current = e.clientX;
      startTimeRef.current = Date.now();
      isHorizontalGestureRef.current = null;
      setIsDragging(false);
      setDragOffset(0);

      notifyInteraction();
    },
    [notifyInteraction]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - startYRef.current;

    // Detect gesture direction on initial movement (> 6px)
    if (isHorizontalGestureRef.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          isHorizontalGestureRef.current = true;
          setIsDragging(true);
          // Capture pointer for consistent tracking outside container
          try {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          } catch {
            // Ignore if pointer capture unsupported
          }
        } else {
          isHorizontalGestureRef.current = false;
          isPointerDownRef.current = false;
          return;
        }
      }
    }

    if (isHorizontalGestureRef.current === true) {
      currentXRef.current = e.clientX;
      // Provide light resistance visual feedback (max 70px)
      const dampenedOffset = Math.sign(deltaX) * Math.min(Math.abs(deltaX) * 0.45, 70);
      setDragOffset(dampenedOffset);
    }
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isPointerDownRef.current && isHorizontalGestureRef.current === null) {
        setDragOffset(0);
        setIsDragging(false);
        return;
      }

      const deltaX = e.clientX - startXRef.current;
      const deltaTime = Math.max(Date.now() - startTimeRef.current, 1);
      const velocity = Math.abs(deltaX) / deltaTime; // px per ms

      const isHorizontal = isHorizontalGestureRef.current === true;

      // Release pointer capture
      try {
        if ((e.target as HTMLElement).hasPointerCapture(e.pointerId)) {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }

      isPointerDownRef.current = false;
      isHorizontalGestureRef.current = null;
      setDragOffset(0);

      // Prevent triggering if already locked
      if (dragLockRef.current) {
        setTimeout(() => setIsDragging(false), 50);
        return;
      }

      if (isHorizontal) {
        const thresholdCrossed = Math.abs(deltaX) >= dragDistanceThreshold;
        const velocityCrossed = velocity >= velocityThreshold && Math.abs(deltaX) >= 15;

        if (thresholdCrossed || velocityCrossed) {
          dragLockRef.current = true;
          setTimeout(() => {
            dragLockRef.current = false;
          }, 450);

          if (deltaX < 0) {
            // Dragged LEFT -> Next item
            onNext();
          } else {
            // Dragged RIGHT -> Previous item
            onPrev();
          }
          notifyInteraction();
        }
      }

      setTimeout(() => setIsDragging(false), 50);
    },
    [dragDistanceThreshold, velocityThreshold, onNext, onPrev, notifyInteraction]
  );

  const handlePointerCancel = useCallback(() => {
    isPointerDownRef.current = false;
    isHorizontalGestureRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  }, []);

  // Suppress child click events if a real drag occurred
  const handleClickCapture = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isDragging]
  );

  // =========================================================================
  // 2. TWO-FINGER TRACKPAD HORIZONTAL SWIPE (WHEEL)
  // =========================================================================
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Only handle if clearly horizontal gesture
      if (absX > absY && absX > 4) {
        e.preventDefault();
        e.stopPropagation();

        if (trackpadLockRef.current) return;

        notifyInteraction();
        trackpadAccumulatorRef.current += e.deltaX;

        if (trackpadDecayTimeoutRef.current) clearTimeout(trackpadDecayTimeoutRef.current);
        trackpadDecayTimeoutRef.current = setTimeout(() => {
          trackpadAccumulatorRef.current = 0;
        }, 180);

        if (trackpadAccumulatorRef.current >= trackpadThreshold) {
          // Swipe LEFT -> NEXT
          trackpadAccumulatorRef.current = 0;
          trackpadLockRef.current = true;
          onNext();
          setTimeout(() => {
            trackpadLockRef.current = false;
          }, 550);
        } else if (trackpadAccumulatorRef.current <= -trackpadThreshold) {
          // Swipe RIGHT -> PREVIOUS
          trackpadAccumulatorRef.current = 0;
          trackpadLockRef.current = true;
          onPrev();
          setTimeout(() => {
            trackpadLockRef.current = false;
          }, 550);
        }
      }
      // If absY > absX, vertical gestures bubble untouched!
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [onNext, onPrev, trackpadThreshold, notifyInteraction]);

  // =========================================================================
  // 3. KEYBOARD NAVIGATION
  // =========================================================================
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onNext();
        notifyInteraction();
      } else if (e.key === "ArrowLeft") {
        onPrev();
        notifyInteraction();
      }
    },
    [onNext, onPrev, notifyInteraction]
  );

  return {
    containerRef,
    dragOffset,
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onClickCapture: handleClickCapture,
      onKeyDown: handleKeyDown,
    },
  };
}
