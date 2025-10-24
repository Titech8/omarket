import express from "express";

import { register, login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middlwares.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//route protégée (test)
router.get("/profile", verifyToken, (req, res) => {
    res.json({
        message:"Profil utilisateur accédé avec succès",
        user: req.user
    });
});


export default router;