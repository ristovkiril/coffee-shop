import { Grid, IconButton, Paper, Rating, Stack, Typography } from "@mui/material";
import { IconCircle, IconCircleFilled, IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "../../config/axios";


export const ProductsList = (
  { products, onSelectProduct, onRefresh }:
    { products: Product[], onSelectProduct: (product: Product) => void, onRefresh: () => void }) => {

  const onDelete = async (id: string) => {
    const response = await confirm();
    if (response) {
      await axios.delete(`/api/product/${id}`);
      onRefresh();
    }
  }
  return (
    <Grid container sx={{ maxHeight: "100%" }} gap={1} justifyContent={"center"} sx={{ mt: 2 }}>
      {
        products?.map((product) => {
          return (
            <Grid item key={product.id}
              component={Stack} gap={1}
              direction="column" sx={{ border: 1, borderColor: "divider", bgcolor: "#fff", borderRadius: 3, p: 2 }}
              alignContent={"stretch"}
              xs={12} sm={5.9} md={3.9} lg={2.9}
            >
              <Stack direction="row" gap={1} alignItems={"center"}>
                <Typography variant="h4" color="primary" sx={{ flex: 1 }}>{product?.name}</Typography>
                <IconButton size="small" onClick={() => onSelectProduct(product)}>
                  <IconPencil size={15} />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete(product.id)}>
                  <IconTrash size={15} />
                </IconButton>
              </Stack>
              <Typography>{product?.description}</Typography>
              {product?.ingredients?.map(ingredient => (
                <Stack key={ingredient.id} direction="row" alignItems="center" justifyContent={"space-between"}>
                  <Typography>{ingredient?.name}</Typography>
                  <Rating
                    value={ingredient?.value}
                    max={ingredient?.max}
                    sx={{ '& .MuiRating-iconFilled': { color: "#803030" } }}
                    icon={<IconCircleFilled color="#803030" />}
                    emptyIcon={<IconCircle color="#801010" />}
                  />
                </Stack>
              ))}
            </Grid>
          )
        })
      }
    </Grid>
  )
}