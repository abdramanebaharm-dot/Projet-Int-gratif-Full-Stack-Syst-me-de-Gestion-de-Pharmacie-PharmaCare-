import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Medicaments from '../pages/Medicaments';
import Stock from '../pages/Stock';
import Ventes from '../pages/Ventes';
import Fournisseurs from '../pages/Fournisseurs';
import Clients from '../pages/Clients';
import Layout from '../components/Layout';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="medicaments" element={<Medicaments />} />
        <Route path="stock" element={<Stock />} />
        <Route path="ventes" element={<Ventes />} />
        <Route path="fournisseurs" element={<Fournisseurs />} />
        <Route path="clients" element={<Clients />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
