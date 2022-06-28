import React, { useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion';
import { FaBars, FaHome, FaPowerOff } from 'react-icons/fa';
import { BiCog } from 'react-icons/bi';
import '../../styles/components/sidebar.css';
import { NavLink } from 'react-router-dom';
import { signOutAction } from "../../actions/auth";
import { useDispatch } from 'react-redux';

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome/>,
  },
  {
    path: "/settings",
    name: "Setting",
    icon: <BiCog/>
  }
]

const Sidebar = ({children}) => {
  const dispatch = useDispatch();
  const [isOpen, SetIsOpen] = useState(true);

  const toggle = () => SetIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(signOutAction());
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className='main-container'>
      <motion.div animate={{width: isOpen ? "200px" : "50px",
        transition: {
          duration: 0.5,
          type: "spring",
          damping: 10,
        },
      }} className="sidebar">
        <div className='top_section'>
          { isOpen && 
            <motion.h1 variants={showAnimation} 
              initial="hidden"
              animate="show"
              exit="hidden" className='logo'
            >
              Rizoma
            </motion.h1>}
          <div className="bars">
            <FaBars onClick={toggle}/>
          </div>
        </div>
        <section className='routes'>
          {routes.map((route) => (
            <NavLink 
              to={route.path} 
              key={route.name} 
              className="link-nav"
              activeClassName='active' 
            >
              <div className='icon'>{route.icon}</div>
              <AnimatePresence>
                { isOpen && 
                  <motion.div 
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {route.name}
                  </motion.div> 
                }
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
        <div className='top_section logout' onClick={handleLogout}>
          { isOpen && 
            <motion.h1 variants={showAnimation} 
              initial="hidden"
              animate="show"
              exit="hidden" className='logo'
            >
              Logout
            </motion.h1>}
          <div className="bars">
            <FaPowerOff />
          </div>
        </div>
      </motion.div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar;