import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PublicDocs from "./pages/PublicDocs";
import PublicDocsDetalle from "./pages/PublicDocsDetalle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import MainLayout from "./layout/MainLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Invitado from "./components/auth/Invitado";
import DocsUsuario from "./pages/DocsUsuario";
import Why from "./pages/Why";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/publicDocs" element={<PublicDocs />} />
        <Route path="/publicDocs/:id" element={<PublicDocsDetalle />} />
        <Route path="/why" element={<Why />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/docs" element={<DocsUsuario />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        <Route element={<Invitado />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Route>
    </Routes>
  );
}
