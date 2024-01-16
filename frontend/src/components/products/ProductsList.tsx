import { Grid, Typography } from "@mui/material";
import axios from "../../config/axios";
import useConfirm from "../../hooks/useConfirm";
import { ProductListItem } from "./ProductListItem";


export const ProductsList = (
  { products, hideCartButtons = true, onUpdate, onSelectProduct, onRefresh }:
    { products: Product[], hideCartButtons: boolean, onUpdate?: (product: Product, productIngredient: ProductIngredient) => void | undefined, onSelectProduct: (product: Product) => void, onRefresh: () => void }) => {
  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete action",
    "Are you sure you want to delete this product?"
  );

  const onDelete = async (id: string | null) => {
    const response = await confirm();
    if (response) {
      await axios.delete(`/api/product/${id}`);
      onRefresh();
    }
  }

  return (
    <Grid container sx={{ maxHeight: "100%", mt: 2 }} gap={1} justifyContent={"center"}>
      {ConfirmationDialog}
      {products?.length === 0 && <Typography color="primary" variant="h1">Customize and add your favorite coffee</Typography>}

      {products?.map(product => (
        <ProductListItem
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEditProduct={(product) => onSelectProduct(product)}
          hideCartButtons={hideCartButtons}
          onUpdate={onUpdate}
        />
      ))}
    </Grid>
  )
}