"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  src: string;
  alt: string;
  title: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

export default function HeroCarousel({
  slides,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    api.on("settle", () => {
      if (!api.canScrollNext()) {
        api.reInit({ duration: 0 });
      }
    });

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel setApi={setApi} opts={{ loop, slidesToScroll: 1 }}>
        <CarouselContent className="flex h-[500px] w-full">
          {slides.map((slide, index) => {
            const isCenter = index === current;
            return (
              <CarouselItem
                key={index}
                className={cn(
                  "relative flex h-[80%] shrink-0 grow-0 basis-[70%] items-center justify-center transition-transform duration-300",
                )}
              >
                <motion.div
                  initial={false}
                  animate={{
                    clipPath: isCenter
                      ? "inset(0% round 2rem)"
                      : "inset(15% 0 15% 0 round 2rem)",
                  }}
                  className="h-full w-full overflow-hidden rounded-3xl"
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-0 left-0 w-full p-2 text-center font-medium text-black/20"
                    >
                      {slide.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {showNavigation && (
          <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
            <button
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              className="rounded-full bg-black/10 p-2"
            >
              <ChevronLeft className="text-white" />
            </button>
            <button
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              className="rounded-full bg-black/10 p-2"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        )}

        {showPagination && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  current === index ? "bg-black" : "bg-gray-300",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}
