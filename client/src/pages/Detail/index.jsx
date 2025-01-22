import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Base_Url } from '../../constant/services';
import styles from "./index.module.scss"
import Rating from "@mui/material/Rating";
const Detail = () => {
  const {id} = useParams()
  const [product,setProduct] = useState()

  const getDataById = async ()=>{
    const resp = await axios.get(`${Base_Url}/products/${id}`)
    console.log(resp.data.data);
    setProduct(resp.data.data)
    
  }

  useEffect(()=>{
    getDataById();
  },[])

  return (
    <div className={styles.Det}>
      {product && (
        <div className={styles.card}>
          <img src={product.image} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className={styles.prices}>
            <span className={styles.oldprice}>${product.oldprice}</span>
            <span>${product.price}</span>
          </div>
          <Rating
            name="half-rating"
            defaultValue={product.ratings}
            precision={0.5}
          />
          
            <Link to="/" className={styles.back}>Back</Link>
          
        </div>
      )}
    </div>
  );
}

export default Detail
