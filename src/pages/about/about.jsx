import React, { useEffect } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Player } from "@lottiefiles/react-lottie-player";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // duração da animação em ms
      once: true, // anima somente uma vez
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="bg-white">
        {/* Seção 1: Texto à esquerda e Lottie à direita */}
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2" data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-4">
              Bem-vindo ao nosso Portal de Projetos
            </h2>
            <p className="text-lg">
              O objetivo deste site é proporcionar um espaço inovador e
              colaborativo, onde orientadores e professores possam cadastrar,
              compartilhar e explorar ideias de projetos acadêmicos. Este portal
              de projetos foi pensado com a finalidade de promover a interação
              entre os diferentes tipos de conhecimento, permitindo a troca de
              experiências e fomentando a criação de novos projetos acadêmicos
              que impactem de forma positiva as áreas de estudo.
            </p>
          </div>
          <div
            className="md:w-1/2 mt-8 md:mt-0 flex justify-center"
            data-aos="fade-left"
          >
            <Player
              autoplay
              loop
              src="/lotties/Animation-NotebookProfessor/animations/notebookProfessor.json"
              style={{ height: "650px", width: "650px" }}
            />
          </div>
        </div>

        {/* Seção 2: Lottie à esquerda e texto à direita, com um Lottie adicional centralizado abaixo */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 order-1" data-aos="fade-right">
              <Player
                autoplay
                loop
                src="/lotties/Animation-BoyGreen/animations/BoyGreen.json"
                style={{ height: "650px", width: "650px" }}
              />
            </div>
            <div className="md:w-1/2 order-2 mt-8 md:mt-0" data-aos="fade-left">
              <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
              <p className="text-lg">
                Este site foi projetado para tornar o processo de busca e
                compartilhamento de projetos acadêmicos mais fácil e acessível,
                ajudando a fortalecer a educação e o desenvolvimento de soluções
                inovadoras para as diversas áreas de estudo.
              </p>
            </div>
          </div>
          <div className="mt-16 flex justify-center" data-aos="zoom-in">
            <Player
              autoplay
              loop
              src="/lotties/Animation-GirlBooks/animations/GirBooks.json"
              style={{ height: "650px", width: "650px" }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
