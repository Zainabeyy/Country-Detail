import Image from "next/image";
import Link from "next/link";
import { Country } from "../lib/dataType";

export default function CountryCard({ data }: { data: Country }) {
  return (
    <Link
      href={`/${encodeURIComponent(data.name.official)}`}
      className="elements rounded-lg shadow-md overflow-hidden max-w-[264px]"
    >
      <div className="relative w-[264px] h-40">
        <Image
          src={data.flags.svg}
          alt={data.name.common}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-5">
        <h2 className="font-bold text-lg mb-4">{data.name.common}</h2>
        <p className="font-light text-sm">
          <span className="font-semibold">Population:</span>{" "}
          {data.population.toLocaleString()}
        </p>
        <p className="font-light text-sm">
          <span className="font-semibold">Region:</span> {data.region}
        </p>
        <p className="font-light text-sm">
          <span className="font-semibold">Capital:</span>{" "}
          {data.capital?.join(", ") || "N/A"}
        </p>
      </div>
    </Link>
  );
}
