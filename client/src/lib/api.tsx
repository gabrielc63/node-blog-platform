import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json",
  },
});

// export const fetchPosts = async () => {
//   const response = await api.get("/posts");
//   return response.data;
// };
//
// export const fetchPostById = async (id: string) => {
//   const response = await api.get(`/posts/${id}`);
//   return response.data;
// };
//
// const request = async (options) => {
//   const onSuccess = (response) => {
//     return response?.data?.data;
//   };
//
//   const onError = (error) => {
//     return Promise.reject(error.response?.data);
//   };
//
//   return client(options).then(onSuccess).catch(onError);
// };
