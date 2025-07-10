import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UomiGrants = () => {
  // State
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('individual');

  // Animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  const pulseVariant = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.02, 1],
      transition: { 
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const statsVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: i * 0.15,
        ease: "easeOut" 
      } 
    })
  };

  // Community stats
  const communityStats = [
    {
      label: "Discord Members",
      value: "7,203",
      percentage: 80,
      color: "bg-indigo-500"
    },
    {
      label: "X Followers",
      value: "103,424",
      percentage: 65,
      color: "bg-blue-500"
    },
  ];

  // Example DApp categories
  const dappCategories = [
    { name: "DeFi", icon: "💰" },
    { name: "Games", icon: "🎮" },
    { name: "Marketplaces", icon: "🏪" },
    { name: "Social", icon: "👥" },
    { name: "NFTs", icon: "🖼️" },
    { name: "DAOs", icon: "🏛️" },
    { name: "Identity", icon: "🔐" },
    { name: "Content", icon: "📝" }
  ];

  // Community support options
  const communitySupport = [
    {
      title: "Technical Mentorship",
      description: "Direct access to UOMI core developers and ecosystem experts for technical guidance.",
      icon: "👨‍💻"
    },
    {
      title: "Growth Workshops",
      description: "Regular sessions with industry experts on business development and user acquisition.",
      icon: "📈"
    },
    {
      title: "Security Audits",
      description: "Subsidized security reviews and best practices for your project's smart contracts.",
      icon: "🔒"
    },
    {
      title: "Community Spotlight",
      description: "Featured promotion across UOMI channels, newsletter, and events.",
      icon: "🔍"
    }
  ];

  // Marketing partnerships
  const marketingPartnerships = [
    {
      name: "Exclusive Media Coverage",
      description: "Featured articles and interviews with top blockchain media outlets.",
      icon: "📱"
    },
    {
      name: "Conference Sponsorship",
      description: "Subsidized booth space at major blockchain events worldwide.",
      icon: "🎪"
    },
    {
      name: "Co-Marketing Campaigns",
      description: "Joint marketing initiatives with UOMI and ecosystem partners.",
      icon: "🤝"
    }
  ];

  // Grant types
  const grantTypes = [
    {
      title: "Individual Grants",
      description: "For solo developers and small teams building innovative UOMI applications.",
      amount: "Up to $10,000",
      tab: "individual"
    },
    {
      title: "Ecosystem Grants",
      description: "For established projects expanding the UOMI ecosystem with essential infrastructure.",
      amount: "Up to $50,000",
      tab: "ecosystem"
    }
  ];

  // Success stories
  

  // FAQ items
  const faqItems = [
    {
      question: "What is the UOMI Grants Program?",
      answer: "The UOMI Grants Program provides funding to developers and teams building innovative decentralized applications on the UOMI Network. The program aims to support projects that leverage OPoC consensus for AI computation, fostering a vibrant ecosystem of AI-powered DApps."
    },
    {
      question: "Which projects are eligible to apply?",
      answer: "Any project building on the UOMI Network is eligible to apply for a grant. This includes DeFi applications, games, marketplaces, social platforms, NFT projects, DAOs, identity solutions, content platforms, and more. The main requirement is that the project utilizes UOMI's infrastructure and contributes to the ecosystem's growth."
    },
    {
      question: "How do I apply for a grant?",
      answer: "To apply for a grant, you need to fill out the application form on the UOMI grants portal. Your application should include a detailed project description, technical implementation plan, team information, timeline, budget breakdown, and expected impact on the UOMI ecosystem."
    },
    {
      question: "What happens after I submit my application?",
      answer: "After submission, your application undergoes an initial screening. If it passes, you'll be invited for an interview with the grants committee. Final decisions are typically made within 2-3 weeks of submission."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[#060606]"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]"
        >
          {Array(400).fill(0).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/5"></div>
          ))}
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10">
      

        {/* Hero Section with animated gradient */}
        <div className="pt-40 pb-20 px-6 text-center" id="about">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="inline-flex items-center mb-6"
          >
            <h1 className="text-6xl sm:text-7xl font-bold text-white">
              UOMI <span className="text-[#BDF82D]">Grants</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl max-w-2xl mx-auto mt-8"
          >
            Empowering developers to build the next generation of decentralized 
            applications powered by the UOMI Network.
          </motion.p>
          
          {/* Prominently featured amount */}
          <motion.div
            variants={pulseVariant}
            initial="initial"
            animate="animate"
            className="my-24"
          >
            <span className="block text-white/40 uppercase tracking-widest text-sm mb-4">Total Grants Available</span>
            <h2 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-[#BDF82D]">
              $500,000
            </h2>
            <div className="flex items-center justify-center gap-2 text-white/60 mt-6 mb-12">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Applications Open</span>
            </div>
            
            {/* CTA Button in Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <motion.button 
                className="inline-block py-4 px-12 bg-transparent border-2 border-[#BDF82D] text-[#BDF82D] text-xl font-bold rounded-full transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(189, 248, 45, 1)",
                  color: "#000000",
                  boxShadow: "0 0 25px rgba(189, 248, 45, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                //on click go to https://docs.google.com/forms/d/1ynl_5yW9uuVfyJoSM7pIMMuMwMxcZn8UguLTjUe-e_g
                onClick={() => window.open("https://docs.google.com/forms/d/1ynl_5yW9uuVfyJoSM7pIMMuMwMxcZn8UguLTjUe-e_g", "_blank")}
              >
                Apply for a Grant
              </motion.button>
              <p className="text-white/40 text-sm mt-4">
                Average review time: 2-3 weeks
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Main content */}
        <div className="max-w-6xl mx-auto px-6">

          {/* Grant Types Section - New */}
          <motion.section
            id="grants"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="my-32"
          >
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Grant Types</h2>
            <p className="text-white/60 text-center mb-16 max-w-3xl mx-auto">Choose the grant program that best fits your project needs and experience level.</p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-white/5 rounded-full p-1">
                {grantTypes.map((type) => (
                  <button
                    key={type.tab}
                    onClick={() => setActiveTab(type.tab)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === type.tab 
                        ? "bg-[#BDF82D] text-black" 
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {type.title}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {grantTypes.map((type) => (
                <motion.div
                  key={type.tab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeTab === type.tab ? 1 : 0.3,
                    y: 0,
                    scale: activeTab === type.tab ? 1 : 0.98
                  }}
                  transition={{ duration: 0.4 }}
                  className={`border border-white/10 rounded-xl p-8 transition-all duration-300 ${
                    activeTab === type.tab ? "border-[#BDF82D]/30" : ""
                  }`}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                  <p className="text-white/60 mb-6">{type.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#BDF82D] font-medium">{type.amount}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-xs py-1 px-3 border border-white/20 rounded-full text-white/80 hover:bg-white/5 transition-all"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* DApp Categories in hexagonal grid */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="my-32"
          >
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Build Anything</h2>
            <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
              From DeFi protocols to social platforms, games to identity solutions - 
              the possibilities on UOMI are endless.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {dappCategories.map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(200, 229, 0, 0.1)",
                    borderColor: "rgba(200, 229, 0, 0.3)"
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: i * 0.05
                  }}
                  className="aspect-square flex flex-col items-center justify-center border border-white/10 rounded-xl transition-all duration-300"
                >
                  <span className="text-3xl mb-4">{category.icon}</span>
                  <span className="text-lg font-medium text-white/80">{category.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
         
          
          {/* Community Support - New Section */}
          <motion.section
            id="support"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="my-32"
          >
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Community Support</h2>
            <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
              Beyond funding, we provide comprehensive support to help your project succeed.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communitySupport.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-b from-white/5 to-transparent rounded-xl p-6 border border-white/10"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Marketing Partnerships - New Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="my-32"
          >
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Marketing Partnerships</h2>
            <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
              Gain visibility and reach through our extensive network of partners and media channels.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketingPartnerships.map((partnership, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative border border-white/10 rounded-xl p-8 overflow-hidden group"
                >
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BDF82D] to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0.5, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 0.7 }}
                    transition={{ delay: 0.2, duration: 1.5 }}
                  ></motion.div>
                  
                  <div className="text-3xl mb-6">{partnership.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{partnership.name}</h3>
                  <p className="text-white/60">{partnership.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Community stats with improved design */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="my-32"
          >
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Community</h2>
            <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
              Join our thriving community of builders, creators, and innovators.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {communityStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/70 text-lg">{stat.label}</span>
                    <span className="text-white font-medium text-xl">{stat.value}</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.percentage}%` }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className={`h-full ${stat.color} rounded-full`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
        
          
          {/* Application Process - Clean Numbered Steps */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="my-32"
          >
            <h2 className="text-4xl font-bold text-white mb-6 text-center">How to Apply</h2>
            <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
              A simple three-step process to apply for UOMI grants funding.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: "Prepare",
                  description: "Review documentation and develop a clear project plan with objectives, timeline, and budget."
                },
                {
                  step: 2,
                  title: "Submit",
                  description: "Complete the application with detailed information about your project, team, and ecosystem contribution."
                },
                {
                  step: 3,
                  title: "Review",
                  description: "Applications are reviewed by Grant Allocators. You may be contacted for additional information."
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative bg-gradient-to-b from-white/5 to-transparent rounded-xl p-8 border border-white/10"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#BDF82D] text-black font-bold absolute -top-5 left-8">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-6 mb-4">{step.title}</h3>
                  <p className="text-white/60">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          
          {/* CTA section */}
          <div className="text-center my-40">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-10"
            >
              Ready to Build on <span className="text-[#BDF82D]">UOMI</span>?
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.button 
                className="inline-block py-4 px-12 bg-transparent border-2 border-[#BDF82D] text-[#BDF82D] text-xl font-bold rounded-full transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(189, 248, 45, 1)",
                  color: "#000000",
                  boxShadow: "0 0 25px rgba(189, 248, 45, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                onClick={() => window.open("https://docs.google.com/forms/d/1ynl_5yW9uuVfyJoSM7pIMMuMwMxcZn8UguLTjUe-e_g", "_blank")}
              >
                Apply for a Grant
              </motion.button>
              <p className="text-white/40 text-sm mt-4">
                Average review time: 2-3 weeks
              </p>
            </motion.div>
          </div>

            {/* FAQ section - Improved UX */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="my-32"
          >
            <h2 className="text-4xl font-bold text-white mb-6 text-center">FAQ</h2>
            <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
              Common questions about the UOMI Grants Program.
            </p>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white/5 rounded-xl overflow-hidden border border-white/10"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-4 px-6 text-left flex justify-between items-center"
                  >
                    <h4 className="text-lg font-medium text-white">{item.question}</h4>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: openFaq === i ? "auto" : 0,
                      opacity: openFaq === i ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="text-white/60 p-6 pt-0 border-t border-white/10">
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default UomiGrants;