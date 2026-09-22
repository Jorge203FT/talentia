import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function generarId(nombre, identificador) {
  return `${nombre}-${identificador}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


export async function registrarAlumno(datos) {
  const id = generarId(
    datos.nombre,
    datos.dni
  );

  await setDoc(
    doc(db, "FormularioAlumno", id),
    {
      nombre: datos.nombre,
      dni: datos.dni,
      email: datos.email,
      telefono: datos.telefono,
      interes: datos.interes,
      fecha_registro: serverTimestamp()
    }
  );

  return id;
}


export async function registrarEmpresa(datos) {
  const id = generarId(
    datos.empresa,
    datos.ruc
  );

  await setDoc(
    doc(db, "FormularioEmpresa", id),
    {
      ruc: datos.ruc,
      empresa: datos.empresa,
      contacto: datos.contacto,
      email: datos.email,
      telefono: datos.telefono,
      interes: datos.interes,
      fecha_registro: serverTimestamp()
    }
  );

  return id;
}