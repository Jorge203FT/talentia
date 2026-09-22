
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/firebase.js";


/* =========================================================
   TARJETAS DE CURSOS
   ========================================================= */

function courseCard(course, compact = false) {

  return `
    <article class="course-card ${compact ? "catalog-card" : "featured-card"}">
      <div class="course-visual">
        <img src="${course.image}" alt="${course.title}" loading="lazy">
      </div>
      <div class="course-body">

        ${compact ? `<span class="course-tag">${course.category}</span>` : ""}
        <h3>${course.title}</h3>
        ${compact ? `<p class="body">${course.description}</p>` : ""}
        <p class="course-meta">
          ${course.hours} horas · ${course.modality}
        </p>
        <a
          class="btn btn-primary course-action"
          href="/curso/${course.id}"
        >
          Ver curso
        </a>

      </div>
    </article>
  `;
}


/* =========================================================
   CURSOS DESTACADOS
   ========================================================= */

export async function renderFeaturedCourses() {
  const container = document.querySelector("[data-featured-courses]");

  if (!container) return;

  const carousel = container.closest("[data-featured-carousel]");
  const viewport = carousel?.querySelector("[data-carousel-viewport]");
  const previousButton = carousel?.querySelector("[data-carousel-prev]");
  const nextButton = carousel?.querySelector("[data-carousel-next]");

  try {

    const snapshot = await getDocs(collection(db, "Cursos"));

    const firebaseCourses =
      snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data()
      }));


    container.innerHTML =
      firebaseCourses
        .map((course) =>
          courseCard(course)
        )
        .join("");

    if (viewport && previousButton && nextButton) {
      viewport.style.scrollBehavior = "auto";
      viewport.scrollLeft = 0;
      viewport.style.removeProperty("scroll-behavior");

      const getCourseStep = () => {
        const firstCourse =
          container.querySelector(".course-card");

        if (!firstCourse) return 0;

        const styles =
          window.getComputedStyle(container);

        const gap =
          Number.parseFloat(styles.columnGap) || 0;

        return firstCourse.getBoundingClientRect().width + gap;
      };

      const updateControls = () => {
        const maximumScroll =
          viewport.scrollWidth - viewport.clientWidth;

        const isAtStart =
          viewport.scrollLeft <= 1;

        const isAtEnd =
          maximumScroll <= 1 ||
          viewport.scrollLeft >= maximumScroll - 1;

        previousButton.toggleAttribute(
          "disabled",
          isAtStart
        );

        nextButton.toggleAttribute(
          "disabled",
          isAtEnd
        );
      };

      previousButton.onclick = () => {
        viewport.scrollBy({
          left: -getCourseStep(),
          behavior: "smooth"
        });
      };

      nextButton.onclick = () => {
        viewport.scrollBy({
          left: getCourseStep(),
          behavior: "smooth"
        });
      };

      viewport.onscroll = updateControls;
      updateControls();
    }


    console.log(
      "Cursos destacados obtenidos desde Firebase:",
      firebaseCourses
    );


  } catch (error) {

    console.error(
      "Error al obtener cursos destacados:",
      error
    );

  }

}

/* =========================================================
   CATÁLOGO + FILTROS + PAGINACIÓN
   ========================================================= */

