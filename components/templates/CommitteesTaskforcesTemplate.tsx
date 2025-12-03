import { Page } from "@/lib/wordpress";
import Image from "next/image";
import { TextEffect } from "../motion-primitives/text-effect";
import BlueButton from "../ui/bluebutton";
import { getWordPressImage } from "@/lib/utils";
import ParallaxDiv from "../parallax-divs/parallax";
import CircleFollowCard from "../banner/fw-banner";
import BannerTwo from "../banner/banner2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { InView } from "../ui/in-view";
interface CommitteesTaskforcesProps {
  page: Page & {
    meta?: {
      hero_title?: string;
      hero_description?: string;
      hero_images?: string[];
      
      why_title?: string;
      why_description?: string;
      why_image?: string;

      how_title?: string;
      how_description?: string;
      how_image?: string;

      banner1_title?: string;
      banner1_description?: string;
      banner1_cta_link?: string;
      banner1_cta_title?: string;
      banner1_stats?: { title: string; description: string }[];

      teams_members?: {
        project: string;
        name: string;
        role: string;
        official_email: string;
      }[];

      banner2_title?: string;
      banner2_description?: string; 
      banner2_cta_link?: string;
      banner2_cta_title?: string;
    };
  };
}

export default function CommitteesTaskforcesTemplate({
  page,
}: CommitteesTaskforcesProps) {
  const meta = page?.meta || {};

  // Hero Data
  const hero_title = meta.hero_title || "The Trust of Committees, Taskforces & Subcommittees";
  const hero_description = meta.hero_description || "The Non-Resident Nepali Association (NRNA) was born out of the diverse aspirations of the Nepali Diaspora...";
  const hero_images = meta.hero_images || []; 

  // Why Data
  const why_title = meta.why_title || "Purpose & Aspirations";
  const why_description = meta.why_description || "The Strategic Goals of NRNA is to unite and bring Nepali residing all over the world under one umbrella...";
  const why_image = meta.why_image || "";

  // How Data
  const how_title = meta.how_title || "Role & Evolution";
  const how_description = meta.how_description || "Institutionalize and strengthen the organizational structure of NRNA...";
  const how_image = meta.how_image || "";

  // Banner 1 Data
  const banner1_title = meta.banner1_title || "NRNA at a Glance";
  const banner1_description = meta.banner1_description || "Driving impact globally and bringing change where it matters most.";
  const banner1_cta_title = meta.banner1_cta_title || "Explore Our Work";
  const banner1_cta_link = meta.banner1_cta_link || "/work";
  const banner1_stats = meta.banner1_stats || [
    { title: "22", description: "Countries Represented" },
    { title: "500", description: "Projects Executed" },
    { title: "$60M", description: "Funds Raised" }
  ];

  // Teams Data
  const teams_members = meta.teams_members || [];

  // Banner 2 Data
  const banner2_title = meta.banner2_title || "Explore The Full NRNA Structure & See How Everything Connects";
  const banner2_cta_title = meta.banner2_cta_title || "See Full Structure";
  const banner2_cta_link = meta.banner2_cta_link || "/structure";

  return (
    <div className="committees-page text-black">
      {/* 1. HERO SECTION */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6, ease: [0.455, 0.03, 0.515, 0.955] }}
      >
        <section className="hero mb-20 mt-20 flex flex-col gap-8 px-10 md:flex-row-reverse md:px-12 lg:px-[15%]">
          <div className="hero-images basis-full md:basis-1/2">
            <div className="flex">
              {hero_images[0] && (
                <Image
                  src={getWordPressImage(hero_images[0])}
                  alt="hero-image-1"
                  className="h-[80px] w-[75px]"
                  width={75}
                  height={80}                    
                />
              )}
              {hero_images[1] && (
                <Image
                  src={getWordPressImage(hero_images[1])}
                  alt="hero-image-2"
                  width={380}
                  height={230}
                />
              )}
            </div>
            {hero_images[2] && (
              <Image
                src={getWordPressImage(hero_images[2])}
                alt="hero-image-3"
                width={480}
                height={260}
              />
            )}
          </div>
          <div className="hero-text flex basis-full flex-col items-start gap-3 md:basis-1/2">
            <TextEffect per="char" preset="fade">
              Committees & Taskforces
            </TextEffect>

            <p className="title h3">{hero_title}</p>
            <p className="p1-regular mb-3 text-gray">
              {hero_description}
            </p>
          </div>
        </section>
      </InView>

      {/* 2. WHY COMMITTEES EXIST (Parallax Left) */}
      <section className="why-committees mt-20 flex px-10 md:px-[15%]">
        <ParallaxDiv
          alignment="left"
          image_url={getWordPressImage(why_image)}
          title="Why Committees Exist"
          subtitle={why_title}
          description={why_description}
        />
      </section>

      {/* 3. HOW THEY WORK (Parallax Right) */}
      <section className="how-they-work mt-20 flex px-10 md:px-[15%]">
        <ParallaxDiv
          alignment="right"
          image_url={getWordPressImage(how_image)}
          title="How They Work"
          subtitle={how_title}
          description={how_description}
        />
      </section>

      {/* 4. BANNER 1 (fw-banner) */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.6, ease: [0.455, 0.03, 0.515, 0.955] }}
      >
        <section className="banner-container mt-28">
          <CircleFollowCard 
            title={banner1_title}
            subtitle="Quick stats & achievements"
            description={banner1_description}
            cta_title={banner1_cta_title}
            cta_link={banner1_cta_link}
          />
          
          {/* Stats Section*/}
          <div className="statistics flex w-full flex-nowrap justify-center px-10 sm:gap-12 md:justify-between md:gap-16 md:px-[15%] mt-10">
            {banner1_stats.map((stat, index) => (
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
          </div>
        </section>
      </InView>

      {/* 5. FOCUSED TEAMS, STRONG LEADERSHIP (Table) */}
      <section className="teams-section mt-20 px-10 md:px-[15%]">
        <div className="mb-8">
          <p className="p1-regular">Focused Teams, Strong Leadership</p>
          <p className="h3">NRNA Committees & Leadership</p>
        </div>

        <div className="border-gray-100 overflow-hidden rounded-md border shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[60px]">S.N.</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Official Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams_members.length > 0 ? (
                teams_members.map((member, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell>{member.project}</TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.official_email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No members found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 6. BANNER 2 */}
      <section className="banner2-container mt-20 mb-20">
        <BannerTwo 
          title={banner2_title}
          cta_title={banner2_cta_title}
          cta_link={banner2_cta_link}
        />
      </section>
    </div>
  );
}
