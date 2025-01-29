import React from 'react';
import MyCardCSS from './MyCard_styles.module.css';
import VISA from '../../../assets/img/visa-10.svg';
import Chip from '../../../assets/img/chip-1.png';
import { CgMenuRightAlt } from 'react-icons/all';

function MyCard({ creditCards, loading, error }) {
  if (loading) return <p>Loading card data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!creditCards || creditCards.length === 0) return <p>No cards available.</p>;

  return (
    <div className={MyCardCSS.father}>
      <div className={MyCardCSS.title}>
        <h3>My Cards</h3>
        <span style={{ fontSize: "25px", cursor: "pointer" }}>
          <CgMenuRightAlt />
        </span>
      </div>

      {creditCards.map((card, index) => (
        <div key={index} className={MyCardCSS.container_card}>
          {/* Card Type (Assume Visa for now, since API doesn't provide card type) */}
          <label className={MyCardCSS.visa_container} style={{ background: "linear-gradient(194deg, rgba(229,223,231,1) 0%, rgba(16,59,208,0.835) 100%)" }}>
            <img src={VISA} alt="Visa" style={{ width: "60px" }} />
          </label>

          {/* Card Details */}
          <div className={MyCardCSS.card}>
            <div className={MyCardCSS.header}>
              <span>
                <img src={Chip} alt="Chip" className={MyCardCSS.chip} />
              </span>
              <span className={MyCardCSS.expiry}>
                <p>Expiry: {card.expiry_date}</p>
              </span>
            </div>

            <div className={MyCardCSS.footer}>
              <div>
                <h4 style={{ fontSize: "12px", opacity: ".7" }}>Card Holder:</h4>
                <p>{card.card_holder}</p>
              </div>
              <div>
                <h4 style={{ fontSize: "12px", opacity: ".7" }}>Card Number:</h4>
                <p>**** **** **** {card.card_number.slice(-4)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCard;
