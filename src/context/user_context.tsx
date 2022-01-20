import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext({ loginUser: {} })


export const UserProvider: React.FC = ({ children }) => {
    const { user } = useAuth0()

    const [loginUser, setLoginUser] = useState({})
    useEffect(() => {
        if (user) {
            setLoginUser(user)
        }
    }, [user])

    return (
        <UserContext.Provider value={{ loginUser }} >
            {children}
        </UserContext.Provider>
    )
}
export const useUserProvider = () => {
    return useContext(UserContext)
}


