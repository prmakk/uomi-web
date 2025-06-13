import React, { useState, useEffect } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { Routes, Route, useLocation } from 'react-router-dom'; // Rimuovi BrowserRouter da qui
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./Pages/Home";
import EcosystemPage from "./Pages/Ecosystem";
import Page404 from "./Pages/Page404";
import WaspPage from "./Pages/WaspPage";
import WhitepaperPage from "./Pages/WhitepaperPage";
import ConsensusPage from "./Pages/ConsensusPage";
import OPoCPresentation from "./Pages/Opoc";
import Docs from "./Pages/DocsPage";
import Blog from './Pages/Blog';
import BlogPost from './Pages/BlogPost';
import Determinism from './Pages/Deterministc-indeterminism';
import Roadmap from './Pages/Roadmap';
import Grants from './Pages/Grants';
import Applications from './Pages/Applications';
import Manifesto from './Pages/Manifesto';
import ReactGA from 'react-ga4';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation(); // Ora funziona perché siamo dentro il Router

  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  return (
    <div className={`min-h-screen bg-black text-white`}>
      {/* <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> */}
      
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/wasp" element={<WaspPage />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="/consensus" element={<ConsensusPage />} />
        <Route path="/opoc" element={<OPoCPresentation />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/deterministc-indeterminism" element={<Determinism />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/manifesto" element={<Manifesto />} />
      </Routes>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;