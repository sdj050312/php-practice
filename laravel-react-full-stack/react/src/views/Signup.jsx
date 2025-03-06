import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../components/context/ContextProvider";
export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const passwordConfirmationRef = useRef();

    const { setUser, setToken } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className="title">Signup for free</h1>
                        <input
                            type="text"
                            placeholder="Full Name"
                            ref={nameRef}
                        />
                        <input
                            type="email"
                            placeholder="Address"
                            ref={emailRef}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            ref={passwordRef}
                        />
                        <input
                            type="password"
                            placeholder="password confirmation"
                            ref={passwordConfirmationRef}
                        />
                        <button type="submit" className="btn add">
                            Sign Up
                        </button>
                        <p>
                            Already Registered ?<Link to="/login">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
