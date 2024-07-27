import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home ";
import Navbar from "./Pages/Navbar/Navbar";
import ProjectDetail from "./Pages/ProjectDetails/ProjectDetail";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}
