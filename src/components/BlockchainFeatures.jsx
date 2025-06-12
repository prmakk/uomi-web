
import {
  Zap,
  Database,
  Clock,
  Shield,
  Globe,
  Code,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EnhancedTitles from "./EnhancedTitles";
import ModernLottieComponent from "./Lottie/ModernLottie";
import Load from "./Lottie/Load";


const BlockchainFeatures = () =>  {
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
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };


  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px -10px rgba(223, 254, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  const CountUp = ({ from, to, suffix, duration }) => {
    const [count, setCount] = useState(from);

    useEffect(() => {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(from + progress * (to - from)));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [from, to, duration]);

    return (
      <>
        {count}
        {suffix}
      </>
    );
  };

  const CountDown = ({ from, to, suffix, duration }) => {
    return <CountUp from={from} to={to} suffix={suffix} duration={duration} />;
  };



  const TextScramble = ({ text, duration }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        if (progress < 1) {
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let result = "";
          const targetLength = Math.ceil(progress * text.length);

          for (let i = 0; i < text.length; i++) {
            if (i < targetLength) {
              result += text[i];
            } else if (i === targetLength) {
              result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
          }

          setDisplayText(result);
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [text, duration]);

    return <>{displayText}</>;
  };

  return (
    <section className="w-full py-20 bg-black text-zinc-200 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <motion.div
          className="absolute -top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </div>

      {/* Hexagon matrix pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L15 15v20l15 10 15-10V15L30 5zm0 40L15 35v-20l15-10 15 10v20L30 45z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
       < EnhancedTitles
        category = "Features"
        title = "The AI-Native Blockchain Infrastructure"
        titleBreak={true}
        />

        {/* First row - 2 columns */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          {/* Block time feature */}
          <motion.div
            variants={gridItemVariants}
            whileHover="hover"
            className="relative group overflow-hidden rounded-xl backdrop-blur-sm border border-zinc-800/50 shadow-xl transition-all duration-300"
          >
            <div
              className="absolute inset-0 opacity-50 z-0"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(223, 254, 0, 0.1), rgba(200, 229, 0, 0.05))",
              }}
            ></div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(223, 254, 0, 0.03)" }}
            ></div>
            <div className="relative z-10 p-8">
              <div className="flex items-start justify-between">
                <div
                  className="mb-6 p-3 rounded-lg w-14 h-14 flex items-center justify-center group-hover:bg-[#dffe00]/20 transition-all duration-300"
                  style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
                >
                  <Clock className="h-6 w-6" style={{ color: "#dffe00" }} />
                </div>
                <div className="flex flex-col items-end">
                  <h3 className="text-6xl font-bold text-white mb-0 flex items-center">
                    <CountDown from={20} to={3} suffix="s" duration={2000} />
                  </h3>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#dffe00" }}
                  >
                    Block time
                  </span>
                </div>
              </div>
              <p className="text-zinc-300 text-base">
                Lightning-fast confirmation time for real-time AI execution and
                dApps.
              </p>
            </div>
          </motion.div>

          {/* EVM Compatible feature */}
          <motion.div
            variants={gridItemVariants}
            whileHover="hover"
            className="relative group overflow-hidden rounded-xl backdrop-blur-sm border border-zinc-800/50 shadow-xl transition-all duration-300"
          >
            <div
              className="absolute inset-0 opacity-50 z-0"
              style={{
                background:
                  "linear-gradient(to bottom left, rgba(223, 254, 0, 0.1), rgba(200, 229, 0, 0.05))",
              }}
            ></div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(223, 254, 0, 0.03)" }}
            ></div>
            <div className="relative z-10 p-8">
              <div className="flex items-start justify-between">
                <div
                  className="mb-6 p-3 rounded-lg w-14 h-14 flex items-center justify-center group-hover:bg-[#dffe00]/20 transition-all duration-300"
                  style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
                >
                  <Code className="h-6 w-6" style={{ color: "#dffe00" }} />
                </div>
                <div className="flex flex-col items-end">
                  <h3 className="text-4xl font-bold text-white mb-0 flex items-center">
                    <CountUp from={0} to={100} suffix="% EVM" duration={2000} />
                  </h3>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#dffe00" }}
                  >
                    Compatible
                  </span>
                </div>
              </div>
              <p className="text-zinc-300 text-base">
                Build with your favorite Solidity tools — no need to rewrite
                your contracts.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Second row - 3 columns */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          {/* OPoC feature with improved Lottie */}
          <motion.div
            variants={gridItemVariants}
            whileHover="hover"
            className="relative group overflow-hidden rounded-xl backdrop-blur-sm border border-zinc-800/50 shadow-xl transition-all duration-300"
          >
            {/* Gradients di sfondo */}
            <div
              className="absolute inset-0 opacity-50 z-0"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(223, 254, 0, 0.1), rgba(200, 229, 0, 0.05))",
              }}
            ></div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(223, 254, 0, 0.03)" }}
            ></div>

            {/* Animazione Lottie come elemento decorativo */}
            <ModernLottieComponent />

            {/* Contenuto principale */}
            <div className="relative z-10 p-8">
              <div
                className="p-3 rounded-lg w-14 h-14 flex items-center justify-center group-hover:bg-[#dffe00]/20 transition-all duration-300 mb-6"
                style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
              >
                <Shield className="h-6 w-6" style={{ color: "#dffe00" }} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                <TextScramble text="OPoC" duration={1200} />
              </h3>
              <div
                className="h-px w-16 mb-4"
                style={{ backgroundColor: "rgba(223, 254, 0, 0.3)" }}
              ></div>
              <p className="text-zinc-400 text-sm font-medium mb-1">
                OPoC - Optimistic Proof of Computation
              </p>
              <p className="text-zinc-300 text-base mb-4">
                Efficient AI verification algorithm for non-deterministic Computation.
              </p>
            </div>
          </motion.div>

          {/* ERC-6551 feature */}
          <motion.div
            variants={gridItemVariants}
            whileHover="hover"
            className="relative group overflow-hidden rounded-xl backdrop-blur-sm border border-zinc-800/50 shadow-xl transition-all duration-300"
          >
            <div
              className="absolute inset-0 opacity-50 z-0"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(223, 254, 0, 0.1), rgba(200, 229, 0, 0.05))",
              }}
            ></div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(223, 254, 0, 0.03)" }}
            ></div>
            <div className="relative z-10 p-8">
              <div
                className="p-3 rounded-lg w-14 h-14 flex items-center justify-center group-hover:bg-[#dffe00]/20 transition-all duration-300 mb-6"
                style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
              >
                <Database className="h-6 w-6" style={{ color: "#dffe00" }} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">TSS</h3>
              <div
                className="h-px w-16 mb-4"
                style={{ backgroundColor: "rgba(223, 254, 0, 0.3)" }}
              ></div>
              <p className="text-zinc-400 text-sm font-medium mb-1">
                TSS - Trustless Multi-Chain Transaction Signing
              </p>
              <p className="text-zinc-300 text-base">
                Threshold Signatures Schemes enable AI Agents to sign transactions on any chain with no intermediaries.
              </p>
            </div>
          </motion.div>

          {/* Multi-Chain feature */}
          <motion.div
            variants={gridItemVariants}
            whileHover="hover"
            className="relative group overflow-hidden rounded-xl backdrop-blur-sm border border-zinc-800/50 shadow-xl transition-all duration-300"
          >
            <div
              className="absolute inset-0 opacity-50 z-0"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(223, 254, 0, 0.1), rgba(200, 229, 0, 0.05))",
              }}
            ></div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(223, 254, 0, 0.03)" }}
            ></div>
            <div className="relative z-10 p-8">
              <div
                className="p-3 rounded-lg w-14 h-14 flex items-center justify-center group-hover:bg-[#dffe00]/20 transition-all duration-300 mb-6"
                style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
              >
                <Globe className="h-6 w-6" style={{ color: "#dffe00" }} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
               TEE Oracles
              </h3>
              <div
                className="h-px w-16 mb-4"
                style={{ backgroundColor: "rgba(223, 254, 0, 0.3)" }}
              ></div>
              <p className="text-zinc-400 text-sm font-medium mb-1">
                TEE Web2 Oracles
              </p>
              <p className="text-zinc-300 text-base">
                Access Web2 data and subscriptions with minimized trust assumptions leveraging Trusted Execution Environments.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Third row - 1 column */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            whileHover={{
              boxShadow: "0 15px 30px -10px rgba(223, 254, 0, 0.3)",
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
            className="relative overflow-hidden rounded-xl backdrop-blur-sm border border-zinc-800/50 shadow-xl transition-all duration-300"
          >
            <div
              className="absolute inset-0 opacity-50 z-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(223, 254, 0, 0.1), rgba(200, 229, 0, 0.05), rgba(223, 254, 0, 0.1))",
              }}
            ></div>
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to right, rgba(223, 254, 0, 0.03), rgba(200, 229, 0, 0.02), rgba(223, 254, 0, 0.03))",
              }}
            ></div>
            <div className="relative z-10 p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className="p-3 rounded-lg w-12 h-12 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(223, 254, 0, 0.15), rgba(200, 229, 0, 0.1))",
                  }}
                >
                  <Zap className="h-5 w-5" style={{ color: "#dffe00" }} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  <TextScramble
                    text="AI-Native Infrastructure"
                    duration={1200}
                  />
                </h3>
              </div>
              <p className="text-zinc-300 text-base max-w-3xl">
                UOMI is purpose-built to support decentralized artificial
                intelligence, empowering agents to operate independently with
                smart contract logic and access to off-chain computation through
                verifiable proofs.
              </p>

              <Load />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default BlockchainFeatures;