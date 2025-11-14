"use client";

import LiquidGlass from "liquid-glass-react";

interface LiquidGlassWrapperProps {
  children: React.ReactNode;
}

export default function LiquidGlassWrapper({
  children,
}: LiquidGlassWrapperProps) {
  return <LiquidGlass>{children}</LiquidGlass>;
}
