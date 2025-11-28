import { getAllFaqs } from "@/lib/wordpress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../motion-primitives/accordion";
import BlueButton from "../ui/bluebutton";

export default function Faqs() {
  return (
    <>
      <p className="p1-regular mb-3">FAQs</p>
      <p className="h3 mb-6">Everything you need to know</p>
      <div className="flex gap-4">
        <div className="faqs basis-3/4">
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
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <AccordionItem
                key={index}
                className="border-b border-b-gray border-opacity-20 px-6 pb-3 pt-6"
                value={index}
              >
                <AccordionTrigger className="p1-medium">
                  What is NRNA?
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
    </>
  );
}
