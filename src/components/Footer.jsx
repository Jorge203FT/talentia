import { Link } from "react-router-dom";

function Footer() {
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
              <Link to="/#nosotros">Nosotros</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Explorar</h4>
          <ul>
            <li>
              <Link to="/cursos">Cursos</Link>
            </li>
            <li>
              <Link to="/#experiencia">Experiencia</Link>
            </li>
            <li>
              <Link to="/#capacitaciones">Capacitaciones</Link>
            </li>
            <li>
              <Link to="/#testimonios">Testimonios</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contactos</h4>
          <p>(51) 950 290 491</p>
          <p>seleccion@talentumperu.com</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;