// Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-primaryGreen text-white py-3 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div>
          <img src="./img/iff1.png" alt="Logo" className="h-14 mt-2 mb-2" />
        </div>
        <div className="text-left">
          <h1 className="text-lg font-bold">Instituto Federal Fluminense</h1>
          <p className="text-sm">Campus Bom Jesus do Itabapoana</p>
        </div>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Início
          </Link>
          <ul>
            <Link to="/about" className="hover:text-gray-300">
              Sobre
            </Link>
          </ul>
          <li>Contato</li>
          <li>FAQ</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
