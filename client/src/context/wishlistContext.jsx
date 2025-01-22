import React, { createContext, useState } from 'react'
export const WishlistContext = createContext(null)

const WishlistProvider = ({children}) => {
    const [wish, setWish] = useState([])
    
    const ToggleWishlist = (product)=>{
        const idx = wish.findIndex((c)=>c._id === product._id)
        if (idx === -1) {
            setWish([...wish,{...product}])
        }
        else{
            setWish([...wish].filter((c)=>c._id !== product._id))
        }
    }
  return (
    <WishlistContext.Provider value={{ wish, ToggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider
