import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) =>{ 
    try { 
        const { nom, email, numero, mot_de_passe } = req.body;
         if (!nom || !email || !numero || !mot_de_passe) {
             return res.status(400).json({ message: "Veuillez remplir tous les champs" });
         }

        const existinguer = await User.findOne({ where: { email } });
        if (existinguer) {
            return res.status(400).json({ message: "L'utilisateur existe déjà" });
        }

        //hasher le mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        //créer un utilisateur
        const newUser = await User.create({
            nom,
            email,
            numero,
            mot_de_passe:hashedPassword,
        });
        return res.status(201).json({
            message: "utilisateur créé avec succès",
            user: {
                id:newUser.id,
                nom:newUser.nom,
                email:newUser.email,
                numero:newUser.numero,
             },
         });
    }catch(error){
        console.error(" Erreur inscription:",error);
        return res.status(500).json({message:"Erreur serveur"})
     };
    
};

export const login = async(req, res) => {
    try{
        const {email, mot_de_passe} = req.body;

        //verification des champs
        if(!email || !mot_de_passe){
            return res.status(400).json({message: "Email et mot de passe requis" });
         }

         //verifier si l'utilisateur existe
         const user = await User.findOne({where:{email}});
         if (!user){
            return res.status(404).json({message:"l'utilisateur est introuvable"});
          }

        //comparer les mots de passe 
        const validpassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!validpassword){
            return res.status(404).json({message:"mot de passe incorrect"});
         }

         //générer un token jwt
        const token = jwt.sign(
            {id:user.id, nom:user.nom, numero:user.numero, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        return res.status(200).json({
            message:"connexion réussie",
            token,
            user:{
                id:user.id,
                nom:user.nom,
                email:user.email,
                numero:user.numero,
                mot_de_passe:user.mot_de_passe,
                role:user.role,
             }
         });
    }catch(error){
        console.error("Erreur de connexion:", error);
        return res.status(500).json({message:"Erreur serveur" });
     }
 };