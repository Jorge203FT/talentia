# Talentia Web

Sitio web de Talentia desarrollado como una interfaz pública de formación y capacitación profesional. El proyecto comenzó como una implementación de HTML, CSS y JavaScript y evolucionó hacia React + Vite, manteniendo el CSS existente y reutilizando componentes para evitar duplicación de código.

Actualmente el proyecto cuenta con integración de **Cloud Firestore** para obtener los cursos y registrar los formularios de alumnos y empresas.

> **Estado actual:** interfaz funcional con React, React Router, Firebase/Cloud Firestore, componentes reutilizables y datos de cursos cargados en Firestore. Las animaciones visuales adicionales quedan como mejora posterior.

---

## 1. Objetivo del proyecto

Talentia Web busca presentar:

- La oferta de cursos y programas de formación.
- El catálogo de cursos con filtros y paginación.
- El detalle completo de cada curso.
- Formularios de registro para alumnos y solicitudes de capacitación empresarial.
- Un header y footer reutilizables mediante React.

La información de cursos ya no depende del arreglo local para la visualización principal: la aplicación consulta la colección `Cursos` de Cloud Firestore.

---

## 2. Tecnologías utilizadas

- **React** – construcción de las interfaces y componentes reutilizables.
- **Vite** – desarrollo y compilación del proyecto React.
- **React Router** – navegación entre Home, catálogo y detalle de curso.
- **JavaScript (ES Modules)** – lógica del proyecto.
- **CSS** – estilos, responsive y presentación visual.
- **Firebase** – conexión con los servicios de Firebase.
- **Cloud Firestore** – almacenamiento de cursos y registros de formularios.
- **Iconify** – iconos utilizados por las interfaces.

Dependencias principales declaradas en `package.json`:

```text
react
react-dom
react-router-dom
firebase
vite
@vitejs/plugin-react
```

---

## 3. Estructura actual del proyecto

```text
TALENTIA-WEB/
│
├── css/
│   ├── styles.css
│   ├── cursos.css
│   └── detalleCurso.css
│
├── js/
│   └── app.js
│
├── public/
│   └── assets/
│       └── images/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── RegistroForm.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Cursos.jsx
│   │   └── DetalleCurso.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── firebase.js
│   ├── formularioService.js
│   ├── courses.js
│   └── subirCursosFirebase.js
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 4. Migración a React

La migración a React se realizó para evitar duplicación, especialmente en elementos presentes en varias interfaces.

### Componentes reutilizables

`Header.jsx` y `Footer.jsx` son componentes compartidos por las páginas:

```text
Home.jsx
Cursos.jsx
DetalleCurso.jsx
        ↓
   Header / Footer
```

También se creó `RegistroForm.jsx` para reutilizar los formularios en Home y DetalleCurso.

La migración no busca eliminar toda la estructura anterior de JavaScript. `app.js` permanece porque todavía concentra funcionalidades que forman parte del proyecto actual.

---

## 5. Rutas de la aplicación

Las rutas están definidas en `src/App.jsx` mediante React Router:

```text
/                         → Home
/cursos                   → Catálogo de cursos
/curso/:id                → Detalle del curso seleccionado
```

Ejemplo:

```text
/curso/business-intelligence
```

El valor de `:id` corresponde al ID del documento del curso en Firestore.

---

## 6. Cloud Firestore

Firebase se inicializa en:

```text
src/firebase.js
```

La instancia de Firestore se exporta mediante:

```js
export { app, analytics, db };
```

La base de datos utilizada es Cloud Firestore.

### Colección de cursos

```text
Cursos
```

Cada documento utiliza como ID el identificador del curso. Ejemplos:

```text
business-intelligence
gestion-talento-humano
marketing-digital-empresas
excel-empresarial
transformacion-digital
```

Actualmente existen **13 cursos** en la fuente local utilizada para la carga inicial y en la colección de Firestore.

### Principales campos de un curso

```text
id                  → ID del documento
category            → Categoría
title               → Título
description         → Descripción corta
descripcion_larga   → Descripción completa
hours               → Horas
modality             → Modalidad
level                → Nivel
image                → Imagen principal
certificado         → Si tiene certificación
idioma              → Idioma
fecha_registro      → Fecha de registro
fecha_actualizacion → Fecha de actualización
dirigido_a          → Público objetivo
que_aprenderas[]    → Resultados de aprendizaje
cantidad_modulos    → Cantidad indicada de módulos
modulos[]           → Módulos del curso
docente{}           → Datos del docente
```

La estructura de `docente` contiene:

```text
nombre
especialidad
descripcion
foto
experiencia[]
```

Cada elemento de `modulos[]` contiene:

```text
numero
titulo
horas
clases
```

---

## 7. Flujo de cursos

### Home

`js/app.js` consulta Firestore y obtiene los cursos destacados desde:

```js
getDocs(collection(db, "Cursos"))
```

Actualmente se muestran los primeros 4 cursos como cursos destacados.

### Cursos

`Cursos.jsx` continúa utilizando `renderCatalog()` de `app.js`.

El catálogo:

- Obtiene los cursos desde Firestore.
- Muestra tarjetas.
- Permite búsqueda.
- Permite filtrar por categoría.
- Permite filtrar por duración.
- Tiene paginación de 9 cursos por página.
- Genera enlaces hacia `/curso/:id`.

Los filtros de modalidad y nivel están presentes en la interfaz, pero la lógica actual de `app.js` todavía no los aplica.

### Detalle de curso

`DetalleCurso.jsx` consulta directamente el documento solicitado:

```text
/curso/:id
   ↓
