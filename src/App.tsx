import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Publications from "./pages/Publications";
import CV from "./pages/CV";
import News from "./pages/News";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

function Shell() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/news" element={<News />} />
        <Route path="/cv" element={<CV />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
