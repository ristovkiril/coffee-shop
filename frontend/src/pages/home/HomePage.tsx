import { Box, Button } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateCustomProductModal } from "../../components/products/CreateCustomProductModal";
import { CreateProductModal } from "../../components/products/CreateProductModal";
import { ProductsList } from "../../components/products/ProductsList";
import axios from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import { AdminLayout } from "../../layout/admin/AdminLayout";
import { MainLayout } from "../../layout/main/MainLayout";
import { useAppContext } from "../../context/AppContext";

export const HomePage = () => {
  const { isAuth } = useAuth();
  const { } = useAppContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [isAuth])

  const fetchData = () => {
    axios.get("/api/product")
      .then(response => setProducts(response.data))
      .catch(() => {
        setProducts([]);
      });
  }

  const onUpdateProduct = (product: Product, productIngredient: ProductIngredient) => {
    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        if (product?.id === prod.id) {
          // change ingredient
          const newProduct = { ...prod }
          newProduct.ingredients = newProduct.ingredients.map(ingredient => {
            if (ingredient.id === productIngredient?.id) {
              return productIngredient;
            }
            return ingredient;
          })
          return newProduct;
        }
        return prod;
      })
    })
  }

  return (
    <MainLayout>
      <Box sx={{ my: 3 }}>
        <ProductsList
          products={products}
          onSelectProduct={(product: Product) => {
            setSelectedProduct(product);
            setOpenModal(true);
          }}
          onRefresh={() => fetchData()}
          hideCartButtons={false}
          onUpdate={onUpdateProduct}
        />
      </Box>

    </MainLayout>
  )
}