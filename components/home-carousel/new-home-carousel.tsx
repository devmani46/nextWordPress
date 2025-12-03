"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { cn } from "@/lib/utils";

interface Slide {
  src: string;
  alt: string;
  title?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  spaceBetween?: number;
}

export default function NewHomeCarousel({
  slides,
  autoplay = false,
  loop = true,
  showNavigation = false,
  showPagination = true,
  spaceBetween = 140,
}: HeroCarouselProps) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <Carousel_001
        images={slides}
        showPagination={showPagination}
        showNavigation={showNavigation}
        loop={loop}
        autoplay={autoplay}
        spaceBetween={spaceBetween}
        className="w-full"
      />
    </div>
  );
}

const Carousel_001 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: { src: string; alt: string; title?: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn("relative w-full", className)}
    >
      <div className="gradient-left pointer-events-none absolute left-0 top-0 z-10 h-[450px] w-[15%] bg-gradient-to-r from-white to-transparent" />
      <div className="gradient-right pointer-events-none absolute right-0 top-0 z-10 h-[450px] w-[15%] bg-gradient-to-l from-white to-transparent" />
      <Swiper
        speed={1000}
        breakpoints={{
          0: { spaceBetween: 70, slidesPerView: 1.1 },
          640: { spaceBetween: 110, slidesPerView: 1.3 },
          1024: { spaceBetween: 120, slidesPerView: 1.7 },
          1440: { spaceBetween: 120, slidesPerView: 1.7 },
        }}
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={1.7}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        className="mySwiper pagination-outside relative"
      >
        {images.map((slide, index) => (
          <SwiperSlide key={index} className="!h-[420px] w-full">
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover"
              />
              {slide.title && (
                <div className="p1-bold absolute bottom-5 left-5 w-[90%] text-white-light lg:w-[45%]">
                  {slide.title}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}

        {showNavigation && (
          <>
            <div className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </>
        )}
      </Swiper>
      <style>{`/* styles.css */
 .pagination-outside {
    position: relative;
    padding-bottom: 50px; /* make space for bullets */
  }

  .pagination-outside .swiper-pagination {
    position: absolute;
    bottom: 0px;  /* move it below the slider */
    left: 50%;
    transform: translateX(-50%);
  }

  .pagination-outside .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #2B75AC;
    opacity: 1;
    transition: all 0.3s ease; /* smooth animation */
  }
     


   .pagination-outside .swiper-pagination-bullet-active {
    width: 24px; /* << larger width for active bullet */
    border-radius: 4px; /* so it becomes a pill shape */
    background: #2B75AC;   /* optional: stronger color */
  }
`}</style>
    </motion.div>
  );
};
