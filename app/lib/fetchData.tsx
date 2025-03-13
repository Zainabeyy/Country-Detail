export async function fetchCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
}

export async function fetchCountryByName(name: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  if (!res.ok) {
    throw new Error("Country not found!");
  }
  const data = await res.json();
  return data[0];
}
