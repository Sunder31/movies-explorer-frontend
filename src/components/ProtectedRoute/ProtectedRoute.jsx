import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, loggedIn }) {
  return loggedIn ? Component : <Navigate to="/" replace />;
}

export default ProtectedRoute;