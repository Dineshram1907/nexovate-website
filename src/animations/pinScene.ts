import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PinnedSceneOptions {
  triggerId: string;
  pinDuration?: string | number;
  onUpdate?: (progress: number) => void;
  anticipatePin?: number;
}

export function usePinnedScene({
  triggerId,
  pinDuration = "+=100%",
  onUpdate,
  anticipatePin = 1,
}: PinnedSceneOptions) {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const element = document.getElementById(triggerId);
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: pinDuration,
      pin: true,
      anticipatePin,
      scrub: 1,
      onUpdate: (self) => {
        onUpdate?.(self.progress);
      },
    });

    triggerRef.current = trigger;

    return () => {
      trigger.kill();
    };
  }, [triggerId, pinDuration, onUpdate, anticipatePin]);

  return triggerRef;
}
