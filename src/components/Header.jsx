import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
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
          <Link to="/" onClick={closeMenu}>
            Inicio
          </Link>

          <Link to="/#nosotros" onClick={closeMenu}>
            Nosotros
          </Link>

          <Link to="/#servicios" onClick={closeMenu}>
            Servicios
          </Link>

          <Link to="/#cursos" onClick={closeMenu}>
            Cursos
          </Link>

          <Link to="/#experiencia" onClick={closeMenu}>
            Experiencia
          </Link>

          <Link to="/#capacitaciones" onClick={closeMenu}>
            Capacitaciones
          </Link>

          <Link to="/#contacto" onClick={closeMenu}>
            Contacto
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
