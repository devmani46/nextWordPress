import { Tilt } from "@/components/motion-primitives/tilt";
import BlueButton from "@/components/ui/bluebutton";
import { getWordPressImage } from "@/lib/utils";
import { LucideChartColumn, LucideGlobe, LucidePlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface WhyChooseUsSectionProps {
  why_title: string;
  why_description: string;
  why_cta_link: string;
  why_cta_title: string;
  why_images: string[];
}

export default function WhyChooseUsSection({
  why_title,
  why_description,
  why_cta_link,
  why_cta_title,
  why_images,
}: WhyChooseUsSectionProps) {
  return (
    <>
      <Tilt rotationFactor={4} isRevese>
        <div className="box-1 relative max-h-[800px] min-w-[320px] flex-1 bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_20%,rgba(224,224,244,1)_80%)] pb-16 pl-10 pt-16 lg:max-h-[400px] lg:pl-16">
          <div className="choose-us-text flex w-[90%] flex-col items-start gap-3 xl:w-3/5">
            <p className="p1-regular">Why Choose Us</p>
            <p className="h3 text-blue-normal">{why_title}</p>
            <p className="p1-regular text-gray">{why_description}</p>
            <Link href={why_cta_link} className="mt-3">
              <BlueButton icon>{why_cta_title}</BlueButton>
            </Link>
          </div>
          <img
            src="/nepalFlag.png"
            className="invisible absolute bottom-0 right-16 xl:visible"
          />
        </div>
      </Tilt>

      <div className="box-2 relative max-h-[400px] min-w-[300px] flex-1 bg-[linear-gradient(180deg,rgba(224,224,244,1)_10%,rgba(191,216,235,1)_80%,rgba(234,243,249,1)_100%)] pl-[10%] pr-5 pt-4">
        <Tilt rotationFactor={4} isRevese>
          <div className="community-container grid grid-cols-2 grid-rows-2 gap-5">
            <div className="col-span-full rounded-lg border border-white-light bg-white bg-opacity-40 p-4">
              <div className="flex justify-center">
                {/*circle avatars*/}
                {why_images.map((image, index) => (
                  <Image
                    key={index}
                    src={getWordPressImage(image)}
                    alt={`Community member ${index + 1}`}
                    className="-ml-2 max-h-12 min-h-12 min-w-12 max-w-12 rounded-full border-2 border-white bg-blue-normal object-cover"
                    width={48}
                    height={48}
                  />
                ))}
              </div>
              <p className="label-regular mt-2 text-center">Vast Community</p>
            </div>
            <div className="flex flex-col gap-1 rounded-lg border border-white-light bg-white bg-opacity-40 p-3">
              <LucideGlobe className="h-8 w-8 rounded-full bg-white-light p-2 text-blue-normal" />
              <div className="text-xl font-semibold">22+</div>
              <div className="label-regular text-gray">Global Presence</div>
            </div>
            <div className="flex flex-col gap-1 rounded-lg border border-white-light bg-white bg-opacity-40 p-3">
              <LucideChartColumn className="h-8 w-8 rounded-full bg-white-light p-2 text-blue-normal" />
              <div className="text-xl font-semibold">500+</div>
              <div className="label-regular text-gray">Proven Impact</div>
            </div>
          </div>
        </Tilt>

        <div className="watch-video bottom-7 left-6 mt-10 flex items-center gap-2 xl:absolute xl:mt-0">
          <span className="material-symbols-outlined"></span>
          <LucidePlay className="h-16 w-16 rounded-full bg-white-light p-5 text-blue-normal" />
          <p className="p1-medium">Watch Video</p>
        </div>
      </div>
      <div className="years-stat invisible absolute bottom-0 right-[15%] z-10 mt-0 h-[108px] w-[7%] rounded-2xl bg-[linear-gradient(to_bottom,#3082BF_0%,#2A2A6B_100%)] pt-3 text-center text-white-light xl:visible">
        <p className="h1">22</p>
        <p className="h4">Years</p>
      </div>
    </>
  );
}
