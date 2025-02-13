import React, { useEffect, useState, useCallback } from "react";
import { Card, Modal } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ProjectModal from "../../components/modal/projectModal";

const View = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const updateProject = () => {
    loadProjects(); // Recarrega a lista após edição
  };

  const deleteProject = useCallback((index) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.filter((_, i) => i !== index);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <h1 className="text-2xl font-bold text-center mt-8 mb-6">
        Projetos Cadastrados
      </h1>

      <div className="w-full px-4 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-500 text-white w-full p-4 shadow-lg rounded-lg relative cursor-pointer"
                onClick={() => openModal(project)}
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
                  <EyeOutlined
                    className="text-2xl cursor-pointer text-primaryGreen hover:text-green-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPDF(project.file);
                    }}
                  />
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              Nenhum projeto cadastrado.
            </p>
          )}
        </div>
      </div>

      <Footer />

      {/* Modal de Edição */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        updateProject={updateProject} // <- Adicionado
      />
    </div>
  );
};

export default View;
