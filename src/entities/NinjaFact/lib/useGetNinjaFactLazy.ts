import { useQuery } from "@tanstack/react-query"
import { fetchNinjaCat } from "../api/fetchNinjaFact"

export const useGetNinjaFactLazy = () => {
  const fetchData = useQuery({ queryKey: ['ninjaFact'], queryFn: fetchNinjaCat, enabled: false })
  return fetchData;
}