import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../config/axios";

type AppContextType = {
  ingredients: Ingredient[];
  fetchIngredients: () => void;
}

const AppContext = React.createContext<AppContextType>({
  ingredients: [],
  fetchIngredients: () => { }
})

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetchIngredients();
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
        fetchIngredients
      }}
    >
      {children}
    </AppContext.Provider>
  )
}