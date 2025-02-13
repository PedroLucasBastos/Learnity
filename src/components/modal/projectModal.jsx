import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Upload, message } from "antd";
import { InboxOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import SubjectsSelector from "../subjectsData/subjectsSelector";

const { Option } = Select;
const { Dragger } = Upload;

const ProjectModal = ({ isOpen, onClose, project, updateProject }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    advisors: [""],
    description: "",
    file: null,
    fileName: "",
    course: "",
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Reseta o step para 1 sempre que o modal for aberto
      if (project) {
        setFormData(project); // Carrega os dados para edição
      } else {
        setFormData({
          title: "",
          advisors: [""],
          description: "",
          file: null,
          fileName: "",
          course: "",
        }); // Resetando os dados do projeto se for novo
      }
    }
  }, [isOpen, project]); // A dependência de isOpen faz com que isso aconteça toda vez que o modal é aberto
  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const newAdvisors = [...formData.advisors];
      newAdvisors[index] = e.target.value;
      setFormData({ ...formData, advisors: newAdvisors });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddAdvisor = () => {
    setFormData({ ...formData, advisors: [...formData.advisors, ""] });
  };

  const handleRemoveAdvisor = (index) => {
    const newAdvisors = formData.advisors.filter((_, i) => i !== index);
    setFormData({ ...formData, advisors: newAdvisors });
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({
        ...formData,
        file: reader.result, // Salva como Base64
        fileName: file.name, // Salva o nome do arquivo
      });
    };
    return false;
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: handleFileUpload,
  };

  const handleSubmit = () => {
    console.log(formData); // Verifica o conteúdo de formData antes de salvar
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    if (project) {
      // Atualiza projeto existente
      const updatedProjects = storedProjects.map((p) =>
        p.id === project.id ? { ...formData } : p
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      message.success("Projeto atualizado com sucesso!");
    } else {
      // Adiciona um novo projeto
      const newProject = {
        ...formData,
        id: Date.now(),
      };
      const newProjects = [...storedProjects, newProject];
      localStorage.setItem("projects", JSON.stringify(newProjects));
      message.success("Projeto cadastrado com sucesso!");
    }

    onClose();
    if (updateProject) updateProject(); // Atualiza a lista na interface
  };

  return (
    <Modal
      title={
        <h2 className="text-xl font-bold">
          {project ? "Editar Projeto" : "Registrar novo projeto"}
        </h2>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width="50vw"
    >
      {step === 1 ? (
        <div className="flex flex-col space-y-4">
          <label className="font-semibold">Título:</label>
          <Input
            name="title"
            placeholder="Digite o título do projeto"
            value={formData.title}
            onChange={handleChange}
          />

          <label className="font-semibold">Nome do(s) orientador(es):</label>
          {formData.advisors.map((advisor, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder={`Nome do orientador ${index + 1}`}
                value={advisor}
                onChange={(e) => handleChange(e, index)}
              />
              {index > 0 && (
                <Button
                  type="text"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => handleRemoveAdvisor(index)}
                />
              )}
            </div>
          ))}

          <Button
            className="bg-primaryGreen text-white flex items-center"
            icon={<PlusOutlined />}
            onClick={handleAddAdvisor}
          >
            Adicionar mais um orientador
          </Button>

          <label className="font-semibold">Descrição do projeto:</label>
          <Input.TextArea
            name="description"
            placeholder="Digite sobre seu projeto"
            value={formData.description}
            onChange={handleChange}
          />

          <label className="font-semibold">Upload de arquivos:</label>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Clique ou arraste os arquivos para esta área
            </p>
            <p className="ant-upload-hint">Suporta apenas um arquivo PDF.</p>
          </Dragger>

          <div className="flex justify-between mt-4">
            <Button className="bg-red-500 text-white" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="bg-primaryGreen text-white" onClick={handleNext}>
              Próximo
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <label className="font-semibold">Selecione o curso:</label>
          <Select
            placeholder="Escolha um curso"
            value={formData.course}
            onChange={(value) => setFormData({ ...formData, course: value })}
          >
            <Option value="Meio Ambiente">Meio Ambiente</Option>
            <Option value="Química">Química</Option>
            <Option value="Informática">Informática</Option>
            <Option value="Alimentos">Alimentos</Option>
            <Option value="Agropecuária">Agropecuária</Option>
          </Select>
          <SubjectsSelector selectedCourse={formData.course} />

          <div className="flex justify-between mt-4">
            <Button className="bg-gray-400 text-white" onClick={handleBack}>
              Voltar
            </Button>
            <Button
              className="bg-primaryGreen text-white"
              onClick={handleSubmit}
            >
              {project ? "Salvar alterações" : "Cadastrar"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProjectModal;
