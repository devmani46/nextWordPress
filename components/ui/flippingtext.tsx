"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variant } from "motion/react";

const buildVariant = ({
  opacity,
  rotation,
  offset,
  isVertical,
  rotateAxis,
}: {
  opacity: number;
  rotation: number;
  offset: string | null;
  isVertical: boolean;
  rotateAxis: string;
}): Variant => ({
  opacity,
  [rotateAxis]: rotation,
  ...(isVertical && offset !== null ? { y: offset } : {}),
  ...(!isVertical && offset !== null ? { x: offset } : {}),
});

type FlipDirection = "top" | "bottom" | "left" | "right";

type FlipTextProps = HTMLMotionProps<"span"> & {
  from?: FlipDirection;
  frontText: React.ReactNode;
  backText?: React.ReactNode; // optional, defaults to same as frontText
};

export function FlipText({
  from = "top",
  frontText,
  backText,
  style,
  ...props
}: FlipTextProps) {
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  const frontOffset = from === "top" || from === "left" ? "50%" : "-50%";
  const backOffset = from === "top" || from === "left" ? "-50%" : "50%";

  const frontVariants = {
    initial: buildVariant({
      opacity: 1,
      rotation: 0,
      offset: "0%",
      isVertical,
      rotateAxis,
    }),
    hover: buildVariant({
      opacity: 0,
      rotation: 90,
      offset: frontOffset,
      isVertical,
      rotateAxis,
    }),
  };

  const backVariants = {
    initial: buildVariant({
      opacity: 0,
      rotation: 90,
      offset: backOffset,
      isVertical,
      rotateAxis,
    }),
    hover: buildVariant({
      opacity: 1,
      rotation: 0,
      offset: "0%",
      isVertical,
      rotateAxis,
    }),
  };

  return (
    <motion.span
      initial="initial"
      whileHover="hover"
      style={{
        display: "inline-grid",
        placeItems: "center",
        perspective: "1000px",
        ...style,
      }}
      {...props}
    >
      <motion.span
        variants={frontVariants}
        style={{
          gridArea: "1 / 1",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {frontText}
      </motion.span>

      <motion.span
        variants={backVariants}
        style={{
          gridArea: "1 / 1",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {backText || frontText}
      </motion.span>
    </motion.span>
  );
}
