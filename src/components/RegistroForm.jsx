import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { obtenerCursos } from "../cursoService.js";


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
        placeholder: "RUC de la empresa",
        minLength: 11,
        maxLength: 11,
        inputMode: "numeric",
        pattern: "[0-9]{11}",
        title: "El RUC debe tener exactamente 11 dígitos.",
        onlyNumbers: true
      },
      {
        name: "empresa",
        type: "text",
        placeholder: "Nombre de la empresa",
        minLength: 2,
        maxLength: 120,
        title: "Ingresa el nombre de la empresa."
      },
      {
        name: "contacto",
        type: "text",
        placeholder: "Nombre de contacto",
        minLength: 3,
        maxLength: 80,
        pattern: "[A-Za-zÁÉÍÓÚáéíóúÑñÜü\\s'-]{3,80}",
        title: "Ingresa un nombre de contacto válido."
      },
      {
        name: "email",
        type: "email",
        placeholder: "Correo corporativo",
        minLength: 6,
        maxLength: 120,
        title: "Ingresa un correo electrónico válido."
      },
      {
        name: "telefono",
        type: "text",
        placeholder: "Teléfono",
        minLength: 9,
        maxLength: 9,
        inputMode: "numeric",
        pattern: "[0-9]{9}",
        title: "El teléfono debe tener exactamente 9 dígitos.",
        onlyNumbers: true
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
        placeholder: "Nombre completo",
        minLength: 3,
        maxLength: 80,
        pattern: "[A-Za-zÁÉÍÓÚáéíóúÑñÜü\\s'-]{3,80}",
        title: "Ingresa un nombre válido."
      },
      {
        name: "dni",
        type: "text",
        placeholder: "DNI",
        minLength: 8,
        maxLength: 8,
        inputMode: "numeric",
        pattern: "[0-9]{8}",
        title: "El DNI debe tener exactamente 8 dígitos.",
        onlyNumbers: true
      },
      {
        name: "email",
        type: "email",
        placeholder: "Correo electrónico",
        minLength: 6,
        maxLength: 120,
        title: "Ingresa un correo electrónico válido."
      },
      {
        name: "telefono",
        type: "text",
        placeholder: "Teléfono",
        minLength: 9,
        maxLength: 9,
        inputMode: "numeric",
        pattern: "[0-9]{9}",
        title: "El teléfono debe tener exactamente 9 dígitos.",
        onlyNumbers: true
      }
    ],
    selectPlaceholder: "¿Qué te interesa?",
    options: [
      "Certificados",
      "Capacitaciones"
    ],
    buttonClass: "btn btn-dark",
    buttonLabel: "Solicitar información"
  }
};


function RegistroForm({tipo, cursoSeleccionado = null}) {

  const formulario = formularios[tipo];
  const [interesSeleccionado, setInteresSeleccionado] = useState("");
  const [cursos, setCursos] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState({});
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
        const datosCursos = await obtenerCursos();
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

  function validarCampo(field, valor) {
    const valorLimpio = String(valor ?? "").trim();

    if (!valorLimpio) {
      return "Este campo es obligatorio.";
    }

    if (
      field.minLength &&
      valorLimpio.length < field.minLength
    ) {
      if (field.name === "ruc") {
        return "El RUC debe tener exactamente 11 dígitos.";
      }

      if (field.name === "dni") {
        return "El DNI debe tener exactamente 8 dígitos.";
      }

      if (field.name === "telefono") {
        return "El teléfono debe tener exactamente 9 dígitos.";
      }

      return `Debe tener al menos ${field.minLength} caracteres.`;
    }

    if (
      field.maxLength &&
      valorLimpio.length > field.maxLength
    ) {
      return `No puede superar los ${field.maxLength} caracteres.`;
    }

    if (
      field.onlyNumbers &&
      !/^\d+$/.test(valorLimpio)
    ) {
      return "Este campo solo acepta números.";
    }

    if (
      field.pattern &&
      !(new RegExp(`^${field.pattern}$`)).test(valorLimpio)
    ) {
      return field.title || "El formato ingresado no es válido.";
    }

    if (field.type === "email") {
      const correoValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorLimpio);

      if (!correoValido) {
        return "Ingresa un correo electrónico válido.";
      }
    }

    return "";
  }
  
  function validarInteres(valor) {
    if (!valor) {
      return "Selecciona una opción.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const nuevosErrores = {};

    formulario.fields.forEach((field) => {
      const valor = form.elements[field.name]?.value ?? "";

      const error = validarCampo(field, valor);

      if (error) {
        nuevosErrores[field.name] = error;
      }
    });

    const interes = form.elements.interes?.value ?? "";
    const errorInteres = validarInteres(interes);

    if (errorInteres) {
      nuevosErrores.interes = errorInteres;
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      const primerCampoConError =
        Object.keys(nuevosErrores)[0];

      form.elements[primerCampoConError]?.focus();

      return;
    }

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

        <form onSubmit={handleSubmit} noValidate>

          {formulario.fields.map((field) => (
            <div className="form-field" key={field.name}>

              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required
                minLength={field.minLength}
                maxLength={field.maxLength}
                inputMode={field.inputMode}
                pattern={field.pattern}
                title={field.title}
                aria-invalid={Boolean(errores[field.name])}
                aria-describedby={
                  errores[field.name]
                    ? `${field.name}-error`
                    : undefined
                }
                className={
                  errores[field.name]
                    ? "input-error"
                    : ""
                }
                onBlur={(event) => {
                  const error = validarCampo(
                    field,
                    event.currentTarget.value
                  );

                  setErrores((actuales) => ({
                    ...actuales,
                    [field.name]: error
                  }));
                }}
                onInput={(event) => {
                  if (field.onlyNumbers) {
                    event.currentTarget.value =
                      event.currentTarget.value
                        .replace(/\D/g, "")
                        .slice(0, field.maxLength);
                  }

                  const error = validarCampo(
                    field,
                    event.currentTarget.value
                  );

                  setErrores((actuales) => ({
                    ...actuales,
                    [field.name]: error
                  }));
                }}
              />

              {errores[field.name] && (
                <small
                  id={`${field.name}-error`}
                  className="form-field-error"
                >
                  {errores[field.name]}
                </small>
              )}

            </div>
          ))}


          <div className="form-field">

            <select
              name="interes"
              value={interesSeleccionado}
              required
              aria-invalid={Boolean(errores.interes)}
              aria-describedby={
                errores.interes
                  ? "interes-error"
                  : undefined
              }
              className={
                errores.interes
                  ? "input-error"
                  : ""
              }
              onChange={(event) => {
                const valor = event.target.value;

                setInteresSeleccionado(valor);

                setErrores((actuales) => ({
                  ...actuales,
                  interes: validarInteres(valor)
                }));
              }}
              onBlur={(event) => {
                const error = validarInteres(
                  event.target.value
                );

                setErrores((actuales) => ({
                  ...actuales,
                  interes: error
                }));
              }}
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

            {errores.interes && (
              <small
                id="interes-error"
                className="form-field-error"
              >
                {errores.interes}
              </small>
            )}

          </div>


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
