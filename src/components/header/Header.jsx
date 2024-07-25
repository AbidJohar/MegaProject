import React from 'react';
import { LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from '../container/Container';
import logo from '../../assets/logo.jpg'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'AddPost',
      slug: '/add-post',
      active: authStatus,
    },
    {
      name: 'AllPosts',
      slug: '/all-posts',
      active: authStatus,
    },
  ];

  const handleNavItemClick = (slug) => {
    navigate(slug);
  };

  return (
    <header className="flex items-center justify-between py-4 px-4 shadow-md bg-gradient-to-r from-[#72D2F3] to-[#0A5455] text-white">
      <Container className="flex items-center">
        <Link to="/" className="flex items-center text-xl font-bold">
               <h2 className='font-serif'> <span className='text-orange-700'>My</span> <span className='text-blue-700'>App</span></h2>
        </Link>
      </Container>
      <nav className="flex space-x-4">
        {navItems.map((navItem) => (
            navItem.active? (
          <button
            key={navItem.name}
            className={` px-6 py-2  rounded-full hover:bg-gray-600 hover:text-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500 
            `}
            onClick={() => handleNavItemClick(navItem.slug)}
          >
            {navItem.name}
          </button>
            ) : null
        ))}
        {authStatus && <LogoutBtn className="text-red-500 font-semibold" />}
      </nav>
    </header>
  );
};

export default Header;
