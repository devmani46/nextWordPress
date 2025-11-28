import { Page } from "@/lib/wordpress";
import BlueButton from "../ui/bluebutton";
import Countdown from "../countdown/countdown";

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

        <div className="mt-6 h-[550px] w-full bg-gray"></div>
      </section>

      <section className="flex w-full justify-center px-[20%]">
        <Countdown />
      </section>
    </div>
  );
}
