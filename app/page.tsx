import CountryList from "./components/CoutryList";
import { Country } from "./lib/dataType";
import { fetchCountries } from "./lib/fetchData";

export default async function Home() {
  const countries: Country[] = await fetchCountries();

  return (
    <div>
      <CountryList countries={countries} />
    </div>
  );
}
