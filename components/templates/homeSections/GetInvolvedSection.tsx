import WhiteButton from "@/components/ui/whitebutton";
import Link from "next/link";

// Define the precise structure of a single card object
interface InvolvedActionCard {
  title: string;
  description: string;
  cta_link: string;
  cta_title: string;
}

interface GetInvolvedSectionProps {
  involved_title: string;
  involved_description: string;
  // Type the array to match the structure defined in HomeTemplateProps
  getInvolvedCards: InvolvedActionCard[];
}

export default function GetInvolvedSection({
  involved_title,
  involved_description,
  getInvolvedCards,
}: GetInvolvedSectionProps) {
  return (
    <>
      <div className="get-involved-text mb-11 flex flex-col gap-3">
        <p className="p1-regular">Get Involved</p>
        <p className="h3">{involved_title}</p>
        <p className="p1-regular text-gray">{involved_description}</p>
      </div>
      <div className="card-container flex flex-col gap-4 md:gap-8 lg:flex-row">
        {/*list of cards*/}
        {getInvolvedCards.map((card, index) => (
          <div
            key={index}
            className="card flex h-auto min-h-[360px] w-full flex-col items-start gap-3 rounded-3xl bg-[url('/Mask-group.jpg')] bg-cover px-6 py-10 transition-transform hover:-translate-x-2 hover:-translate-y-4 md:px-10 md:py-14 lg:w-1/3"
          >
            <p className="p1-medium text-white">{card.title}</p>
            <p className="mb-3 pr-4 text-[30px] font-bold text-white">
              {card.description}
            </p>
            {/* Use the cta_link for the button's functionality */}
            <WhiteButton className="p2-medium bg-white" icon>
              <Link href={card.cta_link}>{card.cta_title}</Link>
            </WhiteButton>
          </div>
        ))}
      </div>
    </>
  );
}
