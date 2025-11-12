import {
  Event,
  getAllEvents,
  getAllNotices,
  getAllProjects,
  getPageBySlug,
  getPostBySlug,
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
    about_image_1_url?: string;
    about_image_2_url?: string;
    about_image_3_url?: string;
  };
}

export default async function HomeTemplate({ page }: HomeTemplateProps) {
  const hero_title = page.meta.hero_title as string;
  const hero_description = page.meta.hero_description as string;
  const button_text = page.meta.hero_cta_title as string;
  const slider_image1 = page.slider_items?.[0];
  const slides = page.slider_items || [];
  const getInvolvedCards = page.involved_actions || [];

  const aboutPage = await getPageBySlug("about");
  const notices: Notice[] = await getAllNotices();
  const projects: Project[] = await getAllProjects();
  const events: Event[] = await getAllEvents();

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
            {button_text}
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

      <section className="about-us md:px-[15%]mb-20 mt-20 flex flex-col gap-8 px-8 md:flex-row">
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

      <section className="statistics flex w-full flex-wrap justify-between gap-16 px-8 md:px-[15%]">
        <div className="stat-block basis-full sm:basis-1/2 md:basis-1/4">
          <p className="h3 text-violet-normal">22 +</p>
          <p className="p1-regular text-gray">Countries Represented</p>
        </div>
        <div className="stat-block">
          <p className="h3 text-violet-normal">1M +</p>
          <p className="p1-regular text-gray">Registered Members</p>
        </div>
        <div className="stat-block">
          <p className="h3 text-violet-normal">500 +</p>
          <p className="p1-regular text-gray">Projects Initiated</p>
        </div>
        <div className="stat-block">
          <p className="h3 text-violet-normal">$50M +</p>
          <p className="p1-regular text-gray">Funds Mobilized</p>
        </div>
      </section>

      {/*WHY CHOOSE US SECTION*/}

      <section className="mb-20 mt-20 flex px-[15%]">
        <div className="box-1 relative max-h-[400px] bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] pl-16 pt-16">
          <div className="choose-us-text flex w-3/5 flex-col items-start gap-3">
            <p className="p1-regular">Why Choose Us</p>
            <p className="h3 text-blue-normal">
              Join a Worldwide Network of Nepali Changemakers
            </p>
            <p className="p1-regular text-gray">
              For over 22 years, NRNA has been connecting Nepalis worldwide,
              building a trusted global community, and shaping policies that
              protect and empower our people.
            </p>
            <BlueButton className="mt-3 bg-blue-normal">
              Join the Network
            </BlueButton>
          </div>
        </div>
        <div className="box-2 relative max-h-[400px] bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] pl-[10%] pr-5 pt-4">
          <div className="community-container grid grid-cols-2 grid-rows-2 gap-5">
            <div className="col-span-full rounded-lg border border-white-light bg-white bg-opacity-40 p-4">
              <div className="flex justify-center">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="-ml-2 rounded-full border-2 border-white bg-blue-normal p-4"
                  />
                ))}
              </div>
              <p className="label-regular text-center">Vast Community</p>
            </div>
            <div className="flex flex-col rounded-lg border border-white-light bg-white bg-opacity-40 p-3">
              <LucideGlobe className="h-8 w-8 rounded-full bg-white-light p-2 text-blue-normal" />
              <div className="h5">22+</div>
              <div className="label-regular text-gray">Global Presence</div>
            </div>
            <div className="rounded-lg border border-white-light bg-white bg-opacity-40 p-3">
              <LucideChartColumn className="h-8 w-8 rounded-full bg-white-light p-2 text-blue-normal" />
              <div className="h5">500+</div>
              <div className="label-regular text-gray">Proven Impact</div>
            </div>
          </div>

          <div className="watch-video absolute bottom-7 left-6 flex items-center gap-2">
            <LucidePlay className="h-16 w-16 rounded-full bg-white-light p-5 text-blue-normal" />
            <p className="p1-medium">Watch Video</p>
          </div>
        </div>
      </section>

      {/*GET INVOLVED SECTION*/}

      <section className="get-involved px-[15%]">
        <div className="get-involved-text mb-11">
          <p className="p1-regular">Get Involved</p>
          <p className="h3">Support, Engage, & Empower With NRNA</p>
          <p className="p1-regular text-gray">
            Join hands with the global Nepali community.
          </p>
        </div>
        <div className="card-container flex gap-8">
          {getInvolvedCards.map((card, index) => (
            <div
              key={index}
              className="card h-[360px] rounded-3xl bg-violet-normal px-10 py-14"
            >
              <p className="p1-medium text-white">{card.title}</p>
              <p className="pr-8 text-3xl font-bold text-white">
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

      <section className="president mt-11 flex gap-10 px-[15%]">
        <div className="president-message flex basis-1/2 flex-col items-start justify-center gap-3">
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

      <section className="stay-updated bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] px-[15%] py-20">
        <div className="stay-updated-text mb-11">
          <p className="p1-regular">Stay Updated</p>
          <p className="h3">Explore What's Happening at NRNA</p>
          <p className="p1-regular">
            Stay updated with NRNA announcements, events and activities
            worldwide
          </p>
        </div>
        <div className="notice-and-events flex gap-10">
          <div className="notices flex basis-1/2 flex-col items-start gap-6">
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
          <div className="events flex basis-1/2 flex-col items-start gap-5">
            <p>Events</p>
            <div className="event-card-container grid grid-cols-2 grid-rows-2 gap-4">
              {events.slice(0, 4).map((event, index) => (
                <div
                  key={index}
                  className="event-card rounded-lg border border-white-light bg-blue-light p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
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

      <section className="latest-news px-[15%] py-20">
        <div className="latest-news-text mb-10">
          <p className="p1-regular">Latest News & Updates</p>
          <p className="h3">NRNA News & Highlights</p>
          <p className="p1-regular">
            Get the most recent news, stories and updates from NRNA worldwide
          </p>
        </div>

        <div className="flex gap-8">
          <div className="big-news">
            <div className="big-news-image mb-3 h-[80%] w-full rounded-lg bg-gray"></div>
            <p>January 16, 2024</p>
            <p>
              इजरायलमा रहेका नेपालीको सुरक्षास्थिति मूल्यांकन गर्न एनआरएनएद्वारा
              भर्चुअल अन्तरक्रिया
            </p>
          </div>
          <div className="more-news flex flex-col gap-3">
            <div className="news-card py-1">
              <p>January 16, 2024</p>
              <p>
                इजरायलमा रहेका नेपालीको सुरक्षास्थिति मूल्यांकन गर्न
                एनआरएनएद्वारा भर्चुअल अन्तरक्रिया
              </p>
            </div>
            <div className="news-card py-1">
              <p>January 16, 2024</p>
              <p>
                इजरायलमा रहेका नेपालीको सुरक्षास्थिति मूल्यांकन गर्न
                एनआरएनएद्वारा भर्चुअल अन्तरक्रिया
              </p>
            </div>
            <div className="news-card py-1">
              <p>January 16, 2024</p>
              <p>
                इजरायलमा रहेका नेपालीको सुरक्षास्थिति मूल्यांकन गर्न
                एनआरएनएद्वारा भर्चुअल अन्तरक्रिया
              </p>
            </div>
            <div className="news-card py-1">
              <p>January 16, 2024</p>
              <p>
                इजरायलमा रहेका नेपालीको सुरक्षास्थिति मूल्यांकन गर्न
                एनआरएनएद्वारा भर्चुअल अन्तरक्रिया
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*Our Initiatives*/}

      <section className="our-intiatives bg-[linear-gradient(to_bottom,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_60%,transparent_60%,transparent_100%)] py-20">
        <div className="our-initiatives-text flex flex-col gap-3 pl-36">
          <p className="p1-regular">Our Initiatives</p>
          <p className="h3">Transformative Projects Worldwide</p>
          <p className="p1-regular text-gray">
            Explore NRNA projects driving impact across communities and
            supporting global Nepali Initiatives
          </p>
        </div>
        <Carousel className="project-cards-container mt-11 flex w-[140%] gap-8">
          <CarouselContent className="flex gap-4 pl-40">
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
                      <button className="basis-1/2 border-r border-t py-3">
                        Register
                      </button>
                      <button className="basis-1/2 border-t py-3">
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

      <section className="join-the-journey mt-10 flex bg-[linear-gradient(to_bottom,#3082BF_0%,#2A2A6B_100%)] px-[15%] py-28 text-white">
        <div className="world-map basis-1/2"></div>
        <div className="journey-text flex basis-1/2 flex-col items-start gap-3">
          <p className="p1-regular">Join the Journey</p>
          <p className="h3">
            Connect with a Global Network of Nepali Trailblazers
          </p>
          <p className="p1-regular">
            Millions of Nepalese across 100+ countries are shaping Nepal's
            tomorrow through unity, leadership, and action
          </p>
          <WhiteButton className="mt-7">Join the Network</WhiteButton>
        </div>
      </section>
    </div>
  );
}
