import React  from "react";
import {Link, useLocation} from "react-router-dom";
import { BarChart3, Users, ShoppingBag } from "lucide-react";


const Sidebar = () => {
    const {pathname} = useLocation();

    const links = [
        {to: "/admin", label: "Tableau de bord", icon: <BarChart3 size={20}/>},
        {to: "/admin/products", label: "Produits", icon: <ShoppingBag size={20}/>},
        {to: "/users", label: "Utilisateurs", icon: <Users size={20}/>},
    ];

    return (
        <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-green-600 text-center">
                 🛍️ Omarket Admin
            </h2>
            <nav className="space-y-2">
                {links.map(({to, label, icon}) => (
                    <Link 
                        key ={to}
                        to = {to}
                        className={`flex items-center gap-3 py-3 rounded-lg transition ${
                            pathname === to
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-50"}`
                        }>
                        {icon}
                        {label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;