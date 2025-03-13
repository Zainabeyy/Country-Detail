export type themeType = "light" | "dark";

export interface Country {
  cca3: string;
  name: {
    common: string;
    official:string;
  };
  flags: {
    svg: string;
    png?: string;
  };
  population: number;
  region: string;
  capital?: string[];
}

export interface DetailedCountry {
  cca3: string;
  name: {
    common: string;
    official:string;
    nativeName?:Record<string, {official:string, common:string}>;
  };
  flags: {
    svg: string;
    png?: string;
  };
  population: number;
  region: string;
  capital?: string[];
}

