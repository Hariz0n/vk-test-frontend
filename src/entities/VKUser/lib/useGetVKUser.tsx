import { useQuery } from "@tanstack/react-query";
import bridge from "@vkontakte/vk-bridge";

export const useGetVKUser = () => {
  const fetchData = useQuery({
    queryKey: ["vkUser"],
    queryFn: () => bridge.send("VKWebAppGetUserInfo"),
    staleTime: 1000 * 60 * 60,
  });
  return fetchData;
};
