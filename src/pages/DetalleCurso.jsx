import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "motion/react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RegistroForm from "../components/RegistroForm";
import { db } from "../firebase.js";
import { fadeUp } from "../animations/variants.js";


const revealOnScroll = {
  variants: fadeUp,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.16 }
};


function obtenerPublicosDirigidos(valor) {
  if (Array.isArray(valor)) {
    return valor
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (!valor) return [];

  return String(valor)
    .split(/\r?\n|•|(?<=[.!?])(?=[A-ZÁÉÍÓÚÑ])/u)
    .map((item) => item.trim())
    .filter(Boolean);
}


function DetalleCurso() {

  const { id } = useParams();

  const [curso, setCurso] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");


  /* =========================================================
     OBTENER CURSO DESDE FIREBASE
     ========================================================= */

  useEffect(() => {

    async function obtenerCurso() {

      try {

        setCargando(true);
        setError("");

        const referenciaCurso =
          doc(db, "Cursos", id);

        const documentoCurso =
          await getDoc(referenciaCurso);

        if (!documentoCurso.exists()) {

          setError("El curso no fue encontrado.");
          setCurso(null);

          return;
        }

        const datosCurso = {
          id: documentoCurso.id,
          ...documentoCurso.data()
        };

        setCurso(datosCurso);

        console.log(
          "Curso obtenido desde Firebase:",
          datosCurso
        );

      } catch (error) {

        console.error(
          "Error al obtener el curso:",
          error
        );

        setError(
          "No se pudo cargar la información del curso."
        );

      } finally {

        setCargando(false);

      }

    }


    if (id) {
      obtenerCurso();
    } else {
      setError("No se encontró el identificador del curso.");
      setCargando(false);
    }

  }, [id]);


  /* =========================================================
     CARGANDO
     ========================================================= */

  if (cargando) {

    return (
      <>
        <Header />

        <main>
          <section className="section">
            <div className="container">
              <p>Cargando curso...</p>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );

  }


  /* =========================================================
     ERROR
     ========================================================= */

  if (error || !curso) {

    return (
      <>
        <Header />

        <main>
          <section className="section">
            <div className="container">
              <h1>Curso no encontrado</h1>

              <p>
                {error || "No se pudo encontrar este curso."}
              </p>

              <a
                className="btn btn-primary"
                href="/cursos"
              >
                Volver a cursos
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );

  }


  /* =========================================================
     FECHA DE ACTUALIZACIÓN
     ========================================================= */

  const fechaActualizacion = curso.fecha_actualizacion
    ? new Date(
        `${curso.fecha_actualizacion}T00:00:00`
      ).toLocaleDateString(
        "es-PE",
        {
          month: "long",
          year: "numeric"
        }
      )
    : "No especificada";

  const publicosDirigidos =
    obtenerPublicosDirigidos(curso.dirigido_a);


  /* =========================================================
     INTERFAZ DEL CURSO
     ========================================================= */

  return (

    <>

      <Header />


      <main>

        {/* =====================================================
            BREADCRUMB
            ===================================================== */}

        <div className="course-breadcrumb">

          <div className="container">

            <nav className="course-breadcrumb-trail" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <span aria-hidden="true">›</span>
              <Link to="/cursos">Todos los Cursos</Link>
              <span aria-hidden="true">›</span>
              <span>{curso.title}</span>
            </nav>

          </div>

        </div>


        {/* =====================================================
            HERO
            ===================================================== */}

        <section className="detail-hero">

          <motion.div
            className="container detail-grid"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >


            <motion.div
              className="course-cover"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >

              <img
                src={curso.image}
                alt={`Presentación del curso ${curso.title}`}
              />

            </motion.div>


            <div className="course-intro">

              <p className="eyebrow">
                {curso.category}
              </p>


              <h1>
                {curso.title}
              </h1>


              <p>
                {curso.description}
              </p>


              <div className="course-badges">


                <span>

                  <iconify-icon
                    class="course-badge-icon"
                    icon="mdi:clock-outline"
                  ></iconify-icon>

                  <strong>
                    {curso.hours} horas
                  </strong>

                </span>


                <span>

                  <iconify-icon
                    class="course-badge-icon"
                    icon="mdi:laptop"
                  ></iconify-icon>

                  <strong>
                    {curso.modality}
                  </strong>

                </span>


                <span>

                  <iconify-icon
                    class="course-badge-icon"
                    icon="mdi:signal-cellular-3"
                  ></iconify-icon>

                  <strong>
                    Nivel {curso.level}
                  </strong>

                </span>


                {curso.certificado && (

                  <span>

                    <iconify-icon
                      class="course-badge-icon"
                      icon="mdi:certificate-outline"
                    ></iconify-icon>

                    <strong>
                      Certificado
                    </strong>

                  </span>

                )}


              </div>


              <motion.a
                className="btn btn-primary"
                href="#contacto"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Solicitar más información
              </motion.a>


            </div>

          </motion.div>

        </section>


        {/* =====================================================
            INFORMACIÓN PRINCIPAL
            ===================================================== */}

        <section className="course-detail-section">


          <div className="container detail-layout">


            <div className="detail-main">


              {/* =================================================
                  DESCRIPCIÓN
                  ================================================= */}

              <motion.article
                className="course-description"
                {...revealOnScroll}
              >

                <h2>
                  Descripción del curso
                </h2>


                <p>
                  {curso.descripcion_larga || curso.description}
                </p>


                <motion.div
                  className="audience-card"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >

                  <img
                    src="/assets/images/icon/meta-icon.svg"
                    alt=""
                  />


                  <div>

                    <h3>
                      Dirigido a
                    </h3>

                    <ul>
                      {publicosDirigidos.map((publico, index) => (
                        <li key={index}>
                          {publico}
                        </li>
                      ))}
                    </ul>

                  </div>

                </motion.div>

              </motion.article>


              {/* =================================================
                  QUÉ APRENDERÁS
                  ================================================= */}

              <motion.article
                className="learning-section"
                {...revealOnScroll}
              >

                <h2>
                  ¿Qué aprenderás?
                </h2>


                <ul className="learning-grid">

                  {curso.que_aprenderas?.map(
                    (aprendizaje, index) => (

                      <li key={index}>
                        {aprendizaje}
                      </li>

                    )
                  )}

                </ul>

              </motion.article>


              {/* =================================================
                  MÓDULOS
                  ================================================= */}

              <motion.article
                className="modules-section"
                {...revealOnScroll}
              >

                <h2>
                  Contenido del curso
                </h2>


                <div className="module-list">

                  {curso.modulos?.map(
                    (modulo, index) => (

                      <div
                        className="module-row"
                        key={index}
                      >

                        <span>

                          <strong>
                            {String(
                              modulo.numero || index + 1
                            ).padStart(2, "0")}
                          </strong>

                          Módulo{" "}
                          {modulo.numero || index + 1}:{" "}
                          {modulo.titulo}

                        </span>


                        <span>

                          <b aria-hidden="true">
                            ◷
                          </b>

                          {" "}
                          {modulo.horas} horas

                          {" "}

                          <i></i>

                          {" "}

                          {modulo.clases}{" "}
                          {modulo.clases === 1
                            ? "clase"
                            : "clases"}

                        </span>

                      </div>

                    )
                  )}

                </div>

              </motion.article>


            </div>


            {/* ===================================================
                INFORMACIÓN DEL CURSO
                =================================================== */}

            <motion.aside
              className="sidebar"
              {...revealOnScroll}
            >


              <article className="info-card">

                <h2>
                  Información del curso
                </h2>


                <div className="info-list">


                  <div className="info-item">

                    <span>

                      <iconify-icon
                        class="course-info-icon"
                        icon="mdi:clock-outline"
                      ></iconify-icon>

                      Duración

                    </span>

                    <strong>
                      {curso.hours} horas
                    </strong>

                  </div>


                  <div className="info-item">

                    <span>

                      <iconify-icon
                        class="course-info-icon"
                        icon="mdi:laptop"
                      ></iconify-icon>

                      Modalidad

                    </span>

                    <strong>
                      {curso.modality}
                    </strong>

                  </div>


                  <div className="info-item">

                    <span>

                      <iconify-icon
                        class="course-info-icon"
                        icon="mdi:signal-cellular-3"
                      ></iconify-icon>

                      Nivel

                    </span>

                    <strong>
                      {curso.level}
                    </strong>

                  </div>


                  <div className="info-item">

                    <span>

                      <iconify-icon
                        class="course-info-icon"
                        icon="mdi:certificate-outline"
                      ></iconify-icon>

                      Certificación

                    </span>

                    <strong>
                      {curso.certificado ? "Sí" : "No"}
                    </strong>

                  </div>


                  <div className="info-item">

                    <span>

                      <iconify-icon
                        class="course-info-icon"
                        icon="mdi:translate"
                      ></iconify-icon>

                      Idioma

                    </span>

                    <strong>
                      {curso.idioma || "Español"}
                    </strong>

                  </div>


                  <div className="info-item">

                    <span>

                      <iconify-icon
                        class="course-info-icon"
                        icon="mdi:view-grid-outline"
                      ></iconify-icon>

                      Categoría

                    </span>

                    <strong>
                      {curso.category}
                    </strong>

                  </div>


                  <div className="info-item">

                    <span>

                      <iconify-icon
                        class="course-info-icon"
                        icon="mdi:history"
                      ></iconify-icon>

                      Última actualización

                    </span>

                    <strong>
                      {fechaActualizacion}
                    </strong>

                  </div>


                </div>

              </article>


              {/* =================================================
                  CERTIFICADO
                  ================================================= */}

              {curso.certificado && (

                <article className="certificate-card">

                  <img
                    src="/assets/images/icon/certificado-icon.svg"
                    alt=""
                  />

                  <div>

                    <h2>
                      Certificado digital
                    </h2>

                    <p>
                      Al finalizar el curso recibirás un
                      certificado emitido por Talentia.
                    </p>

                  </div>

                </article>

              )}


            </motion.aside>

          </div>

        </section>


        {/* =====================================================
            CONTACTO
            ===================================================== */}

        <motion.section
          className="contact-section"
          id="contacto"
          {...revealOnScroll}
        >

          <div className="container">


            <div className="contact-header">

              <h2>
                Conecta con Talentia
              </h2>

              <div className="contact-underline"></div>

            </div>


            <div className="forms-grid">
              <RegistroForm tipo="empresa" />
              <RegistroForm tipo="alumno" cursoSeleccionado={curso} />
            </div>

          </div>

        </motion.section>


      </main>


      <Footer />

    </>

  );

}


export default DetalleCurso;
