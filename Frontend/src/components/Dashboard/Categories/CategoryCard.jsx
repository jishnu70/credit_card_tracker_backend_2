import React from 'react';
import CategoryCSS from './Categories_styles.module.css';
import { BiTransfer } from 'react-icons/all';
import { FaWallet } from 'react-icons/all';
import { FaCarAlt } from 'react-icons/all';

const icons = [<BiTransfer />, <FaWallet />, <FaCarAlt />];

function CategoryCard({ icon, action, amount }) {
  return (
    <div className={CategoryCSS.card}>
      <label className={CategoryCSS.card_img}>
        {/* Display the corresponding icon for the category */}
        {icons[icon]}
      </label>
      <span className={CategoryCSS.card_text}>
        {/* Display the category name and total transaction amount */}
        <p>{action}</p>  {/* 'action' corresponds to the category_name */}
        <label className={CategoryCSS.amount}>${amount}</label>  {/* 'amount' corresponds to the total_amount */}
      </span>
    </div>
  );
}

export default CategoryCard;
