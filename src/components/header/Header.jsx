import React from 'react'
import { Container, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = () => {

    const authStatus = useSelector((state)=>{
        state.auth.status
    });
     const navigate = useNavigate();
     const navItems = [
        {
            name: "home",
            path: "/",
            active: true
        },
        {
            name: "login",
            path: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            path: "/signup",
            active: !authStatus
        },
        {
            name: "Add Post",
            path: "/add-post",
            active: authStatus
        },
        {
            name: "A Pllost",
            path: "/all-post",
            active: authStatus
        },
     ]

  return (
    <header className="py-3 shadow-md bg-gray-700">
        <Container>
               <nav className='flex'>
               <div className='left mr-4 '>
                 <Link to="/">
                {/*img logo*/}

                 </Link>
               </div>
                <ul className=''>
                    {navItems.forEach((navitem)=>
                    navitem.active ? (
                     <li key={navitem.name} >
                         <button
                         className='inline-block px-6 py-2 rounded-full duration-200'
                         onClick={()=> navigate(navitem.path)} 
                         >{navitem.name}</button>
                     </li>
                    ) : null
                    
                    )}
                    {authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                </ul>
               </nav>
        </Container>
    </header>
  )
}

export default Header
