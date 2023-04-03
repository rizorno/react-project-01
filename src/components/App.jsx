import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuth } from 'helpers/googleAuth';
import { refreshThunk } from 'redux/auth/authOperations';
import { getAccessToken } from 'redux/auth/authSelectors';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import Authorization from 'pages/Authorization/Authorization';
import Home from 'pages/Home/Home';
import Report from 'pages/Report/Report';
import Expenses from 'components/Expenses/Expenses';
import Incomes from 'components/Incomes/Incomes';
import SharedLayout from 'components/SharedLayout/SharedLayout';

const App = () => {
  const token = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  useEffect(() => {
    googleAuth(token, searchParams, dispatch, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<PrivateRoute component={<Home />} />}>
          <Route path="expenses" element={<Expenses />} />
          <Route path="incomes" element={<Incomes />} />
        </Route>

        <Route
          path="/reports"
          element={<PrivateRoute component={<Report />} />}
        />

        <Route
          path="/login"
          element={<PublicRoute component={<Authorization type="login" />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute component={<Authorization type="signup" />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
