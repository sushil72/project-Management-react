import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home ";
import Navbar from "./Pages/Navbar/Navbar";
import ProjectDetail from "./Pages/ProjectDetails/ProjectDetail";
import IssueDetail from "./Pages/IssueDetail/IssueDetail";
import Subscription from "./Pages/Subcription/Subscription";
import Auth from "./Pages/Auth/Auth";
export default function App() {
  return (
    <>
      {true ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetail />}
            />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}
