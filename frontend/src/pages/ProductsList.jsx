import { useEffect, useState } from "react";
import api from "../api/axios";


export default function ProductList(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Erreur chargement produits:", err));
    }, []);

    return(
        <div className="container">
            <h1>Liste des produits</h1>
            <div className="grid">
                {products.map((p)=> (
                    <div>
                        <img src={`http://127.0.0.1:3001${p.images}`} alt="{p.nom}"/>
                        <h3> {p.nom} </h3>
                        <p><strong>{p.prix}</strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
}