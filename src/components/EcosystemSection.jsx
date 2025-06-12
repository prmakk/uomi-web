import React, { useState, useEffect } from "react";
import {
  Globe,
  Search,
  Loader2,
  AlertCircle,
  Plus,
  X,
  ExternalLink,
  Calendar,
  Tag as TagIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "./Navbar";

const EcosystemSection = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configuration - Change this to your GitHub repository
  const GITHUB_REPO_URL = "https://raw.githubusercontent.com/Uomi-network/uomi-website-ecosystem/refs/heads/main/projects.json";
  const GITHUB_SUBMIT_URL = "https://github.com/Uomi-network/uomi-website-ecosystem";

  // Modal handlers
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isModalOpen]);

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0, boxShadow: "0 0 0 rgba(223, 254, 0, 0)" },
    hover: { 
      scale: 1.02, 
      y: -5,
      boxShadow: "0 8px 20px rgba(223, 254, 0, 0.15)",
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const staggerChild = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Fetch projects from GitHub
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(GITHUB_REPO_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data.projects || []);
        setLastUpdated(data.lastUpdated);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        
        // Fallback to mock data for development
        setProjects([
          {
            id: "0x",
            name: "0x",
            description: "0x allows you to embed swaps in any onchain app. Tap into aggregated liquidity from 130+ sources, best prices & optimal trade execution.",
            fullDescription: "0x Protocol is a comprehensive infrastructure layer that enables developers to easily embed cryptocurrency swaps into their applications. With access to aggregated liquidity from over 130 different sources, 0x ensures users get the best possible prices and optimal trade execution for their cryptocurrency transactions. The protocol abstracts away the complexity of interacting with multiple DEXs and liquidity sources, making it simple for developers to integrate sophisticated trading functionality into their dApps.",
            primaryImage: "https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b9106b6ca74a7001624998_0x_logo.webp",
            coverImage: "https://cdn.prod.website-files.com/669ade140a683001b9f7fd78/67b910681d1e917a4b1a10d9_0x_banner.webp",
            category: "Infra",
            primaryTag: "Infra",
            tags: ["Dev Tooling", "Other Infra", "DeFi"],
            xLink: "https://twitter.com/0xProject",
            websiteLink: "https://0x.org",
            launchedDate: "2024-01-15",
            status: "Live"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique categories and tags
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags || []))];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = !searchTerm || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || (project.tags || []).includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTag('all');
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-16 bg-black text-zinc-200 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#dffe00] mx-auto mb-4" />
              <p className="text-zinc-400">Loading ecosystem projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full py-16 bg-black text-zinc-200 overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(223, 254, 0, 0.1)" }}
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </div>

        {/* Background dot matrix */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="mb-12">
            <div className="flex flex-col items-center text-center relative">
              <motion.h2
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-5xl md:text-6xl font-bold mb-4"
              >
                Ecosystem
              </motion.h2>
              
              <motion.p
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-xl text-zinc-400 mb-2"
              >
                Apps & Infrastructure <span className="text-[#dffe00] font-medium">Live on Testnet</span>
              </motion.p>

              {lastUpdated && (
                <motion.p
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-sm text-zinc-500 mb-6"
                >
                  Last updated: {new Date(lastUpdated).toLocaleDateString()}
                </motion.p>
              )}

              {/* Get Listed Button */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mt-4"
              >
                <a
                  href={GITHUB_SUBMIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-700/50 text-zinc-300 text-sm rounded-lg hover:border-[#dffe00]/50 hover:text-[#dffe00] hover:bg-zinc-800/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <Plus className="w-4 h-4" />
                  Get Listed
                </a>
              </motion.div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              className="mb-8 p-4 bg-red-900/20 border border-red-700/50 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}

          {/* Filters and search */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap items-center justify-between mb-8 gap-4"
          >
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span className="text-zinc-400 mr-2 font-medium">Filters:</span>
              
              {/* Category filter */}
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-zinc-900 text-white rounded-lg border border-zinc-800 py-2 px-4 pr-10 appearance-none cursor-pointer hover:border-[#dffe00] transition-all focus:border-[#dffe00] focus:ring-1 focus:ring-[#dffe00]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Tag filter */}
              <div className="relative">
                <select 
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="bg-zinc-900 text-white rounded-lg border border-zinc-800 py-2 px-4 pr-10 appearance-none cursor-pointer hover:border-[#dffe00] transition-all focus:border-[#dffe00] focus:ring-1 focus:ring-[#dffe00]"
                >
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag === 'all' ? 'All Tags' : tag}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button 
                onClick={resetFilters}
                className="bg-zinc-900 text-white rounded-lg border border-zinc-800 py-2 px-4 hover:border-[#dffe00] hover:text-[#dffe00] transition-all"
              >
                Reset
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Ecosystem"
                className="bg-zinc-900 text-white rounded-lg border border-zinc-800 py-2 px-4 pl-10 w-64 focus:outline-none focus:border-[#dffe00] focus:ring-1 focus:ring-[#dffe00] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            </div>
          </motion.div>
          
          {/* Results count */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8"
          >
            <p className="text-zinc-400">
              Showing <span className="font-medium text-white">{filteredProjects.length}</span> matching results
              {projects.length > 0 && ` out of ${projects.length} total projects`}.
            </p>
          </motion.div>
          
          {/* Grid of results */}
          {filteredProjects.length === 0 ? (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              className="text-center py-20"
            >
              <div className="text-zinc-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No projects found matching your criteria.</p>
                <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  variants={staggerChild}
                  whileHover="hover"
                  initial="rest"
                  className="rounded-2xl overflow-hidden relative border border-zinc-800/50 backdrop-blur-sm cursor-pointer"
                  style={{
                    background: "linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9))"
                  }}
                  onClick={() => openModal(project)}
                >
                  <motion.div variants={cardHoverVariants} className="h-full">
                    <div className="relative h-32 overflow-hidden">
                      {/* Background image with overlay */}
                      {project.coverImage ? (
                        <img 
                          src={project.coverImage} 
                          alt={`${project.name} cover`}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-black opacity-20"></div>

                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                        {project.primaryTag && (
                          <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                            {project.primaryTag}
                          </span>
                        )}
                        {project.xLink && project.xLink.trim() && (
                          <a
                            href={project.xLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black bg-opacity-70 text-white p-1 rounded-md hover:bg-[#dffe00] hover:text-black transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <XIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.websiteLink && project.websiteLink.trim() && project.websiteLink != '#' && project.websiteLink != '' && (
                          <a
                            href={project.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black bg-opacity-70 text-white p-1 rounded-md hover:bg-[#dffe00] hover:text-black transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="relative p-6">
                      <div className="absolute -top-10 left-6 w-16 h-16 rounded-full bg-zinc-900 border-4 border-black flex items-center justify-center overflow-hidden shadow-lg" style={{ boxShadow: "0 0 15px rgba(223, 254, 0, 0.15)" }}>
                        {project.primaryImage ? (
                          <img 
                            src={project.primaryImage} 
                            alt={`${project.name} logo`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzIzMjMyIi8+CjxwYXRoIGQ9Ik0zMiAyMEMzNS4zMTM3IDIwIDM4IDIyLjY4NjMgMzggMjZDMzggMjkuMzEzNyAzNS4zMTM3IDMyIDMyIDMyQzI4LjY4NjMgMzIgMjYgMjkuMzEzNyAyNiAyNkMyNiAyMi42ODYzIDI4LjY4NjMgMjAgMzIgMjBaIiBmaWxsPSIjNjY2NjY2Ii8+Cjwvc3ZnPgo=';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs font-bold">
                            {project.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-8">
                        <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                        <p className="text-zinc-400 mb-4 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {(project.tags || []).map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs text-zinc-400 bg-zinc-800/80 rounded-md px-2 py-1 hover:bg-zinc-700/80 transition-all cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTag(tag);
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-48 overflow-hidden">
                {selectedProject.coverImage ? (
                  <img 
                    src={selectedProject.coverImage} 
                    alt={`${selectedProject.name} cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-700"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Project logo */}
                <div className="absolute bottom-4 left-6 w-20 h-20 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center overflow-hidden shadow-xl">
                  {selectedProject.primaryImage ? (
                    <img 
                      src={selectedProject.primaryImage} 
                      alt={`${selectedProject.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-zinc-400 font-bold">
                      {selectedProject.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      {selectedProject.primaryTag && (
                        <span className="flex items-center gap-1">
                          <TagIcon className="w-4 h-4" />
                          {selectedProject.primaryTag}
                        </span>
                      )}
                      {selectedProject.launchedDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Launched {new Date(selectedProject.launchedDate).toLocaleDateString()}
                        </span>
                      )}
                      {selectedProject.status && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedProject.status === 'Live' 
                            ? 'bg-green-900/30 text-green-400 border border-green-700/50' 
                            : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50'
                        }`}>
                          {selectedProject.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    {selectedProject.websiteLink && selectedProject.websiteLink.trim() && selectedProject.websiteLink !== '#' && (
                      <a
                        href={selectedProject.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#dffe00] text-black rounded-lg font-medium hover:bg-[#dffe00]/90 transition-all"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
                    {selectedProject.xLink && selectedProject.xLink.trim() && (
                      <a
                        href={selectedProject.xLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all"
                      >
                        <XIcon className="w-4 h-4" />
                        Follow
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">About</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>
                </div>

                {/* Tags */}
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-sm text-zinc-300 bg-zinc-800 rounded-lg px-3 py-1 hover:bg-zinc-700 transition-all cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(tag);
                            closeModal();
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                {selectedProject.launchedDate && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Launch Information</h3>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Calendar className="w-4 h-4" />
                        <span>Launched: {new Date(selectedProject.launchedDate).toLocaleDateString()}</span>
                      </div>
                      {selectedProject.status && (
                        <div className="flex items-center gap-2 text-zinc-300 mt-2">
                          <div className={`w-2 h-2 rounded-full ${
                            selectedProject.status === 'Live' ? 'bg-green-400' : 'bg-yellow-400'
                          }`}></div>
                          <span>Status: {selectedProject.status}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EcosystemSection;