useParams()
   ↓
doc(db, "Cursos", id)
   ↓
getDoc()
```

La interfaz utiliza los datos de Firestore para mostrar:

- Breadcrumb.
- Categoría.
- Título.
- Descripción corta.
- Imagen.
- Horas.
- Modalidad.
- Nivel.
- Certificación.
- Descripción larga.
- Público objetivo.
- ¿Qué aprenderás?
- Módulos y clases.
- Docente.
- Experiencia del docente.
- Idioma.
- Fecha de actualización.

La calificación `4.8 (320 valoraciones)` permanece estática porque estos campos todavía no forman parte de los datos actuales de Firestore.

---

## 8. `courses.js` y carga inicial a Firebase

El archivo:

```text
src/courses.js
```

conserva los datos completos de los 13 cursos y funciona como fuente local para la carga inicial.

El archivo:

```text
src/subirCursosFirebase.js
```

utiliza `setDoc()` para crear/actualizar los documentos de la colección `Cursos` usando como ID el `id` de cada curso.

Flujo:

```text
src/courses.js
      ↓
src/subirCursosFirebase.js
      ↓
Cloud Firestore / Cursos
```

Una vez que Firestore es la fuente principal para la aplicación, `courses.js` no participa en la consulta normal del catálogo; se conserva para la carga inicial y mantenimiento de datos de demostración.

---

## 9. Formularios reutilizables

Para evitar duplicar el código de los formularios presentes en Home y DetalleCurso, se creó:

```text
src/components/RegistroForm.jsx
```

El componente recibe el tipo de formulario:

```jsx
<RegistroForm tipo="empresa" />
```

```jsx
<RegistroForm tipo="alumno" />
```

De esta forma, el mismo componente se reutiliza en ambas páginas.

### Flujo de registro

```text
Home / DetalleCurso
        ↓
RegistroForm.jsx
        ↓
formularioService.js
        ↓
Cloud Firestore
```

---

## 10. Colecciones de formularios

### FormularioAlumno

Colección:

```text
FormularioAlumno
```

Campos registrados:

```text
nombre       → string
dni          → string
email        → string
telefono     → string
interes      → string
fecha_registro → timestamp
```

El ID del documento se genera a partir de:

```text
nombre + DNI
```

Ejemplo:

```text
angie-xiomara-73451280
```

### FormularioEmpresa

Colección:

```text
FormularioEmpresa
```

Campos registrados:

```text
ruc          → string
empresa      → string
contacto     → string
email        → string
telefono     → string
interes      → string
fecha_registro → timestamp
```

El ID del documento se genera a partir de:

```text
empresa + RUC
```

Ejemplo:

```text
talentum-1234567890
```

El ID personalizado se utiliza para que los registros sean más fáciles de identificar que los IDs automáticos generados por `addDoc()`.

---

## 11. `formularioService.js`

La lógica de persistencia de los formularios está centralizada en:

```text
src/formularioService.js
```

Funciones disponibles:

```js
registrarAlumno(datos)
registrarEmpresa(datos)
```

El servicio utiliza `setDoc()` para guardar los documentos con IDs legibles y `serverTimestamp()` para registrar la fecha desde Firestore.

La ventaja de separar esta lógica es que `RegistroForm.jsx` se encarga de la interfaz y el servicio se encarga de la persistencia.

---

## 12. Reglas actuales de Firestore

La configuración utilizada durante el desarrollo permite consultar cursos y crear registros de formularios, pero restringe la lectura y modificación de los registros enviados desde el cliente.

Esquema utilizado:

```text
Cursos
  read: true
  write: false

FormularioAlumno
  create: true
  read: false
  update: false
  delete: false

FormularioEmpresa
  create: true
  read: false
  update: false
  delete: false
