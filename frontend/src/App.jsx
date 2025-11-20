import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ProductsList from "./pages/ProductsList";
import ProductForm from "./pages/ProductForm";
import ProductEdit from "./pages/ProductEdit";
import Login from "./pages/login";
import ProtectedRoute from "./routes/ProtectedRoute";



const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/Dashboard" 
          element={
            <ProtectedRoute> 
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } 
          />

        {/* Produits */}
        <Route path="/admin/products" element={
          <ProtectedRoute> 
            <AdminLayout>
                <ProductsList/>
            </AdminLayout>
          </ProtectedRoute> } />

        <Route path="/admin/products/new" element={
          <ProtectedRoute> 
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          </ProtectedRoute> }/>

        <Route path="/admin/products/edit/:id" element={
          <ProtectedRoute> 
            <AdminLayout>
              <ProductEdit />
            </AdminLayout>
          </ProtectedRoute> }/>

      </Routes>
    </Router>
  );
};

export default App;
