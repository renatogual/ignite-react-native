import { createContext, ReactNode, useContext } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthContenxtData {
  user: User
}

const AuthContext = createContext({} as IAuthContenxtData)

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: 'a123qsad',
    name: 'Renato',
    email: 'a123qsad@gmail.com',
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
