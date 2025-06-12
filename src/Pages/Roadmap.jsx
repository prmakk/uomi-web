import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const OpocRoadmap = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Animated progress line effect
  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );
  
  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };


  const AnimatedTitle = ({ text, className }) => {
    const words = text.split(' ');
    
    return (
      <h3 className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: Math.random() * 0.8 + 0.4,
                  delay: Math.random() * 1.2,
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
                className="inline-block font-sx"
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </h3>
    );
  };
  
  // Timeline data exactly as shown in the image
  const milestones = [
    {
      title: "Babbage",
      subtitle: "(testnet)",
      focus: "Decentralized parallel inference",
      description: "The Babbage Testnet is the testing ground for deterministic parallel inference with large-scale AI models. It constitutes the foundation of the OPoC consensus algorithm. It will support inferences with LLAMA 3.1 7B (8 Bit Quantized) and Flux.1. The model's list will be expanded in the subsequent testnets. The Babbage Testnet features a multi-VM framework, supporting both WASM and EVM. It features the deployment of Solidity-compiled smart contracts.",
      date: "Q3 - 2024"
    },
    {
      title: "Finney",
      subtitle: "(testnet)",
      focus: "OPoC consensus",
      description: "The Finney Testnet implements the OPoC consensus algorithm for secure and efficient AI computation. Third-party node operators will be able to join the network. Slashing and inactivity leak will be implemented but not applied to nodes. It will be possible to publish WASM-defined custom AI Agents. The testnet includes IPFS support to store custom AI Agents configuration and memory.",
      date: "Q4 - 2024"
    },
    {
      title: "Turing α",
      subtitle: "(testnet)",
      focus: "TSS - Agents ability to control crypto assets",
      description: "The Turing α Testnet adds Threshold Signature Scheme (TSS) distributed key generation and signing. This feature enables nodes to sign transactions on behalf of the AI Agents on ANY Blockchain. Inference batching will be deployed for parallel AI Models execution.  Slashing and inactivity leak will be activated with testnet tokens.",
      date: "Q2 - 2025"
    },
    {
      title: "Turing β",
      subtitle: "(testnet)",
      focus: "TEE Oracles - Unleash AI agents in Web2",
      description: "The Turing β Testnet introduces TEE Web2 Oracles, enabling AI Agents to access Web2 data and subscriptions with minimized trust assumptions and latency. A TSS-enabled bridge with relayers will be deployed to allow for trustless bridging of blockchain assets between the UOMI Network and other Blockchains. A Finite State Automata system, for autonomous transaction triggering.  Agents issuance and inference fee burn will be enabled with testnet tokens.",
      date: "Q3 - 2025"
    },
    {
      title: "UOMI",
      subtitle: "Mainnet",
      focus: "Decentralized Governance and Bridges",
      description: "After thorough testing with the Turing Testnet, the OPoC algorithm will be implemented on the mainnet, enabling AI Agents to securely control valuable digital assets. The mainnet launch includes the creation of the UOMI DAO and a decentralized bridge between Ethereum and UOMI to enable staking with the pre-minted supply for nodes operators, indirect stakers, and VeUOMI holders.",
      date: "Q4 - 2025"
    }
  ];
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white font-sans py-12 px-6"
    >
      <div className="max-w-5xl mx-auto relative flex flex-col items-center">
        {/* Header with title */}
        <motion.div 
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="mb-24"
        >
            <AnimatedTitle
              text="UOMI Roadmap"
              className="text-5xl md:text-5xl font-extrabold text-[#c8e500] leading-tight mb-8"
            />
         
        </motion.div>
        {/* Timeline container */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-6 top-0 w-px h-full bg-white/10" />
          
          {/* Animated progress line */}
          <motion.div 
            className="absolute left-6 top-0 w-px bg-white"
            style={{ height: progressHeight }}
          />
          
          {/* Timeline items */}
          <div className="space-y-28">
            {milestones.map((milestone, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                {/* Timeline node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="absolute left-6 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-10"
                />
                
                {/* Content container */}
                <div className="ml-16">
                  <div className="flex flex-col">
                    {/* Title */}
                    <div className="mb-2">
                      <motion.h2 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-white inline-block"
                      >
                        {milestone.title}
                      </motion.h2>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="ml-2 text-xl text-white/70 font-mono"
                      >
                        {milestone.subtitle}
                      </motion.span>
                    </div>
                    
                    {/* Subtitle */}
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-xl text-[#c8e500] mb-3"
                    >
                      {milestone.focus}
                    </motion.h3>
                    
                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="text-lg text-white/70 leading-relaxed mb-4 max-w-3xl"
                    >
                      {milestone.description}
                    </motion.p>
                    
                    {/* Date */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-2"
                    >
                      <span className="font-mono text-xl text-white/50">{milestone.date}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpocRoadmap;