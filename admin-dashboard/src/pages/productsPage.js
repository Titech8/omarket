import { use, useEffect, useState } from "react";
import api from "..services/api";
import ProductForm from "../components/productForm.js";

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    },[]);

    const fetchProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        }catch (err){
            console.error("Erreur de récuperation produits:", err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Gestion des Produits
            </h1>
            <productForm onProductAdded={fetchProducts} />
            <table>
                <thead>
                    <tr>
                        <th>nom </th>
                        <th>description,</th>
                        <th>prix</th>
                        <th>categorie</th>
                        <th>image</th>
                        <th>stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key = {p.id}>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.prix}</td>
                            <td>{p.categorie}</td>
                            <td>{p.image}</td>
                            <td>{p.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsPage;