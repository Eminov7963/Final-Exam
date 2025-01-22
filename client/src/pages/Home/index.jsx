import React, { useContext, useEffect, useState } from 'react'
import styles from "./index.module.scss"
import axios from "axios"
import { Base_Url } from '../../constant/services'
import Rating from "@mui/material/Rating";
import { FaInfoCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import {Link} from "react-router-dom"
import { WishlistContext } from '../../context/wishlistContext';

const Home = () => {
  const [products,setProducts] = useState([])
  const [productscopy,setProductsCopy] = useState([])
  const [searchquery, setSearchQuery] = useState("")
  const getAllData = async ()=>{
    const resp = await axios.get(`${Base_Url}/products`);
    setProducts(resp.data.data);
    setProductsCopy(resp.data.data);
  }
  const { wish, ToggleWishlist } = useContext(WishlistContext);
  const filtered = products.filter((c)=>c.title.toLowerCase().includes(searchquery.toLowerCase().trim()))

  const HandleChange = (e)=>{
    let sorted = null
    if (e.target.value === "asc") {
      sorted = [...products].toSorted((a, b) => a.price - b.price);
    } else if (e.target.value === "desc") {
      sorted = [...products].toSorted((a, b) => b.price - a.price);
    }else{
      sorted = [...productscopy]
    }
    setProducts(sorted)
  }

  useEffect(()=>{
    getAllData();
  },[])
  return (
    <main>
      <section className={styles.main}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h4>Winter Fashion</h4>
            <h1>Fashion Collection 2019</h1>
            <button>Skip Now</button>
          </div>
        </div>
      </section>
      <section className={styles.box}>
        <div className={styles.boxs1}>
          <img
            src="https://preview.colorlib.com/theme/winter/img/feature_1.png"
            alt=""
          />
          <button>Shop For Male</button>
        </div>
        <div className={styles.boxs2}>
          <img
            src="https://preview.colorlib.com/theme/winter/img/feature_2.png"
            alt=""
          />
          <button>Shop For FeMale</button>
        </div>
        <div className={styles.boxs3}>
          <img
            src="https://preview.colorlib.com/theme/winter/img/feature_3.png"
            alt=""
          />
          <button>Shop For Male</button>
        </div>
      </section>
      <section className={styles.product}>
        <div className={styles.search}>
          <div>
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select name="" id="" onChange={HandleChange}>
            <option value="asc">ASC</option>
            <option value="desc">DSC</option>
            <option value="default">DEFAULT</option>
          </select>
        </div>
        <div className={styles.contain}>
          {products &&
            filtered.map((q) => {
              return (
                <div className={styles.cards} key={q._id}>
                  <img src={q.image} alt={q.title} />
                  <h1>{q.title}</h1>
                  <p>{q.description}</p>
                  <div className={styles.prices}>
                    <span className={styles.oldprice}>${q.oldprice}</span>
                    <span>${q.price}</span>
                  </div>
                  <Rating
                    name="half-rating"
                    defaultValue={q.ratings}
                    precision={0.5}
                  />
                  <div className={styles.actions}>
                    <Link to={`products/${q._id}`}>
                      <FaInfoCircle className={styles.info} />
                    </Link>
                    <button onClick={() => ToggleWishlist(q)}>
                      <FaHeart className={styles.heart} />
                    </button>
                    <button>
                      <SlBasket className={styles.basket} />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
}

export default Home
