import { useState } from "react";
import OverlappingCarousel from "../ui/OverlappingCarousel";
import { LucideGoal } from "lucide-react";

interface WhoWeAreCarouselProps {
  slides: {
    id: string;
    src: string;
    alt: string;
    title: string;
    description: string;
  }[];
}

export default function WhoWeAreCarousel({ slides }: WhoWeAreCarouselProps) {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="our-mission absolute -top-10 z-10 w-[500px] rounded-lg border border-blue-light-active bg-white bg-opacity-70 px-6 py-3 backdrop-blur-md">
        <div className="title mb-3 flex items-center gap-3">
          <LucideGoal className="size-8 text-blue-normal" />
          <p className="h5">{slides[index].title}</p>
        </div>
        <p className="label-regular">{slides[index].description}</p>
      </div>
      <OverlappingCarousel
        images={slides}
        autoplay
        loop
        showPagination
        onSlideChange={setIndex}
      />
    </>
  );
}
