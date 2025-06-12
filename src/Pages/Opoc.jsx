import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import EnhancedTitles from "../components/EnhancedTitles";

const OPoCCalculator = () => {
  const [stakePerNode, setStakePerNode] = useState(10000);
  const [totalValidators, setTotalValidators] = useState(100);
  const [opocValidationSubnet, setOpocValidationSubnet] = useState(10);
  const [finalValue, setFinalValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }
  }

  const applyExponent = (value) => {
    if (value < 1) return value;
    const exponent = Math.floor(Math.log10(value));
    const mantissa = value / Math.pow(10, exponent);

    const superscriptDigits = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];

    let exponentSpecialChar = '⁰';
    if (exponent < 0) {
      exponentSpecialChar = '⁻';
    } else {
      exponentSpecialChar = exponent
        .toString()
        .split('')
        .map(digit => superscriptDigits[parseInt(digit)])
        .join('');
    }

    return `${mantissa.toFixed(2)} × 10${exponentSpecialChar}`;
  }

  const loadFinalValue = async (stakePerNode, totalValidators, opocValidationSubnet) => {
    if (!stakePerNode || !totalValidators || !opocValidationSubnet) {
      return setFinalValue('');
    }

    setIsLoading(true);
    const V = parseInt(totalValidators);
    const v = parseInt(opocValidationSubnet);
    const H = Math.floor(V * 0.66);
    const stake = parseInt(stakePerNode);
    
    if (v < 1) {
      setFinalValue('0');
      setIsLoading(false);
      return;
    }
    if (v > (V - H)) {
      setFinalValue('∞');
      setIsLoading(false);
      return;
    }

    try {
      const API_BASE_URL = "https://backend.uomi.ai";
      
      const response = await fetch(`${API_BASE_URL}/opoccalc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          V,
          v,
          H,
          stake,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.output) {
          setFinalValue(applyExponent(parseFloat(data.output)));
        } else {
          setFinalValue('');
        }
      } else {
        const probability = Math.pow((V - H) / V, v);
        const economicSecurity = stake / probability;
        setFinalValue(applyExponent(economicSecurity));
      }
    } catch (error) {
      const probability = Math.pow((V - H) / V, v);
      const economicSecurity = stake / probability;
      setFinalValue(applyExponent(economicSecurity));
    }
    
    setIsLoading(false);
  }

  const debouncedLoadFinalValue = useRef(debounce(loadFinalValue, 500));

  useEffect(() => {
    debouncedLoadFinalValue.current(
      stakePerNode,
      totalValidators,
      opocValidationSubnet
    );
  }, [stakePerNode, totalValidators, opocValidationSubnet]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <label className="text-white text-lg md:text-xl font-medium">
            Stake per Node
          </label>
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-lg">$</span>
            <input
              type="number"
              min="0"
              step="1000"
              value={stakePerNode}
              onChange={(e) => setStakePerNode(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#c8e500] focus:border-transparent
                         min-w-[150px] transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <label className="text-white text-lg md:text-xl font-medium">
            Total Validators (V)
          </label>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              max="1000"
              step="1"
              value={totalValidators}
              onChange={(e) => setTotalValidators(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#c8e500] focus:border-transparent
                         min-w-[150px] transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <label className="text-white text-lg md:text-xl font-medium">
              OPoC Validation Subnet (v)
            </label>
            <span className="text-[#c8e500] text-xl font-bold">
              {opocValidationSubnet}
            </span>
          </div>
          
          <div className="w-full">
            <input
              type="range"
              min="1"
              max={Math.min(totalValidators, 50)}
              step="1"
              value={opocValidationSubnet}
              onChange={(e) => setOpocValidationSubnet(e.target.value)}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none 
                         [&::-webkit-slider-thumb]:h-6 
                         [&::-webkit-slider-thumb]:w-6 
                         [&::-webkit-slider-thumb]:bg-[#c8e500] 
                         [&::-webkit-slider-thumb]:rounded-full 
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:shadow-lg
                         [&::-moz-range-thumb]:appearance-none 
                         [&::-moz-range-thumb]:h-6 
                         [&::-moz-range-thumb]:w-6 
                         [&::-moz-range-thumb]:bg-[#c8e500] 
                         [&::-moz-range-thumb]:rounded-full
                         [&::-moz-range-thumb]:border-none
                         [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
        </div>

        <motion.div 
          className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-6 mt-8"
          animate={isLoading ? { opacity: 0.7 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-white text-lg md:text-xl font-medium">
              Economic Security per Inference
            </h3>
            <div className="flex items-center gap-3">
              {isLoading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#c8e500]"></div>
              )}
              <span className="text-[#c8e500] text-2xl md:text-3xl font-bold">
                {finalValue ? `${finalValue} $` : '—'}
              </span>
            </div>
          </div>
          
          {finalValue && finalValue !== '∞' && finalValue !== '0' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/60 text-sm mt-4"
            >
              This represents the minimum reward an attacker would need to make cheating 
              financially worthwhile, given the probability of successfully compromising 
              all selected validators.
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const TypingText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 40);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isInView, text]);
  
  return <p ref={ref} className={className}>{displayText}<span className="animate-pulse">|</span></p>;
};

const sections = [
  {
    title: 'The Challenge',
    subtitle: 'Bringing AI to Blockchain',
    text: 'Traditional consensus algorithms like Proof of Work (PoW) and Proof of Stake (PoS) were never designed to verify heavy AI computations. Having every node verify each step of a large model execution would be prohibitively expensive and impossibly slow.',
    detail: 'Running a state-of-the-art AI model can require trillions of operations. If every validator had to verify these operations, network costs would be astronomical.',
    color: '#c8e500'
  },
  {
    title: 'The OPoC Solution',
    subtitle: 'Optimistic Validation',
    text: "OPoC (Optimistic Proof of Computation) leverages economic security and probabilistic guarantees instead of full network verification. A small subset of validators is randomly selected for each computation, creating a system that's both secure and efficient.",
    detail: 'This approach transforms an exponential verification problem into a linear one, making decentralized AI computation practical for the first time.',
    color: '#c8e500'
  },
  {
    title: 'How It Works',
    subtitle: 'Selective Verification',
    text: "Only a small, randomly selected subset of validators from the network performs each AI inference. If all selected validators agree on the result, it's accepted. If there's disagreement, the verification escalates to more validators.",
    detail: 'Byzantine (dishonest) validators are identified and penalized through token slashing, creating strong economic incentives for honest participation.',
    color: '#c8e500'
  },
  {
    title: 'Security Guarantees',
    subtitle: 'Mathematical Assurance',
    text: 'The Probability that all selected validators are dishonest drops exponentially as the number of participating validators grows. With even modest validator pools, the probability of successful fraud becomes vanishingly small.',
    detail: 'For a network with 100 validators where 10 validate each computation, the probability of selecting all dishonest validators (assuming 1/3 are dishonest) is approximately 0.0000076.',
    color: '#c8e500'
  },
  {
    title: 'Economic Security',
    subtitle: 'Financial Incentives',
    text: 'Each validator stakes tokens to participate. Attempting to cheat carries a slashing risk where these tokens are lost. The cost of successful fraud increases exponentially with network size.',
    detail: 'With a $10,000 stake per validator, the economic security of each computation can reach billions of dollars, making attacks financially irrational.',
    color: '#c8e500'
  },
  {
    title: 'Scaling Capability',
    subtitle: 'Linear Growth',
    text: 'As more nodes join the network, OPoC enables more parallel inferences by assigning each validator subset independently. This allows throughput to increase linearly with network size.',
    detail: "Unlike traditional consensus where adding nodes increases redundant computation, OPoC leverages new validators to increase the network's parallel processing capacity.",
    color: '#c8e500'
  },
  {
    title: 'Verifying Non Deterministic Output',
    subtitle: 'Deterministic Undeterminism',
    text: 'LLMs leverages random sampling to explore a wider latent space in their tokens production. This introduces formidable challenges for AI inference verification, making computations not fully reproducible. UOMI solves this hard problem with a groundbreaking approach.',
    detail: "Instead of verifying simple token match, UOMI verifies token probability distributions, requiring that each token produced fits inside a pre-defined boundary of the model's token probability distribution. This approach allows for secure inference verification with random token sampling, maintaining AI models full capabilities.",
    color: '#c8e500'
  }
];

const StatCounter = ({ value, label, duration = 2000, symbol = "×" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);
  
  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="text-4xl md:text-6xl font-bold text-white mb-2">{count}{symbol}</span>
      <span className="text-white/60 text-lg text-center">{label}</span>
    </div>
  );
};

const ComparisonTable = () => {
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: true, margin: "-100px 0px" });
  
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      } 
    })
  };

  const data = [
    {
      approach: "Traditional PoW/PoS",
      verification: "Full network verification",
      scaling: "Cost increases linearly with Nodes count",
      security: "Consensus-based",
      verificationColor: "text-red-400",
      scalingColor: "text-red-400"
    },
    {
      approach: "ZK Proofs",
      verification: "Low verification, high proving",
      scaling: "Limited by prover capacity, 1000x Overhead",
      security: "Cryptographic guarantees",
      verificationColor: "text-yellow-400",
      scalingColor: "text-yellow-400"
    },
    {
      approach: "OPoC",
      verification: "Subset verification",
      scaling: "Linear with validators",
      security: "Economic + Probabilistic",
      verificationColor: "text-green-400",
      scalingColor: "text-green-400",
      highlight: true
    }
  ];
  
  return (
    <div ref={tableRef} className="w-full mt-12 mb-16">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60">Approach</th>
              <th className="text-left p-4 text-white/60">Verification Cost</th>
              <th className="text-left p-4 text-white/60">Scaling</th>
              <th className="text-left p-4 text-white/60">Security</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <motion.tr 
                key={index}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="border-b border-white/10"
              >
                <td className={`p-4 ${row.highlight ? 'text-[#c8e500] font-bold' : ''}`}>
                  {row.approach}
                </td>
                <td className={`p-4 ${row.verificationColor}`}>
                  {row.verification}
                </td>
                <td className={`p-4 ${row.scalingColor}`}>
                  {row.scaling}
                </td>
                <td className="p-4">
                  {row.security}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {data.map((row, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={rowVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`p-4 rounded-lg border ${
              row.highlight 
                ? 'border-[#c8e500]/20 bg-[#c8e500]/5' 
                : 'border-white/10 bg-white/5'
            }`}
          >
            <div className={`font-bold mb-3 text-lg ${
              row.highlight ? 'text-[#c8e500]' : 'text-white'
            }`}>
              {row.approach}
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-white/60">Verification: </span>
                <span className={row.verificationColor}>
                  {row.verification}
                </span>
              </div>
              
              <div>
                <span className="text-white/60">Scaling: </span>
                <span className={row.scalingColor}>
                  {row.scaling}
                </span>
              </div>
              
              <div>
                <span className="text-white/60">Security: </span>
                <span className="text-white">
                  {row.security}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const NetworkDiagram = () => {
  return (
   //immagine a /assets/img3.png
    <div className="w-full">
      <motion.img 
        src="/assets/img3.png" 
        alt="OPoC Network Diagram"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full rounded-2xl shadow-lg"
      />
    </div>
  );
};

export default function OpocExplainer() {
    const { scrollY } = useScroll();
    const [activeSection, setActiveSection] = useState(0);
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const scrollingSectionsRef = useRef(null);
    const stickyContainerRef = useRef(null);
    
    // Parallax effect for hero section
    const titleY = useTransform(scrollY, [0, 600], [0, 100]);
    const subtitleY = useTransform(scrollY, [0, 600], [0, 50]);
    const opacityTransform = useTransform(scrollY, [0, 600], [1, 0]);
    
    // Scroll indicator animation
    const scrollArrowY = useTransform(
      scrollY, 
      [0, 100], 
      [0, 20]
    );
    
    // Background animation
    const bgY = useTransform(scrollY, [0, 1000], [0, -100]);
    
    useEffect(() => {
      const handleScroll = () => {
        if (!scrollingSectionsRef.current || !stickyContainerRef.current) return;
        
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Get the position of the scrolling sections container
        const scrollingSectionsRect = scrollingSectionsRef.current.getBoundingClientRect();
        const stickyContainerRect = stickyContainerRef.current.getBoundingClientRect();
        
        // Only start animation when sticky container is fully visible
        // This means the top of the sticky container should be at the top of the viewport
        if (stickyContainerRect.top <= 0) {
          // Calculate which section should be active
          // Get the top position of the scrolling sections relative to the viewport
          const sectionsTopPosition = scrollingSectionsRect.top;
          
          // Calculate how far we've scrolled into the sections
          // The negative value means how far the scrolling sections have moved up
          const sectionsScrolledAmount = Math.abs(sectionsTopPosition);
          
          // Each section takes up one viewport height
         const sectionHeight = windowHeight * 0.6;
          
          // Calculate the active section based on how far we've scrolled
          const newActiveSection = Math.min(
            Math.floor(sectionsScrolledAmount / sectionHeight),
            sections.length - 1
          );
          
          if (newActiveSection >= 0) {
            setActiveSection(newActiveSection);
          }
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const fadeUpVariant = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };
    
    const sideInVariant = {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
    };
    
    const staggerVariant = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: 0.1,
          delayChildren: 0.3
        }
      }
    };
    
    const staggerItemVariant = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }
    };
  
  // Animated title with random character reveals
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
  
    return (
      <div ref={containerRef} className="bg-black text-white min-h-screen w-full font-sans">
        {/* Hero Section */}
        <div ref={heroRef} className="h-screen relative overflow-hidden flex flex-col justify-center items-center px-6">
          <motion.div
            style={{ y: titleY, opacity: opacityTransform }}
            className="text-center"
          >
            <EnhancedTitles
              category="Secured by"
            
            />

            <AnimatedTitle
              text="Optimistic Proof of Computation"
              className="text-5xl md:text-5xl font-extrabold text-[#c8e500] leading-tight mb-8"
            />
            
            <motion.p
              style={{ y: subtitleY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              A revolutionary consensus protocol enabling efficient, secure, and scalable AI computation validation on decentralized networks.
            </motion.p>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            style={{ y: scrollArrowY, opacity: opacityTransform }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </div>
        
        {/* Problem Statement */}
        <div className="bg-black/80 py-24 px-6 md:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px" }}
            variants={fadeUpVariant}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">The Problem</h2>
            <div className="h-1 w-24 bg-[#c8e500] mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  The intersection of artificial intelligence and blockchain has been hindered by a fundamental challenge: <strong className="text-white">verification overhead</strong>.
                </p>
                
                <TypingText 
                  text="Traditional consensus mechanisms require every node to verify computations—practical for financial transactions, but prohibitive for AI workloads that involve billions or trillions of operations."
                  className="text-lg text-white/70 leading-relaxed mb-6"
                />
                
                <p className="text-lg text-white/70 leading-relaxed">
                  This creates a seemingly insurmountable barrier to running machine learning models on decentralized networks.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-semibold text-[#c8e500] mb-8">The Cost of Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <StatCounter value={100} label="% of Network Resources Wasted on Redundant Verification" symbol="%" />
                  <StatCounter value={1000} label="× Higher Cost for AI vs. Simple Transactions" />
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-white/50 text-sm italic">
                    "The combination of AI's computational intensity and blockchain's verification redundancy creates an exponential cost problem."
                  </p>
                </div>
              </div>
            </div>
            
            <ComparisonTable />
          </motion.div>
        </div>
        
        {/* Animation explaining OPoC */}
        {/* OPoC Concept Animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          variants={fadeUpVariant}
          className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-24 relative"
          style={{ 
            background: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(20,20,30,1) 100%)" 
          }}
        >
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{ y: bgY }}
          >
            <div className="grid grid-cols-8 h-full">
              {Array(64).fill(0).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/5"></div>
              ))}
            </div>
          </motion.div>
          
          <div className="max-w-6xl mx-auto z-10">
            <AnimatedTitle 
              text="The OPoC Protocol"
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            />
            <div className="h-1 w-24 bg-[#c8e500] mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xl text-white/70 leading-relaxed mb-8">
                  OPoC solves the AI-blockchain integration problem with a novel approach that drastically reduces verification costs while maintaining security.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-[#c8e500] text-xl font-semibold mb-3">Key Innovation:</h3>
                  <p className="text-white/70 leading-relaxed">
                    Instead of requiring the entire network to verify every computation, OPoC randomly selects a small subset of validators. The probability of selecting all malicious validators becomes vanishingly small as the network grows.
                  </p>
                </div>
                
                
<div>
  <h3 className="text-[#c8e500] text-xl font-semibold mb-3">Mathematical Security:</h3>
  <p className="text-white/70 leading-relaxed mb-4">
    OPoC's security scales exponentially with network size. As validator population V increases, 
    the probability of selecting all Byzantine validators among the random subset v decreases 
    exponentially, while maintaining constant computational effort. The hypergeometric distribution 
    shows that with v/V = 3% and honest ratio H/V = 2/3:
  </p>
  <img src="/equation_opoc.svg" alt="Probability Formula" className="w-60 max-w-md mx-auto mb-4" />
  <p className="text-white/60 text-sm mb-4 text-center">
    Where V = total validators, v = selected validators, h = honest ratio
  </p>
  <p className="text-white/70 leading-relaxed">
    This exponential security improvement enables the percentage of participating validators 
    v/V required for consistent security to decrease polynomially as the network grows, 
    providing superior scalability compared to PoS/PoW linear scaling.
  </p>
</div>
              </div>
              
              <NetworkDiagram />
            </div>
          </div>
        </motion.div>
        
        {/* Scrolling Sections */}
        <div className="relative" ref={scrollingSectionsRef}>
          {/* Sticky container for section titles and content */}
          <div ref={stickyContainerRef} className="sticky top-0 h-screen flex items-center bg-black overflow-hidden">
            <div className="w-full px-6 md:px-24">
              <div className="max-w-5xl mx-auto">
                {/* Animated section content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-5 gap-8"
                  >
                    <div className="md:col-span-2">
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <AnimatedTitle
                          text={sections[activeSection].title}
                          className="text-4xl md:text-4xl font-bold text-[#c8e500] mb-2"
                        />
                        <h3 className="text-xl text-white/40 mb-4">{sections[activeSection].subtitle}</h3>
                        <div className="h-1 w-16 bg-[#c8e500] mb-8"></div>
                      </motion.div>
                    </div>
                    
                    <div className="md:col-span-3">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xl text-white/80 leading-relaxed mb-6"
                      >
                        {sections[activeSection].text}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-6 bg-white/5 p-6 rounded-lg border border-white/10"
                      >
                        <p className="text-white/70 leading-relaxed">
                          {sections[activeSection].detail}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Progress indicator */}
                <div className="mt-16">
                  <div className="flex space-x-2 justify-center">
                    {sections.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${i === activeSection ? 'bg-[#c8e500]' : 'bg-white/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Spacer divs to enable scrolling */}
          <div className="w-full bg-transparent">
            {sections.map((_, i) => (
              <div key={i} className="h-[60vh] w-full" />
            ))}
          </div>
        </div>
      
      {/* Economic Security Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px 0px" }}
        variants={staggerVariant}
        className="py-24 px-6 md:px-24 bg-gradient-to-b from-black/90 to-black"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedTitle
            text="Economic Security Model"
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          />
          <div className="h-1 w-24 bg-[#c8e500] mb-16"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              variants={staggerItemVariant}
              className="lg:col-span-2 bg-white/5 p-8 rounded-xl border border-white/10"
            >
              <h3 className="text-2xl font-semibold text-[#c8e500] mb-6">How OPoC Makes Attacks Financially Irrational</h3>
              
              <div className="space-y-6 text-white/70">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#c8e500] text-black flex items-center justify-center mr-4 mt-1">1</div>
                  <p>Each validator must stake tokens with real economic value to participate in the network.</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#c8e500] text-black flex items-center justify-center mr-4 mt-1">2</div>
                  <p>If a validator attempts to verify fraudulent computations, their stake is "slashed" (partially or fully confiscated).</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#c8e500] text-black flex items-center justify-center mr-4 mt-1">3</div>
                  <p>The minimum reward an attacker would need to make cheating worthwhile increases exponentially with network size.</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#c8e500] text-black flex items-center justify-center mr-4 mt-1">4</div>
                  <p>With just 100 validators, 10 partecipants and a $10,000 stake per validator, the economic security per computation can reach over $1 billion.</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xl font-semibold text-white/80">Minimum Attack Reward Formula:</p>
                <div className="mt-4 bg-white/10 p-4 rounded-lg text-[#c8e500] font-mono">
                  RewardToDefect = stake / P(allByzantine)
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={staggerItemVariant}
              className="flex flex-col justify-between"
            >
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
                <h3 className="text-xl font-semibold text-[#c8e500] mb-4">Economic Security</h3>
                <StatCounter 
                  value={1315} 
                  label="Billion Dollar Security per Computation" 
                  symbol="M" 
                  duration={3000} 
                />
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#c8e500] mb-4">Attack Probability</h3>
                <div className="text-center">
                  <span className="text-4xl md:text-4xl font-bold text-white">~0.0000076%</span>
                  <p className="text-white/60 mt-2">Chance of Successful Attack</p>
                </div>
                <div className="mt-6 text-white/50 text-sm">
                  <p>In a network with 100 validators, with 10 randomly selected for each computation (assuming 1/3 are Byzantine).</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

       <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px 0px" }}
        variants={fadeUpVariant}
        className="py-24 px-6 md:px-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedTitle
            text="OPoC Security Calculator"
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          />
          <div className="h-1 w-24 bg-[#c8e500] mb-8"></div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/70 leading-relaxed mb-12 max-w-3xl"
          >
            Explore how OPoC's economic security scales with your network parameters. 
            Adjust the values below to see how stake amounts and validator distribution 
            affect the minimum reward needed to make attacks financially viable.
          </motion.p>
          
          <OPoCCalculator />
        </div>
      </motion.div>
      
      {/* Scaling Properties */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px 0px" }}
        variants={fadeUpVariant}
        className="min-h-screen py-24 px-6 md:px-24 bg-black"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatedTitle
            text="Linear Scaling & Parallel Processing"
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          />
          <div className="h-1 w-24 bg-[#c8e500] mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold text-[#c8e500] mb-6">Unique Scaling Properties</h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  Traditional blockchain consensus requires every node to verify every computation, making it impossible to scale throughput by adding more nodes.
                </p>
                <p className="text-white/70 leading-relaxed mb-8">
                  With OPoC, adding more validators to the network directly increases parallel processing capacity, creating linear throughput scaling.
                </p>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <h4 className="text-lg font-semibold text-[#c8e500] mb-3">Parallel Inference Formula</h4>
                  <div className="text-white/90 text-lg font-mono">
                    Parallel Computations = V ÷ v
                  </div>
                  <p className="text-white/50 text-sm mt-4">
                    Where V is the total validator population and v is the number of validators needed per computation
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 p-8 rounded-xl border border-white/10"
            >
              <h3 className="text-2xl font-semibold text-[#c8e500] mb-8 text-center">Scalability Comparison</h3>
              
              <div className="space-y-10">
                <div>
                  <h4 className="text-lg text-white/70 mb-2">Traditional Consensus</h4>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-6 flex rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "20%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex flex-col justify-center text-center text-white text-xs whitespace-nowrap px-2 bg-red-500 rounded-full"
                      >
                        20%
                      </motion.div>
                    </div>
                    <p className="text-white/40 text-xs mt-1">Adding nodes increases redundant computation</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg text-white/70 mb-2">ZK-based Systems</h4>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-6 flex rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "50%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="flex flex-col justify-center text-center text-white text-xs whitespace-nowrap px-2 bg-yellow-500 rounded-full"
                      >
                        50%
                      </motion.div>
                    </div>
                    <p className="text-white/40 text-xs mt-1">High proving costs limit practical scalability</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg text-white/70 mb-2">OPoC Protocol</h4>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-6 flex rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex flex-col justify-center text-center text-white text-xs whitespace-nowrap px-2 bg-[#c8e500] rounded-full"
                      >
                        100%
                      </motion.div>
                    </div>
                    <p className="text-white/40 text-xs mt-1">Linear throughput scaling with network size</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <StatCounter value={10} label="Nodes" symbol="×" duration={1000} />
                  </div>
                  <div className="text-center">
                    <StatCounter value={100} label="Throughput" symbol="×" duration={1500} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
    
      
      {/* Deterministic Computation */}
   <motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px 0px" }}
  variants={fadeUpVariant}
  className="bg-black text-white py-24 px-6 md:px-24"
>
  <div className="max-w-6xl mx-auto space-y-16">
    {/* Title */}
    <div>
      <AnimatedTitle
        text="Deterministic Indeterminism"
        className="text-4xl md:text-6xl font-bold text-white"
      />
      <div className="h-1 w-24 bg-[#c8e500] mt-4"></div>
    </div>

    {/* Statement */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-10 max-w-3xl"
    >
      <h3 className="text-2xl md:text-3xl font-semibold text-[#c8e500] mb-4">
        Embracing Uncertainty, Verifying Truth
      </h3>
      <p className="text-white/70 leading-relaxed">
        Traditional systems attempt to force determinism by eliminating all randomness. But in doing so, they restrict creativity, adaptability, and the natural behavior of intelligent agents.
      </p>
      <p className="text-white/70 leading-relaxed">
        UOMI introduces <span className="text-white font-semibold">Deterministic Indeterminism</span>: an innovative approach that accepts controlled unpredictability, and proves that results are still within defined and verifiable bounds.
      </p>
    </motion.div>

    {/* Proof Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-12"
    >
      <div className="max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#c8e500] mb-4">
          Proofs, not Reproduction
        </h3>
        <p className="text-white/70 leading-relaxed">
          Instead of forcing every validator to reach an identical output, UOMI allows slight variations and proves via a probabilistic consensus that the computation was executed faithfully.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Range of Acceptable Results */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h4 className="text-xl font-semibold text-[#c8e500]">Bounded Result Spaces</h4>
          <p className="text-white/70 text-sm">
            Validators agree on an expected range of valid outcomes, rather than a single hash. This makes room for intelligent flexibility.
          </p>
        </div>

        {/* Probabilistic Verification */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h4 className="text-xl font-semibold text-[#c8e500]">Probabilistic Proofs</h4>
          <p className="text-white/70 text-sm">
            Instead of reproducing the exact result, validators verify that an output could plausibly come from the claimed model under shared conditions.
          </p>
        </div>

        {/* Security through Diversity */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h4 className="text-xl font-semibold text-[#c8e500]">Diversity as a Feature</h4>
          <p className="text-white/70 text-sm">
            Agent decisions are no longer constrained by determinism. Instead, systems evolve with a richer, more natural decision space — still verifiable, always honest.
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</motion.section>

      
     
      
      {/* Footer / Call to Action */}
     <motion.div 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeUpVariant}
  className="py-24 px-6 md:px-24 bg-black border-t border-white/10"
>
  <div className="max-w-5xl mx-auto text-center">
    <AnimatedTitle
      text="The Future of Decentralized AI"
      className="text-3xl md:text-5xl font-bold text-[#c8e500] mb-8"
    />
    
    <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-12">
      OPoC brings mathematical guarantees and economic alignment to large AI model inference, enabling a new generation of decentralized AI applications.
    </p>
    
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 max-w-2xl mx-auto">
      <button 
        className="rounded-full bg-gradient-to-r from-[#c8e500] to-[#a9c000] px-6 py-3 sm:px-8 sm:py-4 text-black font-bold text-base sm:text-lg whitespace-nowrap"
        onClick={() => window.location.href = "https://uomi.ai/consensus"}
      >
       OPoC Paper
      </button>
      <button 
        className="rounded-full bg-gradient-to-r from-[#c8e500] to-[#a9c000] px-6 py-3 sm:px-8 sm:py-4 text-black font-bold text-base sm:text-lg whitespace-nowrap"
        onClick={() => window.location.href = "https://uomi.ai/deterministc-indeterminism"}
      >
        Deterministic Undeterminism Paper
      </button>
    </div>
    
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
      className="mt-16 text-white/30 text-sm"
    >
      Building the foundation for trustless and efficient AI computation on decentralized networks
    </motion.div>
  </div>
</motion.div>
    </div>
    );
    }
