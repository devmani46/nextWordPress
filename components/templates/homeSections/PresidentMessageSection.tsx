import BlueButton from "@/components/ui/bluebutton";
import Image from "next/image";

interface PresidentMessageSectionProps {
  who_we_are_message_description: string;
  who_we_are_message_representative_name: string;
}

export default function PresidentMessageSection({
  who_we_are_message_description,
  who_we_are_message_representative_name,
}: PresidentMessageSectionProps) {
  return (
    <>
      <div className="president-message flex flex-col items-start justify-center gap-3 md:basis-3/5">
        <p className="p1-regular">One Diaspora, One Purpose</p>
        <p className="h5 italic">
          &quot;{who_we_are_message_description}&quot;
        </p>
        <p className="p1-medium mb-3 text-gray">
          {who_we_are_message_representative_name}
        </p>
        <BlueButton icon className="mt-3">
          Read Full Message
        </BlueButton>
      </div>
      <div className="president-image hidden overflow-hidden lg:flex lg:basis-2/5">
        <Image
          src={"/NRNA 1.png"}
          alt="president-image"
          height={612}
          width={408}
          className="translate-y-[150px] scale-125 object-cover object-top"
        ></Image>
      </div>
    </>
  );
}
