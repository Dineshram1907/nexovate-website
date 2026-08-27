"use client";

import React, { useRef, useState, useCallback } from "react";

interface UseHorizontalSwipeOptions {
  onNext: () => void;
  onPrev: () => void;
  onInteraction?: () => void;
  dragDistanceThreshold?: number;
}

export function useHorizontalSwipe({
  onNext,
  onPrev,
  onInteraction,
  dragDistanceThreshold = 35,
}: UseHorizontalSwipeOptions) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizontalGestureRef = useRef<boolean | null>(null);

  const notifyInteraction = useCallback(() => {
    if (onInteraction) onInteraction();
  }, [onInteraction]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      isPointerDownRef.current = true;
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
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

    if (isHorizontalGestureRef.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          isHorizontalGestureRef.current = true;
          setIsDragging(true);
        } else {
          isHorizontalGestureRef.current = false;
          isPointerDownRef.current = false;
          return;
        }
      }
    }

    if (isHorizontalGestureRef.current === true) {
      const dampenedOffset = Math.sign(deltaX) * Math.min(Math.abs(deltaX) * 0.45, 60);
      setDragOffset(dampenedOffset);
    }
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isPointerDownRef.current) {
        setDragOffset(0);
        setIsDragging(false);
        return;
      }

      const deltaX = e.clientX - startXRef.current;
      const isHorizontal = isHorizontalGestureRef.current === true;

      isPointerDownRef.current = false;
      isHorizontalGestureRef.current = null;
      setDragOffset(0);

      if (isHorizontal && Math.abs(deltaX) >= dragDistanceThreshold) {
        if (deltaX < 0) {
          onNext();
        } else {
          onPrev();
        }
        notifyInteraction();
      }

      setTimeout(() => setIsDragging(false), 50);
    },
    [dragDistanceThreshold, onNext, onPrev, notifyInteraction]
  );

  const handlePointerCancel = useCallback(() => {
    isPointerDownRef.current = false;
    isHorizontalGestureRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  }, []);

  return {
    containerRef,
    dragOffset,
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
  };
}
