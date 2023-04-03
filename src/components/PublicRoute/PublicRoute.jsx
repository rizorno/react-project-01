import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/auth/authSelectors';

const PublicRoute = ({ component }) => {
  const token = useSelector(getAccessToken);
  return token ? <Navigate to={'/'} /> : component;
};

export default PublicRoute;
