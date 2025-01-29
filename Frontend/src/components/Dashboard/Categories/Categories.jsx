import React from 'react'
import CategoryCard from './CategoryCard'
import CategoriesCSS from './Categories_styles.module.css'

function Category({ categories }) {
  if (!categories || categories.length === 0) {
    return <p>Loading categories...</p>
  }

  return (
    <div className={CategoriesCSS.father}>
      <div className={CategoriesCSS.title}>
        <h3>Categories</h3>
        <span className={CategoriesCSS.more}>more</span>
      </div>
      <div className={CategoriesCSS.container}>
        {categories.map((category, index) => (
          <CategoryCard 
            icon={index} // If icons are available in `category`, replace this with `category.icon`
            action={category.action} 
            amount={category.total_amount}  // Display total transaction amount here
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Category
