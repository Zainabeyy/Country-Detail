import { fetchCountryByName } from "@/app/lib/fetchData";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import Link from "next/link";

// dynamic metadata

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const country = await fetchCountryByName(slug);

  return {
    title: `${country.name.common} || Country Details`,
    description: `Explore detailed information about ${country.name.common}, including population, region, languages, currencies, and neighboring countries.`,
    openGraph: {
      title: `${country.name.common} || Country Details`,
      description: `Learn about ${country.name.common}’s population, region, languages, and more.`,
      images: [
        {
          url: country.flags.svg,
          alt: `${country.name.common} flag`,
        },
      ],
    },
  };
}

// main page

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const CountryName = (await params).slug;
  const country = await fetchCountryByName(CountryName);

  const nativeName = country.name.nativeName
    ? Object.entries(country.name.nativeName)
    : null;

  // Fetch full border country names
  let borderCountries: string[] = [];
  if (country.borders && country.borders.length > 0) {
    const borderResponse = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`
    );
    const borderData = await borderResponse.json();
    borderCountries = borderData.map(
      (border: { name: { common: string } }) => border.name.common
    );
  }

  if (!country) {
    return <div className="p-9 text-red-500">Country not found.</div>;
  }

  return (
    <div className="p-9">
      <Link href="/" className="box-cont mt-10 mb-18">
        <IonIcon name="arrow-back-outline" className="text-lg pr-4" />
        Back
      </Link>

      <div className="flex lg:flex-row lg:flex-nowrap flex-wrap gap-10 lg:gap-30 justify-start">
        <Image
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          width={600}
          height={0}
          className="object-cover mb-14 h-auto"
          style={{height:"auto"}}
          priority
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
          <div className="grid grid-cols-1 xl:grid-cols-2 font-light leading-8">
            <div className="flex flex-col">
              <ul>
                <span className="font-semibold">Native Name:</span>
                {nativeName?.map(([langCode, item]) => (
                  <li key={langCode} className="list-inside list-disc">
                    <span className="font-medium">
                      {langCode.toUpperCase()}:
                    </span>
                    {(item as { common: string }).common}
                  </li>
                ))}
              </ul>

              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Subregion:</span>{" "}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.join(", ") || "N/A"}
              </p>
            </div>

            <div className="mt-6">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.tld?.[0]}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {Object.values(country.currencies || {})
                  .map((currency) => (currency as { name: string }).name)
                  .join(", ") || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {Object.values(country.languages || {}).join(", ") || "N/A"}
              </p>
            </div>

            {/* Border Countries Section */}

            {borderCountries.length > 0 ? (
              <div className="mt-6 flex flex-col xl:mt-14">
                <h2 className="font-semibold mb-2 text-xl">
                  Border Countries:
                </h2>
                <ul className="flex flex-wrap gap-2.5">
                  {borderCountries.map((name, index) => (
                    <li key={index} className="box-cont">
                      <Link href={`/${name.toLowerCase()}`}>{name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
