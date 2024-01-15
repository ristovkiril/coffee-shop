import { useEffect, useState } from "react";
import { AdminLayout } from "../../layout/admin/AdminLayout";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { CreateProductModal } from "../../components/products/CreateProductModal";
import { ProductsList } from "../../components/products/ProductsList";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreateCustomProductModal } from "../../components/products/CreateCustomProductModal";

export const HomePage = () => {
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
      .catch(error => {
        setProducts([]);
        // toast.error(error.message);
      });
  }

  const onSave = (product: Product) => {
    if (selectedProduct?.id) {
      axios.put(`/api/product/${selectedProduct?.id}`, { ...product })
        .then(() => {
          toast.success("Successfully updated product");
          setOpenModal(false);
          setSelectedProduct(null);
          fetchData();
        })
        .catch(error => toast.error(error?.message || "Failed to update product"))
    } else {
      axios.post(`/api/product`, { ...product })
        .then(() => {
          toast.success("Successfully created product");
          setOpenModal(false);
          setSelectedProduct(null);
          fetchData();
        })
        .catch(error => toast.error(error?.message || "Failed to create product"))
    }
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
        handleSave={onSave}
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
          Add Favorite Coffee
        </Button>
        <ProductsList
          products={products}
          onSelectProduct={(product: Product) => {
            setSelectedProduct(product);
            setOpenModal(true);
          }}
          onRefresh={() => fetchData()}
        />
      </Box>

    </AdminLayout>
  )
}