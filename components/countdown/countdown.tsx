"use client";
import { SlidingNumber } from "../motion-primitives/sliding-number";
import { useEffect, useState } from "react";

export default function Countdown() {
  const [days, setDays] = useState(new Date().getDay());
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setDays(new Date().getDay());
      setHours(new Date().getHours());
      setMinutes(new Date().getMinutes());
      setSeconds(new Date().getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="justify-center">
      <p className="h3 mb-6 text-center">Event Countdown</p>
      <div className="countdown-container flex gap-4">
        <div className="countdown-card flex w-36 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#E7F3FD] to-[#E0E0F4] py-4 text-center">
          <div className="text-5xl font-semibold text-blue-normal">
            <SlidingNumber value={days} padStart={true} />
          </div>
          <p className="h5 text-gray">Days</p>
        </div>
        <div className="countdown-card flex w-36 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#E7F3FD] to-[#E0E0F4] py-4 text-center">
          <div className="text-5xl font-semibold text-blue-normal">
            <SlidingNumber value={hours} padStart={true} />
          </div>

          <p>Hours</p>
        </div>
        <div className="countdown-card flex w-36 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#E7F3FD] to-[#E0E0F4] py-4 text-center">
          <div className="text-5xl font-semibold text-blue-normal">
            <SlidingNumber value={minutes} padStart={true} />
          </div>

          <p>Minutes</p>
        </div>
        <div className="countdown-card flex w-36 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#E7F3FD] to-[#E0E0F4] py-4 text-center">
          <div className="text-5xl font-semibold text-blue-normal">
            <SlidingNumber value={seconds} padStart={true} />
          </div>

          <p>Seconds</p>
        </div>
      </div>
    </div>
  );
}
