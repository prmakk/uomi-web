import { ArrowRight, Database, Clock, Layers } from "lucide-react";
import EnhancedTitles from "./EnhancedTitles";
import AIVisualization from "./AIVisualization";

import { motion } from "framer-motion";

const HowItWorksSection = () => {
  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  // Grid items effect (will be used for features and animation elements)
  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full py-24 bg-black text-zinc-200 overflow-hidden relative">
      {/* Background gradient elements */}
      <div className="absolute inset-0 opacity-40 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </div>

      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <EnhancedTitles
            category="How It Works"
            title="Powering Autonomous Intelligence"
            titleBreak={false}
          />
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mx-auto text-center text-zinc-400 mb-16 text-lg"
          >
            UOMI uses Optimistic Proof of Computation to run AI models
            verifiably on-chain. Agents operate autonomously with built-in
            wallets, logic and multichain interoperability.
          </motion.p>
        </div>

        {/* Main feature showcase */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 rounded-2xl relative overflow-hidden"
        >
          <div
            className="absolute inset-0 border border-zinc-800/50 rounded-2xl backdrop-blur-sm z-0"
            style={{
              background:
                "linear-gradient(to bottom right, rgba(223, 254, 0, 0.1), rgba(200, 229, 0, 0.05))",
            }}
          />

          <div className="grid md:grid-cols-2 relative z-10">
            {/* Visualization side */}
            <AIVisualization />

            {/* Content side */}
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Verifiable AI on-chain
                </h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  Agents execute complex models using OPoC (Optimistic Proof of
                  Computation). Validators challenge or confirm results for
                  trustless inference and logic — a core primitive for AI-native
                  dApps.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#c8e500" }}
                  whileTap={{ scale: 0.98 }}
                  className="text-black rounded-lg px-6 py-3 inline-flex items-center space-x-2 font-medium shadow-md border hover:cursor-pointer"
                  style={{
                    backgroundColor: "#dffe00",
                    boxShadow: "0 4px 6px -1px rgba(223, 254, 0, 0.2)",
                    borderColor: "rgba(223, 254, 0, 0.3)",
                  }}
                  onClick={() =>
                    window.open(
                      "/opoc",
                    )
                  }
                >
                  <span>Read about OPoC</span>
                  <ArrowRight size={16} className="ml-2" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features section */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Feature 1 */}
          <motion.div
            variants={gridItemVariants}
            className="rounded-xl p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 shadow-xl group hover:bg-zinc-900 transition-all duration-300"
          >
            <div
              className="mb-6 p-3 rounded-lg w-14 h-14 flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: "rgba(223, 254, 0, 0.1)",
              }}
            >
              <Database className="h-6 w-6" style={{ color: "#dffe00" }} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">TSS</h3>
            <p className="text-zinc-400 leading-relaxed">
              Every agent is an NFT with its own wallet and logic — capable of
              storing assets, voting, trading, and evolving.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={gridItemVariants}
            className="rounded-xl p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 shadow-xl group hover:bg-zinc-900 transition-all duration-300"
          >
            <div
              className="mb-6 p-3 rounded-lg w-14 h-14 flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: "rgba(223, 254, 0, 0.1)",
              }}
            >
              <Clock className="h-6 w-6" style={{ color: "#dffe00" }} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Cross-Chain Execution
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              UOMI agents can act on multiple chains via trustless bridges —
              enabling multichain arbitrage, governance, and orchestration.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={gridItemVariants}
            className="rounded-xl p-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 shadow-xl group hover:bg-zinc-900 transition-all duration-300"
          >
            <div
              className="mb-6 p-3 rounded-lg w-14 h-14 flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: "rgba(223, 254, 0, 0.1)",
              }}
            >
              <Layers className="h-6 w-6" style={{ color: "#dffe00" }} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Scalable AI Runtime
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              The infrastructure is designed to run models with low latency and
              verifiable proofs, without overloading nodes — scaling AI on-chain
              without compromises.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;