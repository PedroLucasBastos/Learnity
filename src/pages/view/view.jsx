import React from "react";
import { Button, Input, Card } from "antd";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./home.css";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-white text-center">
      {/* Header */}
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
            <li>Início</li>
            <li>Sobre</li>
            <li>Contato</li>
            <li>FAQ</li>
          </ul>
        </nav>
      </header>

      {/* Footer */}
      <footer className="w-full mt-16 bg-primaryGreen text-white py-4">
        <div className="flex justify-center space-x-4">
          <FaFacebook />
          <FaTwitter />
          <FaLinkedin />
        </div>
        <p className="text-center mt-2">
          © 2024 Learnity - Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;
