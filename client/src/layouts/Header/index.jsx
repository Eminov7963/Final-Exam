import React from 'react'
import { NavLink } from 'react-router-dom';
import { CiShoppingBasket } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import styles from "./index.module.scss"
const Header = () => {
  return (
    <header>
      <h1>Winter</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.headIcons}>
        <CiShoppingBasket className={styles.basket}/>
        <CiSearch className={styles.search}/>
      </div>
    </header>
  );
}

export default Header
