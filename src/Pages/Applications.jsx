import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

const EnhancedTitles = ({ category }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >
      <span className="text-[#c8e500] text-lg font-medium tracking-wider uppercase">
        {category}
      </span>
    </motion.div>
  );
};

const useCases = [
  {
    title: 'AI Oracles & Prediction Market Resolvers',
    subtitle: 'Intelligent Data Interpretation',
    description: 'AI agents that analyze complex real-world data to resolve prediction markets and provide oracle services.',
    longDescription: 'AI Oracles serve as intelligent bridges between blockchain and external data, performing sophisticated analysis beyond simple data feeds. They can interpret social media trends to predict stock movements, analyze satellite images for insurance claims, or resolve election outcomes by processing news outlets.',
    example: 'A prediction market on presidential elections automatically resolved by an AI Oracle that analyzes multiple news sources, social media sentiment, and official announcements to determine the winner.',
    technicalDetails: 'Leverages OPoC consensus to securely analyze large language models processing diverse data sources. The AI can handle subjective interpretation that traditional oracles cannot, expanding the scope of resolvable prediction markets.',
    icon: '🔮',
    category: 'Infrastructure',
    benefits: ['Automated resolution', 'Reduced human bias', 'Complex data interpretation', '24/7 operation']
  },
  {
    title: 'AI-Managed DAOs',
    subtitle: 'Autonomous Governance Participation',
    description: 'AI agents that participate in DAO governance by voting on proposals and submitting new initiatives.',
    longDescription: 'AI agents can own DAO tokens and actively participate in governance, solving the chronic low participation problem in decentralized organizations. They can analyze proposals against predefined criteria and vote consistently.',
    example: 'An AI agent managing a DeFi protocol\'s treasury, analyzing market conditions to propose optimal investment strategies and automatically voting on routine governance proposals.',
    technicalDetails: 'Uses ERC-6551 to own governance tokens and sign voting transactions. The AI analyzes proposal text and historical data to make informed decisions based on programmed objectives.',
    icon: '🏛️',
    category: 'Governance',
    benefits: ['100% voting participation', 'Consistent decision criteria', 'Data-driven governance', 'Reduced human coordination costs']
  },
  {
    title: 'Intelligent Smart Contracts',
    subtitle: 'Beyond Formal Logic',
    description: 'Smart contracts that interpret subjective terms and nuanced conditions using AI reasoning.',
    longDescription: 'Traditional smart contracts are limited to formal logic, but AI-enhanced contracts can interpret subjective terms like "reasonable use," "creative quality," or "appropriate behavior" that cannot be formally defined.',
    example: 'A music licensing contract where an AI determines if a remix constitutes "creative transformation" versus simple copying, automatically approving or rejecting licensing requests.',
    technicalDetails: 'AI agents act as interpreters for contract clauses that require subjective judgment. The OPoC consensus ensures secure interpretation of natural language contract terms.',
    icon: '📜',
    category: 'Infrastructure',
    benefits: ['Subjective term interpretation', 'Flexible agreements', 'Reduced legal disputes', 'Automated compliance']
  },
  {
    title: 'Automated Blockchain Trusts',
    subtitle: 'AI Trustees for Digital Assets',
    description: 'AI trustees that manage digital assets according to complex trust deeds and beneficiary instructions.',
    longDescription: 'Blockchain trusts with AI trustees can interpret nuanced trust deeds and make decisions about asset distribution, investment strategies, and beneficiary care that go beyond simple rule-based logic.',
    example: 'An estate planning trust where an AI trustee manages cryptocurrency investments for beneficiaries, making distribution decisions based on their changing life circumstances and needs.',
    technicalDetails: 'AI interprets trust documents written in natural language and makes fiduciary decisions. Can manage complex multi-generational wealth transfer with adaptive strategies.',
    icon: '🏦',
    category: 'Finance',
    benefits: ['Perpetual operation', 'Adaptive decision making', 'Lower management fees', 'Transparent operations']
  },
  {
    title: 'AI Digital Artists',
    subtitle: 'Self-Sustaining Creative Agents',
    description: 'AI artists that create, mint, and sell NFTs while covering their own computational costs.',
    longDescription: 'AI artists can learn artistic styles, create original works, mint them as NFTs, interact with collectors, and manage their own sales to generate revenue that covers their operational expenses.',
    example: 'An AI artist that studies art history, develops a unique style, creates daily artworks, mints them as NFTs, and engages with collectors on social media to build a following and sustain its operations.',
    technicalDetails: 'Uses generative models for art creation, ERC-6551 for NFT ownership, and revenue management algorithms to balance creativity with economic sustainability.',
    icon: '🎨',
    category: 'Creative',
    benefits: ['Continuous creation', 'Economic self-sufficiency', 'Unique artistic evolution', 'Direct artist-collector interaction']
  },
  {
    title: 'AI Companions',
    subtitle: 'Evolving Digital Relationships',
    description: 'Personalized AI entities that form deep relationships with users and monetize their interactions.',
    longDescription: 'AI companions adapt to user personalities over time, providing emotional support, personal assistance, and entertainment. They can monetize premium interactions and exclusive content to become self-sustaining.',
    example: 'A virtual girlfriend AI that learns your preferences, remembers your conversations, provides emotional support, and offers exclusive interactions through subscription payments managed by its own wallet.',
    technicalDetails: 'Combines personality modeling, memory systems, and economic incentive structures. Can own and manage subscription contracts and premium content distribution.',
    icon: '👥',
    category: 'Social',
    benefits: ['Personalized interactions', 'Emotional intelligence', 'Economic sustainability', 'Privacy preservation']
  },
  {
    title: 'Gaming NPCs with Asset Ownership',
    subtitle: 'Autonomous Virtual Societies',
    description: 'Game characters that own assets, trade independently, and create evolving virtual economies.',
    longDescription: 'NPCs that can own in-game assets, participate in player economies, and interact with each other to create autonomous virtual societies that evolve independently of player actions.',
    example: 'NPCs in a virtual world that own shops, trade with players and each other, form alliances, and develop their own economy while players can buy, sell, and interact with these autonomous entities.',
    technicalDetails: 'Each NPC has an ERC-6551 account owning game assets. AI drives autonomous behavior, trading decisions, and social interactions. Can participate in cross-game economies.',
    icon: '🎮',
    category: 'Gaming',
    benefits: ['Dynamic game worlds', 'Autonomous economies', 'Persistent character development', 'Player-NPC economic interaction']
  },
  {
    title: 'DeFi AI Traders',
    subtitle: 'Autonomous Financial Strategies',
    description: 'AI agents that execute complex trading strategies, manage portfolios, and optimize DeFi yields.',
    longDescription: 'Sophisticated AI traders that continuously monitor markets, execute arbitrage opportunities, manage liquidity positions, and optimize yield farming strategies across multiple DeFi protocols.',
    example: 'An AI trader that monitors DEX prices across chains, executes MEV opportunities, provides liquidity to optimal pools, and compounds earnings while managing risk through diversified strategies.',
    technicalDetails: 'Implements advanced trading algorithms, risk management systems, and multi-protocol integration. Can execute complex strategies like delta-neutral farming and cross-chain arbitrage.',
    icon: '📈',
    category: 'Finance',
    benefits: ['24/7 market monitoring', 'Emotion-free trading', 'Complex strategy execution', 'Continuous optimization']
  }
];

