import Editor from "./pages/Editor";
import Preview from "./pages/Preview.";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/picture/:id" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}
