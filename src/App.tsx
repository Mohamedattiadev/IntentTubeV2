import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Watch from "./pages/Watch";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/watch/:id" element={<Watch />} />
    </Routes>
  );
}
