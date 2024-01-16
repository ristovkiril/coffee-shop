import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../config/axios";

type AppContextType = {
  ingredients: Ingredient[];
  cart: Product[];
  updateCart: (cartItems: Product[]) => void;
  fetchIngredients: () => void;
}

const AppContext = React.createContext<AppContextType>({
  ingredients: [],
  cart: [],
  fetchIngredients: () => { },
  updateCart: (cartItems: Product[]) => { console.log(cartItems) }
})

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    fetchIngredients();

    if (localStorage.getItem("cartItems") !== null) {
      const items = localStorage.getItem("cartItems");
      const products: Product[] = items ? JSON.parse(items) : [];
      setCart(products);
    }

    return () => {
      if (cart.length) {
        localStorage.setItem("cartItems", JSON.stringify(cart));
      } else {
        localStorage.removeItem("cartItems");
      }
    }
  }, [])

  const fetchIngredients = () => {
    axios.get("/api/ingredient")
      .then(response => setIngredients(response.data))
      .catch(error => toast.error(error.message));
  }

  return (
    <AppContext.Provider
      value={{
        ingredients,
        cart,
        updateCart: (cartItems: Product[]) => setCart(cartItems),
        fetchIngredients
      }}
    >
      {children}
    </AppContext.Provider>
  )
}