import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/Auth';
import { login, logout } from './features/auth/authSlicer';
import './App.css';
import ReactLoading from 'react-loading'
import Header from './components/header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components';

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

  return loading ? <div className='flex items-center justify-center  w-full h-screen'>
    <ReactLoading
      type={"bars"}
      color={"#00ffff"}
      height={100}
      width={100}
    />
  </div> : (
    <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
