// Footer.js
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-primaryGreen text-white py-4 mt-auto">
      <div className="flex justify-center space-x-4">
        <FaFacebook />
        <FaTwitter />
        <FaLinkedin />
      </div>
      <p className="text-center mt-2">
        © 2024 Learnity - Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
