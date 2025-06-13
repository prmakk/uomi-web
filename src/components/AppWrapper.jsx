'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppWrapper({ children, pageProps = {} }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen bg-black text-white`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {React.cloneElement(children, { isDarkMode, ...pageProps })}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
