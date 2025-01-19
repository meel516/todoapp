import { ReactNode, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const WithProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated,isUserLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && !isUserLoading) {
      navigate('/')
    }
  }, [isAuthenticated, isUserLoading])


  if (!isAuthenticated) return null

  return <>{children}</>
}

export default WithProtectedRoute