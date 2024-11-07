import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import apiClient from "../lib/api";
import { PostItem } from "../types/post.types";

const fetchPosts = async (): Promise<AxiosResponse<PostItem[], any>> => {
  return await apiClient.get<PostItem[]>("/posts");
};

export const useFetchPosts = (): QueryObserverResult<PostItem[], any> => {
  return useQuery<PostItem[], any>({
    queryFn: async () => {
      const { data } = await fetchPosts();
      return data;
    },
    queryKey: ["posts"],
  });
};
