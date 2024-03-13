import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../../shared/contexts";

export const PrivateRoute = () => {
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
