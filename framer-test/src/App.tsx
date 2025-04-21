import './App.css'
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const CURSOR_SIZE = 10;
function App() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
  });
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - CURSOR_SIZE / 2 - 10);
      y.set(e.clientY - CURSOR_SIZE / 2 + 20);
    };

    window.addEventListener("mousemove",(e) => handleMouseMove(e));
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[size:20px_20px] w-full h-full">
    <motion.div
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        backgroundColor: "red",
        borderRadius: "50%",
        position: "fixed",
        top: 0,
        left: 0,
        x : springX, // framer-specific shorthand
        y : springY,
        zIndex: 0,
        pointerEvents: "none"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
    </motion.div>
      <div className='w-10 h-10 bg-black relative z-10' ></div>
    </div>
  );
}

export default App
