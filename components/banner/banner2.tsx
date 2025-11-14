"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export default function BannerTwo() {
  const cardRef = useRef<HTMLDivElement>(null);

  // track cursor position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // smooth motion using spring
  const smoothX = useSpring(x, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 20 });

  const smoothX2 = useSpring(x, { stiffness: 100, damping: 20 });
  const smoothY2 = useSpring(y, { stiffness: 100, damping: 20 });

  const smoothX3 = useSpring(x, { stiffness: 80, damping: 20 });
  const smoothY3 = useSpring(y, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    // reset to center when cursor leaves
    x.set(-0);
    y.set(-10);
  };

  return (
    <div>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="global-banner relative m-auto w-4/5 overflow-hidden rounded-md bg-[linear-gradient(180deg,#1B6AAC_0%,#4F85B3_39%,#3636B2_100%)] px-20 py-11"
      >
        {/*TOP LEFT CIRCLES */}
        <motion.div
          className="circle-1 absolute rounded-full bg-white opacity-10"
          style={{
            width: 400,
            height: 400,
            x: smoothX3,
            y: smoothY3,
            translateX: "-70%",
            translateY: "-50%",
          }}
        />
        <motion.div
          className="circle-2 absolute rounded-full bg-white opacity-10"
          style={{
            width: 300,
            height: 300,
            x: smoothX2,
            y: smoothY2,
            translateX: "-80%",
            translateY: "-50%",
          }}
        />
        <motion.div
          className="circle-3 absolute rounded-full bg-white opacity-10"
          style={{
            width: 200,
            height: 200,
            x: smoothX,
            y: smoothY,
            translateX: "-90%",
            translateY: "-50%",
          }}
        />

        <div className="banner-cta relative z-10 flex flex-col items-center gap-5 px-[20%] text-white">
          <p className="h2 text-center">
            Discover NRNA NCCs, Representing Our Members in 80+ Countries, with
            tenures from 2021–25.
          </p>
          <button className="button-regular h-11 w-72 rounded-md bg-white text-blue-normal">
            Explore Membership Benefits
          </button>
        </div>
        <div className="banner-image"></div>
      </div>
    </div>
  );
}
