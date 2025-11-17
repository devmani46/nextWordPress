import {
  Event,
  getAllEvents,
  getAllNews,
  getAllNotices,
  getAllProjects,
  getPageBySlug,
  getPostBySlug,
  News,
  Page,
} from "@/lib/wordpress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import "../../app/styles/home.css";
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
}

export default async function HomeTemplate({ page }: HomeTemplateProps) {
  const hero_title = page.meta.hero_title as string;
  const hero_description = page.meta.hero_description as string;
  const hero_button_text = page.meta.hero_cta_title as string;
  const banner_title = page.meta.banner_title as string;
  const banner_description = page.meta.banner_description as string;

  const banner_cta_title = page.meta.banner_cta_title as string;
  const banner_cta_link = page.meta.banner_cta_link as string;

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
  const slides = page.slider_items || [];
  const getInvolvedCards = page.involved_actions || [];
  const why_features = page.meta.why_features || [];

  console.log("hello");
  console.log(why_features);

  const stats = page.about_stats || [];
  const why_images = page.why_images_urls || [];

  const aboutPage = await getPageBySlug("about");
  const notices: Notice[] = await getAllNotices();
  const projects: Project[] = await getAllProjects();
  const events: Event[] = await getAllEvents();
  const news: News[] = await getAllNews();

  const aboutDescription = aboutPage.meta.about_hero_description as string;
  const aboutMessage = aboutPage.meta.about_message_description as string;

  if (slides.length === 0) return null; //nothing to show

  return (
    <div className="home">
      {/*HERO SECTION*/}

      <section className="hero w-full">
        <div className="hero-cta m-auto mb-10 flex w-8/12 flex-col gap-4 text-center md:w-5/12">
          <div className="h1 text-black">{hero_title}</div>
          <div className="p1-regular text-gray">{hero_description}</div>
          <button className="button-regular h-11 w-44 self-center rounded-md bg-blue-normal text-white">
            {hero_button_text}
          </button>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-screen"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="basis-3/4">
                <Image
                  src={slide.image_url}
                  width={1000}
                  height={420}
                  alt="image"
                  className="max-h-[420px] min-h-[420px] w-full rounded-lg object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/*BANNER SECTION*/}

      <section className="banner-container mt-28">
        <CircleFollowCard />
      </section>

      {/*ABOUT US SECTION*/}

      <section className="about-us mb-20 mt-20 flex flex-col gap-8 px-10 md:flex-row md:px-12 lg:px-[15%]">
        <div className="about-us-images basis-full md:basis-1/2">
          <div className="flex">
            <Image
              src={page.about_image_1_url as string}
              alt="about-image-1"
              width={380}
              height={230}
            />
            <Image
              src={page.about_image_2_url as string}
              alt="about-image-1"
              className="h-[80px] w-[75px]"
              width={75}
              height={80}
            />
          </div>
          <Image
            src={page.about_image_3_url as string}
            alt="about-image-1"
            width={480}
            height={260}
          />
        </div>
        <div className="about-us-text flex basis-full flex-col gap-3 md:basis-1/2">
          <p className="sub-title p1-regular">About us</p>
          <p className="title h3">
            Global Representation of Nepalis Across Borders
          </p>
          <p className="p1-regular text-gray">{aboutDescription}</p>
          <button className="button-regular h-11 w-44 rounded-md bg-blue-normal text-white">
            Read More
          </button>
        </div>
      </section>

      {/*STATISTICS SECTION*/}

      <section className="statistics flex w-full flex-wrap justify-center gap-16 px-8 sm:gap-12 md:justify-between md:gap-16 md:px-[15%] lg:flex-nowrap">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-block sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
          >
            <p className="h3 text-violet-normal">{stat.title} +</p>
            <p className="p1-regular text-gray">{stat.description}</p>
          </div>
        ))}
      </section>

      {/*WHY CHOOSE US SECTION*/}

      <section className="why-choose-us mb-20 mt-20 flex flex-wrap px-10 md:px-[15%] lg:flex-nowrap">
        <div className="box-1 relative max-h-[400px] bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] pl-16 pt-16">
          <div className="choose-us-text flex w-3/5 flex-col items-start gap-3">
            <p className="p1-regular">Why Choose Us</p>
            <p className="h3 text-blue-normal">{why_title}</p>
            <p className="p1-regular text-gray">{why_description}</p>
            <Link href={why_cta_link}>
              <BlueButton className="mt-3 bg-blue-normal">
                {why_cta_title}
              </BlueButton>
            </Link>
          </div>
        </div>
        <div className="box-2 relative max-h-[400px] bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] pl-[10%] pr-5 pt-4">
          <div className="community-container grid grid-cols-2 grid-rows-2 gap-5">
            <div className="col-span-full rounded-lg border border-white-light bg-white bg-opacity-40 p-4">
              <div className="flex justify-center">
                {why_images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="-ml-2 max-h-12 min-h-12 min-w-12 max-w-12 rounded-full border-2 border-white bg-blue-normal object-cover"
                  />
                ))}
              </div>
              <p className="label-regular text-center">Vast Community</p>
            </div>
            <div className="flex flex-col rounded-lg border border-white-light bg-white bg-opacity-40 p-3">
              <LucideGlobe className="h-8 w-8 rounded-full bg-white-light p-2 text-blue-normal" />
              <div className="h5">+</div>
              <div className="label-regular text-gray">Global Presence</div>
            </div>
            <div className="rounded-lg border border-white-light bg-white bg-opacity-40 p-3">
              <LucideChartColumn className="h-8 w-8 rounded-full bg-white-light p-2 text-blue-normal" />
              <div className="h5">500+</div>
              <div className="label-regular text-gray">Proven Impact</div>
            </div>
          </div>

          <div className="watch-video bottom-7 left-6 flex items-center gap-2 md:absolute">
            <LucidePlay className="h-16 w-16 rounded-full bg-white-light p-5 text-blue-normal" />
            <p className="p1-medium">Watch Video</p>
          </div>
        </div>
      </section>

      {/*GET INVOLVED SECTION*/}

      <section className="get-involved px-8 md:px-[15%]">
        <div className="get-involved-text mb-11">
          <p className="p1-regular">Get Involved</p>
          <p className="h3">{involved_title}</p>
          <p className="p1-regular text-gray">{involved_description}</p>
        </div>
        <div className="card-container flex flex-col gap-4 md:flex-row md:gap-8">
          {getInvolvedCards.map((card, index) => (
            <div
              key={index}
              className="card flex h-auto min-h-[360px] w-full flex-col items-start gap-3 rounded-3xl bg-violet-normal px-6 py-10 md:w-1/3 md:px-10 md:py-14"
            >
              <p className="p1-medium text-white">{card.title}</p>
              <p className="pr-8 text-2xl font-bold text-white">
                {card.description}
              </p>
              <WhiteButton className="p1-regular bg-white hover:bg-violet-normal hover:text-white">
                <ArrowUpRight />
                {card.cta_title}
              </WhiteButton>
            </div>
          ))}
        </div>
      </section>

      {/*PRESIDENT'S MESSAGE SECTION*/}

      <section className="president mt-11 flex flex-wrap gap-10 px-[15%]">
        <div className="president-message flex flex-col items-start justify-center gap-3 md:basis-1/2">
          <p className="p1-regular">One Diaspora, One Purpose</p>
          <p className="h5 italic">{aboutMessage}</p>
          <p>Dr. Badri K.C. President</p>
          <BlueButton className="mt-3">Read Full Message</BlueButton>
        </div>
        <div className="president-image">
          <Image
            src={"/NRNA 1.png"}
            alt="president-image"
            height={612}
            width={408}
          ></Image>
        </div>
      </section>

      {/*STAY UPDATED SECTION*/}

      <section className="stay-updated bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] px-8 py-20 md:px-[15%]">
        <div className="stay-updated-text mb-11">
          <p className="p1-regular">Stay Updated</p>
          <p className="h3">{stay_updated_title}</p>
          <p className="p1-regular">{stay_updated_description}</p>
        </div>
        <div className="notice-and-events flex flex-wrap gap-10 lg:flex-nowrap">
          <div className="notices flex flex-col gap-6 md:basis-1/2 md:items-start">
            <p>Notice</p>
            <div className="notice-card-container flex flex-col gap-3">
              {notices.slice(0, 4).map((notice, index) => (
                <div
                  key={index}
                  className="notice-card rounded-lg border border-white-normal bg-blue-light p-4"
                >
                  <p className="label-medium text-gray">{notice.date}</p>
                  <p className="p1-medium">{notice.title.rendered}</p>
                </div>
              ))}
            </div>
            <WhiteButton>
              <ArrowUpRight />
              View More
            </WhiteButton>
          </div>
          <div className="events flex flex-col gap-5 md:basis-1/2 md:items-start">
            <p>Events</p>
            <div className="event-card-container grid grid-cols-2 grid-rows-2 gap-4">
              {events.slice(0, 4).map((event, index) => (
                <div
                  key={index}
                  className="event-card rounded-lg border border-white-light bg-blue-light p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {event._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                      <Image
                        height={64}
                        width={100}
                        alt="event-image"
                        src={
                          event._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                        }
                        className="rounded-lg"
                      />
                    )}

                    <div className="event-date flex items-center gap-2 text-gray">
                      <p className="h1">
                        {new Date(event.event_start_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                          },
                        )}
                      </p>
                      <p className="p1-regular">Dec</p>
                    </div>
                  </div>
                  <div>
                    <p className="p1-medium">{event.title.rendered}</p>
                    <p className="label-medium text-gray">Kathmandu, Nepal</p>
                  </div>
                </div>
              ))}
            </div>

            <WhiteButton>
              <ArrowUpRight />
              View More
            </WhiteButton>
          </div>
        </div>
      </section>

      {/*LATEST NEWS AND UPDATES */}

      <section className="latest-news px-8 py-20 md:px-[15%]">
        <div className="latest-news-text mb-10">
          <p className="p1-regular">Latest News & Updates</p>
          <p className="h3">{latest_news_title}</p>
          <p className="p1-regular">{latest_news_description}</p>
        </div>

        <div className="flex flex-wrap gap-8 lg:flex-nowrap">
          <div className="big-news">
            <img
              src={news?.[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
              className="big-news-image mb-3 h-[80%] w-full rounded-lg"
              alt="latest news image"
            />
            <p className="label-medium text-gray">{news?.[0].date}</p>
            <p className="font-bold">{news?.[0].title.rendered}</p>
          </div>
          <div className="more-news flex flex-col gap-3">
            {news.slice(1, 5).map((single_news, index) => (
              <div key={index} className="news-card py-1">
                <p className="label-medium text-gray">{single_news.date}</p>
                <p className="font-bold">{single_news.title.rendered}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Our Initiatives*/}

      <section className="our-intiatives bg-[linear-gradient(to_bottom,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_60%,transparent_60%,transparent_100%)] py-20">
        <div className="our-initiatives-text flex flex-col gap-3 pl-10 md:pl-[15%]">
          <p className="p1-regular">Our Initiatives</p>
          <p className="h3">Transformative Projects Worldwide</p>
          <p className="p1-regular text-gray">
            Explore NRNA projects driving impact across communities and
            supporting global Nepali Initiatives
          </p>
        </div>
        <Carousel className="project-cards-container mt-11 flex w-[140%] gap-8">
          <CarouselContent className="flex gap-4 pl-14 md:pl-60">
            {projects.map((project) => {
              // get featured image URL
              const imageUrl =
                project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

              return (
                <CarouselItem
                  key={project.id}
                  className="project-card flex max-w-80 flex-col overflow-hidden rounded-lg bg-white pl-0"
                >
                  <div className="project-card-text p-6">
                    <p className="label-medium text-gray">{project.date}</p>
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

      <section className="join-the-journey mt-10 flex flex-wrap bg-[linear-gradient(to_bottom,#3082BF_0%,#2A2A6B_100%)] px-[10%] py-28 text-white lg:flex-nowrap">
        <div className="world-map basis-full md:basis-2/3">
          <WorldMap />
        </div>
        <div className="journey-text flex flex-col items-start gap-3 md:basis-1/2">
          <p className="p1-regular">Join the Journey</p>
          <p className="h3">{journey_title}</p>
          <p className="p1-regular">{journey_description}</p>
          <Link href={journey_cta_link}>
            <WhiteButton className="mt-7">{journey_cta_title}</WhiteButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
