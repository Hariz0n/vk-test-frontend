import { useQuery } from "@tanstack/react-query";
import { fetchAgifyUser } from "../api/fetchAgifyUser";

export const useGetAgifyUserLazy = (name: string) => {
  const fetchData = useQuery({
    queryKey: ["agifyUser", name] as const,
    queryFn: fetchAgifyUser,
    enabled: false,
    staleTime: 1000 * 60 * 60 * 2,
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  return fetchData;
};
