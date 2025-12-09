"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import WhiteButton from "../ui/whitebutton";
import Link from "next/link";

interface CommitteesCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  cta_title?: string;
  cta_link?: string;
}

export default function CommitteesCard({
  title = "Global Nepali Network",
  subtitle = "Be Part of the",
  description = "Join NRNA to connect with Nepalis worldwide, shape policies, and represent your region globally.",
  cta_title = "Explore Membership Benefits",
  cta_link = "/membership",
}: CommitteesCardProps) {
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
        className="global-banner relative m-auto overflow-hidden rounded-xl bg-blue-normal px-10 py-11 md:px-20"
      >
        <motion.div
          inherit={false}
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
        <div className="flex flex-wrap items-end lg:flex-nowrap">
          <div className="banner-cta relative z-10 flex flex-col items-start gap-5 text-white lg:w-[50%]">
            <div>
              <p className="h3">{subtitle}</p>
              <p className="h1">{title}</p>
            </div>
            <p>{description}</p>
            <Link href={cta_link}>
              <WhiteButton className="button-regular text-blue-normal">
                {cta_title}
              </WhiteButton>
            </Link>
          </div>
          <div className="banner-stats flex flex-wrap divide-x divide-white/50 text-white-light lg:flex-nowrap">
            <div className="flex-shrink-0 pr-[0.75rem]">
              <p className="text-[28px] font-bold">22 +</p>
              <p className="p1-regular">Countries Represented</p>
            </div>
            <div className="flex-shrink-0 px-[0.75rem]">
              <p className="text-[28px] font-bold">500+</p>
              <p className="p1-regular"> Projects Initiated</p>
            </div>
            <div className="flex-shrink-0 px-[0.75rem]">
              <p className="text-[28px] font-bold">$50M+</p>
              <p className="p1-regular">Funds Mobilized</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
