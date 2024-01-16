import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { IconPencil, IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { IngredientRating } from "../ingredients/IngredientRating";
import { useAuth } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";


export const ProductListItem = (
  { product, hideCartButtons, onUpdate, onEditProduct, onDelete }:
    { product: Product, hideCartButtons: boolean, onUpdate?: (product: Product, productIngredient: ProductIngredient) => void | undefined, onEditProduct: (product: Product) => void, onDelete: (id: string | null) => void }
) => {
  const { currentUser } = useAuth();
  const { cart, updateCart } = useAppContext();

  return (
    <Grid
      item component={Stack} gap={1}
      direction="column" sx={{ border: 1, borderColor: "divider", bgcolor: "#fff", borderRadius: 3, p: 2 }}
      alignContent={"stretch"}
      xs={12} sm={5.9} md={3.9} lg={2.9}
    >
      <Stack direction="row" gap={1} alignItems={"center"}>
        <Typography variant="h6" fontWeight={600} color="primary" sx={{ flex: 1 }}>{product?.name}</Typography>
        {
          currentUser && currentUser?.role === "admin" &&
          <>
            <IconButton size="small" onClick={() => onEditProduct(product)}>
              <IconPencil size={15} />
            </IconButton>
            <IconButton size="small" color="error" disabled={!product.id} onClick={() => onDelete(product.id)}>
              <IconTrash size={15} />
            </IconButton>
          </>
        }

      </Stack>
      <Typography>{product?.description}</Typography>
      {product?.ingredients
        ?.map(productIngredient => (
          <IngredientRating
            key={productIngredient.id}
            productIngredient={productIngredient}
            readOnly={hideCartButtons}
            onChange={(productIngredient) => onUpdate && onUpdate(product, productIngredient)}
            removeIngredient={false}
          />
        ))}

      <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} sx={{ mt: "auto" }}>
        <Typography fontSize={16} fontWeight={700} >Price:</Typography>
        <Typography fontSize={22} fontWeight={700} fontStyle={"italic"} color="primary">${product?.price}</Typography>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"}>
        <div />
        <Button
          variant="outlined"
          startIcon={<IconShoppingCart size={15} />}
          onClick={() => {
            updateCart([...cart, product])
          }}
        >
          Add
        </Button>
      </Stack>
    </Grid>
  )
}