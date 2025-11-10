import {
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
import { ArrowUpRight } from "lucide-react";
import CircleFollowCard from "../banner/fw-banner";
import { Notice } from "@/lib/wordpress";
import { Project } from "@/lib/wordpress";

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
  console.log(notices);
  const projects: Project[] = await getAllProjects();

  const aboutDescription = aboutPage.meta.about_hero_description as string;
  const aboutMessage = aboutPage.meta.about_message_description as string;

  if (slides.length === 0) return null; //nothing to show

  return (
    <div className="home">
      {/*HERO SECTION*/}

      <section className="hero w-full">
        <div className="hero-cta m-auto text-center flex flex-col gap-4 w-5/12 mb-10">
          <div className="h1 text-black">{hero_title}</div>
          <div className="p1-regular text-gray">{hero_description}</div>
          <button className="button-regular self-center text-white bg-blue-normal rounded-md w-44 h-11">
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
                  className="w-full min-h-[420px] max-h-[420px] object-cover rounded-lg"
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

      <section className="about-us flex gap-16 mt-20 mb-20 px-[15%]">
        <div className="about-us-images basis-1/2 ">
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
              className="w-[75px] h-[80px]"
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
        <div className="about-us-text basis-1/2 flex flex-col gap-3">
          <p className="sub-title p1-regular">About us</p>
          <p className="title h3">
            Global Representation of Nepalis Across Borders
          </p>
          <p className="p1-regular text-gray">{aboutDescription}</p>
          <button className="button-regular text-white bg-blue-normal rounded-md w-44 h-11">
            Read More
          </button>
        </div>
      </section>

      {/*STATISTICS SECTION*/}

      <section className="statistics w-full flex gap-16 px-[15%] justify-between">
        <div className="stat-block">
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

      <section className=" mt-20 px-[15%] mb-20 flex">
        <div className="box-1 max-h-[400px] bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] relative pl-16 pt-16">
          <div className="choose-us-text w-3/5 flex flex-col gap-3">
            <p className="p1-regular">Why Choose Us</p>
            <p className="h3 text-blue-normal">
              Join a Worldwide Network of Nepali Changemakers
            </p>
            <p className="p1-regular text-gray">
              For over 22 years, NRNA has been connecting Nepalis worldwide,
              building a trusted global community, and shaping policies that
              protect and empower our people.
            </p>
            <Button className="mt-3 bg-blue-normal">Join the Network</Button>
          </div>
        </div>
        <div className="box-2 max-h-[400px] bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] pl-[10%] pt-4 pr-5">
          <div className="community-container grid grid-cols-2 grid-rows-2 gap-5">
            <div className="col-span-full p-4  bg-white bg-opacity-40 border border-white-light  rounded-lg">
              <div className="flex justify-center ">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="bg-blue-normal p-4 rounded-full border-2 border-white
                    -ml-2"
                  />
                ))}
              </div>
            </div>
            <div className="bg-white bg-opacity-40 border border-white-light  rounded-lg"></div>
            <div className="bg-white bg-opacity-40 border border-white-light  rounded-lg"></div>
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
              className="card py-14 px-10 bg-violet-normal rounded-3xl h-[360px]  "
            >
              <p className="p1-medium text-white">{card.title}</p>
              <p className="text-3xl font-bold text-white pr-8">
                {card.description}
              </p>
              <Button
                className="bg-white text-black mt-3 p1-regular border p-3 hover:bg-violet-normal hover:text-white"
                size={"lg"}
              >
                <ArrowUpRight />
                {card.cta_title}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/*PRESIDENT'S MESSAGE SECTION*/}

      <section className="president flex gap-10 mt-11 px-[15%]">
        <div className="president-message basis-1/2">
          <p className="p1-regular">One Diaspora, One Purpose</p>
          <p className="h5 italic">{aboutMessage}</p>
          <p>Dr. Badri K.C. President</p>
          <button>Read Full Message</button>
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

      <section className="stay-updated bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] py-20 px-[15%]">
        <div className="stay-updated-text mb-11">
          <p className="p1-regular">Stay Updated</p>
          <p className="h3">Explore What's Happening at NRNA</p>
          <p className="p1-regular">
            Stay updated with NRNA announcements, events and activities
            worldwide
          </p>
        </div>
        <div className="notice-and-events flex gap-10">
          <div className="notices basis-1/2 flex flex-col gap-6">
            <p>Notice</p>
            <div className="notice-card-container flex flex-col gap-3">
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="notice-card p-4 bg-blue-light border border-white-normal rounded-lg "
                >
                  <p className="label-medium text-gray">{notice.date}</p>
                  <p className="p1-medium">{notice.title.rendered}</p>
                </div>
              ))}
            </div>
            <Button>
              <ArrowUpRight />
              View More
            </Button>
          </div>
          <div className="events basis-1/2 flex flex-col gap-5">
            <p>Events</p>
            <div className="event-card-container grid grid-cols-2 grid-rows-2 gap-4">
              <div className="event-card p-4 bg-blue-light rounded-lg border border-white-light">
                <div className="flex items-center gap-2">
                  <div className="event-image w-28 h-16 bg-gray"></div>
                  <div className="event-date flex">
                    <p className="h1">5</p>
                    <p className="p1-regular">Dec</p>
                  </div>
                </div>
                <div>
                  <p className="p1-medium">12th NRN Global Conference</p>
                  <p className="label-medium text-gray">Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="event-card p-4 bg-blue-light rounded-lg border border-white-light">
                <div className="flex items-center gap-2">
                  <div className="event-image w-28 h-16 bg-gray"></div>
                  <div className="event-date flex">
                    <p className="h1">5</p>
                    <p className="p1-regular">Dec</p>
                  </div>
                </div>
                <div>
                  <p className="p1-medium">12th NRN Global Conference</p>
                  <p className="label-medium text-gray">Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="event-card p-4 bg-blue-light rounded-lg border border-white-light">
                <div className="flex items-center gap-2">
                  <div className="event-image w-28 h-16 bg-gray"></div>
                  <div className="event-date flex">
                    <p className="h1">5</p>
                    <p className="p1-regular">Dec</p>
                  </div>
                </div>
                <div>
                  <p className="p1-medium">12th NRN Global Conference</p>
                  <p className="label-medium text-gray">Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="event-card p-4 bg-blue-light rounded-lg border border-white-light">
                <div className="flex items-center gap-2">
                  <div className="event-image w-28 h-16 bg-gray"></div>
                  <div className="event-date flex">
                    <p className="h1">5</p>
                    <p className="p1-regular">Dec</p>
                  </div>
                </div>
                <div>
                  <p className="p1-medium">12th NRN Global Conference</p>
                  <p className="label-medium text-gray">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            <Button>
              <ArrowUpRight />
              View More
            </Button>
          </div>
        </div>
      </section>

      {/*LATEST NEWS AND UPDATES */}

      <section className="latest-news px-[15%] py-20 ">
        <div className="latest-news-text mb-10">
          <p className="p1-regular">Latest News & Updates</p>
          <p className="h3">NRNA News & Highlights</p>
          <p className="p1-regular">
            Get the most recent news, stories and updates from NRNA worldwide
          </p>
        </div>

        <div className="flex gap-8">
          <div className="big-news">
            <div className="big-news-image w-full h-[80%] bg-gray mb-3 rounded-lg"></div>
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

      <section className="our-intiatives px-[15%] bg-[linear-gradient(to_bottom,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_60%,transparent_60%,transparent_100%)] py-20">
        <div className="our-initiatives-text flex flex-col gap-3">
          <p className="p1-regular">Our Initiatives</p>
          <p className="h3">Transformative Projects Worldwide</p>
          <p className="p1-regular text-gray">
            Explore NRNA projects driving impact across communities and
            supporting global Nepali Initiatives
          </p>
        </div>
        <div className="project-cards-container flex gap-8 mt-11 w-[140%] ">
          {projects.map((project) => {
            // get featured image URL
            const imageUrl =
              project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <div
                key={project.id}
                className="project-card w-80 flex flex-col rounded-lg bg-white overflow-hidden"
              >
                <div className="project-card-text p-6">
                  <p className="label-medium text-gray">{project.date}</p>
                  <p className="p1-medium">{project.title.rendered}</p>
                </div>
                <div
                  className="project-card-image w-full h-60 bg-gray relative flex flex-col justify-end"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="buttons-container flex bg-gray bg-opacity-10 backdrop-blur-lg text-white">
                    <button className="basis-1/2 py-3 border-r border-t">
                      Register
                    </button>
                    <button className="basis-1/2 py-3  border-t">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/*JOIN THE JOURNEY*/}

      <section className="join-the-journey flex px-[15%] py-28 mt-10 bg-[linear-gradient(to_bottom,#3082BF_0%,#2A2A6B_100%)] text-white">
        <div className="world-map basis-1/2"></div>
        <div className="journey-text basis-1/2 flex flex-col gap-3">
          <p className="p1-regular">Join the Journey</p>
          <p className="h3">
            Connect with a Global Network of Nepali Trailblazers
          </p>
          <p className="p1-regular">
            Millions of Nepalese across 100+ countries are shaping Nepal's
            tomorrow through unity, leadership, and action
          </p>
          <Button className="mt-3">Join the Network</Button>
        </div>
      </section>
    </div>
  );
}
