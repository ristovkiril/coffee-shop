import './App.css'
import { useAuth } from './context/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { IngredientsPage } from './pages/ingredients/IngredientsPage';
import { CoffeesPage } from './pages/coffees/CoffeesPage';
import { HomePage } from './pages/home/HomePage';
import { OrdersPage } from './pages/orders/OrdersPage';

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/orders" index element={<OrdersPage />} />
        {
          isAuth ?
            <>
              <Route path="/ingredients" index element={<IngredientsPage />} />
              <Route path="/coffees" index element={<CoffeesPage />} />
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
