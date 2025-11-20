import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, mot_de_passe});
      console.log("login success:" ,res.data);
      localStorage.setItem("token", res.data.token);

      navigate("/Dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Connexion Admin</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-2 mb-4"
          value={mot_de_passe}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
