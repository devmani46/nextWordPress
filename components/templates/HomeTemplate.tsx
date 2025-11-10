import { getPageBySlug, Page } from "@/lib/wordpress";
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

  const aboutDescription = aboutPage.meta.about_hero_description as string;

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

      <section className="about-us flex gap-16 mt-20 mb-20 px-[10%]">
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

      <section className="statistics w-full flex gap-16 px-[10%] justify-between">
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

      <section className=" mt-20 px-[10%] mb-20">
        <div className="box-1 max-h-[400px]"></div>
      </section>

      {/*GET INVOLVED SECTION*/}

      <section className="get-involved px-[10%]">
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
          <p className="h5 italic">
            “With deep gratitude and humility, we pledge to lead NRNA with
            transparency, unity, and accountability, empowering the global
            Nepali diaspora to drive change, foster cooperation, and contribute
            meaningfully to Nepal’s progress.”
          </p>
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

      <section className="stay-updated bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)] py-20 px-[10%]">
        <div className="stay-updated-text mb-11">
          <p className="p1-regular">Stay Updated</p>
          <p className="h3">Explore What's Happening at NRNA</p>
          <p className="p1-regular">
            Stay updated with NRNA announcements, events and activities
            worldwide
          </p>
        </div>
        <div className="notice-and-events flex gap-10">
          <div className="notices flex flex-col gap-6">
            <p>Notice</p>
            <div className="notice-card-container flex flex-col gap-3">
              <div className="notice-card p-4 bg-blue-light border border-white-normal rounded-lg ">
                <p className="label-medium text-gray">January 15, 2024</p>
                <p className="p1-medium">
                  Tender Notice:Invitation for Sealed Bids
                </p>
              </div>
              <div className="notice-card p-4 bg-blue-light border border-white-normal rounded-lg">
                <p className="label-medium text-gray ">January 15, 2024</p>
                <p className="p1-medium">
                  Tender Notice:Invitation for Sealed Bids
                </p>
              </div>
              <div className="notice-card p-4 bg-blue-light border border-white-normal rounded-lg">
                <p className="label-medium text-gray">January 15, 2024</p>
                <p className="p1-medium">
                  Tender Notice:Invitation for Sealed Bids
                </p>
              </div>
              <div className="notice-card p-4 bg-blue-light border border-white-normal rounded-lg">
                <p className="label-medium text-gray">January 15, 2024</p>
                <p className="p1-medium">
                  Tender Notice:Invitation for Sealed Bids
                </p>
              </div>
            </div>
            <Button>
              <ArrowUpRight />
              View More
            </Button>
          </div>
          <div className="events flex flex-col gap-5">
            <p>Events</p>
            <div className="event-card-container">
              <div className="event-card p-4 bg-blue-light rounded-lg border border-white-light">
                <div>
                  <div className="event-image"></div>
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
                <div>
                  <div className="event-image"></div>
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
                <div>
                  <div className="event-image"></div>
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
                <div>
                  <div className="event-image"></div>
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

      <section className="latest-news px-[10%] py-20 ">
        <div className="latest-news-text mb-10">
          <p>Latest News & Updates</p>
          <p>NRNA News & Highlights</p>
          <p>
            Get the most recent news, stories and updates from NRNA worldwide
          </p>
        </div>

        <div className="flex gap-8">
          <div className="big-news">
            <div className="big-news-image w-full h-[80%] bg-gray mb-3"></div>
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

      <section className="our-intiatives px-[10%]">
        <p className="p1-regular">Our Initiatives</p>
        <p className="h3">Transformative Projects Worldwide</p>
        <p className="p1-regular text-gray">
          Explore NRNA projects driving impact across communities and supporting
          global Nepali Initiatives
        </p>

        <div className="project-cards-container ">
          <div className="project-card w-80 flex flex-col">
            <div className="project-card-text p-6">
              <p className="label-medium text-gray">January 16, 2024</p>
              <p className="p1-medium">
                12th NRN Global Conference & NRNA International General Assembly
                2025
              </p>
            </div>
            <div className="project-card-image bg-gray w-full h-60 "></div>
          </div>
        </div>
      </section>
    </div>
  );
}
