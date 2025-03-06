import { Outlet, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useStateContext } from "./context/ContextProvider";
import axiosClient from "../axios-client";
import "../index.css";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    useEffect(() => {
        axiosClient
            .get("/user")
            .then(({ data }) => setUser(data))
            .catch((error) =>
                console.error("Failed to fetch user data:", error)
            );
    }, []);

    // Ensure redirect logic is after useEffect
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogOut = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/logout")
            .then(() => {
                setUser({});
                setToken(null);
            })
            .catch((error) => console.error("Logout failed:", error));
    };

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user?.name}
                        <button onClick={onLogOut}>Logout</button>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
