import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

export const usePosts = () =>
  useQuery(["posts"], async () => (await api.get("/posts")).data);

export const usePost = (id: string) =>
  useQuery(["post", id], async () => (await api.get(`/posts/${id}`)).data);

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newPost: { title: string; body: string }) =>
      (await api.post("/posts", newPost)).data,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    },
  );
};
