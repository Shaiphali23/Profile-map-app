import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-semibold">
            <Link to="/">MyApp</Link>
          </div>

          <div className="flex items-center space-x-3">
            <ul className="flex flex-wrap space-x-6 text-white">
              <li className="hover:text-gray-300">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
