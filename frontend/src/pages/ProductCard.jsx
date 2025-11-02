import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete }) =>{
    return (
        <div className="bg-white rounded-lg shadow-md overflowhidden hover:shodo-lg transition">
            <img
                src={`https://127.0.0.1:3001${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-sembold">{product.nom}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-gray-700 font-bold mt-2">{product.prix} FCFA</p>
                <div className="flex justify-between mt-3">
                    <link to={`/products/edit/${product.id}`} 
                    className="bg-blue-600 hover:underline" >
                        Modifier
                    </link>
                    <button 
                    onClick={onDelete}
                    className="text-red-500 hover:underline">
                        Supprimer
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;