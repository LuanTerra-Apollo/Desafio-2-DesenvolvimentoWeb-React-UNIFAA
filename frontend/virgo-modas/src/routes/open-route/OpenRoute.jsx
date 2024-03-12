import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../../shared/contexts";

export const OpenRoute = () => {
    const { isAuthenticated } = useAuthContext();
    return (
        (!isAuthenticated? <Outlet /> : <Navigate to="/controle-de-estoque" />)
    )
}