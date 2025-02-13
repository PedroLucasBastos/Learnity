import React, { useState } from "react";
import { Button, Input, Card } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProjectModal from "../../components/modal/projectModal";
import "./home.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  const handleViewProjects = () => navigate("/view");
  const handleSearch = () => {
    navigate(`/view?search=${searchTerm}`); // Passa o termo de pesquisa na URL
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-white text-center">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col flex-grow items-center justify-center w-full mb-5">
        <div className="my-6">
          <img
            src="./svg/logoLearnity 1.svg"
            alt="logoTexto"
            className="flex items-center h-72"
          />
        </div>

        <div className="flex items-center space-x-2 w-3/5">
          <Input
            className="w-full"
            placeholder="Buscar"
            value={searchTerm} // Adiciona o valor do estado aqui
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado ao digitar
          />
          <Button
            type="primary"
            className="button-custom"
            onClick={handleSearch}
          >
            <SearchOutlined /> Buscar
          </Button>
        </div>

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

      <Footer />

      {/* Passando função de resetar o formulário para o ProjectModal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        resetForm={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
