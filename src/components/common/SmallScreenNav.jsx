// SmallScreenNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SmallScreenNavbar = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-richblack-800 text-richblack-100 sm:visible md:hidden lg:hidden">
      {/* Your small screen navbar content goes here */}
      <Link to="/catalog" className="mb-2">
        Catalog
      </Link>
      <Link to="/dashboard/cart" className="mb-2">
        Cart
      </Link>
      <Link to="/login" className="mb-2">
        Log in
      </Link>
      <Link to="/signup">
        Sign up
      </Link>
    </div>
  );
};

export default SmallScreenNavbar;
