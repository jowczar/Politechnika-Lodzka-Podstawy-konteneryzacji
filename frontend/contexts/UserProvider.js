import { useRouter } from "next/router";
import React, {
    createContext,
    useContext,
    useState,
} from "react";

export const UserContext = createContext();

export const UserProvider = ({
    children,
}) => {
    const router = useRouter();
    const [email, setEmail] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const login = () => {
        // TODO: login here and set email and avatar (& later token)
        // save token as cookie / local storage and read in on page refresh
        console.log('🤘 TODO: login here');

        setEmail('example@youtube.com');
        setAvatar('https://i.pravatar.cc/300');
        
        router.push('/channels');
    };

    const logout = () => {
        // TODO: logout here and set email and avatar to null
        console.log('👋 TODO: logout here');

        setEmail(null);
        setAvatar(null);

        router.push('/');
    }

    return (
        <UserContext.Provider
            value={{
                email,
                avatar,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
