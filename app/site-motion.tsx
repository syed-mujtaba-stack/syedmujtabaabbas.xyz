"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SiteMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-copy > *",
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.18,
        },
      );
      gsap.fromTo(
        ".hero-art",
        { autoAlpha: 0, scale: 0.96, y: 16 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.25,
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
      gsap.fromTo(
        ".process-connector",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 72%",
            once: true,
          },
        },
      );
    }, document.querySelector("main") ?? undefined);

    return () => context.revert();
  }, []);

  return null;
}
