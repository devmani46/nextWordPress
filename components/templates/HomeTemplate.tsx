import { Page } from "@/lib/wordpress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

interface HomeTemplateProps {
  page: Page & {
    slider_items?: {
      title: string;
      image: number;
      image_url: string;
    }[];
  };
}

export default function HomeTemplate({ page }: HomeTemplateProps) {
  const hero_title = page.meta.hero_title as string;
  const hero_description = page.meta.hero_description as string;
  const button_text = page.meta.hero_cta_title as string;
  const slider_image1 = page.slider_items?.[0];
  const slides = page.slider_items || [];

  if (slides.length === 0) return null; //nothing to show

  return (
    <div className="home">
      <section className="hero w-full">
        <div className="hero-cta m-auto text-center flex flex-col gap-4 w-4/12 mb-10">
          <div className="h1 text-black">{hero_title}</div>
          <div className="p1-regular text-gray">{hero_description}</div>
          <button className="button-regular self-center text-white bg-blue-normal rounded-md w-44 h-11">
            {button_text}
          </button>
        </div>

        <Carousel
          opts={{
            align: "center",
          }}
          className="w-screen"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="basis-3/4">
                <Image
                  src={slide.image_url}
                  width={1148}
                  height={384}
                  alt="image"
                  className="w-full min-h-96 max-h-96 object-cover rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="banner-container mt-28">
        <div className="global-banner bg-blue-normal w-4/5 m-auto rounded-md px-20 py-11 ">
          <div className="banner-cta text-white">
            <div className="h3">Be Part of the</div>
            <div className="h1">Global Nepali Network</div>
            <p>
              Join NRNA to connect with Nepalis worldwide, shape policies, and
              represent your region globally.
            </p>
            <button className="button-regular self-center text-blue-normal bg-white rounded-md w-72 h-11">
              Explore Membership Benefits
            </button>
          </div>
          <div className="banner-image"></div>
        </div>
      </section>

      <section className="about-us flex">
        <div className="about-us-images basis-1/2 bg-gray"></div>
        <div className="about-us-text basis-1/2">
          <p className="sub-title p1-regular">About us</p>
          <p className="title h3">
            Global Representation of Nepalis Across Borders
          </p>
          <p>
            Non-Resident Nepali Association (NRNA) was established with the
            purpose of uniting and binding the Nepali Diaspora under one
            umbrella on 11 October, 2003. In the course of completing 20 years
            of its existence NRNA has developed into a non-governmental global
            organization and a network of Nepali origin by establishing National
            Coordination Council (NCC) in 86 countries to represent its
            interests, concerns and commitments. Our belief:“Once a Nepali you
            always remain a Nepali”, is reinforced by our commitment to
            streamline our energy and resources for the transformation of the
            Nepali society. It is the duty and responsibility of every nation to
            promote, represent and safe guard the welfare of its nationals or
            people of its origin having foreign nationality and this will
            ultimately be in the interest of the nation.
          </p>
        </div>
      </section>
    </div>
  );
}
