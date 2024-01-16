import { Box, Button } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateCustomProductModal } from "../../components/products/CreateCustomProductModal";
import { CreateProductModal } from "../../components/products/CreateProductModal";
import { ProductsList } from "../../components/products/ProductsList";
import axios from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import { AdminLayout } from "../../layout/admin/AdminLayout";

export const CoffeesPage = () => {
  const { isAuth } = useAuth();
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

  return (
    <AdminLayout>
      <CreateCustomProductModal
        open={openModal && selectedProduct === null}
        handleClose={() => setOpenModal(false)}
        handleSave={(product: Product) => {
          setSelectedProduct({ ...product });
          setOpenModal(true);
        }}
      />
      <CreateProductModal
        open={openModal && !!selectedProduct}
        handleClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        onRefresh={() => fetchData()}
        selectedProduct={selectedProduct}
      />

      <Box sx={{ p: 2, borderRadius: 3, my: 3 }}>
        <Button
          variant="contained"
          color={"primary"}
          startIcon={<IconPlus size={18} />}
          sx={{ textTransform: "none" }}
          onClick={() => {
            if (!isAuth) {
              navigate("/login");
              return;
            }
            setOpenModal(true);
            setSelectedProduct(null);
          }}
        >
          Create coffee
        </Button>
        <ProductsList
          products={products}
          onSelectProduct={(product: Product) => {
            setSelectedProduct(product);
            setOpenModal(true);
          }}
          onRefresh={() => fetchData()}
          hideCartButtons={true}
        />
      </Box>

    </AdminLayout>
  )
}