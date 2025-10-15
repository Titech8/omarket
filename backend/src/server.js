import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database.js";
import User from "./models/user.models.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend API is running "));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//synchonisation d la base de données

sequelize
    .sync({alter: true})
    .then(() => console.log("Database & tables created!"))
    .catch((err) => console.log("Error: " + err));