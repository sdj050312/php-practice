import { createBrowserRouter, Navigate } from "react-router-dom";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import Login from "./views/Login.jsx";
import App from "./App";

import DashBoard from "./views/DashBoard.jsx";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/user" />,
            },
            {
                path: "/dashboard",
                element: <DashBoard />,
            },
            {
                path: "/users",
                element: <Users />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
