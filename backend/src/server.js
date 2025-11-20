import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database.js";
import User from "./models/user.models.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/Product.route.js";
import path from "path";
import createAdmin from "./utils/createAdmin.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend API is running "));

//brancher la route au seveur
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

//accerds aux images statiques
app.use("/uploads", express.static(path.join(process.cwd(), "src", "uploads")));

app.use((err, req, res, next) => {
  console.error("🔥 Erreur interceptée :", err);
  res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
});


//synchonisation d la base de données

sequelize
    .sync({force: false, alter: false})
    .then(() => console.log("Database & tables created!"))
    .catch((err) => console.log("Error: " + err));

const PORT = process.env.PORT || 3001;

app.listen(PORT,"127.0.0.1", () => console.log(`Server running on http://127.0.0.1:${PORT}`));

//Créer un admin par défaut
await createAdmin();