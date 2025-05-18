import IonIcon from "@reacticons/ionicons";
import Form from "next/form";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({query,setQuery}:SearchBarProps) {
  return (
    <div className="text-light-Input elements mx-7 xs:mx-20 py-3.5 px-8 searchPadding mt-8 lg:mt-0 lg:mx-0 shadow-md rounded-lg max-w-xl lg:w-xl">
      <Form action="/" scroll={false} className="flex items-center">
        <button type="submit" aria-label="Search">
          <IonIcon name="search-outline" className="pr-6 align-middle dark:text-white" />
        </button>
        <input
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Search for a country"
          className="placeholder-light-Input dark:placeholder-white outline-0 w-full"
        />
      </Form>
    </div>
  );
}
