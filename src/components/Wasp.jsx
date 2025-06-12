import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Copy, ExternalLink, Terminal, Code, Cpu, GitBranch, Zap, Globe } from "lucide-react";

const WaspPresentation = () => {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    code: useRef(null),
    workflow: useRef(null)
  };
  const [copied, setCopied] = useState(false);
  
  // Sticky navigation opacity
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText('npx wasp create');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Determine which section is active based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      // Check each section's position and set active accordingly
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Progress indicator for sticky code section

  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">      
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={sectionRefs.hero}
        className="pt-32 pb-24 relative overflow-hidden min-h-screen flex items-center"
      >
        {/* Abstract geometric background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#c8e500]/50 via-[#c8e500]/10 to-transparent"
          ></motion.div>
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#c8e500]/50 via-[#c8e500]/10 to-transparent"
          ></motion.div>
          
          <motion.div 
            className="absolute top-40 right-40 w-80 h-80 rounded-full opacity-10 bg-[#c8e500] blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 bg-zinc-900 rounded-full text-xs border border-zinc-800 text-[#c8e500] mb-6">
                <span className="mr-2">•</span>UOMI NETWORK
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Build autonomous <br />agents with <span className="text-[#c8e500]">WASP</span>
              </h1>
              
              <p className="text-zinc-400 text-lg mb-8 max-w-md leading-relaxed">
                A powerful, minimal framework for creating autonomous agents using WebAssembly and Rust.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-10">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#c8e500] text-black rounded-md px-5 py-2.5 text-sm font-medium hover:bg-[#daff00] transition-colors duration-200"
                  onClick={() => window.open("https://docs.uomi.ai/build/build-an-agent/installing-wasp", "_blank")}
                >
                  Start Building
                </motion.button>
                
                <motion.button
                  whileHover={{ borderColor: "#c8e500" }}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-200"
                  onClick={() => window.open("https://docs.uomi.ai/build/build-an-agent", "_blank")}
                >
                  Read Documentation
                </motion.button>
              </div>
              
              <div className="flex items-center text-zinc-500 text-sm">
                <span className="mr-2">Powered by</span>
                <div className="h-px w-2 bg-zinc-800 mr-2"></div>
                <span className="mr-4">Rust</span>
                <div className="h-px w-2 bg-zinc-800 mr-2"></div>
                <span className="mr-4">WebAssembly</span>
                <div className="h-px w-2 bg-zinc-800 mr-2"></div>
                <span>Node.js</span>
              </div>
            </motion.div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                 
                </div>
                
                <div className="font-mono text-sm mb-3 text-zinc-300">
                  <span className="text-[#c8e500]">$</span> npx wasp create
                </div>
                
                <motion.button 
                  onClick={copyToClipboard}
                  className="absolute top-5 right-5 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy size={16} />
                </motion.button>
                
                <AnimatePresence>
                  {copied && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-8 right-0 text-xs bg-zinc-900 px-2 py-1 rounded text-[#c8e500]"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="border-t border-zinc-800 mt-2 pt-2 text-xs text-zinc-500">
                  <div className="mb-1">Creating a new WASP agent in my-agent...</div>
                  <div className="mb-1 text-green-500">✓ Project structure initialized</div>
                  <div className="mb-1 text-green-500">✓ Dependencies installed</div>
                  <div className="text-zinc-300">
                    Success! <span className="text-[#c8e500]">cd my-agent</span> and <span className="text-[#c8e500]">npm start</span> to begin
                  </div>
                </div>
              </motion.div>
              
              {/* Abstract design elements */}
              <div className="absolute -top-5 -right-5 w-10 h-10 border-t border-r border-[#c8e500]/30"></div>
              <div className="absolute -bottom-5 -left-5 w-10 h-10 border-b border-l border-[#c8e500]/30"></div>
              <motion.div 
                className="absolute -z-10 -top-2 -left-2 -bottom-2 -right-2 border border-zinc-800 rounded-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              ></motion.div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop" 
            }}
            className="flex flex-col items-center"
          >
            <div className="text-xs text-zinc-500 mb-2">Scroll to explore</div>
            <div className="w-5 h-10 rounded-full border border-zinc-700 flex items-center justify-center">
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
                className="w-1.5 h-1.5 bg-[#c8e500] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
      
    {/* Features Section */}
        <section 
          id="features" 
          ref={sectionRefs.features} 
          className="py-24 bg-black relative"
        >
      
          {/* Section indicator line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-900 hidden lg:block"></div>
          
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-zinc-900 rounded-full text-xs border border-zinc-800 text-[#c8e500] mb-4 group"
            >
              <span className="mr-2 group-hover:text-white transition-colors duration-200">•</span>FEATURES
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Everything you need
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-400 max-w-md mx-auto"
            >
              Powerful tools designed to make agent development intuitive and efficient
            </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Hot Reloading",
                description: "Instant feedback with our hot-reloading development environment for rapid iteration"
              },
              {
                icon: Cpu,
                title: "WASM Performance",
                description: "High-performance execution powered by WebAssembly and Rust's zero-cost abstractions"
              },
              {
                icon: Terminal,
                title: "Interactive Console",
                description: "Test your agents with rich commands, conversation history, and detailed metrics"
              },
              {
                icon: Globe,
                title: "Multiple LLM Support",
                description: "Seamless integration with UOMI and third-party language models via a unified API"
              },
              {
                icon: Code,
                title: "Debugging Tools",
                description: "Comprehensive tools for debugging, performance monitoring, and error tracing"
              },
              {
                icon: GitBranch,
                title: "Version Control",
                description: "Track agent evolution and development with built-in versioning and lifecycle management"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 h-full flex flex-col relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[#c8e500] font-medium text-sm">
                    {React.createElement(feature.icon, { size: 24 })}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#c8e500]/20"></div>
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm flex-grow">{feature.description}</p>
               
                </div>
                
                {/* Step indicator dot - visible on mobile */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#c8e500] z-20 md:hidden"></div>
                
           
              </motion.div>
             
            ))}
            </div>
            </div>

       
          
        </section>
        
        {/* Code Example Section with Sticky Effect */}
            <section 
              id="code" 
              ref={sectionRefs.code}
              className="sticky top-0 z-30 bg-zinc-950 py-20 border-y border-zinc-900 min-h-screen flex items-center"
            >
              
              <div  className="container mx-auto px-6 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-block px-3 py-1 bg-zinc-900 rounded-full text-xs border border-zinc-800 text-[#c8e500] mb-4">
                    <span className="mr-2">•</span>CODE
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                    Elegant by design
                    </h2>
                    
                    <p className="text-zinc-400 mb-10 leading-relaxed max-w-md">
                    Write clean, concise code that's both powerful and easy to understand. WASP abstracts the complexity while giving you full control.
                    </p>
                    
                    <div className="space-y-5 mb-10">
                    {[
                      { title: "Type-safe Development", desc: "Leverage Rust's powerful type system" },
                      { title: "WebAssembly Optimization", desc: "Compiled to efficient, portable WASM" },
                      { title: "Intuitive Developer API", desc: "Clean, ergonomic interface for developers" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="mt-1 w-5 h-5 rounded-full border border-[#c8e500]/30 flex items-center justify-center flex-shrink-0 mr-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c8e500]"></div>
                        </div>
                        <div>
                        <h4 className="text-sm font-medium text-white">{item.title}</h4>
                        <p className="text-xs text-zinc-400">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                    </div>
                    
                   
                  </motion.div>
                </div>
                
                <div className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative"
                  >
                    <div className="absolute -top-6 -right-6 w-12 h-12 border-t border-r border-[#c8e500]/20 rounded-tr-lg"></div>
                    <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b border-l border-[#c8e500]/20 rounded-bl-lg"></div>
                    
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-zinc-800">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs text-zinc-400">agent.rs</div>
                      <div className="text-xs text-zinc-500">Rust</div>
                    </div>
                    
                    <div className="relative">
                      <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-zinc-300">
                        <code>{`use serde::{Deserialize, Serialize};
use utils::log;
mod utils;

#[derive(Serialize, Deserialize, Debug)]
struct Message {
    role: String,
    content: String,
}

fn parse_input(input: &str) -> Vec<Message> {
    // Parse the input string into a JSON Value
    let parsed: Vec<Message> = serde_json::from_str(input)
        .expect("Failed to parse input JSON");
    parsed
}

fn system_message(content: String) -> Message {
    Message {
        role: "system".to_string(),
        content,
    }
}

fn process_messages(
      system_message: Message, 
      mut messages: Vec<Message>) -> Vec<Message> {
    messages.insert(0, system_message);
    messages
}

#[no_mangle]
pub extern "C" fn run() {
    log("Start agent execution!");
    
    //get the input
    let input = utils::read_input();
    
    let input = String::from_utf8_lossy(&input);

    let input = parse_input(&input);
    
    //create a system message
    let system_message = system_message("You are a UOMI Agent!".to_string());

    let modified_messages = process_messages(system_message, input);
    
    let ai_input= serde_json::json!({
        "messages": modified_messages,
    }).to_string();

    let ai_input_bytes = ai_input.as_bytes().to_vec();

    let ai_response = utils::call_ai_service(1, ai_input_bytes);

    let ai_response_str = String::from_utf8(ai_response.clone()).unwrap();

    let ai_response_content = extract_ai_response_content(ai_response_str);

    let ai_response_content_bytes = ai_response_content.as_bytes().to_vec();

    // save output
    utils::save_output(&ai_response_content_bytes);
}`}</code>
                      </pre>
                      
                      {/* Line highlight effect */}
                      <motion.div 
                        className="absolute left-0 h-5 w-full bg-[#c8e500]/10 border-l-2 border-[#c8e500]"
                        style={{ top: `50%` }} // Fixed at the center
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    </div>
                  </motion.div>
                </div>
                </div>
                
                {/* Execution flow visualization */}
                <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-20 relative"
                >
                <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-800 -translate-y-1/2"></div>
                
                <div className="flex justify-between relative overflow-x-auto">
                  {[
                    { label: "Write Rust Code", color: "border-blue-500" },
                    { label: "Compile to WASM", color: "border-purple-500" },
                    { label: "Deploy to UOMI", color: "border-[#c8e500]" },
                    { label: "Execute On-Chain", color: "border-green-500" }
                  ].map((step, index) => (
                    <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="flex flex-col items-center relative bg-zinc-950 px-2"
                    >
                    <div className={`w-4 h-4 rounded-full bg-zinc-900 ${step.color} border-2 mb-2`}></div>
                    <div className="text-xs text-zinc-400">{step.label}</div>
                    </motion.div>
                  ))}
                </div>
                </motion.div>
              </div>
            </section>
            
         
      </div>

  );
};
export default WaspPresentation;