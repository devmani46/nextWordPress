"use client";

import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

type CarouselProps = {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
};

export default function OverlappingCarousel({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
}: CarouselProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={`relative w-full ${className || ""}`}
    >
      <Swiper
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
        effect="cards"
        grabCursor
        loop={loop}
        autoplay={
          autoplay
            ? {
                delay: 2000,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="h-[420px] w-[900px]"
      >
        {images.map((image, i) => (
          <SwiperSlide
            key={i}
            className="border-gray-200 overflow-hidden rounded-3xl border shadow-lg"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}

        {showNavigation && (
          <>
            <div className="swiper-button-next absolute right-[-2rem] top-1/2 z-10 -translate-y-1/2 after:hidden">
              <ChevronRightIcon className="text-gray-700 h-6 w-6" />
            </div>
            <div className="swiper-button-prev absolute left-[-2rem] top-1/2 z-10 -translate-y-1/2 after:hidden">
              <ChevronLeftIcon className="text-gray-700 h-6 w-6" />
            </div>
          </>
        )}
      </Swiper>
    </motion.div>
  );
}
