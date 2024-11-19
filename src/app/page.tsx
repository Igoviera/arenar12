"use client";

import Image from "next/image";
import logo from "../../public/logo01.png";
import { useState } from "react";
import MyPdf from "./components/MyPdf";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Player {
  name: string;
  numero: string;
  selectSize: string;
  gender: string;
  uniformSet: string;
}

export default function Home() {
  const [name, setName] = useState("");
  const [numero, setNumero] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [gender, setGender] = useState("");
  const [uniformSet, setUniformSet] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

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

  const gerarPDF = () => {
    if (players.length > 0) {
      const doc = new jsPDF();

      doc.text("Relatório de Jogadores", 105, 10, { align: "center" });
      doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 20);
      doc.text(`Total de jogadores: ${players.length}`, 14, 30);

      const headers = ["Nome", "Número", "Tamanho", "Camiseta", "Conjunto"];
      const data = players.map((player) => [
        player.name,
        player.numero,
        player.selectSize,
        player.gender,
        player.uniformSet,
      ]);

      doc.autoTable({
        head: [headers],
        body: data,
        startY: 40, // Define a posição vertical da tabela no documento
        theme: "grid", // Experimente outros temas como 'striped' ou 'plain'
        styles: {
          // Adicione estilos personalizados aqui, se necessário
          fontSize: 10,
          halign: "center",
          valign: "middle",
        },
      });
      doc.save("lista_jogadores.pdf");
    } else {
      alert("Preencha todos os campos!")
    }
  };

  const handleDeletePlayer = (index: any) => {
    setPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== index));
  };

  return (
    <main className="container mx-auto px-4 flex flex-col justify-center">
      <div className="flex justify-center mt-10">
        <Image alt="Logo" width={310} src={logo} />
      </div>
      <section className="mt-20 flex flex-wrap items-end  gap-3">
        <div>
          <p className="font-bold text-white">Nome:</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            maxLength={20}
            placeholder="Nome do jogador"
            className="p-2 border-2 rounded-md border-gray-300"
          />
        </div>
        <div>
          <p className="font-bold text-white">Número:</p>
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            type="text"
            maxLength={3}
            pattern="\d*"
            placeholder="Número da camisa"
            className="p-2 border-2 rounded-md border-gray-300"
          />
        </div>
        <div>
          <p className="font-bold text-white">Tamanho:</p>
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
          <p className="font-bold text-white">Camiseta:</p>
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
          <p className="font-bold text-white">Conjunto:</p>
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
            className=" px-5 bg-blue-900 p-2 rounded-md text-white cursor-pointer"
          >
            Salvar jogador
          </button>
        </div>
        <div>
          <button
            onClick={gerarPDF}
            className=" px-5 bg-blue-900 p-2 rounded-md text-white cursor-pointer"
          >
            Gerar PDF
          </button>
        </div>
      </section>
      <section>
        <MyPdf players={players} onDeletePlayer={handleDeletePlayer} />
      </section>
    </main>
  );
}
