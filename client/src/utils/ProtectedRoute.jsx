import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import api from "../api/apiHandler";
import LoaderScreen from "./LoaderScreen";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  async function checkAuth() {
    try {
      // CHANGED: Now hitting the lightweight verify endpoint
      const res = await api.get("/user/verify"); 
      return res.data.success;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    const verify = async () => {
      const result = await checkAuth();
      setIsAuth(result);
    };
    verify();
  }, []);

  if (isAuth === null) return <LoaderScreen message="Loading.." />;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;