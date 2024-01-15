import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { IngredientRating } from "../ingredients/IngredientRating";


export const ProductListItem = (
  { product, onEditProduct, onDelete }:
    { product: Product, onEditProduct: (product: Product) => void, onDelete: (id: string | null) => void }
) => {
  return (
    <Grid
      component={Stack} gap={1}
      direction="column" sx={{ border: 1, borderColor: "divider", bgcolor: "#fff", borderRadius: 3, p: 2 }}
      alignContent={"stretch"}
      xs={12} sm={5.9} md={3.9} lg={2.9}
    >
      <Stack direction="row" gap={1} alignItems={"center"}>
        <Typography variant="h6" fontWeight={600} color="primary" sx={{ flex: 1 }}>{product?.name}</Typography>
        <IconButton size="small" onClick={() => onEditProduct(product)}>
          <IconPencil size={15} />
        </IconButton>
        <IconButton size="small" color="error" disabled={!product.id} onClick={() => onDelete(product.id)}>
          <IconTrash size={15} />
        </IconButton>
      </Stack>
      <Typography>{product?.description}</Typography>
      {product?.ingredients
        ?.map(productIngredient => (
          <IngredientRating
            key={productIngredient.id}
            productIngredient={productIngredient}
            readOnly={true}
          />
        ))}
    </Grid>
  )
}