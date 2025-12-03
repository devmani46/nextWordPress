import { Event, News, Page } from "@/lib/wordpress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

import { Button } from "../ui/button";
import {
  ArrowUpRight,
  LucideChartColumn,
  LucideGlobe,
  LucidePlay,
  LucidePlayCircle,
} from "lucide-react";
import CircleFollowCard from "../banner/fw-banner";
import { Notice } from "@/lib/wordpress";
import { Project } from "@/lib/wordpress";
import BlueButton from "../ui/bluebutton";
import WhiteButton from "../ui/whitebutton";
import Link from "next/link";
import WorldMap from "../world-map/WorldMap";
import HeroCarousel from "../home-carousel/home-carousel";
import { Input } from "../ui/input";
import { cn, getWordPressImage } from "@/lib/utils";
import { Tilt } from "../motion-primitives/tilt";
import { Spotlight } from "../motion-primitives/spotlight";
import { TextEffect } from "../motion-primitives/text-effect";
import { InView } from "../ui/in-view";
import { TextShimmer } from "../motion-primitives/text-shimmer";
import NewHomeCarousel from "../home-carousel/new-home-carousel";
import StayUpdatedSection from "./homeSections/StayUpdatedSection";
import AboutUsSection from "./homeSections/AboutUsSetion";
import WhyChooseUsSection from "./homeSections/WhyChooseUsSection";
import GetInvolvedSection from "./homeSections/GetInvolvedSection";
import LatestNewsAndUpdatesSection from "./homeSections/LatestNewsSection";

interface HomeTemplateProps {
  page: Page & {
    slider_items?: {
      title: string;
      image: number;
      image_url: string;
    }[];
    involved_actions?: {
      title: string;
      description: string;
      cta_link: string;
      cta_title: string;
    }[];
    about_stats?: {
      title: string;
      description: string;
    }[];
    why_features?: {
      title: string;
      description: string;
    }[];
    why_images_urls?: string[];
    about_image_1_url?: string;
    about_image_2_url?: string;
    about_image_3_url?: string;
  };
  whowearePage: Page & {
    meta: {
      who_we_are_hero_title: string;
      who_we_are_hero_description: string;
      who_we_are_message_description: string;
    };
  };
  projects: Project[];
  news: News[];
}

interface Slide {
  src: string;
  alt: string;
  title: string;
}

