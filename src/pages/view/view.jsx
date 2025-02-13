import React, { useEffect, useState, useCallback } from "react";
import { Card, Modal } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const View = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  const openPDF = (base64) => {
    if (!base64) {
      alert("Nenhum arquivo anexado!");
      return;
    }

    if (typeof base64 === "string" && base64.startsWith("http")) {
      window.open(base64, "_blank");
      return;
    }

    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const deleteProject = useCallback((index) => {
    setProjects((prevProjects) => {
      console.log("Índice do projeto a ser excluído:", index);
      const updatedProjects = prevProjects.filter((_, i) => i !== index);
      console.log("Projetos após a exclusão:", updatedProjects);
      return updatedProjects;
    });
  }, []);

  const showDeleteConfirm = (index) => {
    // Função auxiliar
    Modal.confirm({
      title: "Confirmar Exclusão",
      content: "Tem certeza que deseja excluir este projeto?",
      okText: "Sim",
      cancelText: "Cancelar",
      onOk: () => {
        deleteProject(index); // Chama a função memoizada aqui
      },
      onCancel: () => {
        console.log("Usuário cancelou a exclusão");
      },
    });
  };

  useEffect(() => {
    if (projects) {
      console.log("O estado de projects foi atualizado!", projects);
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <h1 className="text-2xl font-bold text-center mt-8 mb-6">
        Projetos Cadastrados
      </h1>

      <div className="w-full px-4 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-500 text-white w-full p-4 shadow-lg rounded-lg relative"
              >
                <DeleteOutlined
                  className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer"
                  onClick={() => {
                    console.log(
                      "Ícone de exclusão clicado para o índice:",
                      index
                    );
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
                    {project.file?.name || "Nenhum arquivo"}
                  </span>
                  <EyeOutlined
                    className="text-2xl cursor-pointer text-primaryGreen hover:text-green-500"
                    onClick={() => openPDF(project.file)}
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
    </div>
  );
};

export default View;