export async function renderCatalog() {

  const container = document.querySelector("[data-catalog]");
  const search = document.querySelector("[data-search]");
  const category = document.querySelector("[data-category]");
  const service = document.querySelector("[data-service]");
  const modality = document.querySelector("[data-modality]");
  const duration = document.querySelector("[data-duration]");
  const level = document.querySelector("[data-level]");
  const pagination = document.querySelector("[data-pagination]");

  if (!container) return;


  /* =======================================================
     OBTENER CURSOS DESDE FIREBASE
     ======================================================= */

  let firebaseCourses = [];

  try {

    const snapshot =
      await getDocs(collection(db, "Cursos"));

    firebaseCourses =
      snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data()
      }));

  } catch (error) {

    console.error(
      "Error al obtener cursos desde Firebase:",
      error
    );

    container.innerHTML =
      "<p>No se pudieron cargar los cursos.</p>";

    return;
  }

  function getUniqueValues(field) {
    return [
      ...new Set(
        firebaseCourses
          .map((course) => course[field])
          .filter(
            (value) =>
              value !== undefined &&
              value !== null &&
              value !== ""
          )
      )
    ];
  }

  function populateSelect(select, defaultLabel, values, formatValue = (value) => value) {

    if (!select) return;

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "all";
    defaultOption.textContent = defaultLabel;
    select.appendChild(defaultOption);

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = String(value);
      option.textContent = formatValue(value);
      select.appendChild(option);
    });

  }

  populateSelect(modality, "Modalidad", getUniqueValues("modality"));
  populateSelect(duration, "Duración", getUniqueValues("hours").sort((a, b) => Number(a) - Number(b)), (hours) => `${hours} horas`);
  populateSelect(level, "Nivel", getUniqueValues("level"));

  function updateCategoryOptions() {
    const serviceValue = service?.value || "all";

    const coursesForCategory = serviceValue === "all"
        ? firebaseCourses
        : firebaseCourses.filter(
            (course) =>
              course.servicio === serviceValue
          );

    const categories = [
      ...new Set(
        coursesForCategory
          .map((course) => course.category)
          .filter(
            (value) =>
              value !== undefined &&
              value !== null &&
              value !== ""
          )
      )
    ].sort((a, b) =>
      a.localeCompare(b)
    );

    populateSelect(category, "Categoría", categories);
  }

  updateCategoryOptions();

  /* =======================================================
     CONFIGURACIÓN DE PAGINACIÓN
     ======================================================= */

  const coursesPerPage = 9;

  let currentPage = 1;


  /* =======================================================
     DIBUJAR CURSOS
     ======================================================= */

  function draw() {

    const query =
      (search?.value || "")
        .toLowerCase()
        .trim();

    const categoryValue = category?.value || "all";
    const serviceValue = service?.value || "all";
    const modalityValue = modality?.value || "all";
    const durationValue = duration?.value || "all";
    const levelValue = level?.value || "all";

    /* =====================================================
       FILTRAR CURSOS
       ===================================================== */

    const filtered =
      firebaseCourses.filter((course) => {

        const matchesQuery = [
          course.title,
          course.description,
          course.category
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);


        const matchesCategory =
          categoryValue === "all" ||
          course.category === categoryValue;


        const matchesDuration = durationValue === "all" || String(course.hours) === String(durationValue);
        const matchesService = serviceValue === "all" || course.servicio === serviceValue;
        const matchesModality = modalityValue === "all" || course.modality === modalityValue;
        const matchesLevel = levelValue === "all" || course.level === levelValue;

        return (matchesQuery && matchesCategory && matchesService && matchesModality && matchesDuration && matchesLevel);
      });


    /* =====================================================
       TOTAL DE PÁGINAS
       ===================================================== */

    const totalPages = Math.ceil(filtered.length / coursesPerPage);

    /* =====================================================
       CONTROL DE PÁGINA ACTUAL
       ===================================================== */

    if (currentPage > totalPages) {
      currentPage = Math.max(totalPages, 1);
    }


    /* =====================================================
       OBTENER CURSOS DE LA PÁGINA ACTUAL
       ===================================================== */

    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const coursesToShow = filtered.slice(start, end);

    /* =====================================================
       MOSTRAR LAS TARJETAS
       ===================================================== */

    container.innerHTML =
      coursesToShow
        .map((course) =>
          courseCard(course, true)
        )
        .join("");

    /* =====================================================
       ACTUALIZAR CONTADOR
       ===================================================== */

    const resultCount =
      document.querySelector("[data-result-count]");

    if (resultCount) {
      resultCount.textContent = `${filtered.length} cursos encontrados`;
    }


    /* =====================================================
       CREAR PAGINACIÓN
       ===================================================== */

    if (pagination) {
      pagination.innerHTML = "";

      if (currentPage > 1) {
        const prevButton = document.createElement("button");
        prevButton.type = "button";
        prevButton.textContent = "‹";
        prevButton.setAttribute(
          "aria-label",
          "Página anterior"
        );

        prevButton.addEventListener(
          "click",
          () => {
            currentPage--;
            draw();
            container.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        );

        pagination.appendChild(prevButton);
      }

      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = page;

        /* Página seleccionada */
        if (page === currentPage) {
          button.classList.add("active");
        }


        /* Al hacer clic */
        button.addEventListener(
          "click",
          () => {
            currentPage = page;
            draw();
            container.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        );

        pagination.appendChild(button);
      }

      if (currentPage < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.textContent = "›";
        nextButton.setAttribute(
          "aria-label",
          "Página siguiente"
        );
        nextButton.addEventListener(
          "click",
          () => {
            currentPage++;
            draw();
            container.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        );

        pagination.appendChild(nextButton);

      }
    }
  }


  /* =======================================================
     EVENTOS DE LOS FILTROS
     ======================================================= */

  search?.addEventListener("input",() => {
      currentPage = 1;
      draw();
    }
  );

  [category, modality, duration, level].forEach((item) => {

    item?.addEventListener(
      "change",
      () => {
        currentPage = 1;
        draw();
      }
    );
  });


  service?.addEventListener(
    "change",
    () => {

      updateCategoryOptions();

      category.value = "all";

      currentPage = 1;

      draw();

    }
  );
  /* Primera carga */

  draw();

}

/* =========================================================
   FORMULARIO
   ========================================================= */

async function submitLead(form) {

  const data =
    Object.fromEntries(
      new FormData(form).entries()
    );


  const message =
    form.querySelector("[data-message]");


  try {

    const response =
      await fetch("/api/leads", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(data)

      });


    if (!response.ok)
      throw new Error(
        "No se pudo registrar"
      );


    form.reset();

    message.textContent =
      "Listo. Te contactaremos pronto.";


  } catch {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "talentiaLeads"
        ) || "[]"
      );


    saved.push({

      ...data,

      createdAt:
        new Date().toISOString()

    });


    localStorage.setItem(
      "talentiaLeads",
      JSON.stringify(saved)
    );


    form.reset();


    message.textContent =
      "Listo. Guardamos tu solicitud localmente para la demo.";

  }

}


/* =========================================================
   FORMULARIOS
   ========================================================= */

export function bindForms() {

  document
    .querySelectorAll("[data-lead-form]")
    .forEach((form) => {

      form.addEventListener(
        "submit",
        (event) => {

          event.preventDefault();

          submitLead(form);

        }
      );

    });

}


/* =========================================================
   MENÚ RESPONSIVE
   ========================================================= */

const menuToggle =
  document.querySelector("[data-menu-toggle]");

const mobileNavigation =
  document.querySelector("#mobile-navigation");


if (menuToggle && mobileNavigation) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        mobileNavigation.classList.toggle(
          "open"
        );


      menuToggle.classList.toggle(
        "active",
        isOpen
      );


      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );


      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Cerrar menú"
          : "Abrir menú"
      );

    }
  );


  mobileNavigation
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          mobileNavigation
            .classList.remove("open");


          menuToggle
            .classList.remove("active");


          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );


          menuToggle.setAttribute(
            "aria-label",
            "Abrir menú"
          );

        }
      );

    });


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 860) {

        mobileNavigation
          .classList.remove("open");


        menuToggle
          .classList.remove("active");


        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );


        menuToggle.setAttribute(
          "aria-label",
          "Abrir menú"
        );

      }

    }
  );

}