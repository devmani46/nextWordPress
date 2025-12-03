// components/sections/AboutUsSection.tsx
import { TextEffect } from "@/components/motion-primitives/text-effect";
import BlueButton from "@/components/ui/bluebutton";
import { InView } from "@/components/ui/in-view";
import Image from "next/image";

interface AboutUsSectionProps {
  who_we_are_hero_description: string;
  about_image_1_url: string;
  about_image_2_url: string;
  about_image_3_url: string;
}

export default function AboutUsSection({
  who_we_are_hero_description,
  about_image_1_url,
  about_image_2_url,
  about_image_3_url,
}: AboutUsSectionProps) {
  return (
    <>
      <div className="about-us-images basis-full md:basis-1/2">
        <div className="flex">
          <Image
            src={about_image_1_url}
            alt="about-image-1"
            width={380}
            height={230}
          />
          <Image
            src={about_image_2_url}
            alt="about-image-1"
            className="h-[80px] w-[75px]"
            width={75}
            height={80}
          />
        </div>
        <Image
          src={about_image_3_url}
          alt="about-image-1"
          width={480}
          height={260}
        />
      </div>
      <div className="about-us-text flex basis-full flex-col items-start gap-3 md:basis-1/2">
        <TextEffect per="char" preset="fade">
          About us
        </TextEffect>

        <p className="title h3">
          Global Representation of Nepalis Across Borders
        </p>
        <p className="p1-regular mb-3 text-gray">
          {who_we_are_hero_description}
        </p>
        <BlueButton className="button-regular" icon>
          Read More
        </BlueButton>
      </div>
    </>
  );
}
