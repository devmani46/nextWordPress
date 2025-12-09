import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import CircleFollowCard from "@/components/banner/fw-banner";
import Countdown from "@/components/countdown/countdown";
import EventDownloadCard from "@/components/downloads/EventDownloadCard";
import Faqs from "@/components/fw-faqs/fw-faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/motion-primitives/accordion";
import BlueButton from "@/components/ui/bluebutton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventBySlug, getAllEvents } from "@/lib/wordpress";
import { format } from "date-fns";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";

import parse from "html-react-parser";
import GalleryGrid from "@/components/gallery-grid/gallery-grid";

export default function EventPage({ event }: { event: any }) {
  if (!event) {
    return <div className="p-10 text-center">Event not found.</div>;
  }

  let scheduleDates: any[] = [];

  const raw = event.event_schedule_dates;

  // CASE 1: Already an array
  if (Array.isArray(raw)) {
    scheduleDates = raw;
  }
  // CASE 2: String (JSON) but empty
  else if (typeof raw === "string") {
    if (raw.trim() === "") {
      scheduleDates = [];
    } else {
      try {
        scheduleDates = JSON.parse(raw);
      } catch (e) {
        scheduleDates = [];
      }
    }
  }
  // CASE 3: Object of objects
  else if (typeof raw === "object" && raw !== null) {
    scheduleDates = Object.values(raw);
  }

  const ensureArray = (data: any) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      if (data.trim() === "") return [];
      try {
        return JSON.parse(data);
      } catch (e) {
        return [];
      }
    }
    if (typeof data === "object") return Object.values(data);
    return [];
  };

  const sponsorships = ensureArray(event.event_sponsorships);
  const partners = ensureArray(event.event_partners);
  const downloads = ensureArray(event.event_downloads);
  const committee = ensureArray(event.event_organizing_committee);
  const sponsors = ensureArray(event.event_sponsors);
  const venueDetails = ensureArray(event.event_venue_details);

  const event_images = event.event_image_gallery || [];
  const event_videos = event.event_video_gallery || [];

  console.log(event);
  return (
    <div>
      <section className="mb-20 px-10 md:px-[15%]">
        <div className="flex items-center justify-between">
          <div>
            <p className="h2">{event.title.rendered}</p>
            <p className="p1-regular">{event.event_location}</p>
          </div>
          <Link href={event.event_cta_link}>
            <BlueButton>{event.event_cta_title}</BlueButton>
          </Link>
        </div>
        <p className="mt-3 text-xl font-medium italic text-blue-normal">
          {event.event_sub_title}
        </p>

        <div className="relative mt-6 h-[550px] w-full rounded-2xl bg-gray">
          <Image
            src={event._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
            alt="event-image"
            layout="fill"
            className="rounded-xl"
          />
        </div>
      </section>

      {/*EVENT COUNTDOWN*/}
      <section className="flex w-full justify-center px-[20%]">
        <Countdown />
      </section>

      {/*DESCRIPTION*/}
      <section className="mt-20 px-10 md:px-[15%]">
        <p>{event.event_description}</p>
      </section>

      {/*OBJECTIVE*/}

      <section className="objective mt-20 flex gap-3 px-10 md:px-[15%]">
        <div className="flex basis-2/3 flex-col">
          <p className="p1-regular">Objective</p>
          <p className="h3">{event.event_objective_title}</p>
          <p>{event.event_objective_description}</p>
        </div>
        <div className="h5 flex h-[190px] w-full basis-1/3 items-center justify-center rounded-xl bg-gradient-to-t from-[#E7F3FD] to-[#E0E0F4] hover:cursor-pointer">
          Click Here to Donate
        </div>
      </section>

      <section className="event-overview mt-20 flex flex-col gap-3 px-10 md:px-[15%]">
        <p className="p1-regular">Event Overview</p>
        <p className="h3">{event.event_overview_title}</p>
        <p>{event.event_overview_description}</p>
      </section>

      <section className="mt-20 flex flex-col items-center justify-center gap-3 px-10 text-center md:px-[15%]">
        <p>Event Schedule</p>
        <p className="h3">{event.event_schedule_title}</p>
        <p className="p1-regular w-[100%] text-center text-gray md:w-[50%]">
          {event.event_schedule_description}
        </p>

        <Tabs
          className="flex flex-col items-center justify-center"
          defaultValue="0"
        >
          {/* TAB BUTTONS */}
          <TabsList className="mb-6 mt-6 h-auto bg-[#E0E0F4] p-3">
            {scheduleDates.map((schedule: any, index: number) => (
              <TabsTrigger
                key={index}
                value={String(index)}
                className="p-3 data-[state=active]:bg-blue-normal data-[state=active]:text-white-light"
              >
                {schedule.date}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* TAB CONTENTS */}
          <TabsContents>
            {scheduleDates.map((schedule: any, index: number) => (
              <TabsContent key={index} value={String(index)}>
                {schedule.sessions.map((session: any, i: number) => (
                  <div
                    key={i}
                    className="mb-6 flex items-center gap-12 rounded-2xl bg-blue-normal p-11 text-white-light"
                  >
                    <div className="flex-shrink-0 text-2xl font-bold">
                      {session.start_time}–{session.end_time}
                    </div>

                    <div className="text-left">
                      <p className="h5">{session.title}</p>
                      <p className="label-regular">{session.description}</p>
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
        <p className="h3">{event.event_sponsorship_title}</p>
        <p className="p1-regular text-gray">
          {event.event_sponsorship_description}
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
            {sponsorships.map(
              (
                sponsor: { category: string; amount: string },
                index: number,
              ) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{sponsor.category}</TableCell>
                  <TableCell>{sponsor.amount}</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </section>

      <section className="mt-20 flex flex-col gap-3 px-[15%]">
        <p className="p1-regular">Venue & Contact</p>
        <p className="h3">{event.event_venue_title}</p>
        <p className="p1-regular text-gray">{event.event_venue_description}</p>

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
            {venueDetails.map(
              (
                venueDetail: { title: string; description: string },
                index: number,
              ) => (
                <AccordionItem
                  key={index}
                  className="border-b border-b-gray border-opacity-20 px-6 pb-3 pt-6"
                  value={index}
                >
                  <AccordionTrigger className="p1-medium">
                    {venueDetail.title}
                  </AccordionTrigger>
                  <AccordionContent className="p1-regular">
                    {venueDetail.description}
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
          <div className="basis-1/2 overflow-hidden rounded-2xl bg-gray">
            {parse(event.event_venue_map)}
          </div>
        </div>
      </section>

      <section className="mt-20 flex flex-col items-center gap-3 px-[15%]">
        <p className="p1-regular">Organizing Committee</p>
        <p className="h3 mb-3">{event.event_organizing_committee_title}</p>
        <div className="meet-team flex max-w-full flex-wrap gap-4">
          {committee.map(
            (
              member: {
                photo: string;
                name: string;
                role: string;
                service: string;
                country: string;
              },
              index: number,
            ) => (
              <div
                key={index}
                className="member-card basis-1/6 rounded-xl bg-gradient-to-b from-[#E0E0F4] to-[#E7F3FD] p-3"
              >
                <div className="member-image relative mb-2 h-36 w-[full] overflow-hidden rounded-xl bg-gray">
                  <Image src={member.photo} layout="fill" alt={member.name} />
                </div>
                <p className="p2-semibold text-blue-normal">{member.name}</p>
                <p className="label-regular text-gray">
                  {member.role} • {member.service} • {member.country}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="our-sponsors mt-20">
        <p className="p1-regular text-center">Our Sponsors</p>
        <p className="h3 text-center">{event.event_sponsors_title}</p>

        <div className="mb-12 mt-6 flex w-full justify-center gap-4">
          {sponsors.map(
            (
              sponsor: {
                photo: string;
                name: string;
                role: string;
                service: string;
                country: string;
              },
              index: number,
            ) => (
              <div
                key={index}
                className="sponsor-card flex h-[175px] w-[245px] flex-col overflow-hidden rounded-xl border border-blue-light-hover"
              >
                <div className="relative flex-1 bg-gray/10">
                  <Image
                    src={sponsor.photo}
                    fill
                    className="object-contain"
                    alt={sponsor.name}
                  />
                </div>
                <div className="flex flex-col items-center bg-blue-light-hover py-2">
                  <p className="text-base font-semibold text-blue-normal">
                    {sponsor.name}
                  </p>
                  <p className="text-xs font-normal text-blue-normal-hover">
                    {sponsor.role} {sponsor.service} {sponsor.country}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>

        <p className="h5 mb-7 text-center">Gold Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {partners.map(
            (
              partner: {
                category: string;
                logo: string;
                name: string;
              },
              index: number,
            ) => {
              if (partner.category == "gold") {
                return (
                  <div
                    key={index}
                    className="gold-partner flex h-28 w-40 flex-col gap-3"
                  >
                    <div className="relative flex-1">
                      <Image
                        src={partner.logo}
                        fill
                        className="object-contain"
                        alt="sponsor-logo"
                      />
                    </div>
                    <p className="text-center">{partner.name}</p>
                  </div>
                );
              }
            },
          )}
        </div>

        <p className="h5 mb-7 text-center">Silver Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {partners.map(
            (
              partner: {
                category: string;
                logo: string;
                name: string;
              },
              index: number,
            ) => {
              if (partner.category == "silver") {
                return (
                  <div
                    key={index}
                    className="gold-partner flex h-28 w-40 flex-col gap-3"
                  >
                    <div className="relative flex-1">
                      <Image
                        src={partner.logo}
                        fill
                        className="object-contain"
                        alt="sponsor-logo"
                      />
                    </div>
                    <p className="text-center">{partner.name}</p>
                  </div>
                );
              }
            },
          )}
        </div>

        <p className="h5 mb-7 text-center">Event Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {partners.map(
            (
              partner: {
                category: string;
                logo: string;
                name: string;
              },
              index: number,
            ) => {
              if (partner.category == "event") {
                return (
                  <div
                    key={index}
                    className="gold-partner flex h-28 w-40 flex-col gap-3"
                  >
                    <div className="relative flex-1">
                      <Image
                        src={partner.logo}
                        fill
                        className="object-contain"
                        alt="sponsor-logo"
                      />
                    </div>
                    <p className="text-center">{partner.name}</p>
                  </div>
                );
              }
            },
          )}
        </div>

        <p className="h5 mb-7 text-center">Airlines Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {partners.map(
            (
              partner: {
                category: string;
                logo: string;
                name: string;
              },
              index: number,
            ) => {
              if (partner.category == "airlines") {
                return (
                  <div
                    key={index}
                    className="gold-partner flex h-28 w-40 flex-col gap-3"
                  >
                    <div className="relative flex-1">
                      <Image
                        src={partner.logo}
                        fill
                        className="object-contain"
                        alt="sponsor-logo"
                      />
                    </div>
                    <p className="text-center">{partner.name}</p>
                  </div>
                );
              }
            },
          )}
        </div>
      </section>

      <section className="mb-20 px-[15%]">
        <CircleFollowCard
          title={event.event_banner_title}
          description={event.event_banner_description}
          cta_title={event.event_banner_cta_title}
          cta_link={event.event_banner_cta_link}
        />
      </section>

      <section className="mb-20 px-[15%]">
        <Faqs />
      </section>

      <GalleryGrid image_list={event_images} />

      <section>
        <p className="h3 mb-8 pl-[15%]">Video Gallery</p>
        <div className="videos-container flex gap-2 overflow-x-scroll">
          {event_videos.map((url: string, index: number) => {
            const videoId = new URL(url).searchParams.get("v");
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            return (
              <div
                key={index}
                className="min-h-[230px] min-w-[300px] overflow-hidden rounded-xl bg-gray"
              >
                <iframe
                  src={embedUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="downloads mt-20 px-[15%]">
        <p className="h3 mb-6">Downloads</p>
        <div className="flex gap-2">
          {downloads.map(
            (
              item: {
                title: string;
                file: {
                  id: number;
                  url: string;
                  filename: string;
                };
              },
              index: number,
            ) => (
              <div className="basis-1/3">
                <EventDownloadCard
                  key={index}
                  download={item}
                  date={format(new Date(event.date), "MMMM d, yyyy")}
                  thumbnailUrl={
                    event._embedded?.["wp:featuredmedia"]?.[0]?.media_details
                      ?.sizes?.medium?.source_url
                  }
                />
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map((event: any) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 10,
  };
};
