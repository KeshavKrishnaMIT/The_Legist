import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import SelectRole from "../pages/SelectRole/SelectRole";
import SignIn from "../pages/Auth/SignIn";
import Blogs from "../pages/Blogs/Blogs";
import About from "../pages/About/About";
import NewCase from "../pages/Client/NewCase";
import SearchLawyer from "../pages/Client/SearchLawyer";
import ClientCase from "../pages/ClientCase/ClientCase";
import LawyerDashboard from "../pages/LawyerDashboard/LawyerDashboard";
import LawyerCases from "../pages/Lawyer/Cases";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blogs />} />
      <Route path="/blogs" element={<Navigate to="/blog" replace />} />

      <Route path="/client" element={<Navigate to="/client/new-case" replace />} />
      <Route path="/client/new-case" element={<NewCase />} />
      <Route path="/client/search-lawyer" element={<SearchLawyer />} />
      <Route path="/client/case" element={<ClientCase />} />

      <Route path="/lawyer" element={<Navigate to="/lawyer/dashboard" replace />} />
      <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
      <Route path="/lawyer/cases" element={<LawyerCases />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
