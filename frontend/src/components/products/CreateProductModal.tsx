import { Button, Fade, FormControl, IconButton, InputLabel, MenuItem, Modal, Rating, Select, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IconCircle, IconCircleFilled, IconX } from "@tabler/icons-react";
import { useAppContext } from "../../context/AppContext";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: { xs: "80vw", sm: "70vw", md: "50vw", lg: "30vw" },
  maxWidth: "80vw",
  maxHeight: "80vh",
  bgcolor: 'background.paper',
  borderRadius: "0.75rem",
  border: '0px solid #000',
  overflowY: 'auto',
  px: 3,
  py: 3,
};

export const CreateProductModal = (
  { open, handleClose, handleSave, selectedProduct }:
    { open: boolean, handleClose: () => void, handleSave: (product: Product) => void, selectedProduct: null | Product }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<ProductIngredient[]>([]);
  const { ingredients } = useAppContext();

  useEffect(() => {
    if (open) {
      let newName = "";
      let newDesc = "";
      let newPrice = 0;
      let newIngredients: ProductIngredient[] = [];
      if (selectedProduct) {
        newName = selectedProduct.name;
        newDesc = selectedProduct.description;
        newPrice = selectedProduct.price;
        newIngredients = selectedProduct.ingredients;
      }
      setName(newName);
      setDescription(newDesc);
      setPrice(newPrice)
      setSelectedIngredients(newIngredients);
    }
  }, [open, selectedProduct])

  const onSave = () => {
    if (!name || !description || !price || selectedIngredients?.length === 0) {
      toast.error("All fields are required");
      return;
    }
    handleSave({ id: null, owner: null, name, description, price, ingredients: selectedIngredients })

  }

  const removeIngredient = (id: string) => {
    setSelectedIngredients(prev => {
      return prev.filter(i => i.id !== id);
    })
  }

  const remainedIngredients = ingredients?.filter(i1 => !selectedIngredients?.find(i2 => i2.id === i1.id));

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Fade in={open} timeout={500}>
        <Stack direction={"column"} gap={2} sx={style}>
          <Typography variant="h2" color="primary">{selectedProduct?.id ? "Update" : "Create"} Product</Typography>
          <TextField
            value={name}
            label="Name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            value={description}
            label="Description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="number"
            value={price}
            label="Price"
            placeholder="Price"
            inputProps={{ min: 0 }}
            onChange={(e) => setPrice(+e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Add ingridient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"none"}
              label="Add Ingredient"
              onChange={(e) => {
                const ingredient = ingredients?.find(i => i.id === e.target.value);
                if (ingredient) {
                  setSelectedIngredients((prev: ProductIngredient[]) => {
                    return [...prev, { id: ingredient?.id, name: ingredient?.name, description: ingredient?.description, value: 1, min: 0, max: 5 }]
                  })
                }
              }}
            >
              <MenuItem value={"none"}><em>Add new ingrident</em></MenuItem>
              {remainedIngredients?.map(ingredient => {
                return <MenuItem key={ingredient.id} value={ingredient.id}>{ingredient.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          {selectedIngredients?.map(productIngredient => {
            const ingredient = ingredients?.find(i => i.id === productIngredient.id);
            if (!ingredient) return null;
            return (
              <Stack key={productIngredient.id} direction={"row"} alignItems="center" gap={1}>
                <IconButton onClick={() => removeIngredient(productIngredient.id)}>
                  <IconX size={18} />
                </IconButton>
                <Typography sx={{ flex: 1 }} fontWeight={600}>{productIngredient.name}</Typography>
                <Rating
                  value={productIngredient?.value}
                  max={ingredient?.max}
                  sx={{ '& .MuiRating-iconFilled': { color: "#803030" } }}
                  icon={<IconCircleFilled color="#803030" />}
                  emptyIcon={<IconCircle color="#801010" />}
                  onChange={(e, value) => {
                    setSelectedIngredients(prev => {
                      const newValue = { ...productIngredient };
                      newValue.value = value === null ? 0 : value;
                      if (newValue.value > ingredient.max) {
                        newValue.value = ingredient.max;
                      } else if (newValue.value < ingredient.min) {
                        newValue.value = ingredient.min;
                      }
                      return prev.map(item => {
                        if (item.id === newValue.id) {
                          return newValue;
                        }
                        return item;
                      })
                    })
                  }}
                />
              </Stack>
            )
          })}

          <Stack direction={'row'} gap={1} >
            <Button
              variant={"contained"}
              color={"primary"}
              sx={{ borderRadius: 5, textTransform: "capitalize" }}
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              variant={"outlined"}
              color={"primary"}
              sx={{ borderRadius: 5, textTransform: "capitalize" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Fade>
    </Modal>
  )
}