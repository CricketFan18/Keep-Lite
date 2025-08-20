import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import api from "../api/apiHandler";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  async function checkAuth() {
    try {
      const res = await api.get("/notes");
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

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
