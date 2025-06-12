import React, { useState, useEffect, useRef } from 'react';
import { Search, Book, Code, Cpu, Users, ArrowRight, X, Terminal, Shield, Rocket, Palette, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

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

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// Header component with hero section
const Header = () => (
  <motion.div className="text-center mb-16">
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-medium"
      style={{ 
        backgroundColor: "rgba(223, 254, 0, 0.1)",
        color: "#dffe00"
      }}
    >
      DOCUMENTATION
    </motion.div>
    
    <motion.h1
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-6xl font-bold mb-4 text-white"
    >
      Deploy Unstoppable Agents.
    </motion.h1>
    
    <motion.p
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
      className="max-w-xl mx-auto text-zinc-400 text-lg mb-8"
    >
      Full EVM-compatibility.
    </motion.p>

    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.3 }}
      className="flex items-center justify-center gap-4"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-white rounded-lg px-6 py-3 flex items-center space-x-2 font-medium"
        style={{
          backgroundColor: "#dffe00",
          color: "#000",
          boxShadow: "0 4px 10px -1px rgba(223, 254, 0, 0.2)",
        }}
        onClick={() => window.location.href = "https://docs.uomi.ai/"}
      >
        <Zap size={16} />
        <span>Quick Start</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="border border-zinc-700 rounded-lg px-6 py-3 flex items-center space-x-2 text-white"
        onClick={() => window.open('https://discord.gg/RV5DUpjsdY', '_blank')}
      >
        <Terminal size={16} />
        <span>Join the Developer Discord</span>
      </motion.button>
    </motion.div>
  </motion.div>
);

// Background animation component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Draw diagonal grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;

      const gridSize = 40;
      const angle = Math.PI / 6; // 30 degrees
      
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i - canvas.height * Math.tan(angle), canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i - canvas.width * Math.tan(angle));
        ctx.stroke();
      }

      // Draw animated orbs with purple gradient
      for (let i = 0; i < 3; i++) {
        const radius = 100 + i * 50;
        const x = canvas.width * (0.3 + i * 0.2);
        const y = canvas.height * 0.7 + Math.sin(time + i) * 50;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.1)');
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

// Quick Start section