```

Estas reglas son apropiadas para la etapa de desarrollo actual, pero deberán revisarse y endurecerse antes de publicar el sistema definitivamente, especialmente para validar los datos recibidos y controlar abusos de formularios.

---

## 13. Papel de `app.js`

`js/app.js` **permanece intencionalmente dentro del proyecto**.

Actualmente contiene funcionalidades como:

```text
courseCard()
renderFeaturedCourses()
renderCatalog()
submitLead()
bindForms()
menú responsive
```

El catálogo y los cursos destacados ya obtienen datos de Firestore.

El proyecto no obliga a eliminar `app.js`: se conserva porque todavía administra configuraciones y funcionalidades que forman parte del estado actual del desarrollo.

La lógica de DetalleCurso, en cambio, está implementada directamente en React mediante `DetalleCurso.jsx` y Firestore.

---

## 14. CSS y responsive

Los estilos visuales se mantienen separados por alcance:

```text
css/styles.css        → estilos globales y Home
css/cursos.css        → catálogo
css/detalleCurso.css  → detalle de curso
```

React no reemplaza CSS. El responsive sigue siendo responsabilidad de los archivos CSS.

Iconify continúa utilizándose para los iconos mediante `iconify-icon`.

---

## 15. Formularios y migración desde JavaScript anterior

Antes de crear `RegistroForm.jsx`, los formularios se encontraban repetidos en Home y DetalleCurso.

La solución adoptada fue:

```text
Antes

Home.jsx              DetalleCurso.jsx
   └── formulario        └── formulario

Después

Home.jsx ───────────────┐
                        ↓
                 RegistroForm.jsx
                        ↑
DetalleCurso.jsx ───────┘
```

De esta manera se evita repetir el marcado de los formularios y la futura conexión con Firebase.

---

## 16. Evolución del desarrollo y enfoque SCRUM

El proyecto se ha construido de forma incremental, agregando funcionalidades por etapas.

### Incrementos realizados

```text
1. Diseño inicial del sitio
   ↓
2. Home, catálogo y detalle de cursos
   ↓
3. Responsive y estilos por interfaz
   ↓
4. Migración a React + Vite
   ↓
5. Header y Footer reutilizables
   ↓
6. React Router para navegación
   ↓
7. Integración con Firebase
   ↓
8. Cursos almacenados en Firestore
   ↓
9. Catálogo conectado a Firestore
   ↓
10. Detalle de curso dinámico por ID
    ↓
11. Componente reutilizable de formularios
    ↓
12. Formularios conectados a Firestore
```

Este enfoque corresponde a una construcción incremental por funcionalidad. Los artefactos formales de SCRUM (Product Backlog, Sprint Backlog, Sprint Review y Sprint Retrospective) deben mantenerse en la documentación correspondiente del equipo para poder demostrar formalmente el proceso durante la sustentación.

---

## 17. Ejecución local

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Compilar para producción:

```bash
npm run build
```

Vista previa de la compilación:

```bash
npm run preview
```

---

## 18. Estado actual y siguientes mejoras

### Implementado

- [x] React + Vite.
- [x] React Router.
- [x] Header reutilizable.
- [x] Footer reutilizable.
- [x] Home.
- [x] Catálogo de cursos.
- [x] Detalle dinámico por ID.
- [x] Cloud Firestore.
- [x] 13 cursos cargados en Firestore.
- [x] Formularios reutilizables.
- [x] Registro de alumnos en Firestore.
- [x] Registro de empresas en Firestore.
- [x] IDs legibles para registros.
- [x] Fecha de registro mediante `serverTimestamp()`.

### Pendiente / mejora posterior

- [ ] Agregar animaciones de entrada y hover.
- [ ] Evaluar carrusel para cursos destacados en Home.
- [ ] Conectar filtros de Modalidad y Nivel.
- [ ] Definir almacenamiento de valoraciones/calificaciones de cursos.
- [ ] Revisar y reforzar reglas de seguridad para producción.
- [ ] Integrar posteriormente funcionalidades adicionales del backend que requiera el proyecto.

---

## 19. Consideraciones

- `app.js` se conserva deliberadamente; no debe eliminarse mientras sus funcionalidades sigan siendo necesarias.
- `src/courses.js` y `src/subirCursosFirebase.js` se consideran parte de la carga inicial/mantenimiento de datos de cursos.
- La información mostrada por `DetalleCurso.jsx` proviene del documento correspondiente en Firestore.
- Los formularios comparten un único componente React para evitar duplicación de código.
- Las claves de configuración de Firebase deben gestionarse de acuerdo con la estrategia de despliegue del proyecto antes de una publicación definitiva.

---

## 20. Repositorio

Repositorio del proyecto:

```text
https://github.com/GrayPadilla/Talentia
```
