import React from 'react';
import Slider from 'react-slick';
import styles from './CardsCarrousel.module.css';
import CreditCard from './CreditCardComponent/CreditCard';
import { useState, useEffect } from "react"
import BottomDrawer from './Drawer/BottomDrawer';
import api from '../../Api/axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carrousel-styles.css';

const defaultCardStyle = 'linear-gradient(126deg, rgba(58, 46, 72, 1) 0%, rgba(103, 92, 121, 1) 100%)';

function CardsCarrousel() {

  const [creditCards, setData] = useState(null)

  useEffect(() => {
    const fetchCardData = async () => {
      const result = await api.get("/api/get-cards/").then((res) => res.data).then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      })
    }
    fetchCardData()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (!creditCards || creditCards.length === 0) {
    return <p>Loading credit cards...</p>; // Prevents rendering issues when no data is available
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
              data={{ 
                ...cardData, 
                styles: cardData.styles || defaultCardStyle // Apply default style if none exists
              }} 
            />
            <BottomDrawer data={cardData} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CardsCarrousel;