export default function HomeTemplate({
  page,
  whowearePage,
  projects,
}: HomeTemplateProps) {
  const hero_title = page.meta.hero_title as string;
  const hero_description = page.meta.hero_description as string;
  const hero_button_text = page.meta.hero_cta_title as string;
  const banner_title = page.meta.banner_title as string;
  const banner_description = page.meta.banner_description as string;

  const banner_cta_title = page.meta.banner_cta_title as string;
  const banner_cta_link = page.meta.banner_cta_link as string;

  const about_title = page.meta.about_title as string;

  const why_title = page.meta.why_title as string;
  const why_description = page.meta.why_description as string;
  const why_cta_title = page.meta.why_cta_title as string;
  const why_cta_link = page.meta.why_cta_link as string;

  const involved_title = page.meta.involved_title as string;
  const involved_description = page.meta.involved_description as string;

  const stay_updated_title = page.meta.stay_updated_title as string;
  const stay_updated_description = page.meta.stay_updated_description as string;

  const latest_news_title = page.meta.latest_news_title as string;
  const latest_news_description = page.meta.latest_news_description as string;

  const our_intitiatives_title = page.meta.our_initiatives_title as string;
  const our_initiatives_description = page.meta
    .our_initiatives_description as string;

  const journey_title = page.meta.journey_title as string;
  const journey_description = page.meta.journey_description as string;
  const journey_cta_title = page.meta.journey_cta_title as string;
  const journey_cta_link = page.meta.journey_cta_link as string;

  const slider_image1 = page.slider_items?.[0];
  const slides: Slide[] = (page.slider_items || []).map((item) => ({
    src: item.image_url, // map image_url -> src
    alt: item.title, // you can use title or something else for alt
    title: item.title, // keep the title
  }));
  const getInvolvedCards = page.involved_actions || [];
  const why_features = page.meta.why_features || [];

  const stats = page.about_stats || [];
  const why_images = page.why_images_urls || [];

  const who_we_are_hero_title = whowearePage.meta
    .who_we_are_hero_title as string;
  const who_we_are_hero_description = whowearePage.meta
    .who_we_are_hero_description as string;
  const who_we_are_message_description = whowearePage.meta
    .who_we_are_message_description as string;

  if (slides.length === 0) return null; //nothing to show

  return (
    <div className="home text-black">
      {/*HERO SECTION*/}
      {/* <img src="/lines.png" alt="" className="absolute left-0 top-0" />
      <img
        src="/lines.png"
        alt=""
        className="absolute right-0 top-0 -scale-x-100"
      /> */}

      <section className="hero w-full">
        <div className="hero-cta m-auto mb-10 flex w-8/12 flex-col items-center gap-5 text-center md:w-4/12">
          <div className="h1 text-black">
            <TextEffect
              preset="fade-in-blur"
              speedReveal={1.1}
              speedSegment={0.3}
            >
              {hero_title}
            </TextEffect>
          </div>
          <div className="p1-regular text-gray">{hero_description}</div>
          <BlueButton className="button-regular">{hero_button_text}</BlueButton>
        </div>

        <NewHomeCarousel slides={slides} autoplay loop showPagination />
      </section>

      {/*BANNER SECTION*/}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6, ease: [0.455, 0.03, 0.515, 0.955] }}
      >
        <section className="banner-container mt-28">
          <CircleFollowCard />
        </section>
      </InView>

      {/*ABOUT US SECTION*/}

      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6, ease: [0.455, 0.03, 0.515, 0.955] }}
      >
        <section className="about-us mb-20 mt-20 flex flex-col gap-8 px-10 md:flex-row md:px-12 lg:px-[15%]">
          <AboutUsSection
            who_we_are_hero_description={who_we_are_hero_description}
            about_image_1_url={page.about_image_1_url as string}
            about_image_2_url={page.about_image_2_url as string}
            about_image_3_url={page.about_image_3_url as string}
          />
        </section>
      </InView>

      {/*STATISTICS SECTION*/}

      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6, ease: [0.455, 0.03, 0.515, 0.955] }}
      >
        <section className="statistics flex w-full flex-nowrap justify-center px-10 sm:gap-12 md:justify-between md:gap-16 md:px-[15%]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-block sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
            >
              <p className="md:h3 text-[22px] font-medium text-violet-normal">
                {stat.title} +
              </p>
              <p className="p1-regular text-gray">{stat.description}</p>
            </div>
          ))}
        </section>
      </InView>

      {/*WHY CHOOSE US SECTION*/}

      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6, ease: [0.455, 0.03, 0.515, 0.955] }}
      >
        <section className="why-choose-us relative mb-20 mt-20 flex flex-wrap px-10 md:px-[15%] xl:flex-nowrap">
          <WhyChooseUsSection
            why_cta_link={why_cta_link}
            why_cta_title={why_cta_title}
            why_description={why_description}
            why_images={why_images}
            why_title={why_title}
          />
        </section>
      </InView>

      {/*GET INVOLVED SECTION*/}

      <section className="get-involved px-8 md:px-[15%]">
        <GetInvolvedSection
          involved_title={involved_title}
          involved_description={involved_description}
          getInvolvedCards={getInvolvedCards}
        />
      </section>

      {/*PRESIDENT'S MESSAGE SECTION*/}

      <section className="president mt-11 flex flex-wrap gap-10 px-10 md:px-[15%] lg:flex-nowrap">
        <div className="president-message flex flex-col items-start justify-center gap-3 md:basis-3/5">
          <p className="p1-regular">One Diaspora, One Purpose</p>
          <p className="h5 italic">
            &quot;{who_we_are_message_description}&quot;
          </p>
          <p className="p1-medium mb-3 text-gray">Dr. Badri K.C. President</p>
          <BlueButton icon className="mt-3">
            Read Full Message
          </BlueButton>
        </div>
        <div className="president-image hidden overflow-hidden lg:flex lg:basis-2/5">
          <Image
            src={"/NRNA 1.png"}
            alt="president-image"
            height={612}
            width={408}
            className="translate-y-[150px] scale-125 object-cover object-top"
          ></Image>
        </div>
      </section>

      {/*STAY UPDATED SECTION*/}
      <StayUpdatedSection
        stay_updated_title={stay_updated_title}
        stay_updated_description={stay_updated_description}
      />

      {/*LATEST NEWS AND UPDATES */}

      <section className="latest-news px-8 py-20 md:px-[15%]">
        <LatestNewsAndUpdatesSection
          latest_news_description={latest_news_description}
          latest_news_title={latest_news_title}
        />
      </section>

      {/*Our Initiatives*/}

      <section className="our-intiatives bg-[linear-gradient(to_bottom,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_60%,transparent_60%,transparent_100%)] py-20">
        <div className="our-initiatives-text flex flex-col gap-3 pl-10 md:pl-[15%]">
          <p className="p1-regular">Our Initiatives</p>
          <p className="h3">Transformative Projects Worldwide</p>
          <div className="flex w-[80%] items-center justify-between">
            <p className="p1-regular text-gray">
              Explore NRNA projects driving impact across communities and
              supporting global Nepali Initiatives
            </p>
            <WhiteButton className="hidden md:flex" icon>
              View More
            </WhiteButton>
          </div>
        </div>
        <Carousel className="project-cards-container mt-11 flex gap-8">
          <CarouselContent className="flex gap-4 pl-14 pt-4 md:pl-60">
            {projects.map((project) => {
              // get featured image URL
              const imageUrl = getWordPressImage(
                project._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
              );

              return (
                <CarouselItem
                  key={project.id}
                  className="project-card flex max-w-80 flex-col overflow-hidden rounded-2xl bg-white pl-0 transition-transform hover:-translate-x-2 hover:-translate-y-4"
                >
                  <div className="project-card-text p-6">
                    <p className="label-medium mb-1 text-gray">
                      {new Date(project.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="p1-medium">{project.title.rendered}</p>
                  </div>
                  <div
                    className="project-card-image relative flex h-60 w-full flex-col justify-end bg-gray"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="buttons-container flex bg-gray bg-opacity-10 text-white backdrop-blur-lg">
                      <button className="basis-1/2 border-r border-t py-3 transition-colors hover:bg-blue-normal hover:text-white-light">
                        Register
                      </button>
                      <button className="basis-1/2 border-t py-3 transition-colors hover:bg-blue-normal hover:text-white-light">
                        Learn More
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </section>

      {/*JOIN THE JOURNEY*/}

      <section className="join-the-journey mt-10 flex flex-wrap bg-[linear-gradient(to_bottom,#3082BF_0%,#2A2A6B_100%)] py-28 pl-[10%] pr-[10%] text-white md:pl-0 lg:flex-nowrap">
        <div className="world-map basis-full md:basis-2/3">
          <WorldMap />
        </div>
        <div className="journey-text flex flex-col items-start gap-3 md:basis-1/3">
          <p className="p1-regular">Join the Journey</p>
          <p className="h3">{journey_title}</p>
          <p className="p1-regular">{journey_description}</p>
          <Link href={journey_cta_link} className="mt-3">
            <WhiteButton icon>{journey_cta_title}</WhiteButton>
          </Link>
        </div>
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
