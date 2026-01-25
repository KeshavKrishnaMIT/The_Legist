import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import RoleSelect from "../pages/SelectRole/SelectRole";
import NewCase from "../pages/Client/NewCase";
import ClientCase from "../pages/ClientCase/ClientCase";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/select-role" element={<RoleSelect />} />

      {/* CLIENT FLOW */}
      <Route path="/client/new-case" element={<NewCase />} />
      <Route path="/client/case" element={<ClientCase />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
