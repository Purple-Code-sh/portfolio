"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Dices, LoaderCircle } from "lucide-react";
import { Landing } from "@prisma/client";
import { LandingCard } from "../components/LandingCard";
import { LandingModal } from "../components/LandingModal";

export default function PagesCreated() {
  const t = useTranslations("Landings");
  const [landings, setLandings] = useState<Landing[]>([]);
  const [selectedProjectSrc, setSelectedProjectSrc] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomLandings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/landings/random");
      if (!response.ok) {
        throw new Error("La respuesta de la red no fue exitosa");
      }
      const data = await response.json();
      setLandings(data);
    } catch (error) {
      console.error("Error al traer los landings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomLandings();
  }, []);

  return (
    <section className="w-full pb-12 md:pb-16 xl:pb-20">
      <div className="mb-6 lg:mb-8 flex gap-3 justify-between flex-wrap items-center">
        <h2>
          {t("title")}{" "}
          <span className="sm:text-lg lg:text-xl text-base">{t("count")}</span>
        </h2>

        <button
          onClick={fetchRandomLandings}
          disabled={isLoading}
          className="bg-gradient-to-t from-primary-500 to-gray-100 hover:from-primary-400 hover:to-white transition-colors duration-300 hover:scale-[102%] cursor-pointer w-fit flex shrink-0 gap-2 items-center text-black font-bold py-3 px-6 rounded-full text-sm md:text-base disabled:bg-neutral-400 disabled:cursor-not-allowed"
        >
          {isLoading ? t("loading") : t("button")}
          <Dices className="h-5 w-auto font-bold transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 min-h-[300px]">
        {isLoading ? (
          <div className="col-span-3 flex justify-center items-center">
            <LoaderCircle className="h-12 w-12 animate-spin" />
          </div>
        ) : (
          landings.map((landing) => (
            <LandingCard
              key={landing.id}
              landing={landing}
              onClick={() => setSelectedProjectSrc(landing.htmlSrc)}
            />
          ))
        )}
      </div>

      {selectedProjectSrc && (
        <LandingModal
          src={selectedProjectSrc}
          onClose={() => setSelectedProjectSrc(null)}
        />
      )}
    </section>
  );
}
