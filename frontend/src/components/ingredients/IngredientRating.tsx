import { IconButton, Rating, Stack, Typography } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { IconCircle, IconCircleFilled, IconX } from "@tabler/icons-react";
import { toast } from "react-toastify";


export const IngredientRating = (
  { productIngredient, readOnly, onChange, onRemove }:
    { productIngredient: ProductIngredient, readOnly: boolean, onChange?: (productIngredient: ProductIngredient) => void | undefined, onRemove?: (id: string) => void | undefined }) => {
  const { ingredients } = useAppContext();
  const ingredient = ingredients?.find(i => i.id === productIngredient.id);
  if (!ingredient) return null;
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {
        !readOnly &&
        <IconButton size="small" onClick={() => {
          if (onRemove) {
            onRemove(productIngredient.id)
          }
        }}>
          <IconX size={18} />
        </IconButton>
      }
      <Typography sx={{ flex: 1 }} fontWeight={500}>{productIngredient?.name}</Typography>
      <Rating
        value={productIngredient?.value}
        max={ingredient?.max}
        readOnly={readOnly}
        sx={{ '& .MuiRating-iconFilled': { color: "#803030" } }}
        icon={<IconCircleFilled color="#803030" />}
        emptyIcon={<IconCircle color="#801010" />}
        onChange={(e, value) => {
          console.log(e);
          if (readOnly || onChange === undefined) return;
          const newValue = { ...productIngredient };
          newValue.value = value === null ? 0 : value;
          if (newValue.value < ingredient.min) {
            toast.error(`Minimum is ${ingredient.min}`);
            return;
          }
          if (newValue.value > ingredient.max) {
            toast.error(`Maximum is ${ingredient.max}`);
            return;
          }
          onChange(newValue);
        }}
      />
    </Stack>
  )
}