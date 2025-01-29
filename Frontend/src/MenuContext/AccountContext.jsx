import { createContext } from "react";
import { useState, useEffect } from "react";

export const AccountContext = createContext()   

export function AccountContextProvider(props){
    
    const [ currentCreditCard, setCurrentCreditCard ] = useState({
        nameId: "CardA",
        account: "3283-02-009-76275-1",
        number: "3890 2345 3283",
        date: "03/24",
        name: "Name LastName",
        ica: "123",
        balance: "$2.000",
        client: "US2864254-6658-508043",
        type: "visa",
        styles: "linear-gradient(126deg, rgba(58, 46, 72, 1) 0%, rgba(103, 92, 121, 1) 100%)"
    })

    useEffect(() => {
        console.log("Current Credit Card:", currentCreditCard);
      }, [currentCreditCard]);

    const ChangeCurrentCreditCard = (data) =>{
        console.log(`Changing to the ${data.number.slice(-4)} credit card`)
        setCurrentCreditCard(data)
        console.log("ready")
    }

    return(
        <AccountContext.Provider value={{
            currentCreditCard,
            ChangeCurrentCreditCard
        }}>
            {props.children}
        </AccountContext.Provider>
    )
}