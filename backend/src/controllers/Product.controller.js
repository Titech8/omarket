import { Product } from "../models/index.js";
import fs from "fs";
import path from "path";

export const getAllProducts = async (req, res) =>{
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch(error){
        res.status(500).json({message: "erreur serveur", error});
    }
};

export const getProductById = async (req, res) =>{
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product){
      return res.status(404).json({message: "produit non trouvé"});
    }

  res.status(200).json(product);
  }catch(error){
    console.error("Erreur getProductById:", error);
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { nom, description, prix, categorie, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imagePath) {
      return res.status(400).json({ message: "L'image est obligatoire" });
    }

    const product = await Product.create({
      nom,
      description,
      prix,
      categorie,
      stock,
      images: imagePath,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error: error,
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.image = req.file.filename;
    }

    const [updated] = await Product.update(data, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Produit non trouvé" });

    const updatedProduct = await Product.findByPk(id);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le produit existe
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Supprimer l'image associée si elle existe
    if (product.images) {
      const imagePath = path.join(process.cwd(), "src", product.images);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`🧹 Image supprimée : ${imagePath}`);
      }
    }

    // Supprimer le produit de la base de données
    await product.destroy();

    res.status(200).json({ message: "Produit supprimé avec succès ✅" });
  } catch (error) {
    console.error("Erreur deleteProduct:", error);
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: error.message,
    });
  }
};