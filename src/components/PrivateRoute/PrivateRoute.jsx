import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/auth/authSelectors';

const PrivateRoute = ({ component }) => {
  const token = useSelector(getAccessToken);
  return token ? component : <Navigate to={'/login'} />;
};

export default PrivateRoute;
