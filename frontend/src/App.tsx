import './App.css'
import { useAuth } from './context/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout/main/MainLayout';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { IngredientsPage } from './pages/ingredients/IngredientsPage';

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" index element={<MainLayout>Home</MainLayout>} />
        {
          isAuth ?
            <>
              <Route path="/ingredients" index element={<IngredientsPage />} />
              <Route path="/default-products" index element={<MainLayout>Default Products</MainLayout>} />
              <Route path="*" element={<Navigate to="/" />} />

            </> :
            <>
              <Route path="/login" index element={<LoginPage />} />
              <Route path="/register" index element={<RegisterPage />} />
              {/* <Route path="/" index element={<MainLayout>Home</MainLayout>} /> */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
        }
      </Routes>
    </>
  )
}

export default App
