import { QueryFunction } from "@tanstack/react-query";
import { NinjaFact } from "../model/ninja-fact.type";

export const fetchNinjaCat: QueryFunction<NinjaFact | null, string[]> = async ({
  signal,
}) => {
  const response = await fetch("https://catfact.ninja/fact", { signal });
  if (!response.ok) return null;
  return response.json();
};
