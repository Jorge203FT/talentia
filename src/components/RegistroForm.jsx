import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


import {
  registrarAlumno,
  registrarEmpresa
} from "../formularioService";


const formularios = {
  empresa: {
    cardClass: "company-card",
    icon: "lucide:building-2",
    title: (
      <>
        ¿Tu empresa necesita
        <br />
        capacitar a su equipo?
      </>
    ),
    description:
      "Programas de formación a medida para potenciar el talento de tu organización.",
    fields: [
      {
        name: "ruc",
        type: "text",
        placeholder: "RUC de la empresa"
      },
      {
        name: "empresa",
        type: "text",
        placeholder: "Nombre de la empresa"
      },
      {
        name: "contacto",
        type: "text",
        placeholder: "Nombre de contacto"
      },
      {
        name: "email",
        type: "email",
        placeholder: "Correo corporativo"
      },
      {
        name: "telefono",
        type: "text",
        placeholder: "Teléfono"
      }
    ],
    selectPlaceholder: "¿En qué está interesado?",
    options: [
      "Capacitación corporativa",
      "Programa personalizado"
    ],
    buttonClass: "btn btn-primary",
    buttonLabel: "Solicitar información"
  },

  alumno: {
    cardClass: "professional-card",
    icon: "lucide:graduation-cap",
    title: (
      <>
        ¿Quieres seguir
        <br />
        aprendiendo?
      </>
    ),
    description:
      "Regístrate y forma parte de nuestra comunidad. Accede a cursos, programas y novedades.",
    fields: [
      {
        name: "nombre",
        type: "text",
        placeholder: "Nombre completo"
      },
      {
        name: "dni",
        type: "text",
        placeholder: "DNI"
      },
      {
        name: "email",
        type: "email",
        placeholder: "Correo electrónico"
      },
      {
        name: "telefono",
        type: "text",
        placeholder: "Teléfono"
      }
    ],
    selectPlaceholder: "¿Qué te interesa?",
    options: [
      "Certificados",
      "Capacitaciones"
    ],
    buttonClass: "btn btn-dark",
    buttonLabel: "Solicitar Cuenta"
  }
};


function RegistroForm({tipo, cursoSeleccionado = null}) {

  const formulario = formularios[tipo];
  const [interesSeleccionado, setInteresSeleccionado] = useState("");
  const [cursos, setCursos] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [modal, setModal] = useState({
    abierto: false,
    tipo: "",
    titulo: "",
    mensaje: ""
  });

  if (!formulario) return null;

  useEffect(() => {
    if (tipo !== "alumno") return;
    async function cargarCursos() {
      try {
        const snapshot = await getDocs(collection(db, "Cursos"));
        const datosCursos =
          snapshot.docs.map((documento) => ({
            id: documento.id,
            ...documento.data()
          }));

        setCursos(datosCursos);
      } catch (error) {
        console.error(
          "Error al obtener cursos para el formulario:",
          error
        );
      }
    }
    cargarCursos();
  }, [tipo]);

  useEffect(() => {
    if (tipo === "alumno" && cursoSeleccionado) {
      setInteresSeleccionado(
        cursoSeleccionado.title
      );
    } else {
      setInteresSeleccionado("");
    }
  }, [
    tipo,
    cursoSeleccionado?.id,
    cursoSeleccionado?.title
  ]);

  function cerrarModal() {
    setModal({
      abierto: false,
      tipo: "",
      titulo: "",
      mensaje: ""
    });
  }


  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    setEnviando(true);

    try {
      const formData = new FormData(form);
      const datos = Object.fromEntries(
        formData.entries()
      );

      if (tipo === "alumno") {
        await registrarAlumno(datos);
        form.reset();
        setInteresSeleccionado(
          cursoSeleccionado
            ? cursoSeleccionado.title
            : ""
        );
        setModal({
          abierto: true,
          tipo: "success",
          titulo: "¡Registro realizado!",
          mensaje:
            "Tu registro se realizó correctamente. Gracias por confiar en Talentia."
        });

      } else if (tipo === "empresa") {
        await registrarEmpresa(datos);
        form.reset();
        setInteresSeleccionado("");
        setModal({
          abierto: true,
          tipo: "success",
          titulo: "¡Solicitud enviada!",
          mensaje:
            "Tu solicitud fue registrada correctamente. Pronto nos pondremos en contacto contigo."
        });
      }

    } catch (error) {
      console.error(
        "Error al registrar formulario:",
        error
      );

      setModal({
        abierto: true,
        tipo: "error",
        titulo: "No se pudo completar el registro",
        mensaje:
          "Ocurrió un problema al enviar la información. Inténtalo nuevamente."
      });

    } finally {
      setEnviando(false);
    }
  }

  return (
  <>
    <motion.article
      className={`form-card ${formulario.cardClass}`}
      whileHover={{ scale: 1.01 }}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
    >

      <div className="form-card-header">

        <div className="form-icon">
          <iconify-icon
            icon={formulario.icon}
          ></iconify-icon>
        </div>

        <div>
          <h3>{formulario.title}</h3>
          <p>{formulario.description}</p>
        </div>

      </div>


      <div className="form-content">

        <form onSubmit={handleSubmit}>

          {formulario.fields.map((field) => (

            <input
              key={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required
            />

          ))}


          <select
            name="interes"
            value={interesSeleccionado}
            onChange={(event) =>
              setInteresSeleccionado(
                event.target.value
              )
            }
            required
          >

            <option value="" disabled>
              {formulario.selectPlaceholder}
            </option>

            {formulario.options.map((option) => (

              <option
                key={option}
                value={option}
              >
                {option}
              </option>

            ))}

            {tipo === "alumno" &&
              cursos.map((curso) => (

                <option
                  key={curso.id}
                  value={curso.title}
                >
                  {curso.title}
                </option>

              ))
            }

          </select>


          <button
            className={formulario.buttonClass}
            type="submit"
            disabled={enviando}
          >
            {enviando
              ? "Enviando..."
              : formulario.buttonLabel}
          </button>

        </form>

      </div>

      {modal.abierto && (
        <motion.div
          className="form-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="form-modal-title"

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}

          onClick={(event) => {
            if (event.target === event.currentTarget) {
              cerrarModal();
            }
          }}
        >
          <motion.div
            className={`form-modal ${
              modal.tipo === "error"
                ? "form-modal-error"
                : "form-modal-success"
            }`}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut"
            }}
          >
            <div className="form-modal-icon">
              <iconify-icon
                icon={
                  modal.tipo === "error"
                    ? "lucide:x-circle"
                    : "lucide:circle-check"
                }
              ></iconify-icon>
            </div>

            <h3 id="form-modal-title">
              {modal.titulo}
            </h3>

            <p>{modal.mensaje}</p>

            <button
              type="button"
              className="btn btn-primary form-modal-button"
              onClick={cerrarModal}
            >
              Aceptar
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.article>

  </>
);
}

export default RegistroForm;
