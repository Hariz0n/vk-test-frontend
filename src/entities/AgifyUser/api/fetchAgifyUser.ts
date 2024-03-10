import { QueryFunction } from "@tanstack/react-query";
import { AgifyUser } from "../model/fgify-user.type";

export const fetchAgifyUser: QueryFunction<
  AgifyUser | null,
  ["agifyUser", string]
> = async ({ signal, queryKey }) => {
  const response = await fetch(`https://api.agify.io?name=${queryKey[1]}`, {
    signal,
  });
  if (!response.ok) return null;
  return response.json();
};
