
const Dashboard = () => {
    return (
        <> 
            <h2 className="text-2xl font-bold mb-4">Vue d'ensemble</h2>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm mb-2">Produits</h3>
                    <p className="text-2xl font-bold text-green-600">128</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm mb-2">Utilisateurs</h3>
                    <p className="text-2xl font-bold text-green-600">52</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm mb-2">Commandes</h3>
                    <p className="text-2xl font-bold text-green-600">36</p>
                </div>
            </div>
        </>
    );
};

export default Dashboard;