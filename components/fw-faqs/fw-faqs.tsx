"use client";

import { Faq, getAllFaqs } from "@/lib/wordpress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../motion-primitives/accordion";
import BlueButton from "../ui/bluebutton";
import { useEffect, useState } from "react";

export default function Faqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    getAllFaqs().then(setFaqs);
  }, []);

  return (
    <>
      <p className="p1-regular mb-3">FAQs</p>
      <p className="h3 mb-6">Everything you need to know</p>
      <div className="flex flex-wrap gap-4 md:flex-nowrap">
        <div className="faqs md:basis-3/4">
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
            className="rounded-2xl border border-gray border-opacity-50"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                className="border-b border-b-gray border-opacity-20 px-6 pb-3 pt-6"
                value={index}
              >
                <AccordionTrigger className="p1-medium mb-2 grid grid-cols-[30px_1fr] items-start gap-2">
                  <span className="text-gray-400">{index + 1}.</span>
                  <span>{faq.title.rendered}</span>
                </AccordionTrigger>
                <AccordionContent className="p1-regular grid grid-cols-[30px_1fr] gap-2">
                  <span /> {/* empty placeholder to align content */}
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="more-questions flex max-h-[310px] flex-col items-center justify-center gap-3 rounded-2xl border border-gray border-opacity-50 px-8 text-center md:basis-1/4">
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
    </>
  );
}
