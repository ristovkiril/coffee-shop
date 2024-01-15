import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../layout/admin/AdminLayout";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Box, Button, Grid, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import useConfirm from "../../hooks/useConfirm";
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
    axios.get("/api/product")
      .then(response => setProducts(response.data))
      .catch(error => toast.error(error.message));
  }

  console.log(products);

  const onDelete = async (id: string) => {
    const response = await confirm();
    if (response) {
      await axios.delete(`/api/product/${id}`);
      fetchData();
    }
  }

  return (
    <AdminLayout>
      {ConfirmationDialog}
      {/* <CreateIngredientModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setSelectedIngredient(null);
        }}
        handleSave={() => fetchData()}
        selectedIngredient={selectedIngredient}
      /> */}

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
        <Grid container>
          {
            products?.map((product) => {

              return (
                <Grid item key={product.id}
                  xs={12} sm={6} md={4} lg={3}
                  sx={{ p: 1 }}
                >
                  <Stack direction="column" gap={1} sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 2 }}>
                    <Typography variant="h4" color="primary">{product?.name}</Typography>
                    <Typography>{product?.description}</Typography>
                    {product?.ingredients?.map(ingredient => (
                      <Stack key={ingredient.id} direction="row" alignItems="center" justifyContent={"space-between"}>
                        {ingredient?.name}
                      </Stack>
                    ))}
                  </Stack>
                </Grid>
              )
            })
          }


        </Grid>
      </Box>

    </AdminLayout>
  )
}