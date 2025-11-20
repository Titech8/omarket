import React, {useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const ProductsList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Liste des produits</h2>
        <Link 
          to="/admin/products/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Ajouter un produit
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500">Aucun produit pour le moment.</p>
        ) : (
          products.map((product) => (
            <div 
              key={product._id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img 
                src={`http://127.0.0.1:3001/uploads/${product.image}`} 
                alt={product.nom}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.nom}</h3>
                <p className="text-gray-600">{product.categorie}</p>
                <p className="text-green-600 font-bold mt-2">{product.prix} FCFA</p>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Modifier
                  </Link>

                  <button className="text-red-600 hover:underline">
                    Supprimer
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsList;
