"use client";

import dynamic from "next/dynamic";

const MotionScene = dynamic(() => import("./motion-scene"), {
  ssr: false,
  loading: () => <div className="motion-scene motion-scene-loading" aria-hidden="true" />,
});

export default function HeroScene() {
  return <MotionScene />;
}
