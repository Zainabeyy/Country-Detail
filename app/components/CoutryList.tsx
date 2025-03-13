"use client";

import { useState } from "react";
import { Country } from "../lib/dataType";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar";
import DropDownMenu from "./DropDownMenu";

export default function CountryList({ countries }: { countries: Country[] }) {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("none");

  const filteredCountries = countries.filter(
    (country) =>
      country.name?.common?.toLowerCase().includes(query.toLowerCase()) &&
      (selectedRegion === "none" ||
        country.region?.toLowerCase() === selectedRegion.toLowerCase())
  );
  return (
    <div>
      <div className="lg:flex lg:justify-between lg:items-center my-14 lg:mx-20 mx-0">
        <SearchBar query={query} setQuery={setQuery} />
        <DropDownMenu
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-10 xl:gap-[74px]  mx-7 xs:mx-20">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} data={country} />
        ))}
      </div>
    </div>
  );
}
