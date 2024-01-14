import './App.css'
import { useAuth } from './context/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" index element={<MainLayout>Home</MainLayout>} />
        {
          isAuth ?
            <>
              <Route path="/my-profile" index element={<MainLayout>My Profile</MainLayout>} />
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
