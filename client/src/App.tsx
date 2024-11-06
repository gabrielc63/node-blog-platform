import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Home } from "./pages/Home";
import { Editor } from "@/pages/Editor";
import { Post } from "./pages/Post";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="container mx-auto p-4">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