// Testnet section
const TestnetSection = () => (
  <motion.div
    variants={staggerContainerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mb-24"
  >
    <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-8 backdrop-blur-sm">
      <motion.h2 variants={gridItemVariants} className="text-3xl font-bold text-white mb-4">
        Deploy on UOMI Testnet
      </motion.h2>
      <motion.p variants={gridItemVariants} className="text-zinc-400 mb-8 max-w-xl">
        Everything you need to deploy on UOMI Testnet, from the faucet, network details and explorer, we got you.
      </motion.p>
      
      <motion.div variants={gridItemVariants} className="flex gap-4 mb-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#dffe00]/10 text-[#dffe00] border border-[#dffe00]/30"
        >
          <Globe size={16} />
          UOMI Testnet
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 text-white hover:cursor-pointer"
          onClick={() => window.open('https://explorer.uomi.ai/', '_blank')}
        >
          <Search size={16} />
          Testnet Block Explorer
        </motion.button>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div variants={gridItemVariants} className="space-y-4">
          {[
            { label: "Network Name", value: "UOMI Finney", icon: null },
            { label: "Chain ID", value: "4386", icon: null },
            { label: "Default RPC URL", value: "https://finney.uomi.ai", icon: null },
            { label: "Block explorer URL", value: "https://explorer.uomi.ai/", icon: null },
            { label: "Currency symbol", value: "UOMI", icon: null },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-black/30 rounded">
              <span className="text-zinc-400">{item.label}</span>
              <span className="text-white font-medium flex items-center gap-2">
                {item.value}
               
              </span>
            </div>
          ))}
        </motion.div>
        
        <motion.div variants={gridItemVariants} className="bg-black/30 rounded-lg p-6">
          <div className="text-center space-y-4">
            <div className="text-zinc-400 mb-4">Testnet tokens are for development purposes only, they do not have value.</div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#dffe00] text-black font-medium py-4 rounded-lg inline-flex items-center justify-center gap-2 hover:cursor-pointer"
              onClick={() => window.open('https://app.uomi.ai/faucet', '_blank')}
            >
              <span>Get Testnet Tokens</span>
              <ArrowRight size={16} />
            </motion.button>
            
            <div className="text-xs text-zinc-400">Access the faucet to get UOMI testnet tokens</div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// Guide card component
const GuideCard = ({ title, icon: Icon, description }) => (
  <motion.div
    variants={gridItemVariants}
    whileHover={{ scale: 1.02 }}
    className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6 backdrop-blur-sm hover:border-[#dffe00]/30 transition-colors cursor-pointer"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-[#dffe00]/10">
        <Icon className="h-5 w-5 text-[#dffe00]" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="text-zinc-400 text-sm">{description}</p>
  </motion.div>
);

// Search component
const SearchBar = ({ searchQuery, setSearchQuery, isSearchFocused, setIsSearchFocused, showClearButton, clearSearch }) => (
  <motion.div
    variants={fadeUpVariants}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.3 }}
    className="max-w-xl mx-auto mb-16 relative"
  >
    <div 
      className={`absolute inset-0 rounded-xl transition-all duration-300 ${
        isSearchFocused ? 'shadow-[0_0_30px_rgba(223,254,0,0.1)]' : ''
      }`}
    />
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
      <input
        type="text"
        placeholder="Search documentation..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        className="w-full bg-zinc-900/30 border border-zinc-800/50 rounded-xl py-4 pl-12 pr-12 
          text-white placeholder-zinc-500 focus:outline-none focus:border-[#dffe00]/30
          backdrop-blur-sm transition-all duration-300"
      
      />
      {showClearButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={clearSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 
            text-zinc-500 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  </motion.div>
);

// Category card component
const CategoryCard = ({ icon: Icon, title, description, links }) => (
  <motion.div 
    variants={gridItemVariants}
    className="group relative"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-[#dffe00]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
    
    <div className="relative p-8 border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm rounded-xl h-full flex flex-col">
      <div className="mb-5">
        <div
          className="mb-5 p-3 rounded-lg w-12 h-12 flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: "rgba(223, 254, 0, 0.1)",
          }}
        >
          <Icon className="h-5 w-5" style={{ color: "#dffe00" }} />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#dffe00] transition-colors duration-300">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>
      
      <div className="flex-grow overflow-hidden flex flex-col">
        <h4 className="text-xs uppercase text-zinc-500 mb-2 font-medium tracking-wider">Resources</h4>
        <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar flex-grow">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              className="flex items-center justify-between text-zinc-400 hover:text-white py-1.5 group/link transition-colors duration-200"
            >
              <span className="truncate text-sm mr-2">{link.title}</span>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="flex-shrink-0"
              >
                <ArrowRight className="w-3.5 h-3.5 text-[#dffe00]" />
              </motion.div>
            </a>
          ))}
        </div>
      </div>
      
      <div className="absolute -bottom-6 -right-6 w-12 h-12 rotate-45 bg-[#dffe00]/5 group-hover:bg-[#dffe00]/10 transition-colors duration-300"></div>
    </div>
  </motion.div>
);

// No results component
const NoResults = ({ searchQuery }) => (
  <motion.div 
    variants={fadeUpVariants}
    initial="hidden"
    animate="visible"
    className="text-center rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-8 max-w-lg mx-auto"
  >
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800/50 mb-4">
      <Search className="w-5 h-5 text-zinc-400" />
    </div>
    <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
    <p className="text-zinc-400">We couldn't find any matches for "{searchQuery}"</p>
  </motion.div>
);

