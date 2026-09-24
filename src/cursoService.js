import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

let cursosCache = null;
let cursosEnCarga = null;
const cursosPorId = new Map();
const cursosEnCargaPorId = new Map();

export function obtenerCursoEnCache(id) {
  return cursosPorId.get(id) ?? null;
}

export function obtenerCursos() {
  if (cursosCache) return Promise.resolve(cursosCache);

  if (!cursosEnCarga) {
    const inicio = performance.now();
    cursosEnCarga = getDocs(collection(db, "Cursos"))
      .then((snapshot) => snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data()
      })))
      .then((cursos) => {
        cursosCache = cursos;
        cursos.forEach((curso) => cursosPorId.set(curso.id, curso));
        return cursos;
      })
      .finally(() => {
        if (import.meta.env.DEV) {
          console.log(`Cargar lista de cursos: ${(performance.now() - inicio).toFixed(0)} ms`);
        }
        
        cursosEnCarga = null;
      });
  }

  return cursosEnCarga;
}

export function consultarCurso(id) {
  if (!cursosEnCargaPorId.has(id)) {
    const inicio = performance.now();
    const peticion = getDoc(doc(db, "Cursos", id))
      .then((documento) => {
        if (!documento.exists()) {
          cursosPorId.delete(id);
          if (cursosCache) cursosCache = cursosCache.filter((curso) => curso.id !== id);
          return null;
        }

        const curso = { id: documento.id, ...documento.data() };
        cursosPorId.set(id, curso);
        if (cursosCache) {
          cursosCache = cursosCache.map((actual) => actual.id === id ? curso : actual);
        }
        return curso;
      })
      .finally(() => {
        if (import.meta.env.DEV) {
          console.log(`Cargar curso ${id}: ${(performance.now() - inicio).toFixed(0)} ms`);
        }


        cursosEnCargaPorId.delete(id);
      });

    cursosEnCargaPorId.set(id, peticion);
  }

  return cursosEnCargaPorId.get(id);
}
