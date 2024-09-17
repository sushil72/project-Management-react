import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home ";
import Navbar from "./Pages/Navbar/Navbar";
import ProjectDetail from "./Pages/ProjectDetails/ProjectDetail";
import IssueDetail from "./Pages/IssueDetail/IssueDetail";
import Subscription from "./Pages/Subcription/Subscription";
import Auth from "./Pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Projects/Action";
import UpgradSuccess from "./Pages/Subcription/UpgradSuccess";
export default function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProjects({}));
  }, [auth.jwt]);

  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<UpgradSuccess />} />
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
