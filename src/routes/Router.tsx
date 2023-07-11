import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "../pages/home/Index";
import Categories from "../pages/categories/Index";
import Products from "../pages/products/Index";
import NotFound from "../pages/404/NotFound";
import Login from "../pages/login/Login";

// Layout
import LoggedLayout from "./../pages/layout/LoggedLayout";
import LoginLayout from "../pages/layout/LoginLayout";

const RouteConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoggedLayout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<LoginLayout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export default RouteConfig;
