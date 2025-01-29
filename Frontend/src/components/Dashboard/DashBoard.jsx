import React from 'react'
import { FaSearch } from 'react-icons/fa'
import MyCard from './MyCard/MyCard'
import Categories from './Categories/Categories'
import Transactions from './Transactions/Transactions'
import DashboardCSS from './DashBoard_styles.module.css'

function DashBoard({ data }) {
  return (
    <div className={DashboardCSS.father}>
      <div className={DashboardCSS.container_title}>
        <h2 className={DashboardCSS.title}>Welcome Client</h2>
        <span className={DashboardCSS.search}>
          <input type="text" placeholder='Search' className={DashboardCSS.search_input} />
          <FaSearch style={{ cursor: "pointer" }} />
        </span>
      </div>

      {/* Pass credit card data to MyCard */}
      <MyCard creditCard={data?.creditCard} />

      {/* Pass relevant data to other components */}
      <Categories categories={data?.categories} />
      <Transactions transactions={data?.transactions} />
    </div>
  )
}

export default DashBoard
