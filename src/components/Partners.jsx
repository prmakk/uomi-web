import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LogoTrack from "./LogoTrack";
import EnhancedTitles from "./EnhancedTitles";

const Partners = ({ isDarkMode = true }) => {
  return (
    <section className={`w-full py-20 bg-black text-white overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <EnhancedTitles
          category="Ecosystem"
          title="Partners"
          titleBreak={false}
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`max-w-2xl mx-auto text-center text-gray-300 mb-16 text-lg`}
        >
          UOMI Network collaborates with leading blockchain protocols, AI labs,
          and financial institutions to expand the frontiers of autonomous
          intelligence.
        </motion.p>

        {/* First Marquee */}
        <div className="mb-12 relative">
          {/* Gradient Overlays for fade effect */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none`}
          ></div>
          <div
            className={`absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none`}
          ></div>

          <div className="overflow-hidden">
            {/* Container for the continuous marquee effect */}
            <LogoTrack isDarkMode={isDarkMode} direction="left" speed={35} />
          </div>
        </div>

        {/* Second Marquee (Slower, opposite direction) */}
        <div className="relative">
          {/* Gradient Overlays for fade effect */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none`}
          ></div>
          <div
            className={`absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none`}
          ></div>

          <div className="overflow-hidden">
            {/* Container for the continuous marquee effect */}
            <LogoTrack
              isDarkMode={isDarkMode}
              direction="right"
              speed={45}
              alternate={true}
            />
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className={`text-gray-300 mb-6`}>
            Interested in becoming a partner? Join the UOMI ecosystem today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#c8e500" }}
            whileTap={{ scale: 0.95 }}
            className="text-black rounded-full px-6 py-3 inline-flex items-center space-x-2 font-medium"
            style={{
              backgroundColor: "#dffe00",
              boxShadow: "0 4px 6px -1px rgba(223, 254, 0, 0.2)",
            }}
          >
            <span>Partner With Us</span>
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
