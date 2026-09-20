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
      alert(
        "La geolocalizzazione non è supportata da questo dispositivo."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMapUrl(
          buildMapUrl(coords.latitude, coords.longitude)
        );
      },
      () => {
        alert(
          "Impossibile ottenere la posizione."
        );
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
                Ricarica EV
              </span>
            </div>

          </div>

          <div className="mt-3">
            <h1 className="text-xl font-semibold text-stone-900">
              Colonnine di ricarica
            </h1>

            <p className="mt-1 text-sm text-stone-500">
              Cerca una stazione vicino a Plaza View
            </p>
          </div>
        </header>

        {/* Suggerimento Bloom */}
        <div className="mb-5 rounded-[24px] bg-[#EEF4EC] p-5">

          <div className="flex items-center gap-2">
            <Info
              size={20}
              className="text-[#4F694C]"
              strokeWidth={2.2}
            />

            <p className="font-semibold text-[#4F694C]">
              Suggerimento Bloom
            </p>
          </div>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">

            <li>
              • Consenti al browser di accedere alla tua
              posizione per visualizzare le colonnine più
              vicine a te.
            </li>

            <li>
              • Se ti trovi lontano dall'appartamento,
              utilizza il pulsante{" "}
              <span className="font-medium text-stone-900">
                "Vicino a me"
              </span>{" "}
              per centrare la mappa sulla tua posizione.
            </li>

            <li>
              • Tocca l'icona{" "}
              <span className="font-medium text-stone-900">
                Filtri
              </span>{" "}
              della mappa per scegliere il tipo di
              connettore e la velocità di ricarica.
            </li>

          </ul>
        </div>

        {/* Pulsanti */}
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
            Vicino a me
          </button>

        </div>

        {/* Mappa */}
        <div className="mt-5 overflow-hidden rounded-[32px]">
          <iframe
            src={mapUrl}
            title="Mappa delle colonnine di ricarica"
            className="h-[78vh] w-full"
            loading="lazy"
            allow="geolocation"
            allowFullScreen
          />
        </div>

      </div>
    </main>
  );
}