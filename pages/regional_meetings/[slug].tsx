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
import {
  getEventBySlug,
  getAllEvents,
  RegionalMeeting,
  getAllRegionalMeetings,
  getRegionalMeetingBySlug,
} from "@/lib/wordpress";
import { format } from "date-fns";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";

import parse from "html-react-parser";

export default function RegionalMeetingPage({
  regional_meeting,
}: {
  regional_meeting: RegionalMeeting;
}) {
  if (!regional_meeting) {
    return <div className="p-10 text-center">Event not found.</div>;
  }

  console.log(regional_meeting);
  return (
    <div>
      <section className="mb-20 px-10 md:px-[15%]">
        <div className="flex items-center justify-between">
          <div>
            <p className="h2">{regional_meeting.title.rendered}</p>
            <p className="p1-regular text-gray">
              {regional_meeting.rm_location} {"  "} {regional_meeting.date}
            </p>
          </div>
          <Link href={regional_meeting.rm_cta_link}>
            <BlueButton>{regional_meeting.rm_cta_title}</BlueButton>
          </Link>
        </div>

        <div className="relative mt-6 h-[550px] w-full rounded-2xl bg-gray">
          {regional_meeting._embedded?.["wp:featuredmedia"]?.[0]
            ?.source_url && (
            <Image
              src={
                regional_meeting._embedded["wp:featuredmedia"][0].source_url
              }
              alt="event-image"
              layout="fill"
              className="rounded-xl"
            />
          )}
        </div>
      </section>

      {/*EVENT COUNTDOWN*/}
      <section className="flex w-full justify-center px-[20%]">
        <Countdown />
      </section>

      {/*DESCRIPTION*/}
      <section className="mt-20 px-10 md:px-[15%]">
        <p>{regional_meeting.rm_description}</p>
      </section>

      {/*OBJECTIVE*/}

      <section className="objective mt-20 flex gap-3 px-10 md:px-[15%]">
        <div className="flex basis-2/3 flex-col gap-3">
          <p className="p1-regular">Agenda</p>
          <p className="h3">{regional_meeting.rm_agenda_title}</p>
          <div className="prose text-gray marker:text-gray">
            {parse(regional_meeting.rm_agenda_description)}
          </div>
        </div>
      </section>

      <section className="event-overview mt-20 flex flex-col gap-3 px-10 md:px-[15%]">
        <p className="p1-regular">Contact Information</p>
        <p className="h3">{regional_meeting.rm_contact_title}</p>
        <div className="prose text-gray">
          {parse(regional_meeting.rm_contact_description)}
        </div>
      </section>

      <section className="mt-20 flex flex-col gap-3 px-[15%]">
        <p className="p1-regular">Sponsorship Opportunities</p>
        <p className="h3">{regional_meeting.rm_sponsorship_title}</p>
        <p className="p1-regular text-gray">
          {regional_meeting.rm_sponsorship_descriptipn}
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
            {regional_meeting.rm_sponsorships?.map(
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

      <section className="mt-20 flex flex-col items-center gap-3 px-[15%]">
        <p className="p1-regular">Organizing Committee</p>
        <p className="h3 mb-3">
          {regional_meeting.rm_organizing_committee_title}
        </p>
        <div className="meet-team flex w-full max-w-full flex-wrap gap-4">
          {regional_meeting.rm_organizing_committee?.map(
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
        <p className="h3 text-center">{regional_meeting.rm_sponsors_title}</p>

        <div className="mb-12 mt-6 flex w-full justify-center gap-4">
          {regional_meeting.rm_sponsors?.map(
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

        <p className="mb-7 text-center">Gold Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {regional_meeting.rm_partners.map(
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

        <p className="mb-7 text-center">Silver Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {regional_meeting.rm_partners.map(
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

        <p className="mb-7 text-center">Event Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {regional_meeting.rm_partners.map(
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

        <p className="mb-7 text-center">Airlines Partner</p>

        <div className="gold-partners-container mb-11 flex justify-center gap-4">
          {regional_meeting.rm_partners.map(
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
        <div className="grid grid-cols-9 grid-rows-3 gap-6">
          <div className="relative col-span-3 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[0]}
              alt={regional_meeting.rm_image_gallery[0]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[1]}
              alt={regional_meeting.rm_image_gallery[1]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[2]}
              alt={regional_meeting.rm_image_gallery[2]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray bg-white p-4">
            <button className="hover:bg-gray-100 absolute right-2 top-2 rounded-full p-1">
              ☰
            </button>
            <Image
              src={regional_meeting.rm_image_gallery[3]}
              alt={regional_meeting.rm_image_gallery[3]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[4]}
              alt={regional_meeting.rm_image_gallery[4]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-3 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[5]}
              alt={regional_meeting.rm_image_gallery[5]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[6]}
              alt={regional_meeting.rm_image_gallery[6]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[7]}
              alt={regional_meeting.rm_image_gallery[7]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[8]}
              alt={regional_meeting.rm_image_gallery[8]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[9]}
              alt={regional_meeting.rm_image_gallery[9]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-3 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[10]}
              alt={regional_meeting.rm_image_gallery[10]}
              layout="fill"
            />
          </div>

          <div className="relative col-span-2 h-40 overflow-hidden rounded-xl border-gray p-4">
            <Image
              src={regional_meeting.rm_image_gallery[11]}
              alt={regional_meeting.rm_image_gallery[11]}
              layout="fill"
            />
          </div>
        </div>
      </section>

      <section>
        <p className="h3 mb-8 pl-[15%]">Video Gallery</p>
        <div className="videos-container flex gap-2 overflow-x-scroll pl-[15%] [&::-webkit-scrollbar-thumb]:bg-gray [&::-webkit-scrollbar-thumb]:bg-opacity-20 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-1">
          {regional_meeting.rm_video_gallery?.map(
            (url: string, index: number) => {
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
            },
          )}
        </div>
      </section>

      <section className="downloads mt-20 px-[15%]">
        <p className="h3 mb-6">Downloads</p>
        <div className="flex gap-2">
          {regional_meeting.rm_downloads.map(
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
                  date={format(new Date(regional_meeting.date), "MMMM d, yyyy")}
                  thumbnailUrl={
                    regional_meeting._embedded?.["wp:featuredmedia"]?.[0]
                      ?.media_details?.sizes?.medium?.source_url
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
  const regional_meetings = await getAllRegionalMeetings();
  const paths = regional_meetings.map((regional_meeting: any) => ({
    params: { slug: regional_meeting.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const regional_meeting = await getRegionalMeetingBySlug(slug);

  if (!regional_meeting) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      regional_meeting,
    },
    revalidate: 10,
  };
};
