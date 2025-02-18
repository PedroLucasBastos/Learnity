import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, Input, Modal } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ProjectModal from "../../components/modal/projectModal";
import { useLocation, useNavigate } from "react-router-dom";

// Modal para exibir os detalhes do projeto (visualização somente leitura)
const ViewProjectModal = ({ isOpen, onClose, project }) => {
  const downloadPdf = (base64String) => {
    // Decodifica o base64 para um ArrayBuffer
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    return url;
  };

  return (
    <Modal
      title={<h2 className="text-xl font-bold">Detalhes do Projeto</h2>}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="close"
          onClick={onClose}
          className="bg-primaryGreen text-white"
        >
          Fechar
        </Button>,
      ]}
      width="50vw"
    >
      {project ? (
        <div className="flex flex-col space-y-4">
          <p>
            <strong>Título:</strong> {project.title}
          </p>
          <p>
            <strong>Orientador(es):</strong> {project.advisors.join(", ")}
          </p>
          <p>
            <strong>Descrição:</strong> {project.description}
          </p>
          <p>
            <strong>Curso:</strong> {project.course}
          </p>
          {project.selectedSubjects && project.selectedSubjects.length > 0 && (
            <p>
              <strong>Disciplinas:</strong>{" "}
              {project.selectedSubjects.join(", ")}
            </p>
          )}
          <p>
            <strong>Arquivo:</strong>{" "}
            {project.fileName ? (
              <a
                href={downloadPdf(
                  project.file.startsWith("data:application/pdf;base64,")
                    ? project.file.split(",")[1]
                    : project.file
                )}
                target="_blank" // Abre o PDF em uma nova aba
                rel="noopener noreferrer" // Para melhorar a segurança ao abrir o link
                className="text-primaryGreen"
              >
                {project.fileName}
              </a>
            ) : (
              "Nenhum arquivo"
            )}
          </p>
        </div>
      ) : (
        <p>Projeto não encontrado.</p>
      )}
    </Modal>
  );
};

const View = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();

    // Verifica se há um termo de busca na URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("search");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
      filterProjects(searchTermFromUrl);
    }
  }, [location]);

  useEffect(() => {
    filterProjects(searchTerm);
  }, [searchTerm, projects]);

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
    setFilteredProjects(savedProjects);
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
    setSearchTerm(term);
  };

  const deleteProject = useCallback((index) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.filter((_, i) => i !== index);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      setFilteredProjects(updatedProjects);
      return updatedProjects;
    });
  }, []);

  // Abre o modal de visualização
  const openViewModal = (project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  // Abre o modal de edição (ProjectModal)
  const openEditModal = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProject(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProject(null);
    loadProjects(); // Atualiza a lista após edição
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <h1 className="text-2xl font-bold text-center mt-8 mb-6">
        Projetos Cadastrados
      </h1>

      {/* Barra de Pesquisa Centralizada */}
      <div className="flex items-center space-x-2 w-3/5 mx-auto mb-8">
        <Input
          className="w-full"
          placeholder="Buscar por título ou descrição"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Lista de Projetos */}
      <div className="w-full px-4 md:px-16 lg:px-32 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-500 text-white w-full p-4 shadow-lg rounded-lg relative cursor-pointer"
                onClick={() => openViewModal(project)}
              >
                {/* Botão de Editar (fica ao lado do botão de excluir) */}
                <EditOutlined
                  className="absolute top-2 right-10 text-primaryGreen text-xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(project);
                  }}
                />
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
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // Limita a descrição a 4 linhas
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden", // Esconde o excesso de conteúdo
                  }}
                >
                  <strong>Descrição:</strong> {project.description}
                </p>

                <div className="mt-4">
                  <span className="text-gray-300">
                    {project.fileName || "Nenhum arquivo"}
                  </span>
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

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <ProjectModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          project={selectedProject}
          updateProject={loadProjects}
        />
      )}

      {/* Modal de Visualização */}
      {isViewModalOpen && (
        <ViewProjectModal
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default View;
