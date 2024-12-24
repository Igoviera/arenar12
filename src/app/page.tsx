"use client";

import Image from "next/image";
import logo from "../../public/logo01.png";
import { useState } from "react";
import MyPdf from "./components/MyPdf";
import Menu from "./components/Menu";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Footer from "./components/Footer";

type ShirtSizes =
  | "2Anos"
  | "4Anos"
  | "6Anos"
  | "8Anos"
  | "10Anos"
  | "12Anos"
  | "14Anos"
  | "16Anos"
  | "P"
  | "M"
  | "G"
  | "GG"
  | "G1"
  | "G2"
  | "G3"
  | "G4";

interface Player {
  name: string;
  numero: string;
  selectSize: ShirtSizes;
  gender: string;
  uniformSet: string;
}

export default function Home() {
  const [nameEquipe, setNameEquipe] = useState("");
  const [name, setName] = useState("");
  const [numero, setNumero] = useState("");
  const [selectSize, setSelectSize] = useState<ShirtSizes | "">("");
  const [gender, setGender] = useState("");
  const [uniformSet, setUniformSet] = useState("");
  const [mesh, setMesh] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  // Função para contar camisas de cada tamanho
  const countShirtSizes = (players: Player[]) => {
    const counts: Record<ShirtSizes, number> = {
      "2Anos": 0,
      "4Anos": 0,
      "6Anos": 0,
      "8Anos": 0,
      "10Anos": 0,
      "12Anos": 0,
      "14Anos": 0,
      "16Anos": 0,
      P: 0,
      M: 0,
      G: 0,
      GG: 0,
      G1: 0,
      G2: 0,
      G3: 0,
      G4: 0,
    };
    players.forEach((player) => {
      if (player.selectSize in counts) {
        counts[player.selectSize]++;
      }
    });
    return counts;
  };

  const handleSavePlayer = () => {
    if (name && numero && selectSize) {
      const newPlayer = {
        name,
        numero,
        selectSize,
        gender,
        uniformSet,
      };
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

      // Título principal
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Relatório de Jogadores", 105, 15, { align: "center" });

      // Adicionar uma linha divisória
      doc.setLineWidth(0.5);
      doc.line(10, 20, 200, 20);

      // Informações gerais
      let y = 30; // Controle de posição vertical
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, y);
      y += 10;

      doc.setFont("helvetica", "bold");
      doc.text("Nome da Equipe:", 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(nameEquipe || "N/A", 60, y);
      y += 10;

      doc.setFont("helvetica", "bold");
      doc.text("Total de Jogadores:", 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${players.length}`, 60, y);
      y += 10;

      // Contagem de camisetas
      doc.setFont("helvetica", "bold");
      doc.text("Contagem de Camisas por Tamanho:", 14, y);
      y += 8;

      const shirtCounts = countShirtSizes(players);
      doc.setFont("helvetica", "normal");

      const countsText = Object.entries(shirtCounts)
        .filter(([_, count]) => count > 0)
        .map(([size, count]) => `${size}: ${count}`)
        .join(" | ");
      doc.text(countsText || "Nenhum tamanho registrado", 14, y);
      y += 10;

      // Adicionar uma nova linha divisória antes da tabela
      doc.setLineWidth(0.5);
      doc.line(10, y, 200, y);
      y += 5;

      // Gerar a tabela
      const headers = [
        "Nome",
        "Número",
        "Tamanho",
        "Camiseta",
        "Conjunto",
        "Malha",
      ];
      const data = players.map((player) => [
        player.name,
        player.numero,
        player.selectSize,
        player.gender,
        player.uniformSet,
        mesh,
      ]);

      doc.autoTable({
        head: [headers],
        body: data,
        startY: y,
        theme: "grid",
        styles: {
          fontSize: 10,
          halign: "center",
          valign: "middle",
        },
      });

      // Salvar o PDF
      doc.save("lista_jogadores.pdf");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const handleDeletePlayer = (index: any) => {
    setPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== index));
  };

  return (
    <>
      <Menu/>
      <main className="container mx-auto px-4 flex flex-col justify-center">
        <div className="flex justify-center mt-10">
          <Image alt="Logo" width={310} src={logo} />
        </div>
        <section className="mt-20 flex flex-wrap items-end  gap-3">
          <div>
            <p className="font-bold text-white">Nome da Equipe:</p>
            <input
              value={nameEquipe}
              onChange={(e) => setNameEquipe(e.target.value)}
              type="text"
              maxLength={20}
              placeholder="Nome da Equipe"
              className="p-2 border-2 rounded-md border-gray-300"
            />
          </div>
          <div>
            <p className="font-bold text-white">Nome do jogador:</p>
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
            <p className="font-bold text-white">Número da camisa:</p>
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
              onChange={(e: any) => setSelectSize(e.target.value)}
              className="p-2 border-2 rounded-md border-gray-300"
            >
              <option value=""></option>
              <option value="2Anos">2</option>
              <option value="4Anos">4</option>
              <option value="6Anos">6</option>
              <option value="8Anos">8</option>
              <option value="10Anos">10</option>
              <option value="12Anos">12</option>
              <option value="14Anos">14</option>
              <option value="16Anos">16</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
              <option value="G1">G1</option>
              <option value="G2">G2</option>
              <option value="G3">G3</option>
              <option value="G4">G4</option>
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
          <div>
            <p className="font-bold text-white">Tipo de malha:</p>
            <select
              value={mesh}
              onChange={(e) => setMesh(e.target.value)}
              className="p-2 border-2 rounded-md border-gray-300"
            >
              <option value=""></option>
              <option value="cancha">Cancha lisa</option>
              <option value="Colmeia">Colmeia</option>
              <option value="top3d">Pro 3D</option>
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
    </>
  );
}
