import { createContext, useContext } from 'react';
import {authProps} from "../../types";

// default value for auth
const DEFAULT_VALUE: authProps = {
    user: undefined,
    setUser: () => null
};

export const AuthContext = createContext(DEFAULT_VALUE)

export function useAuth () {
    return useContext(AuthContext)
}
