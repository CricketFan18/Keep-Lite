import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { checkAuth } from "../api/notesApi";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

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
