import React, { useEffect, useState } from 'react'
import { getAllDataFromFireBase } from '../../../firebase/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
import "./AllNewProducts.css";
import { truncateText } from '../../../functions/Functions';
import Loader from '../../loader/Loader';
const AllNewProducts = () => {
    const navigate = useNavigate()
    const[newProducts, setNewProducts] = useState([])
    const[loading, setLoading] = useState(false);
    useEffect(()=>{fetchData()},[])
    const fetchData = async () => {
      setLoading(true)
        const newProducts = await getAllDataFromFireBase("Products");
        setNewProducts(newProducts);
        setLoading(false)
      };
     
  return (
    <section>
    {loading? <Loader/> : <div className='allnewProductsContainer container'>
         {newProducts.map((product, index) => {
        return (
          <div key={index}>
            <div className="product" onClick={() => navigate(`/newProducts/newproductDetails/${product.productName}/${product.productId}`)}>
              <img src={product.productUrl} alt="iPhone 9 Thumbnail" />
              <div className="productContent">
              <h2 className='productTitle'>{truncateText("title", product.productName)}</h2>
                <p className="productCategory">{product.productCategory}</p>
               
                <p className="productPrice"> $ {product.productPrice}</p>
                <p className="new">new</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>}
 
    </section>
   
  )
}

export default AllNewProducts