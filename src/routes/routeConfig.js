import { lazy } from "react";
import { ROUTES } from "./constants/routes";

const Register = lazy(() => import("../Pages/Register"));
const LoginPage = lazy(() => import("../Pages/LoginPage")); 
const Details = lazy(() => import("../Pages/Details"));

export const PUBLIC_ROUTES = [
    {path:ROUTES.REGISTER,element:Register},
   { path:ROUTES.LOGIN,element:LoginPage},

]

export const PROTECTED_ROUTES = [
    {path:ROUTES.DETAILS,element:Details},
]