import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
      {/* Image du produit */}
      {product.image && (
        <img
          src={`http://127.0.0.1:3001/uploads/${product.image}`}
          alt={product.nom}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      {/* Infos produit */}
      <h3 className="text-xl font-semibold">{product.nom}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="font-bold text-green-600 mb-1">{product.prix} FCFA</p>
      <p className="text-sm text-gray-500 mb-4">
        Catégorie : {product.categorie} | Stock : {product.stock}
      </p>

      {/* Actions */}
      <div className="flex justify-between">
        <Link
          to={`/products/edit/${product.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Modifier
        </Link>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
