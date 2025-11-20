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
  const [preview, setPreview] = useState(null); // <-- Pour l’aperçu de l’image actuelle

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setForm(res.data);
      setPreview(`http://127.0.0.1:3001/uploads/${res.data.image}`); // On affiche l’image existante
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0])); // Nouvelle image en aperçu
    } else {
      setForm({ ...form, [name]: value });
    }
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

      {/* Image actuelle */}
      {preview && (
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Image actuelle :</p>
          <img
            src={preview}
            alt="Aperçu du produit"
            className="w-full h-48 object-cover rounded-md shadow"
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {["nom", "description", "prix", "categorie", "stock"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={form[field] || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            placeholder={field.toUpperCase()}
            required
          />
        ))}

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

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
