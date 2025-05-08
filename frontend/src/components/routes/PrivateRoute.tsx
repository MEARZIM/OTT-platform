import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: string;
}

const PrivateRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole: string }) => {

  const token = Cookies.get('token'); // Get the token from cookies
    //console.log(Cookies.get());

  if (!token) {
    // If no token is found, redirect to login
    return <Navigate to="/admin-login" />;
  }

  try {
    // Decode the token to get the role
    const decodedToken: DecodedToken = jwtDecode(token);


    // Check if the decoded role matches the required role
    if (![requiredRole].includes(decodedToken.role)) {
      // If the user does not have the required role (either admin or superadmin), redirect to the home page
      //console.log(decodedToken.role);
      return <Navigate to="/admin-login" />;
    }

    // If the user has the required role, render the protected route
    return <>{children}</>;
  } catch (error) {
    // In case of error (invalid token), redirect to login page
    return <Navigate to="/admin-login" />;
  }
};

export default PrivateRoute;
