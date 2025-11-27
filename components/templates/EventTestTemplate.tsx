import { Page } from "@/lib/wordpress";
import BlueButton from "../ui/bluebutton";

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
        <div className="justify-center">
          <p>Event Countdown</p>
          <div className="countdown-container flex">
            <div className="countdown-card w-36 bg-gray pt-2 text-center">
              <p>00</p>
              <p>days</p>
            </div>
            <div className="countdown-card">
              <p>00</p>
              <p>days</p>
            </div>
            <div className="countdown-card">
              <p>00</p>
              <p>days</p>
            </div>
            <div className="countdown-card">
              <p>00</p>
              <p>days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
