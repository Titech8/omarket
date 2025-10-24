import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    console.log("🔍 Header Authorization reçu :", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    // Supprimer les doublons de "Bearer"
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token || token === "Bearer") {
      return res.status(401).json({ message: "Token invalide ou mal formaté" });
    }

    // Vérifier le token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Erreur vérification JWT :", err);
        return res.status(403).json({ message: "Token invalide ou expiré" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Erreur middleware JWT:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
