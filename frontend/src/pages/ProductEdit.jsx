import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
    categorie: "",
    stock: "",
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setForm(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    await API.put(`/products/${id}`, formData);
    navigate("/");
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Modifier le produit</h2>
      <form onSubmit={handleSubmit}>
        {["nom", "description", "prix", "categorie", "stock"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={form[field] || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />
        ))}
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 mt-3 rounded hover:bg-blue-700"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
