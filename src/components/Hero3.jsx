import { motion } from "framer-motion";
import Head from "./Head";
import { useState } from "react";

const Hero3 = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const handleModelLoaded = () => {
    setModelLoaded(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Head component positioned behind text */}
      <div className="absolute inset-0 z-0">
        <Head
          className="w-full h-full transform" 
          onModelLoaded={handleModelLoaded} 
        />
      </div>
      
      {/* Blur overlay for better text readability */}
      <div className="absolute inset-0 backdrop-blur-none z-5"></div>

      {/* Gradient overlay to enhance text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-36 relative z-20">
        <motion.div
          className="text-center space-y-6 sm:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={modelLoaded ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
            variants={itemVariants}
          >
            <span style={{ color: "#dffe00" }}>UOMI</span>
            <br />
            <span className="text-white">WHERE AI MEETS</span>
            <br />
            <span className="text-white">DECENTRALIZATION</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto px-2"
            variants={itemVariants}
          >
            UOMI is the first Layer 1 built for secure AI computation and unstoppable agents that think, act, trade, and evolve, without human input.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 pt-4"
            variants={itemVariants}
          >
            <motion.button
              className="text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded font-bold shadow-xl text-sm sm:text-base w-full sm:w-auto hover:cursor-pointer"
              style={{
                backgroundColor: "#dffe00",
                boxShadow: "0 8px 16px -4px rgba(223, 254, 0, 0.4)",
              }}
              whileHover={{ scale: 1.03, backgroundColor: "#c8e500" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => window.open("./docs", "_blank")}
            >
              <span>START BUILDING</span>
            </motion.button>

            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded font-bold border border-zinc-700 hover:border-zinc-600 bg-zinc-900/60 backdrop-blur-md shadow-md text-sm sm:text-base w-full sm:w-auto mt-3 sm:mt-0 hover:cursor-pointer"
              whileHover={{
                scale: 1.03,
                borderColor: "#dffe00",
                backgroundColor: "rgba(63, 63, 70, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
               onClick={() => window.open("https://discord.gg/4ySAfR73VM", "_blank")}
            >
              <span>JOIN THE COMMUNITY</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero3;