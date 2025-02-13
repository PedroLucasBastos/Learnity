import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, Input } from "antd";
import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ProjectModal from "../../components/modal/projectModal";
import { useLocation, useNavigate } from "react-router-dom"; // Adicionado o useNavigate

const View = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    loadProjects();

    // Verifica se há um termo de busca na URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("search");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
      filterProjects(searchTermFromUrl); // Aplica o filtro com o termo da URL
    }
  }, [location]); // Atualiza quando a URL mudar

  useEffect(() => {
    filterProjects(searchTerm); // Aplica o filtro toda vez que searchTerm mudar
  }, [searchTerm, projects]); // Atualiza ao mudar o termo ou os projetos

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
    setFilteredProjects(savedProjects); // Inicialmente, mostra todos
  };

  const filterProjects = (term) => {
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(term.toLowerCase()) ||
        project.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term); // Atualiza o termo de busca
  };

  const deleteProject = useCallback((index) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.filter((_, i) => i !== index);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      setFilteredProjects(updatedProjects); // Atualiza os filtrados também
      return updatedProjects;
    });
  }, []);

  const handleBackToHome = () => {
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <h1 className="text-2xl font-bold text-center mt-8 mb-6">
        Projetos Cadastrados
      </h1>

      {/* Barra de Pesquisa Centralizada */}
      <div className="flex items-center space-x-2 w-3/5 mx-auto mb-7">
        <Input
          className="w-full"
          placeholder="Buscar por título ou descrição"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Lista de Projetos */}
      <div className="w-full px-4 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-500 text-white w-full p-4 shadow-lg rounded-lg relative cursor-pointer"
              >
                <DeleteOutlined
                  className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(index);
                  }}
                />
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p>
                  <strong>Orientador(es):</strong> {project.advisors.join(", ")}
                </p>
                <p>
                  <strong>Curso:</strong> {project.course}
                </p>
                <p>
                  <strong>Descrição:</strong> {project.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-300">
                    {project.fileName || "Nenhum arquivo"}
                  </span>
                  <EyeOutlined className="text-2xl cursor-pointer text-primaryGreen hover:text-green-500" />
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              Nenhum projeto encontrado.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default View;
