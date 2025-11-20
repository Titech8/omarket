import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () =>{
    const [form, setForm] = useState({
        nom: "",
        description: "",
        prix:"",
        categorie:"",
        stock:"",
        image:null,
    });

    const navigation = useNavigate();

    const handleChange = (e) =>{
        const {name, value, files} = e.target;
        setForm({...form, [name]:files ? files[0] : value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        for (let key in form) formData.append(key, form[key]);

        await API.post("/products", formData,{
            headers: {"Content-Type": "multipart/form-data"},
        });

        navigation("/");
    };
    return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Ajouter un produit
      </h2>
      <form onSubmit={handleSubmit}>
        {["nom", "description", "prix", "categorie", "stock"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.toUpperCase()}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />
        ))}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ProductForm;