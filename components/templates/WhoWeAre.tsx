import { Page } from "@/lib/wordpress";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import WhiteButton from "../ui/whitebutton";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import BlueButton from "../ui/bluebutton";

interface WhoWeAreTemplateProps {
  page: Page;
}

export default async function WhoWeAreTemplate({
  page,
}: WhoWeAreTemplateProps) {
  return (
    <div>
      <section className="about-text px-[15%]">
        <p className="h2">About NRNA</p>
        <p>
          NRNA was founded on 11 October 2003 to unite the Nepali diaspora under
          one umbrella. Over the past 20 years, it has grown into a global
          non-governmental organization with National Coordination Councils in
          88 countries, representing the interests and commitments of Nepalis
          worldwide.
          <br />
          <br />
          No matter where Nepalis go or what nationality we adopt, we never
          forget the land that defines our identity and soul. We celebrate
          Nepal’s successes and share in her struggles. Guided by the belief
          that “once a Nepali, always a Nepali,” NRNA channels the energy and
          resources of the diaspora toward the transformation of Nepali society.
          Recognizing the vital role of its diaspora, the Government of Nepal
          granted legal status to NRNs through the Non-Resident Nepali Act 2064.
          Today, NRNA represents Nepali interests globally as a strong, united
          network of people of Nepali origin living beyond SAARC countries.
        </p>
      </section>

      <section className="mission-slider flex justify-center">
        <Carousel
          opts={{
            align: "center", // keeps active item centered
            loop: true,
          }}
          className="w-[900px] overflow-visible" // let side items peek out
        >
          <CarouselContent className="-ml-2">
            {" "}
            {/* adjust spacing */}
            {[1, 2, 3].map((item) => (
              <CarouselItem
                key={item}
                className="basis-[80%] pl-2 transition-transform duration-300 ease-in-out"
              >
                <div className="slider-image h-[420px] w-full rounded-2xl bg-gray shadow-lg"></div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/*OUR VISION IN ACTION*/}
      <section className="our-vision mt-20 flex px-[15%]">
        <div className="everything-container flex h-[520px] w-full rounded-2xl bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]">
          <div className="empty-test-block relative basis-1/2">
            <div className="red-block absolute -left-10 -top-6 h-[520px] w-[450px] rounded-2xl bg-blue-normal"></div>
          </div>
          <div className="text-block flex basis-1/2 flex-col gap-3 py-11 pr-20">
            <p className="p1-regular">Our Vision in Action</p>
            <p className="h3 text-blue-normal">Strategic Goals: </p>
            <p className="p1-regular text-gray">
              The Strategic Goals of NRNA is to unite and bring Nepali residing
              all over the world under one umbrella; protect and promote their
              interest in and outside Nepal and utilize their potentials and
              resources for the welfare of Nepal. To achieve these objectives
              the association shall conduct the following activities: Promote
              and protect the rights and interest of Nepalis residing outside
              Nepal Establish a global network and a common platform for Nepalis
              Diaspora Attract and facilitate NRNs investment including foreign
              direct investment (FDI) for economic and social development of
              Nepal Promote tourism and preserve Nepali culture and heritage
              globally Mobilize the knowledge, skills, capital and other
              resources within the disposal of NRNs for the socio economic
              development of Nepal.
            </p>
          </div>
        </div>
      </section>

      {/*TURNING GOALS INTO REALITY*/}

      <section className="turning-goals mt-20 flex px-[15%]">
        <div className="everything-container flex h-[520px] w-full rounded-2xl bg-[linear-gradient(180deg,rgba(234,243,249,1)_0%,rgba(191,216,235,1)_50%,rgba(224,224,244,1)_100%)]">
          <div className="text-block flex basis-1/2 flex-col gap-3 py-11 pl-20">
            <p className="p1-regular">Our Vision in Action</p>
            <p className="h3 text-blue-normal">Strategic Goals: </p>
            <p className="p1-regular text-gray">
              The Strategic Goals of NRNA is to unite and bring Nepali residing
              all over the world under one umbrella; protect and promote their
              interest in and outside Nepal and utilize their potentials and
              resources for the welfare of Nepal. To achieve these objectives
              the association shall conduct the following activities: Promote
              and protect the rights and interest of Nepalis residing outside
              Nepal Establish a global network and a common platform for Nepalis
              Diaspora Attract and facilitate NRNs investment including foreign
              direct investment (FDI) for economic and social development of
              Nepal Promote tourism and preserve Nepali culture and heritage
              globally Mobilize the knowledge, skills, capital and other
              resources within the disposal of NRNs for the socio economic
              development of Nepal.
            </p>
          </div>
          <div className="empty-test-block relative basis-1/2">
            <div className="red-block absolute -right-10 -top-6 h-[520px] w-[450px] rounded-2xl bg-blue-normal"></div>
          </div>
        </div>
      </section>

      {/*CERTIFICATE SECTION*/}

      <section className="certificate-section mt-20 flex flex-col gap-11 px-[15%]">
        <div className="certificate-image h-[354px] w-[1064px] rounded-2xl bg-gray"></div>
        <div className="certificate-text flex flex-col gap-3 px-[10%]">
          <p className="p1-regular">Official Recognition</p>
          <p className="h3">Certificate of Registration</p>
          <p className="p1-regular">
            The Non-Resident Nepali Association (NRNA) is officially registered
            as a global organization representing the interests, identity, and
            unity of Nepalis living abroad. The Certificate of Registration
            authenticates NRNA’s legal status and recognition, ensuring its
            operations are legitimate and accountable. This certificate reflects
            NRNA’s commitment to working transparently with governments,
            institutions, and communities worldwide, while safeguarding the
            rights and welfare of the Nepali diaspora. It stands as a mark of
            trust, credibility, and dedication towards building stronger
            connections between Nepal and Nepalis across the globe.
          </p>
        </div>
      </section>

      {/*President's Message*/}

      <section className="presidents-message mt-20 flex px-[15%]">
        <div className="message-text basis-1/2">
          <p>President's</p>
          <p>Message</p>
          <p>
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
        <div className="president-image-container basis-1/2 bg-gray">
          <div className="president-image"></div>
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

          <ul className="p1-regular">
            <li>Access to 500+ partner discounts</li>
            <li>Global Networking opportunities</li>
            <li>Exclusive events and webinars</li>
            <li>Priority Customer support</li>
          </ul>

          <WhiteButton>Become A Member</WhiteButton>
        </div>
        <div className="join-stats grid basis-1/2 grid-cols-2 grid-rows-2 gap-4">
          <div className="rounded-2xl bg-white bg-opacity-15"></div>
          <div className="rounded-2xl bg-white bg-opacity-15"></div>
          <div className="rounded-2xl bg-white bg-opacity-15"></div>
          <div className="rounded-2xl bg-white bg-opacity-15"></div>
        </div>
      </section>

      {/*FAQ*/}

      <section className="faq-section mt-20 px-[15%]">
        <p>FAQs</p>
        <p>Everything you need to know</p>
        <div className="flex gap-4">
          <div className="faqs basis-3/4">
            <Accordion
              type="single"
              className="rounded-2xl border border-gray border-opacity-50"
              collapsible
            >
              <AccordionItem className="px-6 py-3" value="item-1">
                <AccordionTrigger>Is it whatever?</AccordionTrigger>
                <AccordionContent>
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

          <div className="more-questions basis-1/4 rounded-2xl border border-gray border-opacity-50">
            <div className="chat-bubble"></div>
            <p>Do you have more questions?</p>
            <p>Reach out to our team & we'll get back to you quickly</p>
            <BlueButton>Get in Touch</BlueButton>
          </div>
        </div>
      </section>
    </div>
  );
}
