import Header from "../components/Header";
import Footer from "../components/Footer";
import RegistroForm from "../components/RegistroForm";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, fadeUpItem, cardHover } from "../animations/variants.js";
import AnimatedCounter from "../animations/AnimatedCounter";
import { renderFeaturedCourses } from "../../js/app.js";


function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        renderFeaturedCourses();
    }, []);

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [hash]);

    return (
        <>
            <Header />

            <main>
                <section class="hero" id="inicio">
                    <div class="container hero-content">
                    <h1>Bienvenido a Talentia<br />Centro Formativo</h1>

                    <p>
                        Centro especializado en capacitar profesionales para impulsar su desarrollo y aprendizaje en cada contexto laboral.
                    </p>

                    <div class="header-actions">
                        <a class="btn btn-primary">Comenzar ahora →</a>
                        <a class="btn btn-secondary" href="#contacto">Solicitar Cotización →</a>
                    </div>
                    </div>
                </section>

                <section class="stats-strip">
                    <div class="container stats">

                    <div class="stat">
                        <img
                        class="stat-icon student_icon"
                        src="assets/images/icon/student-icon.svg"
                        alt=""
                        aria-hidden="true" />

                        <div>
                        <AnimatedCounter value={1200} prefix="+" />
                        <span>Estudiantes formados</span>
                        </div>
                    </div>


                    <div class="stat">
                        <img
                        class="stat-icon document_icon"
                        src="assets/images/icon/document-icon.svg"
                        alt=""
                        aria-hidden="true" />
                        
                        <div>
                        <AnimatedCounter value={25} prefix="+" />
                        <span>Cursos y programas</span>
                        </div>
                    </div>


                    <div class="stat">
                        <img
                        class="stat-icon"
                        src="assets/images/icon/happy-icon.svg"
                        alt=""
                        aria-hidden="true" />

                        <div>
                        <AnimatedCounter value={95} suffix="%" />
                        <span>Satisfacción</span>
                        </div>
                    </div>


                    <div class="stat">
                        <img
                        class="stat-icon"
                        src="assets/images/icon/company-icon.svg"
                        alt=""
                        aria-hidden="true" />

                        <div>
                        <AnimatedCounter value={20} prefix="+" />
                        <span>Empresas asociadas</span>
                        </div>
                    </div>

                    </div>
                </section>

                <motion.section 
                className="section"
                id="nosotros"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}>
                    <div class="container split">
                    <div>
                        <h2 class="section-title">¿Por qué elegir Talentia?</h2>
                        <p class="section-subtitle">Somos el centro formativo de Talentum enfocado en el desarrollo de profesionales y organizaciones mediante capacitación especializada.</p>
                        <ul class="check-list">
                        <li>Cursos y programas alineados al mercado actual</li>
                        <li>Metodología práctica y orientada a resultados</li>
                        <li>Docentes especialistas con experiencia real</li>
                        <li>Acompañamiento durante tu aprendizaje</li>
                        </ul>
                    </div>
                    <div class="image-panel" aria-label="Representación visual de aprendizaje profesional"></div>
                    </div>
                </motion.section>

                <motion.section
                className="section"
                id="servicios"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}>
                    <div class="container">
                    <h2 class="section-title">¿Qué ofrecemos en Talentia?</h2>
                    <motion.div 
                    className="offer-grid"
                    variants={staggerContainer}>
                        <motion.article
                        className="offer-card"
                        variants={fadeUpItem}
                        whileHover={cardHover}>
                        <div class="offer-text">
                            <div class="offer-icon">
                            <iconify-icon icon="lucide:building-2"></iconify-icon>
                            </div>
                            <p class="offer-label">Para empresas</p>
                            <h3>Capacitaciones <span>Corporativas</span></h3>
                            <p>Programas diseñados a la medida de tu empresa para potenciar el talento de tus equipos y alcanzar mejores resultados.</p>
                            <ul>
                            <li>Programas personalizados</li>
                            <li>Desarrollo de habilidades clave</li>
                            <li>Modalidad presencial, virtual o híbrida</li>
                            <li>Metodologías centradas en resultados</li>
                            <li>Acompañamiento y evaluación de impacto</li>
                            </ul>
                        </div>
                        <div class="offer-img empresas"></div>
                        </motion.article>
                        <motion.article
                        className="offer-card"
                        variants={fadeUpItem}
                        whileHover={cardHover}>
                        <div class="offer-text">
                            <div class="offer-icon">
                            <div class="offer-icon">
                                <iconify-icon icon="lucide:graduation-cap"></iconify-icon>
                            </div>
                            </div>
                            <p class="offer-label">Para profesionales</p>
                            <h3>Capacitaciones <span>Profesionales</span></h3>
                            <p>Contenido práctico para potenciar tus competencias y abrir nuevas oportunidades.</p>
                            <ul>
                            <li>Contenido práctico y aplicable</li>
                            <li>Docentes especialistas</li>
                            <li>Certificación al finalizar</li>
                            <li>Modalidad online y presencial</li>
                            <li>Desarrollo de competencias para tu futuro</li>
                            </ul>
                        </div>
                        <div class="offer-img profesionales"></div>
                        </motion.article>
                    </motion.div>
                    </div>
                </motion.section>

                <motion.section
                className="section featured-courses-section"
                id="cursos"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}>
                    <div class="container">

                    <div class="section-header featured-courses-header">
                        <div>
                        <h2 class="section-title">Nuestros cursos más destacados</h2>
                        <p class="section-subtitle">Conoce programas diseñados para potenciar tu desarrollo profesional.</p>
                        </div>

                        <a class="btn btn-dark featured-courses-btn" href="Cursos">Ver todos los cursos</a>
                    </div>
                    <div className="featured-carousel" data-featured-carousel>
                        <button
                        className="featured-carousel-control featured-carousel-control-prev"
                        type="button"
                        aria-label="Ver cursos anteriores"
                        data-carousel-prev
                        disabled>
                            <iconify-icon icon="lucide:chevron-left"></iconify-icon>
                        </button>

                        <div className="featured-carousel-viewport" data-carousel-viewport>
                            <div className="courses-grid featured-carousel-track" data-featured-courses></div>
                        </div>

                        <button
                        className="featured-carousel-control featured-carousel-control-next"
                        type="button"
                        aria-label="Ver cursos siguientes"
                        data-carousel-next>
                            <iconify-icon icon="lucide:chevron-right"></iconify-icon>
                        </button>
                    </div>

                    </div>
                </motion.section>

                <section class="section process" id="experiencia">
                    <div class="container">
                    <div class="process-header">
                        <h2>¿Cómo es tu experiencia en Talentia?</h2>
                        <p>Un proceso simple para enfocarte en tu aprendizaje.</p>
                    </div>

                    <motion.div
                    className="steps"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}>

                        <article className="step">
                        <div class="step-icon">
                            <img
                            src="assets/images/icon/explorar-cursos-icon.svg"
                            alt=""
                            aria-hidden="true" />
                        </div>

                        <h3>Explora los cursos</h3>
                        </article>

                        <div className="step-arrow" aria-hidden="true">→</div>


                        <article className="step">
                        <div class="step-icon">
                            <img
                            src="assets/images/icon/inscribete-icon.svg"
                            alt=""
                            aria-hidden="true" />   
                        </div>

                        <h3>Inscríbete</h3>
                        </article>


                        <div className="step-arrow" aria-hidden="true">→</div>

                        <article className="step">
                        <div class="step-icon">
                            <img
                            src="assets/images/icon/aprende-icon.svg"
                            alt=""
                            aria-hidden="true" />
                        </div>

                        <h3>Aprende</h3>
                        </article>

                        <div className="step-arrow" aria-hidden="true">→</div>

                        <article className="step">
                        <div class="step-icon">
                            <img
                            src="assets/images/icon/gorra-certificado-icon.svg"
                            alt=""
                            aria-hidden="true" />
                        </div>

                        <h3>Recibe tu certificado</h3>
                        </article>

                    </motion.div>
                    </div>
                </section>

                <section class="section capacitaciones" id="capacitaciones">
                    <div class="container">

                    <div class="modalities-header">
                        <h2>Modalidades de capacitación</h2>
                        <p>Nos adaptamos a tus necesidades de aprendizaje.</p>
                    </div>

                    <motion.div
                    className="modalities-grid"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}>

                        <motion.article
                        className="modality-card"
                        whileHover={cardHover}>

                        <div class="modality-icon">
                            <img
                            src="assets/images/icon/cursos-online-icon.svg"
                            alt=""
                            aria-hidden="true" /> 
                        </div>
                        <h3>Cursos Online</h3>
                        <p>Estudia desde cualquier lugar</p>

                        </motion.article>


                        <motion.article
                        className="modality-card"
                        whileHover={cardHover}>

                        <div class="modality-icon">
                            <img
                            src="assets/images/icon/cursos-presenciales-icon.svg"
                            alt=""
                            aria-hidden="true" /> 
                        </div>

                        <h3>Cursos Presenciales</h3>
                        <p>Aprendizaje con nuestros expertos</p>

                        </motion.article>


                        <motion.article
                        className="modality-card"
                        whileHover={cardHover}>

                        <div class="modality-icon">
                            <img
                            src="assets/images/icon/capacitaciones-cooporativas-icon.svg"
                            alt=""
                            aria-hidden="true" /> 
                        </div>

                        <h3>Capacitaciones Corporativas</h3>
                        <p>Programas a medida para empresas</p>

                        </motion.article>

                    </motion.div>
                    </div>
                </section>

                <section class="testimonials-section">
                    <div class="container">
                    <div class="testimonials-header">
                        <h2>Lo que dicen nuestros estudiantes</h2>
                        <div class="testimonials-underline"></div>
                    </div>

                    <motion.div
                    className="testimonials"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}>
                        <motion.article
                        className="testimonial"
                        variants={fadeUpItem}
                        whileHover={cardHover}>
                        <div class="testimonial-content">
                            <img class="testimonial-avatar" src="assets/images/estudiante_testimonio_1.png" alt="Valeria Sánchez" />
                            <p class="testimonial-quote">
                            “Los cursos me ayudaron a mejorar mis habilidades profesionales y
                            conseguir nuevas oportunidades.”
                            </p>
                        </div>

                        <div class="testimonial-person">
                            <strong>Valeria Sánchez</strong>
                            <span>Estudiante de Marketing Digital</span>
                        </div>
                        <div class="testimonial-mark">❞</div>
                        </motion.article>

                        <motion.article
                        className="testimonial"
                        variants={fadeUpItem}
                        whileHover={cardHover}>
                        <div class="testimonial-content">
                            <img class="testimonial-avatar" src="assets/images/estudiante_testimonio_2.png" alt="Diego Ramírez" />
                            <p class="testimonial-quote">
                            “Excelente metodología y docentes con mucha experiencia. 100%
                            recomendado.”
                            </p>
                        </div>
                        
                        <div class="testimonial-person">
                            <strong>Diego Ramírez</strong>
                            <span>Estudiante de Desarrollo Web</span>
                        </div>
                        <div class="testimonial-mark">❞</div>
                        </motion.article>

                        <motion.article
                        className="testimonial"
                        variants={fadeUpItem}
                        whileHover={cardHover}>
                        <div class="testimonial-content">
                            <img class="testimonial-avatar" src="assets/images/estudiante_testimonio_3.png" alt="Camila Rojas" />
                            <p class="testimonial-quote">
                            “La capacitación superó mis expectativas. Los contenidos son
                            prácticos y muy útiles para el mundo real.”
                            </p>
                        </div>

                        <div class="testimonial-person">
                            <strong>Camila Rojas</strong>
                            <span>Estudiante de Gestión Empresarial</span>
                        </div>
                        <div class="testimonial-mark">❞</div>
                        </motion.article>

                    </motion.div>
                    </div>
                </section>

                <section class="contact-section" id="contacto">
                    <div class="container">

                    <div class="contact-header">
                        <h2>Conecta con Talentia</h2>
                        <div class="contact-underline"></div>
                    </div>

                    <motion.div
                    className="forms-grid"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}>
                        <RegistroForm tipo="empresa" />
                        <RegistroForm tipo="alumno" />
                    </motion.div>
                    </div>
                </section>
            </main>

            {/* CTA SOLO DEL HOME */}
            <section className="footer-cta">
                <div className="container footer-cta-content">
                <div>
                    <h2>Invierte en tu futuro hoy</h2>
                    <p>
                    Desarrolla nuevas habilidades, potencia tu talento y alcanza tus
                    objetivos.
                    </p>
                </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;
