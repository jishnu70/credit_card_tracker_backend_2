import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import api from "../Api/axios"; // Import your axios instance

export const AccountContext = createContext();

export function AccountContextProvider(props) {
    const navigate = useNavigate(); // Initialize useNavigate
    const [currentCreditCard, setCurrentCreditCard] = useState(null);
    const [creditCards, setCreditCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [userProfile, setUserProfile] = useState(null);

    const fetchCreditCards = async () => {
        try {
            const response = await api.get("/api/get-cards/");
            setCreditCards(response.data);
            localStorage.setItem('creditCards', JSON.stringify(response.data));

            // Set the first card as the default current card if none is selected
            if (!currentCreditCard && response.data.length > 0) {
                setCurrentCreditCard(response.data[0]);
                localStorage.setItem('currentCreditCard', JSON.stringify(response.data[0]));
            }
        } catch (error) {
            console.error("Error fetching cards:", error.response?.data || error.message);
        }
    };

    const fetchUserProfile = async () => {
        // Placeholder for user profile fetch. Implement API call if applicable.
        // const response = await api.get('/api/user-profile/');
        // setUserProfile(response.data);
        // localStorage.setItem('userProfile', JSON.stringify(response.data));
    };

    useEffect(() => {
        const storedCards = localStorage.getItem('creditCards');
        const storedCurrentCard = localStorage.getItem('currentCreditCard');
        const storedUserProfile = localStorage.getItem('userProfile');

        if (storedCards) {
            setCreditCards(JSON.parse(storedCards));
            // Set the first card as the default current card if none is selected
            if (!storedCurrentCard) {
                const cards = JSON.parse(storedCards);
                if (cards.length > 0) {
                    setCurrentCreditCard(cards[0]);
                    localStorage.setItem('currentCreditCard', JSON.stringify(cards[0]));
                }
            }
        } else {
            fetchCreditCards(); // Fetch cards from API if not in local storage
        }

        if (storedCurrentCard) {
            setCurrentCreditCard(JSON.parse(storedCurrentCard));
        }

        if (storedUserProfile) {
            setUserProfile(JSON.parse(storedUserProfile));
        } else {
            fetchUserProfile(); // Fetch user profile from API if not in local storage
        }
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem('creditCards', JSON.stringify(creditCards));
    }, [creditCards]);

    useEffect(() => {
        localStorage.setItem('currentCreditCard', JSON.stringify(currentCreditCard));
    }, [currentCreditCard]);

    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [userProfile]);

    const ChangeCurrentCreditCard = (data) => {
        console.log(`Changing to the ${data.card_number.slice(-4)} credit card`);
        setCurrentCreditCard(data);
        navigate("/home"); // Navigate to home screen upon successful change
    };

    const handleLogin = () => {
        setIsLoggedIn(true); // Update login state
    };

    return (
        <AccountContext.Provider value={{
            currentCreditCard,
            creditCards,
            ChangeCurrentCreditCard,
            handleLogin,
            userProfile,
            setCreditCards, // Correctly defining setCreditCards
            fetchCreditCards, // Exporting function to fetch cards from API
            setUserProfile,
            fetchUserProfile
        }}>
            {props.children}
        </AccountContext.Provider>
    );
}

export const useAccount = () => useContext(AccountContext);
