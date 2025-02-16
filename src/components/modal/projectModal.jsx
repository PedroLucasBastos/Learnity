import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Upload, message } from "antd";
import { InboxOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import SubjectsSelector from "../subjectsData/subjectsSelector";

const { Option } = Select;
const { Dragger } = Upload;

const ProjectModal = ({ isOpen, onClose, project, updateProject }) => {
  // Use o hook useMessage dentro do componente
  const [messageApi, contextHolder] = message.useMessage();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    advisors: [""],
    description: "",
    file: null,
    fileName: "",
    course: "",
    selectedSubjects: [],
  });

  const [errors, setErrors] = useState({
    title: false,
    advisors: false,
    description: false,
    file: false,
    course: false,
    selectedSubjects: false,
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
          selectedSubjects: [],
        });
      }
    }
  }, [isOpen, project]);

  // Validação para o Step 1 (campos: título, orientadores, descrição, upload)
  const validateStep1 = () => {
    const { title, advisors, description, file } = formData;
    let newErrors = {
      title: !title,
      advisors: advisors.some((advisor) => !advisor),
      description: !description,
      file: !file,
    };

    setErrors((prev) => ({ ...prev, ...newErrors }));

    if (
      newErrors.title ||
      newErrors.advisors ||
      newErrors.description ||
      newErrors.file
    ) {
      messageApi.error(
        "Preencha os campos do primeiro passo: Título, Orientador(es), Descrição e Upload de arquivo."
      );
      return false;
    }
    return true;
  };

  // Validação para o Step 2 (campos: curso e disciplinas)
  const validateStep2 = () => {
    const { course, selectedSubjects } = formData;
    let newErrors = {
      course: !course,
      selectedSubjects: selectedSubjects.length === 0,
    };

    setErrors((prev) => ({ ...prev, ...newErrors }));

    if (newErrors.course || newErrors.selectedSubjects) {
      messageApi.error(
        "Preencha os campos do segundo passo: Curso e Disciplinas."
      );
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2); // Avança para o step 2
    }
  };

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
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      messageApi.error("Apenas arquivos PDF são permitidos.");
      return false; // Impede o upload
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        file: reader.result, // Salva como Base64
        fileName: file.name, // Salva o nome do arquivo
      }));
    };
    return false; // Evita o comportamento padrão de upload
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: handleFileUpload,
  };

  // Função para tratar o envio (no step 2)
  const handleSubmit = () => {
    if (!validateStep2()) return;

    try {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

      if (project) {
        const updatedProjects = storedProjects.map((p) =>
          p.id === project.id ? { ...formData } : p
        );
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        messageApi.success("Projeto atualizado com sucesso!"); // Sucesso (verde)
      } else {
        const newProject = {
          ...formData,
          id: Date.now(),
        };
        const newProjects = [...storedProjects, newProject];
        localStorage.setItem("projects", JSON.stringify(newProjects));
        messageApi.success("Projeto cadastrado com sucesso!"); // Sucesso (verde)
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Erro ao salvar o projeto!"); // Erro (vermelha)
      return;
    }

    onClose();
    if (updateProject) updateProject();
  };

  // Função para tratar o cancelamento
  const handleCancel = () => {
    messageApi.error("Operação cancelada com sucesso!"); // Cancelamento (vermelha)
    onClose();
  };

  return (
    <Modal
      title={
        <h2 className="text-xl font-bold">
          {project ? "Editar Projeto" : "Registrar novo projeto"}
        </h2>
      }
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width="50vw"
    >
      {/* Renderize o contextHolder para exibir as mensagens */}
      {contextHolder}
      {step === 1 ? (
        <div className="flex flex-col space-y-4">
          <label className="font-semibold">Título:</label>
          <Input
            name="title"
            placeholder="Digite o título do projeto"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Título é obrigatório</p>
          )}

          <label className="font-semibold">Nome do(s) orientador(es):</label>
          {formData.advisors.map((advisor, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder={`Nome do orientador ${index + 1}`}
                value={advisor}
                onChange={(e) => handleChange(e, index)}
                className={errors.advisors ? "border-red-500" : ""}
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
          {errors.advisors && (
            <p className="text-red-500 text-sm">
              O nome de todos os orientadores é obrigatório
            </p>
          )}

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
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">A descrição é obrigatória</p>
          )}

          <label className="font-semibold">Upload de arquivos:</label>
          <Dragger
            {...uploadProps}
            className={errors.file ? "border-red-500" : ""}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Clique ou arraste os arquivos para esta área
            </p>
            <p className="ant-upload-hint">Suporta apenas um arquivo PDF.</p>
          </Dragger>
          {errors.file && (
            <p className="text-red-500 text-sm">
              Arquivo é obrigatório e deve ser um PDF
            </p>
          )}

          <div className="flex justify-between mt-4">
            <Button className="bg-red-500 text-white" onClick={handleCancel}>
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
            className={errors.course ? "border-red-500" : ""}
          >
            <Option value="Meio Ambiente">Meio Ambiente</Option>
            <Option value="Química">Química</Option>
            <Option value="Informática">Informática</Option>
            <Option value="Alimentos">Alimentos</Option>
            <Option value="Agropecuária">Agropecuária</Option>
          </Select>
          {errors.course && (
            <p className="text-red-500 text-sm">O curso é obrigatório</p>
          )}

          <SubjectsSelector
            selectedCourse={formData.course}
            onSelectionChange={(selected) =>
              setFormData({ ...formData, selectedSubjects: selected })
            }
          />
          {errors.selectedSubjects && (
            <p className="text-red-500 text-sm">
              Selecione ao menos uma disciplina
            </p>
          )}

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
