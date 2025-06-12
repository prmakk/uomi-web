import React from "react";
import { ArrowLeft, Home, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  // Animation variants (similar to those in EcosystemSection)
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const buttonHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black text-zinc-200 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </div>

      {/* Background dot matrix */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
        {/* 404 Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Error code */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-[#dffe00] text-9xl font-bold mb-2"
            style={{
              textShadow: "0 0 30px rgba(223, 254, 0, 0.3)"
            }}
          >
            404
          </motion.h1>
          
          {/* Main heading */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Page Not Found
          </motion.h2>
          
          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-zinc-400 mb-10"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          {/* Action buttons */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
          >
            <motion.button
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-[#dffe00] text-black rounded-lg py-3 px-6 font-medium transition-all"
                onClick={() => window.location.href = "/"}
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.button>
            
            <motion.button
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg py-3 px-6 font-medium hover:border-[#dffe00] transition-all"
               onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated glitch effect for 404 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          className="absolute"
          initial={{ left: "-10%", top: "30%" }}
          animate={{ 
            left: ["0%", "100%", "0%"],
            top: ["30%", "60%", "30%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          <div className="text-[#dffe00] text-[400px] font-bold opacity-5">404</div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFoundPage;