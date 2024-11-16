"use client";

import Image from "next/image";
import logo from "../../public/r12.png";
import iconLixo from "../../public/iconLixo.png";
import iconEditar from "../../public/iconEditar.png";
import { useEffect, useState } from "react";
import generatePDF from "react-to-pdf";


interface Player {
  name: string;
  numero: string;
  selectSize: string;
  gender: string;
  uniformSet: string;
}


const personalizacao = {
  method: "save" as const,
  page: {
    margin: { top: 10, right: 10, bottom: 10, left: 10 }, // Ajuste as margens
    format: "A4",
    orientation: "portrait", // Ou "landscape", se necessário
  },
};

export default function Home() {
  const [isPDFMode, setIsPDFMode] = useState(false);
  const [name, setName] = useState("");
  const [numero, setNumero] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [gender, setGender] = useState("");
  const [uniformSet, setUniformSet] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  const recuperarConteudoPDF = () => {
    const conteudo = document.getElementById("conteudo");
    if (!conteudo) {
      console.error("Elemento 'conteudo' não encontrado.");
      return null;
    }
    return conteudo;
  };

  const handleSavePlayer = () => {
    if (name && numero && selectSize) {
      const newPlayer = { name, numero, selectSize, gender, uniformSet };
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      setName("");
      setNumero("");
      setSelectSize("");
      setGender("");
      setUniformSet("");
    } else {
      alert("Preencha todos os campos!");
    }
  };


  const handleDeletePlayer = (index: any) => {
    setPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== index));
  };

  return (
    <main className="container mx-auto px-4 flex flex-col justify-center">
      <div className="flex justify-center mt-5">
        <Image alt="Logo" width={300} src={logo} />
      </div>
      <section className="mt-10 flex flex-wrap items-end  gap-3">
        <div>
          <p className="font-bold">Nome:</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nome do jogador"
            className="p-2 border-2 rounded-md border-gray-300"
          />
        </div>
        <div>
          <p className="font-bold">Número:</p>
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            type="text"
            placeholder="Número da camisa"
            className="p-2 border-2 rounded-md border-gray-300"
          />
        </div>
        <div>
          <p className="font-bold">Tamanho:</p>
          <select
            value={selectSize}
            onChange={(e) => setSelectSize(e.target.value)}
            className="p-2 border-2 rounded-md border-gray-300"
          >
            <option value=""></option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
            <option value="G1">G1</option>
            <option value="G2">G2</option>
          </select>
        </div>
        <div>
          <p className="font-bold">Camiseta:</p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 border-2 rounded-md border-gray-300"
          >
            <option value=""></option>
            <option value="Masculina">Masculina</option>
            <option value="Feminina">Feminina</option>
            <option value="Infantil">Infantil</option>
          </select>
        </div>
        <div>
          <p className="font-bold">Conjunto:</p>
          <select
            value={uniformSet}
            onChange={(e) => setUniformSet(e.target.value)}
            className="p-2 border-2 rounded-md border-gray-300"
          >
            <option value=""></option>
            <option value="Sim">Sim</option>
            <option value="Nao">Não</option>
          </select>
        </div>
      </section>
      <section className="flex gap-3 mt-5">
        <div>
          <button
            onClick={handleSavePlayer}
            className=" px-5 bg-blue-700 p-2 rounded-md text-white cursor-pointer"
          >
            Salvar jogador
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setIsPDFMode(true);
              setTimeout(() => {
                generatePDF(recuperarConteudoPDF, personalizacao as any).then(() => {
                  setIsPDFMode(false); // Retorna ao modo scroll
                });
              }, 500); // Tempo para re-renderizar a lista completa
            }}
            className="px-5 bg-green-700 p-2 rounded-md text-white cursor-pointer"
          >
            Gerar PDF
          </button>
        </div>
      </section>
      <section id="conteudo">
        <h3 className="font-bold text-xl">Lista de jogadores</h3>
        <p>Total: {players.length}</p>
        <div className="border-2 rounded-md mt-2 overflow-x-auto  h-[50vh]">
          {players.length === 0 ? (
            <p>Nenhum jogador salvo.</p>
          ) : (
            <ul>
              {players
                .slice() // Faz uma cópia da lista para evitar modificar o estado original
                .sort((a, b) => {
                  const sizeOrder = ["P", "M", "G", "GG", "G1", "G2"];
                  return (
                    sizeOrder.indexOf(a.selectSize) -
                    sizeOrder.indexOf(b.selectSize)
                  );
                })
                .map((player, index) => (
                  <li
                    key={index}
                    className="w-full flex  text-sm items-center border-b py-2 justify-between px-2"
                  >
                    <span className="flex flex-wrap gap-2">
                      <span className="font-bold">Nome:</span> {player.name},
                      <span className="font-bold">Número:</span> {player.numero}
                      ,<span className="font-bold">Tamanho:</span>{" "}
                      {player.selectSize},
                      <span className="font-bold">Camiseta:</span>{" "}
                      {player.gender},
                      <span className="font-bold">Conjunto:</span>
                      {player.uniformSet}
                    </span>

                    {!isPDFMode && (
                      <div className="flex flex-wrap gap-3 ml-5 justify-center items-center">
                      <Image
                        alt="Excluir jogador"
                        src={iconLixo}
                        className="cursor-pointer w-7"
                        onClick={() => handleDeletePlayer(index)}
                      />
                      <Image
                        alt="Editar jogador"
                        src={iconEditar}
                        className="cursor-pointer w-7"
                      />
                    </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
