import { Page } from "@/lib/wordpress";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import WhiteButton from "../ui/whitebutton";
import LiquidGlass from "liquid-glass-react";
import LiquidGlassWrapper from "../ui/liquidglasswrapper";

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

interface WhoWeAreTemplateProps {
  page: Page & {
    who_we_are_vision_image_url?: string;
    who_we_are_goals_image_url?: string;
    who_we_are_certificate_image_url?: string;
  };
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

  //Images
  const who_we_are_vision_image_url =
    page.who_we_are_vision_image_url as string;
  const who_we_are_goals_image_url = page.who_we_are_goals_image_url as string;
  const who_we_are_certificate_image_url =
    page.who_we_are_certificate_image_url as string;

  return (
    <div>
      <section className="about-text px-[15%]">
        <p className="h2 mb-6">{who_we_are_hero_title}</p>
        <p>{who_we_are_hero_description}</p>
      </section>

      <section className="mission-slider relative mt-32 flex justify-center">
        <div className="our-mission absolute -top-10 z-10 w-[500px] rounded-lg border border-blue-light-active bg-white bg-opacity-70 px-6 py-3 backdrop-blur-md">
          <div className="title mb-3 flex items-center gap-3">
            <LucideGoal className="size-8 text-blue-normal" />
            <p className="h5">Our Mission</p>
          </div>
          <p className="label-regular">
            “Once a Nepali, always a Nepali” — we are committed to channeling
            our efforts for the transformation of Nepali society and
            safeguarding the welfare of Nepalis abroad, which ultimately serves
            the nation’s interest.
          </p>
        </div>
        <OverlappingCarousel images={images} autoplay loop showPagination />
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
        <div className="certificate-image h-[354px] w-full rounded-2xl bg-gray">
          <img src={who_we_are_certificate_image_url} alt="certificate" />
        </div>
        <div className="certificate-text flex flex-col gap-3 px-0 md:px-[10%]">
          <p className="p1-regular">Official Recognition</p>
          <p className="h3">{who_we_are_certificate_title}</p>
          <p className="p1-regular">{who_we_are_certificate_description}</p>
        </div>
      </section>

      {/*President's Message*/}

      <section className="presidents-message mt-20 flex px-[15%]">
        <div className="message-text basis-3/5">
          <p className="h3">President&apos;s</p>
          <p className="h3 mb-10">Message</p>
          <p className="p1-regular text-gray">
            Honoring the trust which all the members of NRNA have never seen fit
            to place in us, we owe the team a debt of sincere gratitude. We are
            deeply humbled by the support of everyone to have us provided a fair
            shake to contribute to the NRNA, the Nepali diaspora and Nepali
            society as the designated presidents of the Non-Resident Nepali
            Association (NRNA) for 2023-25. We would like to express our
            appreciation towards everyone who aided to the successful conduction
            of the 11th Global Conference and IGA 2023. As the presidents, we
            ensure to do best to be voice of change and to maintain transparency
            and accountability.
          </p>
          <p>Dr. Badri K.C.</p>
          <p>President</p>
        </div>
        <div className="president-image-container relative basis-2/5">
          <img src="/NRNA 1.png" className="object-fill" alt="pres" />
          <div className="absolute bottom-0 left-0 z-10 h-[450px] w-full bg-gradient-to-t from-white to-transparent" />
        </div>
      </section>

      {/*MEET THE TEAM*/}

      <section className="meet-the-team mt-20 flex flex-col gap-11 px-[15%]">
        <div className="certificate-image h-[354px] w-[1064px] rounded-2xl bg-gray"></div>
        <div className="certificate-text flex flex-col items-start gap-3 px-[10%]">
          <p className="p1-regular">The Team</p>
          <p className="h3">Meet the TEAM Behind NRNA</p>
          <p className="p1-regular">
            From visionary leaders to dedicated volunteers, our team is united
            by one mission—serving Nepalis worldwide. At the core of NRNA is a
            team of passionate individuals who believe in the power of unity and
            community. From visionary leaders shaping our direction to dedicated
            volunteers working tirelessly on the ground, each member brings
            unique skills, experiences, and a shared commitment to connecting
            Nepalis across the globe. Together, they turn ideas into action,
            challenges into opportunities, and dreams into reality—making NRNA
            not just an organization, but a family working for a common purpose.
          </p>
          <WhiteButton>
            <ArrowUpRight className="text-amber-500" /> Meet Our Team
          </WhiteButton>
        </div>
      </section>

      {/*JOIN NRNA TODAY*/}

      <section className="join-nrna mt-20 flex bg-blue-normal px-[15%] py-20">
        <div className="join-text flex basis-1/2 flex-col items-start gap-3 text-white">
          <p className="h1">Not a Member Yet?</p>
          <p className="h1">Join NRNA Today!</p>
          <p className="p1-regular">
            Unlock exclusive discounts, connect with the global Nepali
            community, and access premium benefits designed specifically for our
            members worldwide.
          </p>

          <ul className="p1-regular flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">
                check_circle
              </span>
              Access to 500+ partner discounts
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">
                check_circle
              </span>
              Global Networking opportunities
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">
                check_circle
              </span>
              Exclusive events and webinars
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">
                check_circle
              </span>
              Priority Customer support
            </li>
          </ul>

          <WhiteButton className="mt-5">Become A Member</WhiteButton>
        </div>
        <div className="join-stats grid basis-1/2 grid-cols-2 grid-rows-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-light border-opacity-40 bg-white bg-opacity-15">
            <Spotlight size={128} className="opacity-35 blur-2xl" />
            <span className="material-symbols-outlined mb-3 rounded-lg bg-blue-light-active p-3 text-blue-normal">
              diversity_2
            </span>
            <p className="text-3xl font-semibold text-white">50,000+</p>
            <p className="p1-regular text-white">Active Members</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-light border-opacity-40 bg-white bg-opacity-15">
            <span className="material-symbols-outlined mb-3 rounded-lg bg-blue-light-active p-3 text-blue-normal">
              globe_uk
            </span>
            <p className="text-3xl font-semibold text-white">80+</p>
            <p className="p1-regular text-white">Countries</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-light border-opacity-40 bg-white bg-opacity-15">
            <span className="material-symbols-outlined mb-3 rounded-lg bg-blue-light-active p-3 text-blue-normal">
              join_right
            </span>
            <p className="text-3xl font-semibold text-white">500+</p>
            <p className="p1-regular text-white">Partner Outlets</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-light border-opacity-40 bg-white bg-opacity-15">
            <span className="material-symbols-outlined mb-3 rounded-lg bg-blue-light-active p-3 text-blue-normal">
              temp_preferences_eco
            </span>
            <p className="text-3xl font-semibold text-white">$2M+</p>
            <p className="p1-regular text-white">Total savings</p>
          </div>
        </div>
      </section>

      {/*FAQ*/}

      <section className="faq-section mt-20 px-[15%]">
        <p className="p1-regular mb-3">FAQs</p>
        <p className="h3 mb-6">Everything you need to know</p>
        <div className="flex gap-4">
          <div className="faqs basis-3/4">
            <Accordion
              type="single"
              className="rounded-2xl border border-gray border-opacity-50"
              collapsible
            >
              <AccordionItem className="px-6" value="item-1">
                <AccordionTrigger className="p1-medium">
                  Is it whatever?
                </AccordionTrigger>
                <AccordionContent className="p1-regular">
                  Yes. it is something something
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="px-6 py-3" value="item-2">
                <AccordionTrigger>Is it whatever?</AccordionTrigger>
                <AccordionContent>
                  Yes. it is something something
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="px-6 py-3" value="item-3">
                <AccordionTrigger>Is it whatever?</AccordionTrigger>
                <AccordionContent>
                  Yes. it is something something
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="px-6 py-3" value="item-4">
                <AccordionTrigger>Is it whatever?</AccordionTrigger>
                <AccordionContent>
                  Yes. it is something something
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="more-questions flex basis-1/4 flex-col items-center justify-center gap-3 rounded-2xl border border-gray border-opacity-50 px-8 text-center">
            <span className="material-symbols-outlined h-10 w-10 text-5xl">
              chat_bubble
            </span>
            <p className="p1-medium">Do you have more questions?</p>
            <p className="p1-regular text-gray">
              Reach out to our team & we&apos;ll get back to you quickly
            </p>
            <BlueButton>Get in Touch</BlueButton>
          </div>
        </div>
      </section>
    </div>
  );
}
