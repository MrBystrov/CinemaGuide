import type { IMovie } from "@/types/IMovie";

export const getMoviesList = async (url: string): Promise<IMovie[]> => {
  const response = await fetch(url, {
    credentials: 'include',
  })
  const data = await response.json();
  return data;
}
