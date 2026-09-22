import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";


import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import DetalleCurso from "./pages/DetalleCurso";

function App() {
  
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
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