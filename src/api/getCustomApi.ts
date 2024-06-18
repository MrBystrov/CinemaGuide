import type { IMovie } from "@/types/IMovie";

export const getCustomMovie = async (url: string): Promise<IMovie> => {
  const response = await fetch(url)
  const data = await response.json();
  return data;
}