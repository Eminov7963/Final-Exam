import React, { useContext } from 'react'
import { WishlistContext } from '../../context/wishlistContext';
import Rating from "@mui/material/Rating";
import { FaInfoCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import styles from "./index.module.scss"
const Wishlist = () => {
  const { wish, ToggleWishlist } = useContext(WishlistContext);

  return (
    <div className={styles.wishlist}>
      {wish &&
        wish.map((q) => {
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
                
                <button onClick={() => ToggleWishlist(q)}>
                  <FaHeart className={styles.heart} />
                </button>
                
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Wishlist
