import React from 'react'
import { Filter, Products } from '../../components';
import "./AllProducts.css"

const AllProducts = () => {
  return (
    <div className='allProductsContainer container'>
    <div className='allProductsFilerWrapper'>
    <Filter/>
    </div>
    
    <Products/>
    </div>
  )
}

export default AllProducts