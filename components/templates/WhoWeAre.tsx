import { Page } from "@/lib/wordpress";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import WhiteButton from "../ui/whitebutton";
import LiquidGlass from "liquid-glass-react";
import LiquidGlassWrapper from "../ui/liquidglasswrapper";
import parse from "html-react-parser";

import {
  ArrowUpLeft,
  ArrowUpRight,
  LucideGoal,
  LucideTarget,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import BlueButton from "../ui/bluebutton";
import OverlappingCarousel from "../ui/OverlappingCarousel";
import ParallaxDiv from "../parallax-divs/parallax";
import { Spotlight } from "../motion-primitives/spotlight";
import { Tilt } from "../motion-primitives/tilt";
import Faqs from "../fw-faqs/fw-faqs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn, getWordPressImage } from "@/lib/utils";
import Link from "next/link";
import WhoWeAreCarousel from "../whoWeAre-carousel/whoweare-carousel";

interface WhoWeAreTemplateProps {
  page: Page & {
    who_we_are_vision_image_url?: string;
    who_we_are_goals_image_url?: string;
    who_we_are_certificate_image_url?: string;
    who_we_are_team_image_url?: string;
    who_we_are_slider_items?: {
      title: string;
      description: string;
      image: string;
      image_url: string;
    }[];
    who_we_are_join_points?: {
      title: string;
    }[];
    who_we_are_join_stats?: {
      title: string;
      description: string;
    }[];
  };
}

interface Slide {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function WhoWeAreTemplate({ page }: WhoWeAreTemplateProps) {
  const images = [
    { src: "/FINAL DOG GRASS.png", alt: "image" },
    { src: "/FINAL DOG GRASS.png", alt: "image" },
    { src: "/FINAL DOG GRASS.png", alt: "image" },
    { src: "/FINAL DOG GRASS.png", alt: "image" },
  ];

  const who_we_are_hero_title = page.meta.who_we_are_hero_title as string;
  const who_we_are_hero_description = page.meta
    .who_we_are_hero_description as string;
  const who_we_are_vision_title = page.meta.who_we_are_vision_title as string;
  const who_we_are_vision_description = page.meta
    .who_we_are_vision_description as string;

  const who_we_are_goals_title = page.meta.who_we_are_goals_title as string;
  const who_we_are_goals_description = page.meta
    .who_we_are_goals_description as string;

  const who_we_are_certificate_title = page.meta
    .who_we_are_certificate_title as string;
  const who_we_are_certificate_description = page.meta
    .who_we_are_certificate_description as string;

  const who_we_are_message_title = page.meta.who_we_are_message_title as string;
  const who_we_are_message_description = page.meta
    .who_we_are_message_description as string;
  const who_we_are_message_representative_name = page.meta
    .who_we_are_message_representative_name as string;
  const who_we_are_message_representative_role = page.meta
    .who_we_are_message_representative_role as string;

  const who_we_are_team_title = page.meta.who_we_are_team_title as string;
  const who_we_are_team_description = page.meta
    .who_we_are_team_description as string;

  const who_we_are_join_title = page.meta.who_we_are_join_title as string;
  const who_we_are_join_description = page.meta
    .who_we_are_join_description as string;
  const who_we_are_join_cta_link = page.meta.who_we_are_join_cta_link as string;
  const who_we_are_join_cta_title = page.meta
    .who_we_are_join_cta_title as string;

  const who_we_are_join_points = page.who_we_are_join_points || [];
  const who_we_are_join_stats = page.who_we_are_join_stats || [];

  //Images
  const who_we_are_vision_image_url =
    page.who_we_are_vision_image_url as string;
  const who_we_are_goals_image_url = page.who_we_are_goals_image_url as string;
  const who_we_are_certificate_image_url =
    page.who_we_are_certificate_image_url as string;
  const who_we_are_team_image_url = page.who_we_are_team_image_url as string;

  const who_we_are_slider_items = page.who_we_are_slider_items || [];

  const slides: Slide[] = (page.who_we_are_slider_items || []).map((item) => ({
    id: item.image,
    src: item.image_url,
    alt: item.title, // map image_url -> src
    title: item.title,
    description: item.description, // keep the title
  }));

  return (
    <div>
      <section className="about-text px-10 md:px-[15%]">
        <p className="h2 mb-6">{who_we_are_hero_title}</p>
        <p>{who_we_are_hero_description}</p>
      </section>

      <section className="mission-slider relative mt-32 flex justify-center px-10">
        <WhoWeAreCarousel slides={slides} />
      </section>

      {/*OUR VISION IN ACTION*/}
      <section className="our-vision mt-40 flex px-10 md:px-[15%]">
        <ParallaxDiv
          alignment="left"
          image_url={who_we_are_vision_image_url}
          title="Our Vision in Action"
          subtitle={who_we_are_vision_title}
          description={who_we_are_vision_description}
        />
      </section>

      {/*TURNING GOALS INTO REALITY*/}

      <section className="turning-goals mt-20 flex px-[15%]">
        <ParallaxDiv
          alignment="right"
          title="something"
          subtitle={who_we_are_goals_title}
          description={who_we_are_goals_description}
          image_url={who_we_are_goals_image_url}
        />
      </section>

      {/*CERTIFICATE SECTION*/}

      <section className="certificate-section mt-20 flex flex-col gap-11 px-10 md:px-[15%]">
        <div className="certificate-image relative h-[354px] w-full overflow-hidden rounded-2xl bg-gray">
          <Image
            src={getWordPressImage(who_we_are_certificate_image_url)}
            alt="certificate"
            fill
            className="object-cover"
          />
        </div>
        <div className="certificate-text flex flex-col gap-3 px-0 md:px-[10%]">
          <p className="p1-regular">Official Recognition</p>
          <p className="h3">{who_we_are_certificate_title}</p>
          <p className="p1-regular">{who_we_are_certificate_description}</p>
        </div>
      </section>

      {/*President's Message*/}

      <section className="presidents-message relative mt-20 flex flex-wrap px-10 md:px-[15%]">
        <div className="message-text md:basis-3/5">
          <p className="h3">{who_we_are_message_title}</p>

          <p className="p1-regular mt-3 pl-3 text-gray md:pl-10">
            {who_we_are_message_description}
          </p>
          <img
            className="relative md:absolute md:bottom-40"
            src="/chat_bubble.svg"
          />
          <div className="message-giver relative flex flex-col">
            <div className="giver-name mr-20 mt-12 self-end">
              <p>{who_we_are_message_representative_name}</p>
              <p>{who_we_are_message_representative_role}</p>
            </div>
          </div>
        </div>
        <div className="president-image-container relative hidden h-[525px] overflow-hidden md:block md:basis-2/5">
          <Image
            src={"/NRNA 1.png"}
            className="translate-y-[140px] scale-150 object-fill"
            alt="pres"
            fill
          />
          <div className="absolute bottom-0 left-0 z-10 h-[450px] w-full bg-gradient-to-t from-white to-transparent" />
        </div>
      </section>

      {/*MEET THE TEAM*/}

      <section className="meet-the-team mt-20 flex flex-col gap-11 px-10 md:px-[15%]">
        <div className="certificate-image relative h-[354px] overflow-hidden rounded-2xl bg-gray">
          <Image
            src={getWordPressImage(who_we_are_team_image_url)}
            alt="team-image"
            fill
            className="object-cover"
          />
        </div>
        <div className="certificate-text flex flex-col items-start gap-3 px-[10%]">
          <p className="p1-regular">The Team</p>
          <p className="h3">{who_we_are_team_title}</p>
          <p className="p1-regular">{who_we_are_team_description}</p>
          <WhiteButton>
            <ArrowUpRight className="text-amber-500" /> Meet Our Team
          </WhiteButton>
        </div>
      </section>

      {/*JOIN NRNA TODAY*/}

      <section className="join-nrna mt-20 flex flex-wrap gap-10 bg-gradient-to-br from-[#2A2A6B] to-[#3082BF] px-10 py-20 md:flex-nowrap md:gap-0 md:px-[15%]">
        <div className="join-text flex flex-col items-start gap-3 text-white md:basis-1/2">
          <p className="h1">{who_we_are_join_title}</p>
          <p className="p1-regular">{who_we_are_join_description}</p>

          <ul className="p1-regular flex flex-col gap-2">
            {who_we_are_join_points.map(
              (point: { title: string }, index: number) => (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">
                    check_circle
                  </span>
                  {point.title}
                </li>
              ),
            )}
          </ul>

          <Link href={who_we_are_join_cta_link}>
            <WhiteButton className="mt-5 text-blue-normal">
              {who_we_are_join_cta_title}
            </WhiteButton>
          </Link>
        </div>
        <div className="join-stats grid basis-full grid-cols-2 grid-rows-2 gap-4 md:basis-1/2">
          <Tilt
            rotationFactor={8}
            isRevese
            className="flex flex-col items-center justify-center rounded-2xl border border-blue-light border-opacity-40 bg-white bg-opacity-15 py-10 md:py-0"
          >
            <Spotlight size={128} className="opacity-35 blur-2xl" />
            <span className="material-symbols-outlined mb-3 rounded-lg bg-blue-light-active p-3 text-blue-normal">
              diversity_2
            </span>
            <p className="text-3xl font-semibold text-white">
              {who_we_are_join_stats[0].title}
            </p>
            <p className="p1-regular text-white">
              {who_we_are_join_stats[0].description}
            </p>
          </Tilt>

          <Tilt
            rotationFactor={8}
            isRevese
            className="flex flex-col items-center justify-center rounded-2xl border border-blue-light border-opacity-40 bg-white bg-opacity-15"
          >
            <Spotlight size={128} className="opacity-35 blur-2xl" />

            <span className="material-symbols-outlined mb-3 rounded-lg bg-blue-light-active p-3 text-blue-normal">
              globe_uk
            </span>
            <p className="text-3xl font-semibold text-white">
              {who_we_are_join_stats[1].title}
            </p>
            <p className="p1-regular text-white">
              {who_we_are_join_stats[1].description}
            </p>
          </Tilt>
          <Tilt
            rotationFactor={8}
            isRevese
            className="flex flex-col items-center justify-center rounded-2xl border border-blue-light border-opacity-40 bg-white bg-opacity-15"
          >
            <Spotlight size={128} className="opacity-35 blur-2xl" />

            <span className="material-symbols-outlined mb-3 rounded-lg bg-blue-light-active p-3 text-blue-normal">
              join_right
            </span>
            <p className="text-3xl font-semibold text-white">
              {who_we_are_join_stats[2].title}
            </p>
            <p className="p1-regular text-white">
              {who_we_are_join_stats[2].description}
            </p>
          </Tilt>
          <Tilt
            rotationFactor={8}
            isRevese
            className="flex flex-col items-center justify-center rounded-2xl border border-blue-light border-opacity-40 bg-white bg-opacity-15"
          >
            <Spotlight size={128} className="opacity-35 blur-2xl" />

            <span className="material-symbols-outlined mb-3 rounded-lg bg-blue-light-active p-3 text-blue-normal">
              temp_preferences_eco
            </span>
            <p className="text-3xl font-semibold text-white">
              {who_we_are_join_stats[3].title}
            </p>
            <p className="p1-regular text-white">
              {who_we_are_join_stats[3].description}
            </p>
          </Tilt>
        </div>
      </section>

      {/*FAQ*/}

      <section className="faq-section mt-20 px-10 md:px-[15%]">
        <Faqs />
      </section>

      <footer className="w-full px-[15%] pt-16">
        <div className="column-containers flex justify-between">
          <div className="first-column">
            <div className="logo-text-container p2-semi-bold mb-7 text-violet-dark">
              <p className="mb-1 font-bold">Non-Residential Nepali</p>
              <p className="font-bold">गैरआवासीय नेपाली संघ</p>
            </div>
            <div className="p2-medium flex flex-col gap-3 text-gray">
              <p>Phone: +977-014511530,014526005</p>
              <p>Email:info@nrna.org</p>
              <p>Address:Subarna Shamsher Marg, Baluwatar, Kathmandu</p>
            </div>
          </div>
          <div className="second-column">
            <p className="p1-bold mb-6">Resources</p>
            <ul>
              {[
                "Notice",
                "News",
                "Gallery",
                "Activities",
                "Press Release",
                "Publications",
              ].map((item) => (
                <li
                  className="p2-medium footerlink mb-[14px] text-gray"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="third-column">
            <p className="p1-bold mb-6">Important</p>
            <ul>
              {[
                "Notice",
                "News",
                "Gallery",
                "Activities",
                "Press Release",
                "Publications",
              ].map((item) => (
                <li className="p2-medium mb-[14px] text-gray" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="fourth-column">
            <p className="p1-bold mb-6">NRN Area</p>
            <ul>
              {[
                "Notice",
                "News",
                "Gallery",
                "Activities",
                "Press Release",
                "Publications",
              ].map((item) => (
                <li className="p2-medium mb-[14px] text-gray" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contacts">
          <div className="subscribe">
            <p>Subscribe</p>
            <Input type="email" placeholder="Enter your email address" />
            <Button
              className={cn(
                "duration-[2200ms] rounded-lg border-[1px] bg-[length:200%_100%] tracking-wide shadow hover:animate-bg-shine",

                "border-zinc-300 bg-[linear-gradient(110deg,#FFF,45%,#60609AFF,95%,#FFF)]",
              )}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
