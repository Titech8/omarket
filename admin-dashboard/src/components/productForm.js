import React,{useState} from "react";
import api from "../services/api";

function ProductForm({onProductAdded}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");
    const [categorie, setCategorie] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.post("/products",{name, description, prix, categorie, image,stock});
            onProductAdded();
            setName("");
            setDescription("");
            setPrix("");
            setCategorie("");
            setImage("");
            setStock("");
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit:", error);
        }
    };

    return(
        <form onSubmit={handleSubmit} className="mb-4">
            <input 
                type="text"
                placeholder="nom"
                value={name}
                onChange={(e)=> setName(e.target.value)}/>
            <input 
                type="text"
                placeholder="desxription"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}/>
            <input
                type="number"
                placeholder="prix"
                value={prix}
                onChange={(e) => setStock(e.target.value)}/>
            <input 
                type="text"
                placeholder="categorie"
                value={categorie}
                onChange={(e)=> setCategorie(e.target.value)}/>
            <input 
                type="string"
                placeholder="iamge"
                value={image}
                onChange={(e)=> setImage(e.target.value)}/>
            <input
                type="number"
                placeholder="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}/>
                
            <button type="submit">Ajouter</button>
            
        </form>
    );
}

export default ProductForm;