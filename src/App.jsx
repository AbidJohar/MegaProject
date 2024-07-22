import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/Auth';
import { login, logout } from './features/auth/authSlicer';
import './App.css';
import ReactLoading from 'react-loading'
import Signup from './components/Signup';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ?   <ReactLoading
  type={"bars"}
  color={"#00ffff"}
  height={100}
  width={100}
/> : (
    <Signup />
  );
}

export default App;
