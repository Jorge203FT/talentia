import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";

import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import DetalleCurso from "./pages/DetalleCurso";

function CourseScrollReset() {
  const { pathname, key } = useLocation();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    const path = pathname.toLowerCase();
    if (path === "/cursos" || path.startsWith("/curso/")) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, key]);

  return null;
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <CourseScrollReset />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/curso/:id" element={<DetalleCurso />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
