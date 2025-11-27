"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type ParallaxProps = {
  alignment: "left" | "right";
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
};

export default function ParallaxDiv(props: ParallaxProps) {
  const ref = useRef(null);

  // Track scroll position relative to this container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Parallax transforms
  const leftY = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const rightY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);

  return (
    <motion.div
      style={{ y: rightY }}
      ref={ref}
      className="everything-container mt-20 flex h-auto w-full flex-col rounded-2xl bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] md:h-[520px] md:flex-row"
    >
      {/* LEFT BLOCK -> slower parallax */}
      {props.alignment == "left" && (
        <motion.div
          style={{ y: leftY }}
          className="empty-test-block relative basis-1/2"
        >
          <div className="red-block -left-10 -top-6 h-[300px] w-full -translate-x-6 -translate-y-4 overflow-hidden rounded-2xl bg-blue-normal md:h-[550px] md:w-[450px] md:-translate-x-10 md:-translate-y-6">
            <Image
              src={props.image_url}
              alt="vision-image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </motion.div>
      )}
      {/* RIGHT BLOCK -> foreground, faster */}
      <motion.div
        className={`text-block flex basis-1/2 flex-col gap-3 py-11 ${props.alignment == "left" ? "pr-20" : props.alignment == "right" ? "pl-20" : "pr-20"} `}
      >
        <p className="p1-regular">{props.title}</p>
        <p className="h3 text-blue-normal">{props.subtitle} </p>
        <p className="p1-regular text-gray">{props.description}</p>
      </motion.div>

      {props.alignment == "right" && (
        <motion.div
          style={{ y: leftY }}
          className="empty-test-block relative basis-1/2"
        >
          <div className="red-block -right-10 -top-6 h-[300px] w-full -translate-y-4 translate-x-6 overflow-hidden rounded-2xl bg-blue-normal md:h-[550px] md:w-[450px] md:-translate-y-6 md:translate-x-10">
            <Image
              src={props.image_url}
              alt="vision-image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
