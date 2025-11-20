import bcrypt from "bcryptjs";
import User from "../models/user.models.js";

const createAdmin = async () => {
  try {
    // Vérifier si un admin existe déjà
    const exists = await User.findOne({
      where: { email: "admin@gmail.com" }
    });

    if (exists) {
      console.log("Admin déjà existant");
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Créer l’admin proprement
    const admin = await User.create({
      nom: "Super Admin",
      email: "admin@gmail.com",
      numero: "677670138",
      mot_de_passe: hashedPassword,
      role: "admin",
    });

    console.log("Admin créé avec succès !");
    console.log("Email : admin@gmail.com");
    console.log("Mot de passe : admin123");

  } catch (err) {
    console.error("Erreur lors de la création de l'admin :", err);
  }
};

export default createAdmin;
