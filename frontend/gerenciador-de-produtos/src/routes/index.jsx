import { Navigate, Route, Routes } from "react-router-dom"
import { ControleDeEstoque, Login } from "../pages"
import { OpenRoute } from "./open-route/OpenRoute"
import { PrivateRoute } from "./private-route/PrivateRoute"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<OpenRoute/>}>
                <Route index element={<Login/>}/>
            </Route>
            <Route path="/controle-de-estoque" element={<PrivateRoute/>}>
                <Route index element={<ControleDeEstoque/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>
    )
}