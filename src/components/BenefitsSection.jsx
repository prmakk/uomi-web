import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import EnhancedTitles from "./EnhancedTitles";
import { motion } from "framer-motion";

const BenefitsSection = () => {
  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const canvasRef = useRef(null);

  // Animation parameters
  const particleCount = 50;
  const connectionThreshold = 100;
  const primaryColor = "rgba(223, 254, 0, 0.8)";
  const secondaryColor = "rgba(200, 229, 0, 0.8)";

  useEffect(() => {
    // Initialize particles
    const particles = Array(particleCount)
      .fill()
      .map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 6,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        pulseSpeed: 0.5 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
      }));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    // Resize handler
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Initial sizing
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation loop
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > 100) p.speedX *= -1;
        if (p.y < 0 || p.y > 100) p.speedY *= -1;

        // Calculate screen position
        const screenX = (p.x / 100) * canvas.width;
        const screenY = (p.y / 100) * canvas.height;

        // Pulse size effect
        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.5 + 1;
        const displaySize = p.size * pulse;

        // Draw particle
        ctx.beginPath();
        ctx.arc(screenX, screenY, displaySize, 0, Math.PI * 2);
        ctx.fillStyle = i % 4 === 0 ? primaryColor : secondaryColor;
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (i !== j) {
            const dx = ((p.x - p2.x) / 100) * canvas.width;
            const dy = ((p.y - p2.y) / 100) * canvas.height;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionThreshold) {
              const screenX2 = (p2.x / 100) * canvas.width;
              const screenY2 = (p2.y / 100) * canvas.height;

              const opacity = 1 - distance / connectionThreshold;

              ctx.beginPath();
              ctx.moveTo(screenX, screenY);
              ctx.lineTo(screenX2, screenY2);
              ctx.strokeStyle = `rgba(223, 254, 0, ${opacity * 0.3})`;
              ctx.lineWidth = Math.max(0.5, 2 * opacity);
              ctx.stroke();
            }
          }
        });
      });

      // Create wave effect on the canvas
      const waveHeight = 20;
      const waveCount = 5;

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height * (0.3 + w * 0.15) +
            Math.sin(x * 0.01 + time + w) * waveHeight;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = `rgba(223, 254, 0, ${0.1 - w * 0.02})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="w-full py-24 bg-black text-zinc-200 overflow-hidden relative">
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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <EnhancedTitles
            category="Benefits"
            title="Built for Intelligent Autonomy"
            titleBreak={false}
          />

          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mx-auto text-center text-zinc-400 mb-16 text-lg leading-relaxed"
          >
            UOMI enables you to build AI agents that own assets, execute logic on-chain, interact across ecosystems, and evolve over time, trustlessly, autonomously, and verifiably.

          </motion.p>
        </div>

        {/* Main feature showcase */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 rounded-2xl overflow-hidden relative"
        >
          <div
            className="absolute inset-0 border border-zinc-800/50 rounded-2xl backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(to bottom right, rgba(223, 254, 0, 0.1), rgba(200, 229, 0, 0.05))",
            }}
          />

          <div className="grid md:grid-cols-2 relative z-10">
            {/* Content side */}
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Smart, Scalable, Autonomous.
                </h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  UOMI agents are autonomous NFTs powered by on-chain AI. They
                  can trade, vote, own assets and evolve across time — fully
                  verifiable, unstoppable, and decentralized.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#c8e500" }}
                  whileTap={{ scale: 0.98 }}
                  className="text-black rounded-lg px-6 py-3 inline-flex items-center space-x-2 font-medium shadow-md border"
                  style={{
                    backgroundColor: "#dffe00",
                    boxShadow: "0 4px 6px -1px rgba(223, 254, 0, 0.2)",
                    borderColor: "rgba(223, 254, 0, 0.3)",
                  }}
                  onClick={() => window.open("/wasp", "_blank")}
                >
                  <span>BUILD YOUR AI AGENT ON UOMI</span>
                  <ArrowRight size={16} className="ml-2" />
                </motion.button>
              </motion.div>
            </div>

            {/* Visualization side */}
            <div className="relative min-h-[350px] flex items-center justify-center p-10 overflow-hidden">
              {/* Grid backdrop */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(223, 254, 0, 0.1) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                ></div>
              </div>

              {/* Main Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />

              {/* Central geometric shape */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  width: "100px",
                  height: "100px",
                  background: "transparent",
                  perspective: "800px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                    times: [0, 1],
                  }}
                >
                  {/* Cube faces */}
                  {[...Array(6)].map((_, index) => {
                    const isEven = index % 2 === 0;
                    const transforms = [
                      "translateZ(50px)",
                      "rotateY(180deg) translateZ(50px)",
                      "rotateY(90deg) translateZ(50px)",
                      "rotateY(-90deg) translateZ(50px)",
                      "rotateX(90deg) translateZ(50px)",
                      "rotateX(-90deg) translateZ(50px)",
                    ];

                    return (
                      <motion.div
                        key={index}
                        className="absolute w-full h-full"
                        style={{
                          transform: transforms[index],
                          backgroundColor: isEven
                            ? "rgba(223, 254, 0, 0.3)"
                            : "rgba(200, 229, 0, 0.3)",
                          border: `1px solid ${
                            isEven
                              ? "rgba(223, 254, 0, 0.6)"
                              : "rgba(200, 229, 0, 0.6)"
                          }`,
                          backfaceVisibility: "visible",
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 10px rgba(223, 254, 0, 0.2)`,
                            `0 0 20px rgba(223, 254, 0, 0.4)`,
                            `0 0 10px rgba(223, 254, 0, 0.2)`,
                          ],
                        }}
                        transition={{
                          duration: 3,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.5,
                        }}
                      />
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Pulsing rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute top-1/2 left-1/2 rounded-full border"
                  style={{
                    width: `${150 + i * 100}px`,
                    height: `${150 + i * 100}px`,
                    x: "-50%",
                    y: "-50%",
                    borderColor: `rgba(223, 254, 0, ${0.3 - i * 0.1})`,
                    borderWidth: `${2 - i * 0.5}px`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 4 + i * 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 1.5,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
