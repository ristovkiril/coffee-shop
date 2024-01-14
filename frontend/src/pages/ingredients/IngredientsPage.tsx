import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../layout/admin/AdminLayout";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

export const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    axios.get("/api/ingredient")
      .then(response => setIngredients(response.data))
      .catch(error => toast.error(error.message));
  }, [])

  console.log(ingredients);
  return (
    <AdminLayout>
      <Box sx={{ p: 2, bgcolor: "#FFF", borderRadius: 3, my: 3 }}>
        <Button
          variant="contained"
          color={"primary"}
          startIcon={<IconPlus size={18} />}
          sx={{ textTransform: "none" }}
        >
          Add Ingredient
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
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
                  <TableCell>{moment(ingredient.createdAt).format("hh:mm DD MMM YYYY")}</TableCell>
                  <TableCell>
                    <IconButton><IconPencil /></IconButton>
                    <IconButton color="error"><IconTrash /></IconButton>
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