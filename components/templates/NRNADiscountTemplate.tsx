import { Page } from "@/lib/wordpress";
import BlueButton from "../ui/bluebutton";
import WhiteButton from "../ui/whitebutton";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "../animate-ui/components/animate/tabs";
import OffersSection from "./NRNADiscountSections/OffersSection";
import Link from "next/link";
import { Tilt } from "../motion-primitives/tilt";
import { Spotlight } from "../motion-primitives/spotlight";

interface NRNADiscountTemplateProps {
  page: Page & {
    discount_how_banner?: {
      title: string;
      description: string;
      label: string;
    }[];
    discount_partners?: {
      category: string;
      name: string;
      description: string;
      offer_text: string;
      partner_type: string;
      photo: number;
      cta_link: string;
      cta_title: string;
      photo_url: string;
    }[];
  };
}

export default function NRNADiscountTemplate({
  page,
}: NRNADiscountTemplateProps) {
  const how_cards = page.discount_how_banner || [];
  const discount_cards = page.discount_partners || [];

  return (
    <>
      <section className="flex gap-20 px-[15%]">
        <div className="hero-text basis-1/2">
          <p className="h2">Exclusive Discounts for NRNA Members</p>
          <p className="p1-regular mt-6 text-gray">
            Unlock a wide range of exclusive offers across hospitality, health,
            wellness, education, retail, financial services, travel, and more
            with your valid NRNA Global ID. Take advantage of member-only
            promotions, special deals, and perks at partner establishments both
            locally and internationally, designed to enhance your lifestyle and
            maximize the benefits of your NRNA membership.
          </p>
          <div className="mt-10 flex gap-3">
            <BlueButton>Browse discount</BlueButton>
            <WhiteButton className="button-regular py-6" icon>
              Learn More
            </WhiteButton>
          </div>
        </div>
        <div className="flex min-h-[520px] basis-1/2 flex-col gap-4">
          <div className="flex basis-2/3 gap-4">
            <div className="flex basis-1/2 flex-col gap-4">
              <div className="basis-2/3 rounded-xl bg-gray"></div>

              <div className="basis-1/3 rounded-xl bg-yellow-500"></div>
            </div>
            <div className="basis-1/2 rounded-xl bg-blue-normal"></div>
          </div>
          <div className="basis-1/3 rounded-xl bg-red-500"></div>
        </div>
      </section>

      <section className="px-[15%]">
        <div className="how-it-works">
          <p className="p1-regular">How it works</p>
          <p className="h3">Steps to Access Discounts</p>
          <p className="p1-regular">
            Getting started with NRNA discounts is simple. Follow these three
            easy steps to unlock exclusive savings and benefits.
          </p>

          <div className="card-container mt-10 flex gap-8">
            {how_cards.map((card, index) => (
              <div
                key={index}
                className="card flex h-auto min-h-[360px] w-full flex-col items-start gap-3 rounded-3xl bg-[url('/Mask-group.jpg')] bg-cover px-6 py-10 transition-transform hover:-translate-x-2 hover:-translate-y-4 md:px-10 md:py-14 lg:w-1/3"
              >
                <p className="p1-medium text-white">{card.label}</p>
                <p className="h3 mb-1 pr-4 text-white">{card.title}</p>
                <p className="p1-regular text-white">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 bg-gradient-to-b from-[#E7F3FD] to-[#E0E0F4] px-[15%] pt-20">
        <p className="p1-regular">Browse Partner Discounts</p>
        <p className="h3">Exclusive Offers for NRNA Members</p>
        <p className="p1-regular">
          Discover exclusive offers from our trusted partners across various
          categories.
        </p>

        <Tabs
          className="flex flex-col items-center justify-center"
          defaultValue="0"
        >
          {/* TAB BUTTONS */}
          <TabsList className="mb-6 mt-6 h-auto bg-white p-2">
            {discount_cards.map(
              (
                card: {
                  category: string;
                  name: string;
                  description: string;
                  offer_text: string;
                  partner_type: string;
                  photo: number;
                  cta_link: string;
                  cta_title: string;
                  photo_url: string;
                },
                index: number,
              ) => (
                <TabsTrigger
                  key={index}
                  value={card.category}
                  className="p-3 data-[state=active]:bg-blue-normal data-[state=active]:text-white-light"
                >
                  {card.category}
                </TabsTrigger>
              ),
            )}
          </TabsList>

          {/* TAB CONTENTS */}
          <TabsContents>
            {discount_cards.map(
              (
                card: {
                  category: string;
                  name: string;
                  description: string;
                  offer_text: string;
                  partner_type: string;
                  photo: number;
                  cta_link: string;
                  cta_title: string;
                  photo_url: string;
                },
                index: number,
              ) => (
                <TabsContent
                  className="grid grid-cols-3 grid-rows-2 gap-8"
                  key={index}
                  value={card.category}
                >
                  {discount_cards.map(
                    (
                      individualCard: {
                        category: string;
                        name: string;
                        description: string;
                        offer_text: string;
                        partner_type: string;
                        photo: number;
                        cta_link: string;
                        cta_title: string;
                        photo_url: string;
                      },
                      i: number,
                    ) => {
                      if (card.category !== individualCard.category)
                        return null;

                      return (
                        <div
                          key={i}
                          className="project-card flex max-w-80 flex-col overflow-hidden rounded-2xl border border-blue-light-hover bg-white pl-0 transition-transform duration-500 will-change-transform hover:scale-105"
                        >
                          <div className="project-card-text flex flex-col gap-3 p-6">
                            <p className="p1-medium">Title!!</p>
                            <p className="p1-medium label-regular text-gray">
                              Exclusive discount on room bookings at
                              participating Marriott properties worldwide
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="rounded-lg bg-[#E7F3FD] px-2 py-1 text-xs font-medium text-blue-normal">
                                Valid Until January 16
                              </p>
                              <p className="text-xs font-medium text-blue-normal">
                                Verified Partner
                              </p>
                            </div>
                          </div>
                          <div
                            className="project-card-image relative flex h-60 w-full flex-col justify-end bg-gray"
                            style={{
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
                        </div>
                      );
                    },
                  )}
                </TabsContent>
              ),
            )}
          </TabsContents>
        </Tabs>
      </section>
    </>
  );
}
