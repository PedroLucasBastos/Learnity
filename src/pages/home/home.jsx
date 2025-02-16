import React, { useState, useEffect } from "react";
import { Button, Input, Card } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProjectModal from "../../components/modal/projectModal";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./home.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const lastThreeProjects = storedProjects.slice(-3).reverse();
    setProjects(lastThreeProjects);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [projects]);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleViewProjects = () => navigate("/view");
  const handleSearch = () => navigate(`/view?search=${searchTerm}`);
  const prevProject = () =>
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  const nextProject = () =>
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-white text-center">
      <Header />
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {projects.length > 0 && (
          <div className="relative flex items-center justify-center w-3/4">
            <Button
              icon={<LeftOutlined />}
              onClick={prevProject}
              className="arrow-custom"
            />
            <Card className="w-3/5 h-64 shadow-md flex flex-col justify-between p-4 overflow-hidden mx-8 ">
              <h3 className="font-bold text-xl">
                {projects[currentIndex]?.title}
              </h3>
              <p
                className="text-sm overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {projects[currentIndex]?.description}
              </p>
            </Card>
            <Button
              icon={<RightOutlined />}
              onClick={nextProject}
              className="arrow-custom"
            />
          </div>
        )}
      </main>
      <Footer />
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        resetForm={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
