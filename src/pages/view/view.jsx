import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const View = () => {
  const [projects, setProjects] = useState([]);

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  // Função para abrir o PDF
  const openPDF = (base64) => {
    if (!base64) {
      alert("Nenhum arquivo anexado!");
      return;
    }

    // Se for um link direto, apenas abre a URL
    if (typeof base64 === "string" && base64.startsWith("http")) {
      window.open(base64, "_blank");
      return;
    }

    // Converter Base64 para Blob
    const byteCharacters = atob(base64.split(",")[1]); // Remove "data:application/pdf;base64,"
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Criar URL temporária e abrir no navegador
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen w-full  flex flex-col">
      <Header />

      {/* Título */}
      <h1 className="text-2xl font-bold text-center mt-8 mb-6">
        Projetos Cadastrados
      </h1>

      {/* Cards dos Projetos */}
      <div className="w-full px-4 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <Card
                key={index}
                className="bg-gray-500 text-white w-full p-4 shadow-lg rounded-lg"
              >
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
