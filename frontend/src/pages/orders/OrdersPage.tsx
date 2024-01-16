import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import { MainLayout } from "../../layout/main/MainLayout";

export const OrdersPage = () => {
  const { isAuth } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchData();
  }, [isAuth])

  const fetchData = () => {
    axios.get("/api/order")
      .then((response: any) => setOrders(response.data || []))
      .catch(() => {
        setOrders([]);
      });
  }


  return (
    <MainLayout>

      <Box sx={{ my: 3, bgcolor: "#FFF", p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.1</TableCell>
              <TableCell>Order name</TableCell>
              <TableCell>Coffees</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order, index) => {
              return (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.displayName}</TableCell>
                  <TableCell>
                    <ul>
                      {order?.products?.map(product => {
                        return <li key={product.id}>{product.name} - {product.price}</li>
                      })}
                    </ul>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>

    </MainLayout>
  )
}