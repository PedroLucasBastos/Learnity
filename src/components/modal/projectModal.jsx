import React, { useState } from "react";
import { Modal, Button, Input, Select, Upload, message } from "antd";
import { InboxOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Dragger } = Upload;

const ProjectModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    advisors: [""],
    description: "",
    file: null,
    fileName: "",
    course: "",
  });

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
    return false; // Evita o upload automático do Ant Design
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: handleFileUpload,
  };

  const handleSubmit = () => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const newProject = {
      ...formData,
      id: Date.now(), // Gera um ID único
    };
    const newProjects = [...storedProjects, newProject];
    localStorage.setItem("projects", JSON.stringify(newProjects));
    message.success("Projeto cadastrado com sucesso!");
    onClose();
  };

  return (
    <Modal
      title={<h2 className="text-xl font-bold">Registrar novo projeto</h2>}
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

          <div className="flex justify-between mt-4">
            <Button className="bg-gray-400 text-white" onClick={handleBack}>
              Voltar
            </Button>
            <Button
              className="bg-primaryGreen text-white"
              onClick={handleSubmit}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProjectModal;
