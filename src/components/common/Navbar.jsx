import React, { useEffect, useState } from 'react';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { AiOutlineDown, AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import ProfileDropdown from '../core/Auth/ProfileDropDown';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { apiConnector } from '../../services/api_connector';
import { categories } from '../../services/api';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await apiConnector('GET', categories.CATEGORIES_API);
        setSubLinks(response.data.data);
      } catch (error) {
        console.log('Error in fetching the sublinks');
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Large screen Navbar */}
      <div className="hidden md:flex flex-col md:flex-row h-auto lg:h-16 items-center justify-evenly border-b-[1px] border-b-richblack-700">
        <Link>
          <img src={Logo} width={'160'} height={'42'} alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-5'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === 'Catalog' ? (
                  <div className='relative flex items-center gap-2 group'>
                    <p>{link.title}</p>
                    <AiOutlineDown />
                    <div className='invisible absolute left-[-10%] top-[50%] translate-y-[20%] z-[1000] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                      <div className='absolute left-[0%] top-0 h-6 w-6 translate-x-[80%] translate-y-[-20%] rotate-45 -z-10 select-none rounded bg-richblack-5'></div>
                      {subLinks.length ? (
                        subLinks.map((sublink, index) => (
                          <Link to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                            <p>{sublink?.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-5'} `}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login Signup and Dashboard */}
        <div className='flex gap-x-4 items-center'>
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>

      {/* Small screen Navbar */}
      <div className="md:hidden flex flex-col items-center justify-center p-4 bg-richblack-800 text-richblack-100">
        <div className="flex justify-between w-full items-center mb-4">
          <Link to="/">
            <img src={Logo} width={'160'} height={'42'} alt="Logo" />
          </Link>
          <div className="cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col items-center">
            {NavbarLinks.map((link, index) => (
              <Link to={link.path} key={index} className="mb-2">
                {link.title}
              </Link>
            ))}
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="mb-2">
                <AiOutlineShoppingCart className="mr-2" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            )}
            {token === null && (
              <Link to="/login" className="mb-2">
                Log in
              </Link>
            )}
            {token === null && (
              <Link to="/signup" className="mb-2">
                Sign up
              </Link>
            )}
            {token !== null && <ProfileDropdown />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
