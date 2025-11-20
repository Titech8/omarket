import React from "react";

const Topbar = () => {
    return (
        <header className="bg-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-700">Dashboard Administrateur</h1>
            <div className="flex items-center gap-3">
                <img
                    src="https://ui-avatars.com/api/?name=Admin"
                    alt="Admin"
                    className="w-10 h-10 rounded-full border"
                />
                <span className="font-medium">Admin</span>
            </div>
        </header>
    );
};

export default Topbar;