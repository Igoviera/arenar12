import React from "react";

interface Player {
  name: string;
  numero: string;
  selectSize: string;
  gender: string;
  uniformSet: string;
}

const MyPdf = ({ players }: { players: Player[] }) => {
  return (
    <div className="mx-auto p-4 bg-white shadow-md rounded-lg">
  <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Lista de Jogadores</h1>
  
  {/* Contêiner com scroll horizontal */}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-600 text-white text-left">
          <th className="py-2 px-4">Nome</th>
          <th className="py-2 px-4">Número</th>
          <th className="py-2 px-4">Tamanho</th>
          <th className="py-2 px-4">Gênero</th>
          <th className="py-2 px-4">Conjunto</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-200`}
          >
            <td className="py-2 px-4 border border-gray-300">{player.name}</td>
            <td className="py-2 px-4 border border-gray-300">{player.numero}</td>
            <td className="py-2 px-4 border border-gray-300">{player.selectSize}</td>
            <td className="py-2 px-4 border border-gray-300">{player.gender}</td>
            <td className="py-2 px-4 border border-gray-300">{player.uniformSet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MyPdf;
