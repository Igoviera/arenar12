// /app/not-found.tsx
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-white h-screen flex flex-col md:flex-row justify-center items-center p-4 text-center">
      <div className="mb-6 md:mb-0 md:mr-8">
        <Image
          src="/simpsons.png"
          width={250}
          height={250}
          alt="Imagem de erro 404"
          className="w-40 sm:w-60 md:w-72 h-auto"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl sm:text-8xl font-bold">404</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-4">
          OPS! Página não encontrada.
        </h2>
      </div>
    </div>
  );
}
