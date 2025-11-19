"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import WhiteButton from "../ui/whitebutton";

export default function CircleFollowCard() {
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
        className="global-banner relative m-auto w-[90%] overflow-hidden rounded-xl bg-blue-normal px-10 py-11 md:w-[70%] md:px-20"
      >
        <img
          src="/globe.png"
          className="absolute bottom-0 right-0 z-20 w-[40%]"
        />
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
        <div className="banner-cta relative z-10 flex flex-col items-start gap-5 text-white lg:w-[50%]">
          <div>
            <p className="h3">Be Part of the</p>
            <p className="h1">Global Nepali Network</p>
          </div>
          <p>
            Join NRNA to connect with Nepalis worldwide, shape policies, and
            represent your region globally.
          </p>
          <WhiteButton className="button-regular text-blue-normal">
            Explore Membership Benefits
          </WhiteButton>
        </div>
        <div className="banner-image"></div>
      </div>
    </div>
  );
}
