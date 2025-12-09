import WhiteButton from "@/components/ui/whitebutton";
import WorldMap from "@/components/world-map/WorldMap";
import Link from "next/link";

interface JoinTheJourneySectionProps {
  journey_title: string;
  journey_description: string;
  journey_cta_link: string;
  journey_cta_title: string;
}

export default function JoinTheJourneySection({
  journey_title,
  journey_description,
  journey_cta_link,
  journey_cta_title,
}: JoinTheJourneySectionProps) {
  return (
    <>
      <div className="world-map basis-full md:basis-2/3">
        <WorldMap />
      </div>
      <div className="journey-text flex flex-col items-start gap-3 md:basis-1/3">
        <p className="p1-regular">Join the Journey</p>
        <p className="h3">{journey_title}</p>
        <p className="p1-regular">{journey_description}</p>
        <Link href={journey_cta_link} className="mt-3">
          <WhiteButton icon>{journey_cta_title}</WhiteButton>
        </Link>
      </div>
    </>
  );
}
