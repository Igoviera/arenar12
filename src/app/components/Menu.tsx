import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo01.png";

const HomePage = () => {
    return (
        <header className="bg-black bg-opacity-15">
            <nav className="text-white italic flex justify-end gap-8 px-5 py-2">
                <Link className="text-lg sm:text-xl md:text-xl hover:text-gray-300" href={"/"}>Inicio</Link>
                {/*<Link className="text-lg sm:text-xl md:text-xl hover:text-gray-300" href={"/tabelaMedidas"}> Tabela de medidas </Link>*/}
            </nav>
        </header>
    )
}

export default HomePage;