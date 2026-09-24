import { Link, useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const irASeccion = (seccion) => {
    if (location.pathname === "/") {
      const elemento =
        document.getElementById(seccion);

      if (elemento) {
        elemento.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      return;
    }

    navigate("/", {
      state: {
        scrollTo: seccion
      }
    });
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div>
          <Link className="brand" to="/">
            <img
              className="brand-logo"
              src="/assets/images/Talentia_grande_sin_fondo.png"
              alt="Talentia Escuela de Especialización Profesional"
            />
          </Link>

          <p>
            Solicita cursos Talentia Escuela de Especialización Profesional.
            Formación que impulsa tu futuro.
          </p>
        </div>

        <div>
          <h4>Empresa</h4>
          <ul>
            <li>
              <Link
                to="/"
                onClick={(event) => {
                  event.preventDefault();
                  irASeccion("nosotros");
                }}
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link 
                to="/"
                onClick={(event) => {
                  event.preventDefault();
                  irASeccion("servicios");
                }}
                >
                Servicios
                </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Explorar</h4>
          <ul>
            <li>
              <Link
                to="/"
                onClick={(event) => {
                  event.preventDefault();
                  irASeccion("cursos");
                }}
              >
                Cursos
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(event) => {
                  event.preventDefault();
                  irASeccion("experiencia");
                }}
              >
                Experiencia
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(event) => {
                  event.preventDefault();
                  irASeccion("capacitaciones");
                }}
              >
                Capacitaciones
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contactos</h4>

          <p>
            <span
              className="footer-phone-flag"
              role="img"
              aria-label="Perú"
            >
            <iconify-icon icon="circle-flags:pe"></iconify-icon>
            </span>{" "}
            +51 950 290 491
          </p>

          <p>seleccion@talentumperu.com</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;