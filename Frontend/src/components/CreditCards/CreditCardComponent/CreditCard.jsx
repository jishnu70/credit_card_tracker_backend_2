import React from 'react';
import { FaWifi } from 'react-icons/fa';
import chip from '../../../assets/img/chip.png';
import MasterCard from "../../../assets/img/mastercard.svg";
import americanExpress from '../../../assets/img/AmericanExpressLogo.png';
import VISA from '../../../assets/img/visa-white.svg';
import styles from './CreditCard.module.css';

function CreditCard({ locked, data }) {
    const defaultStyle = 'linear-gradient(126deg, rgba(58, 46, 72, 1) 0%, rgba(103, 92, 121, 1) 100%)';

    return (
        <div className={styles.father}>
            <div className={styles.container} style={{ background: data.styles || defaultStyle }}>
                <div className={styles.header}>
                    <h1 style={{ fontWeight: "lighter" }}>Credit Card</h1>
                    <span className={styles.network}>
                        <FaWifi />
                    </span>
                </div>

                <div className={styles.chip}>
                    <img src={chip} style={{ width: "60px" }} />
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.cardInfo}>
                        {locked === false ? (
                            <>
                                <h3 className={styles.cardNumber}>{data.card_number}</h3>
                                <span style={{ margin: "10px 0 15px 0" }}>{data.expiry_date}</span>
                                <label className={styles.cardName}>{data.card_holder}</label>
                            </>
                        ) : (
                            <>
                                <h3 className={styles.cardNumber}>
                                    {data.card_number ? `**** **** ${data.card_number.slice(-4)}` : '**** **** **** ****'}
                                </h3>
                                <span style={{ margin: "10px 0 15px 0" }}></span>
                                <label className={styles.cardName}>{data.card_holder}</label>
                            </>
                        )}
                    </div>

                    <div className={styles.type}>
                        {data.type === 'visa' ? (
                            <img src={VISA} alt="Visa" style={{ marginTop: "40px" }} />
                        ) : data.type === 'mastercard' ? (
                            <img src={MasterCard} alt="MasterCard" />
                        ) : data.type === 'americanExpress' ? (
                            <div style={{ width: "130px" }}>
                                <img src={americanExpress} alt="American Express" style={{ transform: "translateY(10px)" }} />
                            </div>
                        ) : (
                            <img src={MasterCard} alt="Default Card" />
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.behind} style={{ background: data.styles || defaultStyle }}>
                <div className={styles.bar}></div>
                <span style={{ fontSize: "smaller", padding: "10px" }}>
                    ICA {data.ica}
                </span>
            </div>
        </div>
    );
}

export default CreditCard;