// Main component
const DocsLanding = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);

  const categories = [
    {
      icon: Book,
      title: "Learn",
      description: "Get started with UOMI blockchain and understand the core concepts",
      tags: ["introduction", "basics", "core concepts", "architecture", "consensus"],
      links: [
        { title: "Introduction to UOMI", url: "https://docs.uomi.ai/" },
        { title: "Architecture Overview", url: "https://docs.uomi.ai/learn/architecture" },
        { title: "OPoC Consensus", url: "https://docs.uomi.ai/learn/security/opoc" },
        { title: "Security Model", url: "https://docs.uomi.ai/learn/security" },
        { title: "Agents", url: "https://docs.uomi.ai/learn/infrastructure/agents" }
      ]
    },
    {
      icon: Code,
      title: "Build",
      description: "Develop applications and smart contracts on UOMI",
      tags: ["development", "smart contracts", "wasm", "api", "dapps"],
      links: [
        { title: "EVM Smart Contracts", url: "https://docs.uomi.ai/build/evm-smart-contracts/introduction-to-evm-smart-contracts" },
        { title: "WASM Smart Contracts", url: "https://docs.uomi.ai/build/wasm-smart-contracts" },
      ]
    },
    {
      icon: Cpu,
      title: "Nodes",
      description: "Set up and operate a UOMI blockchain node",
      tags: ["node", "validator", "staking", "operations", "setup"],
      links: [
        { title: "Archive node", url: "https://docs.uomi.ai/build/run-a-node/run-an-archive-node" },
        { title: "Full node", url: "https://docs.uomi.ai/build/run-a-node/run-a-full-node" },
        { title: "Validator node", url: "https://docs.uomi.ai/build/run-a-node/become-a-validator/learn-about-validators" }
      ]
    },
    {
      icon: Users,
      title: "Agents",
      description: "Learn and develop agents for UOMI blockchain",
      tags: ["agents", "agenti", "agents mapping", "setup"],
      links: [
        { title: "Introduction", url: "https://docs.uomi.ai/build/build-an-agent/introduction" },
        { title: "Important notice", url: "https://docs.uomi.ai/build/build-an-agent/development" },
        { title: "WASP", url: "https://docs.uomi.ai/build/build-an-agent/installing-wasp" },
        { title: "Agents API Reference", url: "https://docs.uomi.ai/build/build-an-agent/agents-api-reference" }
      ]
    },
  ];

  const guides = [
    {
      title: "Deploy a smart contract",
      icon: Code,
      description: "Learn how to deploy your first smart contract to UOMI"
    },
    {
      title: "Verify smart contracts",
      icon: Shield,
      description: "Verify your contracts on UOMI explorer"
    },
    {
      title: "Basic dApp with Scaffold-eth",
      icon: Palette,
      description: "Build your first decentralized application"
    }
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = categories.filter(category => {
        const searchLower = searchQuery.toLowerCase();
        return (
          category.title.toLowerCase().includes(searchLower) ||
          category.description.toLowerCase().includes(searchLower) ||
          category.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          category.links.some(link => link.title.toLowerCase().includes(searchLower))
        );
      });
      setFilteredCategories(filtered);
      setShowClearButton(true);
    } else {
      setFilteredCategories(categories);
      setShowClearButton(false);
    }
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCategories(categories);
    setShowClearButton(false);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <Header />
        
        <TestnetSection />
        
        <motion.h2 
          variants={gridItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-8"
        >
          Guides
        </motion.h2>
        
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4 mb-24"
        >
          {guides.map((guide, index) => (
            <GuideCard key={index} {...guide} />
          ))}
        </motion.div>
        
        <motion.div
          variants={gridItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <button className="text-zinc-400 hover:text-white flex items-center gap-2">
            View all guides <ArrowRight size={16} />
          </button>
        </motion.div>
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          showClearButton={showClearButton}
          clearSearch={clearSearch}
        />
        
        {filteredCategories.length > 0 ? (
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6"
            style={{ minHeight: "400px" }}
          >
            {filteredCategories.map((category, index) => (
              <CategoryCard 
                key={index} 
                {...category}
              />
            ))}
          </motion.div>
        ) : (
          <NoResults searchQuery={searchQuery} />
        )}
        
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-zinc-800/50 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#c8e500" }}
            whileTap={{ scale: 0.98 }}
            className="text-black rounded-lg px-6 py-3 inline-flex items-center space-x-2 font-medium hover:cursor-pointer"
            style={{
              backgroundColor: "#dffe00",
              boxShadow: "0 4px 10px -1px rgba(223, 254, 0, 0.2)",
            }}
            onClick={() => window.location.href = "https://docs.uomi.ai/"}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.location.href = "https://docs.uomi.ai/";
              }
            }}
            role="button"
          >
            <span>Get Started with UOMI</span>
            <ArrowRight size={16} className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(223, 254, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(223, 254, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default DocsLanding;