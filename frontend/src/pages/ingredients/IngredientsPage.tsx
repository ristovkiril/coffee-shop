import { useEffect, useState } from "react";
import { AdminLayout } from "../../layout/admin/AdminLayout";
import axios from "../../config/axios";
import { Box, Button, IconButton, Rating, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { IconCircle, IconCircleFilled, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import useConfirm from "../../hooks/useConfirm";
import { CreateIngredientModal } from "./CreateIngredientModal";
import { useAppContext } from "../../context/AppContext";

export const IngredientsPage = () => {
  const { ingredients, fetchIngredients } = useAppContext();
  const [selectedIngredient, setSelectedIngredient] = useState<null | Ingredient>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete action",
    "Are you sure you want to delete this ingredient?"
  );

  useEffect(() => {
    fetchIngredients();
  }, [])

  const onDelete = async (id: string) => {
    const response = await confirm();
    if (response) {
      await axios.delete(`/api/ingredient/${id}`);
      fetchIngredients();
    }
  }

  return (
    <AdminLayout>
      {ConfirmationDialog}
      <CreateIngredientModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setSelectedIngredient(null);
        }}
        handleSave={() => fetchIngredients()}
        selectedIngredient={selectedIngredient}
      />

      <Box sx={{ p: 2, bgcolor: "#FFF", borderRadius: 3, my: 3 }}>
        <Button
          variant="contained"
          color={"primary"}
          startIcon={<IconPlus size={18} />}
          sx={{ textTransform: "none" }}
          onClick={() => {
            setOpenModal(true);
            setSelectedIngredient(null);
          }}
        >
          Add Ingredient
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Min - Max</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients?.map((ingredient, index) => {
              return (
                <TableRow key={ingredient?.id} hover>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.description}</TableCell>
                  <TableCell>
                    <Rating max={ingredient.max} value={ingredient.min} readOnly
                      sx={{ '& .MuiRating-iconFilled': { color: "#803030" } }}
                      icon={<IconCircleFilled color="#803030" />}
                      emptyIcon={<IconCircle color="#801010" />}
                    />
                  </TableCell>
                  <TableCell>{moment(ingredient.createdAt).format("HH:mm DD MMM YYYY")}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSelectedIngredient(ingredient);
                        setOpenModal(true);
                      }}
                    ><IconPencil /></IconButton>
                    <IconButton
                      onClick={() => onDelete(ingredient.id)}
                      color="error"
                    >
                      <IconTrash /></IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>

    </AdminLayout>
  )
}