import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../layout/admin/AdminLayout";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Box, Button, Grid, IconButton, Rating, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { IconCircle, IconCircle0Filled, IconCircleFilled, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import useConfirm from "../../hooks/useConfirm";
import { CreateProductModal } from "../../components/products/CreateProductModal";
import { ProductsList } from "../../components/products/ProductsList";
// import { CreateIngredientModal } from "./CreateIngredientModal";

export const DefaultProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete action",
    "Are you sure you want to delete this product?"
  );

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    axios.get("/api/product/default")
      .then(response => setProducts(response.data))
      .catch(error => toast.error(error.message));
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
      axios.post(`/api/product/default`, { ...product })
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
      {ConfirmationDialog}
      <CreateProductModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        handleSave={onSave}
        selectedProduct={selectedProduct}
      />

      <Box sx={{ p: 2, bgcolor: "#FFF", borderRadius: 3, my: 3 }}>
        <Button
          variant="contained"
          color={"primary"}
          startIcon={<IconPlus size={18} />}
          sx={{ textTransform: "none" }}
          onClick={() => {
            setOpenModal(true);
            setSelectedProduct(null);
          }}
        >
          Add Product
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