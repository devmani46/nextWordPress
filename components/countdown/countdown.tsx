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
      <p>Event Countdown</p>
      <div className="countdown-container flex">
        <div className="countdown-card flex w-36 flex-col justify-center bg-gradient-to-b from-[#E7F3FD] to-[#E0E0F4] pt-2 text-center">
          <SlidingNumber value={days} padStart={true} />
          <p>days</p>
        </div>
        <div className="countdown-card">
          <SlidingNumber value={hours} padStart={true} />

          <p>hours</p>
        </div>
        <div className="countdown-card">
          <SlidingNumber value={minutes} padStart={true} />

          <p>minutes</p>
        </div>
        <div className="countdown-card">
          <SlidingNumber value={seconds} padStart={true} />

          <p>seconds</p>
        </div>
      </div>
    </div>
  );
}
