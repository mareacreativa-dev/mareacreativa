import { useState } from "react";

const Menu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className=" p-4  bg-black ">
			<nav className="flex justify-between items-center ">
				<a
					href="/"
					className="text-white flex justify-center items-center gap-2 font-bold"
				>
					<img
						src="https://res.cloudinary.com/dgkdq8kzk/image/upload/v1756154116/logo_blanco_icono_ylvs82.svg"
						alt="Marea Creativa Logo"
						className="h-8"
						Title="Marea Creativa Logo"
						draggable="false"
					/>
					<span>
						MAREA <span className="font-light">CREATIVA</span>
					</span>
				</a>

				{/* Menú para pantallas grandes */}
				<div className="hidden md:flex space-x-8 items-center">
					<a
						href="/"
						className="font-medium text-white hover:text-primary transition-colors"
					>
						Inicio
					</a>
					<a
						href="/servicios"
						className="font-medium text-white hover:text-primary transition-colors"
					>
						Servicios
					</a>
					<a
						href="/proyectos"
						className="font-medium text-white hover:text-primary transition-colors"
					>
						Proyectos
					</a>
					<a
						href="/blog"
						className="font-medium text-white hover:text-primary transition-colors"
					>
						Blog
					</a>

					<a
						href="/contacto"
						class="inline-block bg-gradient-to-r from-primary to-primary-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600"
					>
						Contacto
					</a>
				</div>

				{/* Botón para mostrar/ocultar menú en móviles */}
				<button
					className="md:hidden text-white cursor-pointer"
					onClick={toggleMenu}
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</nav>

			{/* Menú móvil */}
			<div
				className={`md:hidden ${
					isMenuOpen ? "block" : "hidden"
				} bg-secondary w-full absolute top-16 left-0 shadow-md border-b-2 border-primary`}
			>
				<div className="container mx-auto p-7 flex flex-col space-y-4">
					<a
						href="/"
						className="py-2 font-medium text-white hover:text-primary transition-colors"
					>
						Inicio
					</a>
					<a
						href="/servicios"
						className="py-2 font-medium text-white hover:text-primary transition-colors"
					>
						Servicios
					</a>
					<a
						href="/proyectos"
						className="py-2 font-medium text-white hover:text-primary transition-colors"
					>
						Proyectos
					</a>
					<a
						href="/blog"
						className="py-2 font-medium text-white hover:text-primary transition-colors"
					>
						Blog
					</a>
					<a
						href="/contacto"
						className="py-2 font-medium text-white hover:text-primary transition-colors"
					>
						Contacto
					</a>
				</div>
			</div>
		</div>
	);
};

export default Menu;
