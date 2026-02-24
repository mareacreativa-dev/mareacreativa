import { useState } from "react";

const Menu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isServicesOpen, setIsServicesOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleServices = (e) => {
		e.preventDefault();
		setIsServicesOpen(!isServicesOpen);
	};

	const servicesParams = [
		{ name: "Diseño Web y Desarrollo", href: "/diseno-y-desarrollo-web" },
		{ name: "Rebranding e Identidad", href: "/rebranding-identidad" },
		{ name: "Chatbots de Inteligencia Artificial", href: "/chatbots-personalizados" },
		{ name: "Soluciones para Negocios Locales", href: "/servicios-negocios-locales" },
		{ name: "Automatización de Procesos", href: "/automatizacion-de-procesos" },
		{ name: "Sistemas para Hostelería", href: "/gestion-hosteleria" },
	];

	return (
		<div className="p-4 bg-secondary relative z-50">
			<nav className="flex justify-between items-center max-w-7xl mx-auto w-full">
				<a
					href="/"
					className="text-white flex justify-center items-center gap-2 font-bold z-50"
				>
					<img
						src="https://res.cloudinary.com/dgkdq8kzk/image/upload/v1756154116/logo_blanco_icono_ylvs82.svg"
						alt="Marea Creativa Logo"
						className="h-8"
						title="Marea Creativa Logo"
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
					
					{/* Dropdown de Servicios (Desktop) */}
					<div className="relative group">
						<button
							className="font-medium text-white hover:text-primary transition-colors flex items-center gap-1 py-4"
							aria-haspopup="true"
						>
							Servicios
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
						</button>
						{/* Dropdown Panel */}
						<div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
							<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 grid grid-cols-2 gap-x-8 gap-y-4">
								<div className="col-span-2 mb-2 pb-2 border-b border-gray-50 flex justify-between items-center">
									<span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Nuestros Servicios</span>
									<a href="/servicios" className="text-sm font-medium text-primary hover:text-blue-700">Ver todo →</a>
								</div>
								{servicesParams.map((service, idx) => (
									<a key={idx} href={service.href} className="flex flex-col group/item p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors">
										<span className="font-semibold text-gray-900 group-hover/item:text-primary transition-colors">{service.name}</span>
									</a>
								))}
							</div>
						</div>
					</div>

					<a
						href="/proyectos"
						className="font-medium text-white hover:text-primary transition-colors"
					>
						Proyectos
					</a>
					<a
						href="/contacto"
						className="inline-block bg-gradient-to-r from-primary to-primary-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600 shadow-lg shadow-blue-500/20"
					>
						Contacto
					</a>
				</div>

				{/* Botón menú móvil */}
				<button
					className="md:hidden text-white cursor-pointer z-50 relative"
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
						{isMenuOpen ? (
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						) : (
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						)}
					</svg>
				</button>
			</nav>

			{/* Menú móvil (Desplegable) */}
			<div
				className={`md:hidden absolute top-full left-0 w-full bg-secondary shadow-2xl z-40 transition-all duration-300 origin-top overflow-hidden ${
					isMenuOpen ? "opacity-100 scale-y-100 max-h-[800px]" : "opacity-0 scale-y-0 max-h-0"
				}`}
			>
				<div className="px-6 py-6 pb-8 flex flex-col space-y-4 max-w-7xl mx-auto bg-gray-900 rounded-b-3xl border-t border-gray-800">
					<a
						href="/"
						className="py-2 font-medium text-xl text-white hover:text-primary transition-colors"
					>
						Inicio
					</a>
					
					{/* Dropdown Servicios Mobile */}
					<div className="flex flex-col">
						<button 
							onClick={toggleServices}
							className="flex justify-between items-center py-2 font-medium text-xl text-white hover:text-primary transition-colors text-left"
						>
							Servicios
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
						</button>
						<div className={`flex flex-col pl-4 mt-2 space-y-3 border-l border-gray-700 transition-all overflow-hidden ${isServicesOpen ? 'max-h-[500px] opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
							<a href="/servicios" className="text-gray-400 font-medium py-1">➔ Ver todos los servicios</a>
							{servicesParams.map((service, idx) => (
								<a key={idx} href={service.href} className="text-gray-300 hover:text-white py-1 transition-colors">
									{service.name}
								</a>
							))}
						</div>
					</div>

					<a
						href="/proyectos"
						className="py-2 font-medium text-xl text-white hover:text-primary transition-colors"
					>
						Proyectos
					</a>
					<a
						href="/contacto"
						className="mt-4 text-center bg-primary text-white font-medium px-6 py-4 rounded-xl hover:bg-blue-700 transition-colors"
					>
						Habla con nosotros
					</a>
				</div>
			</div>
		</div>
	);
};

export default Menu;
