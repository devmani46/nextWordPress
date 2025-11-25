"use client";

import * as React from "react";
import {
  motion,
  type HTMLMotionProps,
  type LegacyAnimationControls,
  type TargetAndTransition,
  type Transition,
} from "motion/react";

import { useAutoHeight } from "@/hooks/use-auto-height";
import {
  Slot,
  WithAsChild,
} from "@/components/animate-ui/primitives/animate/slot";

type AutoHeightProps = WithAsChild<
  {
    children: React.ReactNode;
    deps?: React.DependencyList;
    animate?: TargetAndTransition | LegacyAnimationControls;
    transition?: Transition;
  } & Omit<HTMLMotionProps<"div">, "animate">
>;

const AutoHeight = React.forwardRef<HTMLDivElement, AutoHeightProps>(
  (
    {
      children,
      deps = [],
      transition = {
        type: "spring",
        stiffness: 300,
        damping: 30,
        bounce: 0,
        restDelta: 0.01,
      },
      style,
      animate,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const { ref: autoRef, height } = useAutoHeight<HTMLDivElement>(deps);

    const Comp = asChild ? Slot : motion.div;

    return (
      <Comp
        ref={ref}
        style={{ overflow: "hidden", ...style }}
        animate={{ height, ...animate }}
        transition={transition}
        {...props}
      >
        <div ref={autoRef}>{children}</div>
      </Comp>
    );
  },
);

AutoHeight.displayName = "AutoHeight";

export { AutoHeight, type AutoHeightProps };
