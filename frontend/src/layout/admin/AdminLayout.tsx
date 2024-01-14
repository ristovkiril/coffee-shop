import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import React, { useEffect } from "react";
import { MainLayout } from "../main/MainLayout";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth !== null && currentUser !== null) {
      if (currentUser?.role !== "admin") {
        navigate("/")
      }
    }
  }, [isAuth, currentUser])

  return (
    <MainLayout>
      {children}
    </MainLayout>
  )

}