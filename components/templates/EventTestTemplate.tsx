import { Page } from "@/lib/wordpress";
import BlueButton from "../ui/bluebutton";
import Countdown from "../countdown/countdown";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "../animate-ui/components/animate/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../motion-primitives/accordion";
import { InfiniteSlider } from "../motion-primitives/infinite-slider";
import Image from "next/image";
import CircleFollowCard from "../banner/fw-banner";
import Faqs from "../fw-faqs/fw-faqs";
import DownloadCard from "../downloads/DownloadCard";

interface EventtestProps {
  page: Page;
}

export default function EventtestTemplate({ page }: EventtestProps) {
  return (
    <div>
      <section className="mb-20 px-[15%]">
        <div className="flex items-center justify-between">
          <div>
            <p className="h2">2nd International Youth Conference</p>
            <p className="p1-regular">Rembrandt Hotel in bangkok, Thailand</p>
          </div>
          <BlueButton>Register Now</BlueButton>
        </div>
        <p className="text-blue-normal">
          Empowering the youth, shaping the PNO's Future
        </p>

        <div className="mt-6 h-[550px] w-full rounded-2xl bg-gray"></div>
      </section>

      {/*EVENT COUNTDOWN*/}
      <section className="flex w-full justify-center px-[20%]">
        <Countdown />
      </section>

      {/*DESCRIPTION*/}
      <section className="mt-20 px-[15%]">
        <p>
          The 10th Asia Pacific Regional Meeting, titled “SANGAM Unity,” is a
          prestigious event hosted by NRNA NCC Cambodia on the 18th and 19th of
          March 2025. This significant gathering will bring together over 200
          delegates, including leaders, experts, and representatives of the
          Non-Resident Nepali (NRN) community from across the Asia Pacific
          region and beyond. The event will serve as a platform to foster unity,
          exchange ideas, and discuss critical issues affecting Nepali
          communities worldwide while strengthening the collective impact of
          NRNs.The theme “SANGAM Unity” highlights the importance of
          collaboration and shared goals, focusing on areas such as cultural
          promotion, trade and investment, women and youth empowerment, and
          support mechanisms for Nepali communities in the Asia Pacific region.
        </p>
      </section>

      {/*OBJECTIVE*/}

      <section className="objective mt-20 px-[15%]">
        <p className="p1-regular">Objective</p>
        <p className="h3">Purpose of This Event</p>
        <p>
          The 10th Asia Pacific Regional Meeting focuses on achieving:
           Advancing the Continuation of Nepali Citizenship (CNC) and Voting
          Rights for NRNs. Promoting innovation, entrepreneurship, and social
          impact initiatives. Empowering women and youth to take on leadership
          roles.  Exploring tourism development in the region for enhancing
          economic growth. Supporting sustainable development goals (SDGs).
          Enhancing cultural exchange to celebrate and preserve Nepal’s heritage
          Sharing of updates and priorities from NCCs of Asia Pacific Region.
        </p>
      </section>

      <section className="event-overview mt-20 px-[15%]">
        <p className="p1-regular">Event Overview</p>
        <p className="h3">About the Event</p>
        <p>
          The 10th Asia Pacific Regional Meeting will focus on key themes
          including Continuation of Nepali Citizens (CNC) and Voting Right,
          innovation, entrepreneurship, social impact, leadership development,
          sustainable development goals (SDGs), and cultural exchange. The major
          highlights of the 10th Asia Pacific Regional Meeting are: Keynote
          addresses by leaders and experts. Panel discussions on women
          empowerment, entrepreneurship, and innovation. nteractive workshops
          and breakout sessions on key topics. Networking opportunities with
          global stakeholders and organizations. Cultural performances
          showcasing the heritage and diversity of Nepal. With the participation
          of over 200 attendees from diverse sectors, including policymakers,
          entrepreneurs, academicians, and diaspora leaders from across the
          globe, this meeting is set to be an impactful and high-visibility
          event. The event’s reach will be amplified by live streams, extensive
          media coverage, and digital engagement campaigns targeting an
          international audience.
        </p>
      </section>

      <section className="mt-20 flex flex-col items-center justify-center gap-3 px-[15%] text-center">
        <p>Event Schedule</p>
        <p className="h3">Program Timeline</p>
        <p className="p1-regular w-[50%] text-center text-gray">
          The event offers 7 categories of sponsorship opportunity to all the
          interested entities/organizations /individuals.
        </p>

        <Tabs className="flex flex-col items-center justify-center">
          <TabsList className="mb-6 mt-6 h-auto bg-[#E0E0F4] p-3">
            {["1", "2", "3"].map((item, index) => (
              <TabsTrigger
                className="p-3 data-[state=active]:bg-blue-normal data-[state=active]:text-white-light"
                key={index}
                value={item}
              >
                September 12
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContents>
            {["1", "2", "3"].map((item, index) => (
              <TabsContent key={index} value={item}>
                {["1", "2", "3"].map((item, index) => (
                  <div className="mb-6 flex items-center gap-12 rounded-2xl bg-blue-normal p-11 text-white-light">
                    <div className="flex-shrink-0 text-2xl font-bold">
                      09:00-10:00
                    </div>
                    <div className="text-left">
                      <p className="h5">Session 1</p>
                      <p className="label-regular">
                        Paving the Path for Economic Transformation of Nepal.
                        Paving the Path for Economic Transformation of Nepal
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </TabsContents>
        </Tabs>
      </section>

      <section className="mt-20 flex flex-col gap-3 px-[15%]">
        <p className="p1-regular">Sponsorship Opportunities</p>
        <p className="h3">Available Types</p>
        <p className="p1-regular text-gray">
          The event offers 7 categories of sponsorship opportunity to all the
          interested entities/organizations /individuals.
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.N.</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount to be Contributed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item}</TableCell>
                <TableCell>Event Partner</TableCell>
                <TableCell>$7000</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="mt-20 flex flex-col gap-3 px-[15%]">
        <p className="p1-regular">Venue & Contact</p>
        <p className="h3">Where to Find Us</p>
        <p className="p1-regular text-gray">
          The event offers 7 categories of sponsorship opportunity to all the
          interested entities/organizations /individuals.
        </p>

        <div className="flex gap-20">
          <Accordion
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            variants={{
              expanded: {
                opacity: 1,
              },
              collapsed: {
                opacity: 0,
              },
            }}
            className="basis-1/2 rounded-2xl border-opacity-50 bg-gradient-to-b from-[#E7F3FD] to-[#E0E0F4]"
          >
            {[1, 2, 3, 4].map((item, index) => (
              <AccordionItem
                key={index}
                className="border-b border-b-gray border-opacity-20 px-6 pb-3 pt-6"
                value={index}
              >
                <AccordionTrigger className="p1-medium">
                  Events Dates & Time
                </AccordionTrigger>
                <AccordionContent className="p1-regular">
                  The term ‘Non Resident Nepali’ (NRN) defined by the law made
                  by the Parliament of the Nepal. This term is used to indicate
                  two types of People. It is used for persons of Nepali origin
                  holding citizenship of countries other than member states of
                  South Asian Association for Regional Cooperation (SAARC) and
                  Nepali nationals residing outside of SAARC member states.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="basis-1/2 rounded-2xl bg-gray"></div>
        </div>
      </section>

      <section className="mt-20 flex flex-col items-center gap-3 px-[15%]">
        <p>Organizing Committee</p>
        <p>Meet the Team</p>
        <div className="meet-team flex max-w-full flex-wrap gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
            <div className="member-card basis-1/6 rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3">
              <div className="member-image mb-2 h-36 w-[full] rounded-xl bg-gray" />
              <p className="p2-semibold text-blue-normal">Dr. Badri K.C.</p>
              <p className="label-regular">President | IES | Russia</p>
            </div>
          ))}
        </div>
      </section>

      <section className="our-sponsors mt-20">
        <p className="p1-regular text-center">Our Sponsors</p>
        <p className="h3 text-center">Partners & Supporters</p>

        <div className="mb-12 mt-6 flex w-full justify-center gap-4">
          {[1, 2, 3].map((item, index) => (
            <div className="sponsor-card flex h-[175px] w-[245px] flex-col overflow-hidden rounded-xl border border-blue-light-hover">
              <div className="flex-1 bg-gray"></div>
              <div className="flex flex-col items-center bg-blue-light-hover py-2">
                <p className="text-base font-semibold text-blue-normal">
                  Suvash Lamichane
                </p>
                <p className="text-xs font-normal text-blue-normal-hover">
                  Vice President, NRNA NCC Japan
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-7 text-center">Gold Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="gold-partner flex h-28 w-40 flex-col gap-3"
            >
              <div className="relative flex-1">
                <Image
                  src={"/logo.png"}
                  fill
                  className="object-contain"
                  alt="sponsor-logo"
                />
              </div>
              <p className="text-center">Sani Securities</p>
            </div>
          ))}
        </div>

        <p className="mb-7 text-center">Silver Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div
              key={index}
              className="gold-partner flex h-28 w-40 flex-col gap-3"
            >
              <div className="relative flex-1">
                <Image
                  src={"/logo.png"}
                  fill
                  className="object-contain"
                  alt="sponsor-logo"
                />
              </div>
              <p className="text-center">Sani Securities</p>
            </div>
          ))}
        </div>

        <p className="mb-7 text-center">Event Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="gold-partner flex h-28 w-40 flex-col gap-3"
            >
              <div className="relative flex-1">
                <Image
                  src={"/logo.png"}
                  fill
                  className="object-contain"
                  alt="sponsor-logo"
                />
              </div>
              <p className="text-center">Sani Securities</p>
            </div>
          ))}
        </div>

        <p className="mb-7 text-center">Airlines Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {[1].map((item, index) => (
            <div
              key={index}
              className="gold-partner flex h-28 w-40 flex-col gap-3"
            >
              <div className="relative flex-1">
                <Image
                  src={"/logo.png"}
                  fill
                  className="object-contain"
                  alt="sponsor-logo"
                />
              </div>
              <p className="text-center">Sani Securities</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <CircleFollowCard />
      </section>

      <section className="mb-20 px-[15%]">
        <Faqs />
      </section>

      <section className="mb-20 px-[15%]">
        <div className="grid grid-cols-9 grid-rows-3 gap-6">
          <div className="col-span-3 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 1</p>
            <p className="text-gray-500 text-sm">Item 1</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 2</p>
            <p className="text-gray-500 text-sm">Item 2</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 3</p>
            <p className="text-gray-500 text-sm">Item 3</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray bg-white p-4">
            <button className="hover:bg-gray-100 absolute right-2 top-2 rounded-full p-1">
              ☰
            </button>
            <p className="text-lg font-semibold">Item 4</p>
            <p className="text-gray-500 text-sm">Item 4</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 5</p>
            <p className="text-gray-500 text-sm">Item 5</p>
          </div>

          <div className="col-span-3 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 6</p>
            <p className="text-gray-500 text-sm">Item 6</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 7</p>
            <p className="text-gray-500 text-sm">Item 7</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 8</p>
            <p className="text-gray-500 text-sm">Item 8</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 9</p>
            <p className="text-gray-500 text-sm">Item 9</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 10</p>
            <p className="text-gray-500 text-sm">Item 10</p>
          </div>

          <div className="col-span-3 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 11</p>
            <p className="text-gray-500 text-sm">Item 11</p>
          </div>

          <div className="col-span-2 h-40 rounded-xl border-2 border-dashed border-gray p-4">
            <p className="text-lg font-semibold">Item 12</p>
            <p className="text-gray-500 text-sm">Item 12</p>
          </div>
        </div>
      </section>

      <section>
        <p className="mb-8 pl-[15%]">Video Gallery</p>
        <div className="videos-container flex gap-2 overflow-x-scroll">
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div
              key={index}
              className="min-h-[230px] min-w-[300px] rounded-xl bg-gray"
            />
          ))}
        </div>
      </section>

      <section className="downloads"></section>
    </div>
  );
}
