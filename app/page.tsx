"use client";

import { useState } from "react";
import Image from "next/image";
import { Info, LocateFixed, MapPin, Zap } from "lucide-react";

const PLAZA_VIEW = {
  latitude: 44.6972,
  longitude: 8.0340,
};

function buildMapUrl(latitude: number, longitude: number) {
  return `https://map.openchargemap.io/?mode=embedded&latitude=${latitude}&longitude=${longitude}&zoom=12`;
}

export default function Home() {
  const [mapUrl, setMapUrl] = useState(
    buildMapUrl(PLAZA_VIEW.latitude, PLAZA_VIEW.longitude)
  );

  const showCurrentPosition = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMapUrl(
          buildMapUrl(coords.latitude, coords.longitude)
        );
      },
      () => {
        alert("Unable to get your location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const showPlazaView = () => {
    setMapUrl(
      buildMapUrl(
        PLAZA_VIEW.latitude,
        PLAZA_VIEW.longitude
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#F8F5F0] px-4 py-5">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <header className="mb-5">
          <div className="flex items-center justify-between">

            <Image
              src="/logo.png"
              alt="Bloom"
              width={100}
              height={40}
              priority
              className="h-auto w-[100px]"
            />

            <div className="flex items-center gap-2 rounded-full bg-[#EEF4EC] px-3 py-2">
              <Zap
                size={16}
                className="text-[#4F694C]"
                strokeWidth={2.2}
              />

              <span className="text-sm font-medium text-[#4F694C]">
                EV Charging
              </span>
            </div>

          </div>

          <div className="mt-3">
            <h1 className="text-xl font-semibold text-stone-900">
              Charging stations
            </h1>

            <p className="mt-1 text-sm text-stone-500">
              Find a charging station near Plaza View
            </p>
          </div>
        </header>

        {/* Bloom Tip */}
        <div className="mb-5 rounded-[24px] bg-[#EEF4EC] p-5">

          <div className="flex items-center gap-2">
            <Info
              size={20}
              className="text-[#4F694C]"
              strokeWidth={2.2}
            />

            <p className="font-semibold text-[#4F694C]">
              Bloom Tip
            </p>
          </div>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">

            <li>
              • Allow your browser to access your location
              to find the charging stations closest to you.
            </li>

            <li>
              • If you are away from the apartment, use the{" "}
              <span className="font-medium text-stone-900">
                "Near me"
              </span>{" "}
              button to center the map on your current
              location.
            </li>

            <li>
              • Tap the{" "}
              <span className="font-medium text-stone-900">
                Filters
              </span>{" "}
              icon on the map to choose the connector type
              and charging speed.
            </li>

          </ul>
        </div>

        {/* Buttons */}
        <div className="mb-1 flex gap-3">

          <button
            onClick={showPlazaView}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white py-3 text-sm font-medium text-stone-800 shadow-sm transition hover:bg-stone-50"
          >
            <MapPin size={18} />
            Plaza View
          </button>

          <button
            onClick={showCurrentPosition}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#4F694C] py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#435B40]"
          >
            <LocateFixed size={18} />
            Near me
          </button>

        </div>

        {/* Map */}
        <div className="mt-5 overflow-hidden rounded-[32px]">
          <iframe
            src={mapUrl}
            title="EV charging station map"
            className="h-[78vh] w-full"
            loading="lazy"
            allow="geolocation"
            allowFullScreen
          />
        </div>
{/* Featured charging station */}
<div className="mt-5 rounded-[24px] bg-white p-5 shadow-sm">
  <div className="flex items-start gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4EC]">
      <Zap
        size={19}
        className="text-[#4F694C]"
        strokeWidth={2.2}
      />
    </div>

    <div className="min-w-0">
      <h2 className="font-semibold text-stone-900">
        Piazza San Paolo
      </h2>

      <p className="mt-1 text-sm text-stone-500">
        Powy · 2 × 22 kW AC · Type 2
      </p>
    </div>
  </div>

  <a
    href="https://www.google.com/maps/dir/?api=1&destination=44.6963,8.0361"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 flex items-center justify-center rounded-2xl bg-[#4F694C] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#435B40]"
  >
    Get directions
  </a>
</div>
      </div>
    </main>
  );
}