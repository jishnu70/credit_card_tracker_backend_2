import React, { useEffect, useState } from 'react';
import { useAccount } from '../../MenuContext/AccountContext';
import MyCard from './MyCard/MyCard';
import Categories from './Categories/Categories';
import Transactions from './Transactions/Transactions';
import DashboardCSS from './DashBoard_styles.module.css';
import { FaSearch } from 'react-icons/fa';
import api from '../../Api/axios'; // Import the API instance

function DashBoard() {
    const { currentCreditCard } = useAccount();
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch total transaction amounts per category
        const fetchCategoryTransactionData = async () => {
            try {
                const response = await api.get('/api/total-transaction-amount-per-category/'); // Adjust endpoint if necessary

                // Set the fetched data
                setCategoriesData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching category transaction data:", error);
                setLoading(false);
            }
        };

        fetchCategoryTransactionData();
    }, []);

    return (
        <div className={DashboardCSS.father}>
            <div className={DashboardCSS.container_title}>
                <h2 className={DashboardCSS.title}>Welcome Client</h2>
                <span className={DashboardCSS.search}>
                    <input type="text" placeholder='Search' className={DashboardCSS.search_input} />
                    <FaSearch style={{ cursor: "pointer" }} />
                </span>
            </div>

            {currentCreditCard ? <MyCard creditCards={[currentCreditCard]} /> : <p>Loading...</p>}
            
            {/* Pass categoriesData to Categories component */}
            {/* <Categories categories={categoriesData} /> */}
            
            <Transactions />
        </div>
    );
}

export default DashBoard;
