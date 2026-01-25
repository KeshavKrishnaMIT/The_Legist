import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import SelectRole from "./pages/SelectRole/SelectRole";
import NewCase from "./pages/Client/NewCase";
import LawyerCases from "./pages/Lawyer/Cases";
import SignIn from "./pages/Auth/SignIn";
import Blogs from "./pages/Blogs/Blogs";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/client/new-case" element={<NewCase />} />
      <Route path="/lawyer/cases" element={<LawyerCases />} />
      <Route path="/blog" element={<Blogs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
