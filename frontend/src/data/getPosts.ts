import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchPosts } from "@/api/fetchPosts";

export function useGetPosts(): UseQueryResult<any, unknown> {
  return useQuery({
    queryFn: fetchPosts,
    queryKey: ["posts"],
    staleTime: 5 * 1000,
    refetchInterval: 90 * 1000,
  });
}