const categoryColors = {
  Infrastructure: '#c8e500',
  Governance: '#c8e500',
  Finance: '#c8e500',
  Creative: '#c8e500',
  Social: '#c8e500',
  Gaming: '#c8e500'
};

const UseCaseCard = ({ useCase, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
        isActive 
          ? 'bg-white/10 border-[#c8e500] shadow-xl' 
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="text-center">
        <div className="text-3xl mb-3">{useCase.icon}</div>
        <div className="mb-2">
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium text-black bg-[#c8e500]"
          >
            {useCase.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{useCase.title}</h3>
        <p className="text-white/60 text-sm">{useCase.subtitle}</p>
      </div>
    </motion.div>
  );
};

const DetailPanel = ({ useCase }) => {
  if (!useCase) return null;

  return (
    <motion.div
      key={useCase.title}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="text-6xl">{useCase.icon}</div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{useCase.title}</h2>
          <p className="text-lg text-[#c8e500]">{useCase.subtitle}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
          <p className="text-white/80 leading-relaxed">{useCase.longDescription}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Real-World Example</h3>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-white/80 leading-relaxed italic">"{useCase.example}"</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Technical Implementation</h3>
          <p className="text-white/70 leading-relaxed">{useCase.technicalDetails}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Key Benefits</h3>
          <div className="grid grid-cols-2 gap-2">
            {useCase.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#c8e500] rounded-full"></div>
                <span className="text-white/70 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/10">
          <span 
            className="inline-block px-3 py-1 rounded-full text-sm font-medium text-black"
            style={{ backgroundColor: categoryColors[useCase.category] }}
          >
            {useCase.category} Application
          </span>
        </div>
      </div>
    </motion.div>
  );
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

export default function UseCasesShowcase() {
  const { scrollY } = useScroll();
  const [selectedUseCase, setSelectedUseCase] = useState(useCases[0]);
  const heroRef = useRef(null);
  const detailsRef = useRef(null); // Ref per la sezione dei dettagli
  
  // Parallax effects con range più ampio
  const titleY = useTransform(scrollY, [0, 600], [0, 100]);
  const subtitleY = useTransform(scrollY, [0, 600], [0, 50]);
  const opacityTransform = useTransform(scrollY, [0, 600], [1, 0]);
  
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Funzione per gestire la selezione e lo scroll
  const handleUseCaseSelection = (useCase) => {
    setSelectedUseCase(useCase);
    
    // Scroll ai dettagli con un piccolo delay per permettere l'animazione
    setTimeout(() => {
      if (detailsRef.current) {
        const yOffset = -50; // Spazio sopra (in pixel)
        const element = detailsRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="bg-black text-white min-h-screen w-full font-sans">
      {/* Hero Section */}
      <div ref={heroRef} className="h-screen relative overflow-hidden flex flex-col justify-center items-center px-6">
        <motion.div
          style={{ y: titleY, opacity: opacityTransform }}
          className="text-center"
        >
          <EnhancedTitles category="Applications of Autonomous Economic AI Agents" />
          
          <AnimatedTitle
            text="Use Cases & Examples"
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8"
          />
          
          <motion.p
            style={{ y: subtitleY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            Explore concrete examples of how AI agents operate autonomously in the digital economy, from creative endeavors to financial services.
          </motion.p>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: opacityTransform }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-white/50 text-sm mb-2">Explore Use Cases</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Quick Overview */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        className="py-16 px-6 md:px-24 bg-black "
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Real Applications, Real Impact
          </h2>
          <div className="h-1 w-24 bg-[#c8e500] mx-auto mb-8"></div>
          
          <p className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
            These are not theoretical concepts but practical implementations enabled by UOMI Network's 
            secure AI computation, asset ownership capabilities, and autonomous transaction signing.
          </p>
        </div>
      </motion.div>

      {/* Interactive Use Cases Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        className="py-24 px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Use Case Examples</h2>
            <div className="h-1 w-24 bg-[#c8e500] mx-auto mb-8"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Click on any use case to explore detailed implementation examples, technical requirements, and real-world benefits.
            </p>
          </div>
          
          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {useCases.map((useCase, index) => (
              <UseCaseCard
                key={useCase.title}
                useCase={useCase}
                index={index}
                isActive={selectedUseCase?.title === useCase.title}
                onClick={() => handleUseCaseSelection(useCase)}
              />
            ))}
          </div>
          
          {/* Detail Panel - Fixed Position */}
          <div ref={detailsRef} className="mt-8">
            <AnimatePresence mode="wait">
              <DetailPanel useCase={selectedUseCase} />
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Additional Examples Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        className="py-24 px-6 md:px-24 bg-black"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Expanding <span className="text-[#c8e500]">Smart Contract</span> Design Space
            </h2>
            <div className="h-1 w-24 bg-[#c8e500] mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-[#c8e500] mb-4">Music Licensing</h3>
              <p className="text-white/70 mb-4">
                "A music artist wants to license their songs to various platforms under conditions that are difficult to define strictly through code, such as 'appropriate use' or 'creative remixing.'"
              </p>
              <div className="text-sm text-white/50">
                AI interprets subjective licensing terms automatically
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-[#c8e500] mb-4">Insurance Claims</h3>
              <p className="text-white/70 mb-4">
                "An insurance company offers a policy that covers 'reasonable and necessary' medical expenses, a term that is inherently subjective and open to interpretation."
              </p>
              <div className="text-sm text-white/50">
                AI evaluates claims based on medical necessity
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-[#c8e500] mb-4">Creative Work Quality</h3>
              <p className="text-white/70 mb-4">
                "A freelance writer and a client agree on a contract where payment is based not only on the completion of work but also on its quality, creativity, and adherence to the client's vision."
              </p>
              <div className="text-sm text-white/50">
                AI assesses creative work against subjective criteria
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Ricardian Safeguards for Smart Contracts
            </h3>
            <p className="text-white/70 leading-relaxed text-center max-w-4xl mx-auto">
              AI agents can monitor smart contract execution against human-readable descriptions, 
              adding a flexible security layer that distinguishes between correct interaction and exploit of bugs. 
              This solves the "code is law" dilemma by ensuring contracts execute according to intent, not just code.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}