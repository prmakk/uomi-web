import { motion } from "framer-motion";

const EnhancedTitles = ({ 
    category = "Features", 
    title = undefined,
    titleBreak = true // If true, will split title into two lines at first space after halfway point
  }) => {
    // Animation variants
    const fadeUpVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
      }
    };
    
    const lineVariants = {
      hidden: { width: 0, opacity: 0 },
      visible: {
        width: '6rem',
        opacity: 1,
        transition: { duration: 1.2, ease: "easeOut", delay: 0.4 }
      }
    };
    
    const letterVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: i => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: i * 0.05,
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      })
    };
    
    const glowingDot = {
      hidden: { scale: 0.5, opacity: 0 },
      visible: {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    };
    
    // Process title for animation and line breaks if needed (only if title exists)
    let firstLine = title;
    let secondLine = "";
    
    if (title && titleBreak) {
      // Find a good breaking point - after the first space past the middle
      const midPoint = Math.floor(title.length / 2);
      const breakIndex = title.indexOf(' ', midPoint);
      
      if (breakIndex !== -1) {
        firstLine = title.substring(0, breakIndex);
        secondLine = title.substring(breakIndex + 1);
      }
    }
    
    return (
      <div className={`${title ? 'mb-16' : 'mb-8'} relative`}>
        {/* Decorative elements */}
        <motion.div
          className="absolute w-20 h-20 -top-10 left-1/2 -ml-10 opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.2, 0.1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#dffe00" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="#dffe00" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="#dffe00" strokeWidth="0.3" fill="none" />
          </svg>
        </motion.div>
        
        {/* Glowing dots */}
        <motion.div
          variants={glowingDot}
          initial="hidden"
          animate="visible"
          className="absolute h-2 w-2 bg-yellow-300 rounded-full top-0 left-1/4 blur-sm"
        />
        <motion.div
          variants={glowingDot}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="absolute h-2 w-2 bg-yellow-300 rounded-full top-16 right-1/4 blur-sm"
        />
        
        {/* Category label with enhanced animation */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`flex items-center justify-center ${title ? 'mb-3' : 'mb-8'} relative`}
        >
          <div className="h-px w-6 bg-zinc-700 mr-3" />
          <span className="text-[#dffe00] text-sm font-medium tracking-widest uppercase bg-black px-4 py-1 rounded-full border border-zinc-800 shadow-lg">
            {category}
          </span>
          <div className="h-px w-6 bg-zinc-700 ml-3" />
        </motion.div>

        {/* Main heading with letter-by-letter animation - only render if title exists */}
        {title && (
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 relative px-3"
          >
            {/* Mobile version (simple blocks) */}
            <div className="sm:hidden">
              {secondLine ? (
                <>
                  <motion.div
                    className="block relative mb-1 overflow-hidden"
                    variants={fadeUpVariants}
                  >
                    <span className="inline-block" style={{ backgroundImage: "linear-gradient(to right, #dffe00, #c8e500)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", textFillColor: "transparent" }}>
                      {firstLine}
                    </span>
                  </motion.div>
                  
                  <motion.div
                    className="block relative mt-1 overflow-hidden"
                    variants={fadeUpVariants}
                  >
                    <span className="inline-block" style={{ backgroundImage: "linear-gradient(to right, #dffe00, #c8e500)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", textFillColor: "transparent" }}>
                      {secondLine}
                    </span>
                  </motion.div>
                </>
              ) : (
                <motion.div 
                  className="block overflow-hidden"
                  variants={fadeUpVariants}
                >
                  <span className="inline-block" style={{ backgroundImage: "linear-gradient(to right, #dffe00, #c8e500)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", textFillColor: "transparent" }}>
                    {firstLine}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Desktop version (animated letters) */}
            <div className="hidden sm:block">
              {secondLine ? (
                <>
                  <motion.div
                    className="block relative mb-1 overflow-hidden"
                  >
                    {firstLine.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        custom={index}
                        variants={letterVariants}
                        className="inline-block"
                        style={{
                          whiteSpace: "pre",
                          backgroundImage: "linear-gradient(to right, #dffe00, #c8e500)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textFillColor: "transparent",
                          lineHeight: "1.2" // Ensure line height is consistent
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <motion.div
                    className="block relative mt-1 overflow-hidden"
                  >
                    {secondLine.split("").map((char, index) => (
                      <motion.span
                        key={index + 100}
                        custom={index + firstLine.length + 5} // Add offset to delay second line
                        variants={letterVariants}
                        className="inline-block"
                        style={{
                          whiteSpace: "pre",
                          backgroundImage: "linear-gradient(to right, #dffe00, #c8e500)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textFillColor: "transparent",
                          lineHeight: "1.2" // Ensure line height is consistent
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                </>
              ) : (
                <motion.div className="block overflow-hidden">
                  {firstLine.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                      className="inline-block"
                      style={{
                        whiteSpace: "pre",
                        backgroundImage: "linear-gradient(to right, #dffe00, #c8e500)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textFillColor: "transparent",
                        lineHeight: "1.2"
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </div>
            
            {/* Glowing accent element */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-8 blur-md"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                width: ['10rem', '12rem', '10rem']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                background: "radial-gradient(ellipse at center, rgba(223, 254, 0, 0.3) 0%, rgba(223, 254, 0, 0) 70%)",
                pointerEvents: "none"
              }}
            />
          </motion.h2>
        )}

        {/* Enhanced separator line - only show if title exists */}
        {title && (
          <div className="flex justify-center relative">
            <motion.div
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="h-px mb-12 relative overflow-hidden"
              style={{
                background: "linear-gradient(to right, transparent, #dffe00, transparent)",
              }}
            >
              {/* Animated highlight moving along the line */}
              <motion.div 
                className="absolute top-0 h-full w-12 bg-white"
                initial={{ left: "-10%", opacity: 0.7 }}
                animate={{ left: "110%", opacity: 0 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
                style={{
                  filter: "blur(3px)"
                }}
              />
            </motion.div>
          </div>
        )}
      </div>
    );
  };

export default EnhancedTitles;