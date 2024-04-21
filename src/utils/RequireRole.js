import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";

const RequireRole = ({ roleName }) => {
  const { auth } = useAuth();
  var hasRequiredRole = false;
  if (roleName.length === 0) {
    if (auth.token) hasRequiredRole = true;
  } else {
    hasRequiredRole = roleName.some((role) => auth?.user?.[role]);
  }

  return hasRequiredRole ? (
    <>
      <Outlet />
    </>
  ) : auth?.token ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default RequireRole;
