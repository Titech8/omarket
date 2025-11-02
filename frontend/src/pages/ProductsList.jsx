import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des produits :", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛒 Liste des produits</h1>
        <Link
          to="/products/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Ajouter un produit
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">Aucun produit disponible.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
