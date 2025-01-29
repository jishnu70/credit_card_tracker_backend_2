import React, { useEffect } from 'react';
import Slider from 'react-slick';
import styles from './CardsCarrousel.module.css';
import CreditCard from './CreditCardComponent/CreditCard';
import BottomDrawer from './Drawer/BottomDrawer';
import { useAccount } from '../../MenuContext/AccountContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carrousel-styles.css';

function CardsCarrousel() {
    const { creditCards, ChangeCurrentCreditCard, fetchCreditCards } = useAccount();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        fetchCreditCards();
    }, [fetchCreditCards]);

    if (!creditCards || creditCards.length === 0) {
        return <p>Loading credit cards...</p>;
    }

    return (
        <div className={styles.father} id='father'>
            <div className={styles.header}>
                <h2 style={{ fontSize: '30px', fontWeight: 'bolder', margin: '0 30px' }}>
                    Your Credit Cards
                </h2>
            </div>
            <Slider className={styles.carrousel} {...settings}>
                {creditCards.map((cardData, index) => (
                    <div key={index} className={styles.item}>
                        <CreditCard 
                            locked={true} 
                            data={cardData} 
                        />
                        <button onClick={() => ChangeCurrentCreditCard(cardData)}>Set as Dashboard Card</button>
                        <BottomDrawer data={cardData} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CardsCarrousel;
