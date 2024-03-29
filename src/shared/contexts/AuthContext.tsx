import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { AuthService } from "../services/api/auth/AuthService"



interface IAuthContextData {
  isAuthenticated: boolean,
  logout: () => void,
  login: (email: string, password: string) => Promise<string | void>
}

interface IAuthProps {
  children: React.ReactNode
}

const AuthContext = createContext({} as IAuthContextData)




export const AuthProvider: React.FC<IAuthProps> = ({children}) => {
  const [acessToken, setAcessToken] = useState<string>()

  useEffect(() => {
    const acessToken = localStorage.getItem('APP_ACESS_TOKEN')
    if (acessToken) {
      setAcessToken(JSON.parse(acessToken))
    } else {
      setAcessToken(undefined)
    }
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password)
    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem('APP_ACESS_TOKEN', JSON.stringify(result.acessToken))
      setAcessToken(result.acessToken)
    }
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('APP_ACESS_TOKEN')
    setAcessToken(undefined)
  }, [])

  const isAuthenticated = useMemo(() => !!acessToken, [acessToken])


  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)