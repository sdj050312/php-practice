import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null, // 초기값 설정
    token: null, // 토큰 초기값 설정
    setUser: () => {}, // 초기 설정값 설정
    setToken: () => {}, // 초기 설정 변경값 설정
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: "John",
    }); // useState 초기값 설정을 하고
    const [token, _setToken] = useState(null);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    // 전역 변수 설정을 먼저 한다음에 그 다음에
    return (
        <>
            <StateContext.Provider
                value={{
                    user,
                    token,
                    setUser,
                    setToken,
                }}
            >
                {children}
            </StateContext.Provider>
        </>
    );
};

export const useStateContext = () => useContext(StateContext);

// useState를 계속 prop시를 써도 상관은 없는데 이런식으로 하면 내가 언제 든지 전역상태 관리를 할 수 있어서 이렇게 만드는거죠
