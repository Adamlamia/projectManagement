import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const currentUser = false;
  
  if (!currentUser) {
    return <Navigate to="/" replace={true} />
  }
  return children
}

export default PrivateRoute