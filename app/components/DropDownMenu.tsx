"use client";

import IonIcon from "@reacticons/ionicons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SelectedRegionProps {
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
}

export default function DropDownMenu({
  selectedRegion,
  setSelectedRegion,
}: SelectedRegionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "none"];

  const handleSelect = (region: string) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

  return (
    <div className="relative mx-7 xs:mx-20 lg:mx-0 lg:mt-0 shadow-md w-64 elements rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-3.5 px-8 mt-7 lg:mt-0 flex-between"
      >
        Filter by Region
        <IonIcon
          className={`text-base transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          name="chevron-down-outline"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "225px" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 py-4 mt-2 w-full elements rounded-lg shadow-lg max-h-65 overflow-hidden z-10"
          >
            {regions.map((region) => (
              <li
                key={region}
                onClick={() => handleSelect(region)}
                className={`${
                  selectedRegion === region && "dark:bg-gray-700 bg-gray-100"
                } px-8 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                {region}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
