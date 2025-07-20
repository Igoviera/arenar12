import Image from "next/image";
import tabelaMasculina from "../../../public/tabela-masculina.png";
import tabelaFeminina from "../../../public/tabela-femina.png";
import tabelaInfantil from "../../../public/tabela-infantil.png";
import Menu from "../components/Menu";
import NotFound from "../not-found";

const TabelaDeMedidas = () => {
  const notFound = true;

  return (
    <>
      {notFound ? (
        <NotFound />
      ) : (
        <div>
          <Menu />
          <main className="flex flex-col justify-center">
            <h1 className="text-white italic text-2xl flex justify-center mt-10">
              Tabelas de medidas
            </h1>
            <section className="mt-10">
              <div className="flex gap-11 justify-center flex-wrap">
                <Image
                  alt="tabela-masculina"
                  width={310}
                  height={310} // Adicionando a altura para garantir o aspecto das imagens
                  src={tabelaMasculina}
                  // Responsividade
                />
                <Image
                  alt="tabela-feminina"
                  width={310}
                  height={310}
                  src={tabelaFeminina}
                />
                <Image
                  alt="tabela-infantil"
                  width={310}
                  height={310}
                  src={tabelaInfantil}
                />
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default TabelaDeMedidas;
