import React from "react";
import iconLixo from "../../../public/iconLixo.png";
import Image from "next/image";

interface Player {
  name: string;
  numero: string;
  selectSize: string;
  gender: string;
  uniformSet: string;
}

interface MyPdfProps {
  players: Player[];
  onDeletePlayer: (index: number) => void; // Adicione o tipo correto para o callback
}

const MyPdf: React.FC<MyPdfProps> = ({ players, onDeletePlayer }) => {
  // Ordenando a lista de jogadores pelo tamanho (selectSize)
  const sortedPlayers = players.sort((a, b) => {
    // Se selectSize for um número
    return a.selectSize.localeCompare(b.selectSize); // Usa `localeCompare` para comparar strings
  });

  return (
    <div className="mx-auto bg-blue-900 rounded-lg mt-5">
      <h1 className="text-lg py-2 font-bold text-center text-white border-b-2">
        Lista de Jogadores
      </h1>

      {/* Contêiner com scroll horizontal */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-blue-900">
          <thead>
            <tr className="bg-blue-900 border-blue-900 text-white text-left">
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Número</th>
              <th className="py-2 px-4">Tamanho</th>
              <th className="py-2 px-4">Gênero</th>
              <th className="py-2 px-4">Conjunto</th>
              <th className="py-2 px-4">Ação</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="py-2 px-4 border border-gray-300">
                  {player.name}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {player.numero}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {player.selectSize}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {player.gender}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {player.uniformSet}
                </td>
                <td className=" cursor-pointer py-2 border border-gray-300">
                  <div className="flex justify-center">
                    <Image onClick={() => onDeletePlayer(index)} src={iconLixo} alt="Excluir" className="w-5 h-5" />  
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPdf;
