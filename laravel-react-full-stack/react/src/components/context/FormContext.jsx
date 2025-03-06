import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
    const [formData, setFormData] = useState([]);
    const [nextId, setNextId] = useState(1);

    const addUser = (user) => {
        const newUser = {
            id: nextId,
            ...user,
            createdAt: new Date().toLocaleDateString(),
        };
        setFormData((prev) => [...prev, newUser]);
        setNextId((prev) => prev + 1);
    };

    return (
        <FormContext.Provider value={{ formData, setFormData, addUser }}>
            {children}
        </FormContext.Provider>
    );
}

export function useForm() {
    return useContext(FormContext);
}
