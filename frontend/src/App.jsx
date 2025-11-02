import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import ProductForm from "./pages/ProductForm";
import ProductEdit from "./pages/ProductEdit";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products/new" element={<ProductForm/>}/>
        <Route path="/products/edit/:id" element={<ProductEdit/>}/>
      </Routes>
    </Router>
  );
}

export default App;
