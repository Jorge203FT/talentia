import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const irASeccion = (seccion) => {
    closeMenu();

    // Si ya estamos en Home,
    // desplazamos directamente sin modificar la URL.
    if (location.pathname === "/") {
      const elemento = document.getElementById(seccion);

      if (elemento) {
        elemento.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      return;
    }

    // Si estamos en otra interfaz,
    // regresamos al Home llevando la sección como estado.
    navigate("/", {
      state: {
        scrollTo: seccion
      }
    });
  };

  return (
    <header className="site-header">
      <div className="container nav">

        <Link className="brand" to="/" onClick={closeMenu}>
          <img
            className="brand-logo brand-logo-desktop"
            src="/assets/images/Talentia_grande_sin_fondo.png"
            alt="Talentia Escuela de Especialización Profesional"
          />

          <img
            className="brand-logo brand-logo-mobile"
            src="/assets/images/logo_sin_fondo.png"
            alt="Talentia"
          />
        </Link>

        <nav
          className={`nav-links ${menuOpen ? "open" : ""}`}
          id="mobile-navigation"
        >
          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              irASeccion("inicio");
            }}
          >
            Inicio
          </Link>

          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              irASeccion("nosotros");
            }}
          >
            Nosotros
          </Link>

          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              irASeccion("servicios");
            }}
          >
            Servicios
          </Link>

          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              irASeccion("cursos");
            }}
          >
            Cursos
          </Link>

          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              irASeccion("experiencia");
            }}
          >
            Experiencia
          </Link>

          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              irASeccion("capacitaciones");
            }}
          >
            Capacitaciones
          </Link>

          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              irASeccion("contacto");
            }}
          >
            Contacto
          </Link>

          <Link className="nav-cta" onClick={closeMenu}>
            Acceso alumno →
          </Link>
        </nav>

        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Header;
