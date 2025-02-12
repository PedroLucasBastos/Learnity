import React, { useState } from "react";
import { Button, Input, Card } from "antd";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom"; // Altere a importação
import "./home.css";
import ProjectModal from "../../components/modal/projectModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Usando o hook useNavigate

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleViewProjects = () => {
    navigate("/view"); // Usando navigate para redirecionar
  };

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
            <Link to="/" className="hover:text-gray-300">
              Início
            </Link>
            <li>Sobre</li>
            <li>Contato</li>
            <li>FAQ</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-grow items-center justify-center w-full">
        {/* Logo */}
        <div className="my-6">
          <img
            src="./svg/logoLearnity 1.svg"
            alt="logoTexto"
            className="flex items-center h-72"
          />
        </div>

        {/* Barra de Pesquisa */}
        <div className="flex items-center space-x-2 w-3/5">
          <Input className="w-full" placeholder="Buscar" />
          <Button type="primary" className="button-custom">
            <SearchOutlined />
            Buscar
          </Button>
        </div>

        {/* Botões */}
        <div className="mt-6 mb-10 flex flex-col space-y-28 items-center">
          <Button
            type="primary"
            className="w-60 h-20 button-custom"
            onClick={handleViewProjects}
          >
            Exibir Projetos
          </Button>
          <Button
            type="primary"
            className="w-72 h-28 button-custom"
            onClick={showModal}
          >
            <PlusOutlined /> Cadastrar novo projeto
          </Button>
        </div>

        {/* Últimos Trabalhos */}
        <h2 className="mt-10 mb-11 text-xl font-semibold">
          Últimos trabalhos publicados
        </h2>
        <Card className="w-3/4 mt-4 shadow-md">
          <Card.Meta
            title="REPOSITÓRIO DIGITAL PARA TRABALHOS ACADÊMICOS DO CAMPUS BOM JESUS DO ITABAPOANA"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis odio vitae velit fermentum..."
          />
        </Card>
      </main>

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

      {/* Modal de Cadastro */}
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Home;
