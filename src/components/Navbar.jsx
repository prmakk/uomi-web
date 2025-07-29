'use client'
import { useState, useEffect, useRef } from "react"
import Link from "next/link"


import { ChevronDown, Menu, X, Calendar  } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// App & Infrastructure - replaces 📱export const AppIcon = () => (

export const AppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
  <circle cx="12" cy="18" r="1.5" stroke="currentColor" />
  <path d="M10 5.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  {/* Added subtle details */}
  <path d="M8 9h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
  <path d="M8 12h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
</svg>
);

export const ManifestoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main scroll/document */}
    <path d="M6 3C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6Z" 
      stroke="currentColor" strokeWidth="1.5" />
    
    {/* Title section - manifesto header */}
    <path d="M7 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 9H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
    
    {/* Key principles/points */}
    <circle cx="8" cy="12" r="1" fill="currentColor" />
    <path d="M10 12H16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    
    <circle cx="8" cy="15" r="1" fill="currentColor" />
    <path d="M10 15H16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    
    <circle cx="8" cy="18" r="1" fill="currentColor" />
    <path d="M10 18H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Revolutionary/visionary element - subtle star */}
    <path d="M16.5 6L17 4.5L18.5 5L17 5.5L16.5 6Z" 
      stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" strokeLinejoin="round" />
    
    {/* Scroll edge detail */}
    <path d="M6 3C6 3 5.5 2.5 5 3C4.5 3.5 5 4 5 4" 
      stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeLinecap="round" />
    <path d="M18 3C18 3 18.5 2.5 19 3C19.5 3.5 19 4 19 4" 
      stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeLinecap="round" />
  </svg>
);

export const BriefcaseIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
  <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="1.5" />
  <path d="M12 11V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  {/* Added subtle details */}
  <path d="M3 11h18" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
</svg>
);

export const PortalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main portal frame */}
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    
    {/* Code brackets representing development */}
    <path d="M8 9L6 12L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 9L18 12L16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Central connecting element */}
    <path d="M10 10L14 14M14 10L10 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Top connection points */}
    <circle cx="7" cy="4" r="1.5" fill="currentColor" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
    <circle cx="17" cy="4" r="1.5" fill="currentColor" />
  </svg>
);

export const DocumentIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 3C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V9L14 3H6Z" stroke="currentColor" strokeWidth="1.5" />
  <path d="M14 3V9H20" stroke="currentColor" strokeWidth="1.5" />
  <path d="M8 13H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M8 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  {/* Added subtle details */}
  <path d="M8 10h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
</svg>
);

export const DiscordIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* Improved overall shape */}
  <path d="M19.5 5.5c-1.2-0.55-2.4-0.9-3.5-1.1a0.15 0.15 0 0 0-.16.07c-.1.18-.21.42-.29.61a14.53 14.53 0 0 0-4.37 0 10.1 10.1 0 0 0-.3-.61 0.15 0.15 0 0 0-.16-.07c-1.1.2-2.3.55-3.5 1.1a0.14 0.14 0 0 0-.07.06C4.3 9.32 3.7 13.05 4.1 16.75c.01.02.03.04.05.05 1.2.9 2.4 1.45 3.55 1.8a0.15 0.15 0 0 0 .16-.05c.45-.62.85-1.27 1.19-1.96a0.14 0.14 0 0 0-.08-.2 9.9 9.9 0 0 1-1.41-.67.15.15 0 0 1-.02-.24c.1-.07.19-.15.28-.22a0.14 0.14 0 0 1 .15-.02c2.39 1.09 4.97 1.09 7.3 0a0.14 0.14 0 0 1 .16.01c.1.07.18.16.28.23.06.05.06.17-.01.24-.45.34-.92.54-1.4.67a0.15 0.15 0 0 0-.08.2c.35.69.75 1.34 1.18 1.95a0.15 0.15 0 0 0 .16.05c1.17-.35 2.36-.9 3.56-1.8a0.15 0.15 0 0 0 .05-.05c.48-4.23-.8-7.88-3.38-11.2a0.12 0.12 0 0 0-.06-.05z" stroke="currentColor" strokeWidth="1.5" />
  <path d="M9 11.5C9 12.3284 8.55228 13 8 13C7.44772 13 7 12.3284 7 11.5C7 10.6716 7.44772 10 8 10C8.55228 10 9 10.6716 9 11.5Z" fill="currentColor" />
  <path d="M17 11.5C17 12.3284 16.5523 13 16 13C15.4477 13 15 12.3284 15 11.5C15 10.6716 15.4477 10 16 10C16.5523 10 17 10.6716 17 11.5Z" fill="currentColor" />
</svg>
);


export const RoadmapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main horizontal road */}
    <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Milestone points */}
    <circle cx="7" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="17" cy="12" r="1.5" fill="currentColor" />
    
    {/* Vertical direction indicators */}
    <path d="M7 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Bottom indicators */}
    <path d="M7 14V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 14V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const XIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* Simplified and improved */}
  <path d="M17.1761 3H20.3037L13.5642 10.6731L21.5 21H15.0993L10.0765 14.8901L4.30439 21H1.17398L8.35239 12.7533L0.75 3H7.31779L11.8606 8.58303L17.1761 3Z" fill="currentColor" />
</svg>
);

export const GithubIcon = () => ( 
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.017C9.521 20.782 9.512 20.082 9.508 19.241C6.726 19.861 6.139 17.866 6.139 17.866C5.685 16.726 5.031 16.424 5.031 16.424C4.132 15.785 5.097 15.797 5.097 15.797C6.094 15.867 6.625 16.84 6.625 16.84C7.521 18.412 8.97 17.912 9.539 17.661C9.631 17.027 9.889 16.628 10.175 16.419C7.954 16.207 5.62 15.344 5.62 11.476C5.62 10.323 6.01 9.38 6.644 8.644C6.54 8.394 6.2 7.443 6.743 6.088C6.743 6.088 7.585 5.823 9.497 7.098C10.295 6.879 11.15 6.769 12 6.765C12.85 6.769 13.705 6.879 14.505 7.098C16.415 5.823 17.255 6.088 17.255 6.088C17.8 7.443 17.46 8.394 17.356 8.644C17.992 9.38 18.38 10.323 18.38 11.476C18.38 15.355 16.042 16.204 13.813 16.411C14.173 16.671 14.498 17.184 14.498 17.969C14.498 19.093 14.484 20.692 14.484 21.017C14.484 21.281 14.663 21.587 15.173 21.486C19.138 20.159 22 16.415 22 12C22 6.477 17.523 2 12 2Z" 
        fill="currentColor"
      />
    </svg>
);

export const BrainIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* Improved brain shape */}
  <path d="M12 17C12 17 7.5 16.5 6 13C4.5 9.5 7.5 7 8.5 6C9.5 5 10 3 12 3C14 3 14.5 5 15.5 6C16.5 7 19.5 9.5 18 13C16.5 16.5 12 17 12 17Z" stroke="currentColor" strokeWidth="1.5" />
  <path d="M12 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M10 20H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z" fill="currentColor" />
  <path d="M15 10C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9C14 9.55228 14.4477 10 15 10Z" fill="currentColor" />
  {/* Added subtle details */}
  <path d="M10 13C10.5 13.5 11.5 14 12 14C12.5 14 13.5 13.5 14 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
</svg>
);

export const WhitepaperIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* Added scroll details */}
  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="1.5" />
  <path d="M7 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M7 11H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M7 15H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  {/* Added scroll ends */}
  <path d="M19 3C19 3 19 2 18 2H6C5 2 5 3 5 3" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
  <path d="M19 21C19 21 19 22 18 22H6C5 22 5 21 5 21" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
</svg>
);

export const DeterminismIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12Z" stroke="currentColor" strokeWidth="1.5" />
  <path d="M15 9L18 6M18 6V9.5M18 6H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M9 15L6 18M6 18V14.5M6 18H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  {/* Added subtle rotation indicator */}
  <path d="M12 7.5C13.3807 7.5 14.5 8.61929 14.5 10" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeDasharray="1,1" />
  <path d="M12 16.5C10.6193 16.5 9.5 15.3807 9.5 14" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeDasharray="1,1" />
</svg>
);

export const BlogIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
  <path d="M7 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M7 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M7 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  {/* Added newspaper details */}
  <path d="M15 11H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
  <path d="M12 15H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
</svg>
);

export const ChainIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* First chain link */}
      <path d="M9 7H7.8C6.11984 7 4.76575 8.35409 4.76575 10.0342C4.76575 11.7144 6.11984 13.0685 7.8 13.0685H10.5" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Second chain link */}
      <path d="M14.5 13.0685H16.2C17.8802 13.0685 19.2342 11.7144 19.2342 10.0342C19.2342 8.35409 17.8802 7 16.2 7H13.5" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Middle connecting line */}
      <path d="M10 10H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Added subtle details */}
      <path d="M7.5 9.5C7.5 9.5 7 10 7 10.5C7 11 7.5 11.5 7.5 11.5" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeLinecap="round" />
      <path d="M16.5 9.5C16.5 9.5 17 10 17 10.5C17 11 16.5 11.5 16.5 11.5" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeLinecap="round" />
    </svg>
  );

  export const UseCasesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main grid structure */}
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    
    {/* AI/Bot indicators in each quadrant */}
    <circle cx="6.5" cy="6.5" r="1" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="17.5" cy="6.5" r="1" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="6.5" cy="17.5" r="1" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="17.5" cy="17.5" r="1" stroke="currentColor" strokeWidth="1" fill="none" />
    
    {/* Connection lines between use cases */}
    <path d="M10 6.5H14" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeDasharray="1,1" />
    <path d="M6.5 10V14" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeDasharray="1,1" />
    <path d="M17.5 10V14" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" strokeDasharray="1,1" />
    
    {/* Activity indicators */}
    <path d="M5.5 7.5L7.5 5.5" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" strokeLinecap="round" />
    <path d="M16.5 7.5L18.5 5.5" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" strokeLinecap="round" />
  </svg>
);

  export const AIAgentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main hexagonal structure - representing AI architecture */}
    <path d="M12 3L19 7V17L12 21L5 17V7L12 3Z" 
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    
    {/* Central processing core */}
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    
    {/* Data flow indicators - four directions */}
    <path d="M12 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 15V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Neural processing nodes */}
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="9" cy="9" r="0.5" fill="currentColor" fillOpacity="0.7" />
    <circle cx="15" cy="9" r="0.5" fill="currentColor" fillOpacity="0.7" />
    <circle cx="9" cy="15" r="0.5" fill="currentColor" fillOpacity="0.7" />
    <circle cx="15" cy="15" r="0.5" fill="currentColor" fillOpacity="0.7" />
    
    {/* Connection pathways */}
    <path d="M10.5 10.5L9 9" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    <path d="M13.5 10.5L15 9" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    <path d="M10.5 13.5L9 15" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    <path d="M13.5 13.5L15 15" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
  </svg>
);
const menuItems = {
  Ecosystem: {
    sections: [
      {
        title: "Explore",
        items: [
          { icon: <AppIcon />, label: "Apps & Infrastructure", link: "/ecosystem" },
          {
            icon: <AIAgentIcon />,
            label: "Agents",
            link: "https://app.uomi.ai/agents",
          },
        ],
      },
      {
        title: "Builder Programs",
        items: [
          {
            label: "evm/accathon",
            description: "The premier hackathon for innovative EVM developers.",
            link: "#",
            comingSoon: true
          },
          {
            label: "UOMI Grants",
            description:
              "Pitch your startup to win cash prizes, VC funding and marketing.",
            link: "/grants",
          },
        ],
      },
    ],
    ctaBox: "Building a project on UOMI? Get in touch!",
    ctaLink: "mailto:oscar@uomi.ai",
  },
  Developers: {
    sections: [
      {
        title: "Developer Resources",
        items: [
          { icon: <PortalIcon />, label: "Developer Portal", link: "/docs" },
          { icon: <DocumentIcon />, label: "Documentation", link: "https://docs.uomi.ai" },
          { icon: <GithubIcon />, label: "GitHub", link: "https://github.com/uomi-network" },
        ],
      },
    ],
  },
  Resources: {
    sections: [
      {
        title: "Research",
        items: [
          { icon: <BrainIcon />, label: "Consensus", link: "/consensus" },
          { icon: <WhitepaperIcon />, label: "Whitepaper", link: "/whitepaper" },
          {
            icon: <DeterminismIcon />,
            label: "Deterministic indeterminism",
            link: "/deterministc-indeterminism",
          },
        ],
      },
      {
        title: "About",
        items: [
          { icon: <BriefcaseIcon />, label: "Manifesto", link: "/manifesto" },
          { icon: <ChainIcon />, label: "OPoC", link: "/opoc" },
          { icon: <RoadmapIcon />, label: "Roadmap", link: "/roadmap" },
          { icon: <BlogIcon />, label: "Blog", link: "/blog" },
          { icon: <UseCasesIcon />, label: "Applications", link: "/applications" },
        ],
      },
      {
        title: "Socials",
        items: [
          { icon: <XIcon />, label: "UOMI X", link: "https://x.com/UomiNetwork" },
          {
            icon: <DiscordIcon />,
            label: "Community Discord",
            link: "https://discord.gg/RV5DUpjsdY",
          },
          { icon: <GithubIcon />, label: "GitHub", link: "https://github.com/uomi-network" },
        ],
      },
    ],
  },
};


const TGEAnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Data TGE - 10 settembre 2025
  const tgeDate = new Date('2025-09-10T00:00:00Z');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = tgeDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-black/95 backdrop-blur-sm border-b border-white/5"
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c8e500]/20 to-transparent"
          animate={{ x: [-200, 1200] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-center relative">
            {/* Contenuto centrato */}
            <div className="flex items-center gap-8">
              {/* Info TGE */}
              <div className="flex items-center gap-3">
                <span className="text-white font-medium text-sm">
                  UOMI TOKEN TGE
                </span>
                <div className="w-1 h-1 rounded-full bg-[#c8e500]"></div>
                <span className="text-[#c8e500] font-mono text-sm">
                  Sep 10, 2025
                </span>
              </div>

              {/* Countdown - Design minimal */}
              <div className="flex items-center gap-4">
                <span className="hidden md:block text-gray-400 text-xs uppercase tracking-wider font-medium">
                  Launch in
                </span>
                <div className="flex items-center gap-3 font-mono text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-white font-medium tabular-nums">
                      {formatNumber(timeLeft.days)}
                    </span>
                    <span className="text-gray-500 text-xs">d</span>
                  </div>
                  
                  <div className="w-px h-3 bg-gray-700"></div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-white font-medium tabular-nums">
                      {formatNumber(timeLeft.hours)}
                    </span>
                    <span className="text-gray-500 text-xs">h</span>
                  </div>
                  
                  <div className="w-px h-3 bg-gray-700"></div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-white font-medium tabular-nums">
                      {formatNumber(timeLeft.minutes)}
                    </span>
                    <span className="text-gray-500 text-xs">m</span>
                  </div>
                  
                  <div className="w-px h-3 bg-gray-700"></div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-[#c8e500] font-medium tabular-nums">
                      {formatNumber(timeLeft.seconds)}
                    </span>
                    <span className="text-gray-500 text-xs">s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pulsante chiudi - più minimal */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-0 p-1.5 text-gray-400 hover:text-white transition-colors duration-200 group"
              aria-label="Close"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};


const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to detect external links
  const isExternalLink = (url) => {
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  };

  // Initialize dark mode from system preference
  useEffect(() => {
    setIsDarkMode(true); // Default to dark mode
  }, []);

  // Click outside handler to close menus
 const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setActiveMenu(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  // Handle dropdown click
  const handleDropdownClick = (e, menuName) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Styles based on theme
  const themeStyles = {
    bg: "bg-black",
    //text should never break, no new lines
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-zinc-800",
    dropdown: "bg-zinc-900 border-zinc-800",
    hover: "hover:bg-zinc-800",
  };

  return (
    <div className={"dark"}>
       <TGEAnnouncementBar />
      <header
        className={`w-full border-b transition-colors duration-300 ${themeStyles.bg} ${themeStyles.border} ${themeStyles.text}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/">
                <img
                  src="https://uomi-new.vercel.app/UOMI.svg"
                  alt="UOMI Logo"
                  className="h-8 w-auto"
                  style={{ filter: "invert(1)" }}
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {Object.keys(menuItems).map((menuName) => (
                <div className="relative" key={menuName}>
                  <button
                    onClick={(e) => handleDropdownClick(e, menuName)}
                    className={`flex items-center cursor-pointer gap-1.5 py-2 transition-colors duration-200 font-medium ${
                      activeMenu === menuName
                        ? "text-[#dffe00]"
                        : `${themeStyles.text} hover:text-[#dffe00]`
                    }`}
                  >
                    {menuName}
                    <motion.div
                      animate={{ rotate: activeMenu === menuName ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeMenu === menuName && (
                      <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-xl border shadow-lg ${themeStyles.dropdown} z-50`}
                        style={{
                          minWidth: "280px",
                          boxShadow: isDarkMode
                            ? "0 10px 25px -5px rgba(223,254,0,0.25)"
                            : "0 10px 25px -5px rgba(0,0,0,0.1)",
                        }}
                      >
                        {menuName === "Ecosystem" ? (
                          <div className="grid grid-cols-2 gap-6 p-6 min-w-[560px]">
                            {/* Left Column */}
                            <div className="space-y-6">
                              {/* Explore Section */}
                              <div>
                                <h3 className="font-semibold text-[#dffe00] mb-3">
                                  Explore
                                </h3>
                                <ul className="space-y-2">
                                  {menuItems[menuName].sections[0].items.map(
                                    (item, i) => (
                                      <motion.li
                                        key={i}
                                        className="flex items-start gap-2.5 group cursor-pointer"
                                        whileHover={{ x: 3 }}
                                      >
                                        <a
                                          href={item.link}
                                          className="flex items-start gap-2.5 group cursor-pointer"
                                          {...(isExternalLink(item.link) && { 
                                            target: '_blank', 
                                            rel: 'noopener noreferrer' 
                                          })}
                                        >
                                          <span className="text-lg">
                                            {item.icon}
                                          </span>
                                          <span
                                            className={
                                              themeStyles.text +
                                              " group-hover:text-[#dffe00]"
                                            }
                                          >
                                            {item.label}
                                          </span>
                                        </a>
                                      </motion.li>
                                    )
                                  )}
                                </ul>
                              </div>

                              {/* CTA Box */}
                              <div
                                className={`bg-zinc-800 border-zinc-700 border rounded-lg p-4 font-medium text-sm mt-auto`}
                              >
                                <a
                                  href={menuItems[menuName].ctaLink}
                                  className="hover:text-[#dffe00]"
                                  {...(isExternalLink(menuItems[menuName].ctaLink) && { 
                                    target: '_blank', 
                                    rel: 'noopener noreferrer' 
                                  })}
                                >
                                  {menuItems[menuName].ctaBox}
                                </a>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                              {/* Builder Programs Section */}
                              <div>
                                <h3 className="font-semibold text-[#dffe00] mb-3">
                                  Builder Programs
                                </h3>
                                <ul className="space-y-3">
                                  {menuItems[menuName].sections[1].items.map(
                                    (item, i) => (
                                      <motion.li
                                        key={i}
                                        className="group cursor-pointer"
                                        whileHover={{ x: 3 }}
                                      >
                                        <a 
                                          href={item.link} 
                                          className="block"
                                          {...(isExternalLink(item.link) && { 
                                            target: '_blank', 
                                            rel: 'noopener noreferrer' 
                                          })}
                                        >
                                          <div className="flex items-center gap-2">
                                            <div
                                              className={`${themeStyles.text} font-medium group-hover:text-[#dffe00]`}
                                            >
                                              {item.label}
                                            </div>
                                            {item.comingSoon && (
                                              <span className="text-xs bg-zinc-700 text-[#dffe00] px-2 py-0.5 rounded-full">
                                                coming soon
                                              </span>
                                            )}
                                          </div>
                                          <p
                                            className={`text-sm ${themeStyles.textSecondary}`}
                                          >
                                            {item.description}
                                          </p>
                                        </a>
                                      </motion.li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 flex flex-row gap-12 min-w-[200px]">
                            {menuItems[menuName].sections.map(
                              (section, idx) => (
                                <div key={idx} className="space-y-3">
                                  {section.title && (
                                    <h3 className="font-semibold text-[#dffe00]">
                                      {section.title}
                                    </h3>
                                  )}

                                  {section.items && (
                                    <ul className="space-y-2">
                                      {section.items.map((item, i) => (
                                        <motion.li
                                          key={i}
                                          className="flex items-start gap-2.5 group cursor-pointer"
                                          whileHover={{ x: 3 }}
                                        >
                                          <a
                                            href={item.link}
                                            className="flex items-start gap-2.5"
                                            {...(isExternalLink(item.link) && { 
                                              target: '_blank', 
                                              rel: 'noopener noreferrer' 
                                            })}
                                          >
                                            {item.icon && (
                                              <span className="text-lg">
                                                {item.icon}
                                              </span>
                                            )}
                                            <span
                                              className={
                                                themeStyles.text +
                                                " group-hover:text-[#dffe00]"
                                              }
                                            >
                                              {item.label}
                                            </span>
                                          </a>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  )}

                                  {section.description && (
                                    <div className="space-y-1">
                                      <h4
                                        className={`font-semibold ${themeStyles.text}`}
                                      >
                                        {section.title}
                                      </h4>
                                      <a
                                        href={section.link}
                                        className="block hover:text-[#dffe00]"
                                        {...(isExternalLink(section.link) && { 
                                          target: '_blank', 
                                          rel: 'noopener noreferrer' 
                                        })}
                                      >
                                        <p
                                          className={`text-sm ${themeStyles.textSecondary}`}
                                        >
                                          {section.description}
                                        </p>
                                      </a>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              {/* CTA Button */}
              <motion.a
                href="https://app.uomi.ai/"
                className="hidden sm:block bg-[#dffe00] text-black px-5 py-2 rounded-full font-semibold shadow-md"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#c8e500",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Join Testnet
              </motion.a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-full"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <Menu className={`w-6 h-6 ${themeStyles.text}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden ${themeStyles.bg} border-t ${themeStyles.border}`}
            >
              <div className="px-4 py-2 divide-y divide-gray-700">
                {Object.keys(menuItems).map((menuName) => (
                  <div key={menuName} className="py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownClick(e, menuName);
                      }}
                      className={`flex items-center justify-between w-full py-2 ${themeStyles.text} font-medium`}
                    >
                      {menuName}
                      <motion.div
                        animate={{ rotate: activeMenu === menuName ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeMenu === menuName && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 overflow-hidden mt-1"
                        >
                          {menuItems[menuName].sections.map((section, idx) => (
                            <div key={idx} className="py-2">
                              {section.title && (
                                <h3 className="font-medium text-sm text-[#dffe00] mb-2">
                                  {section.title}
                                </h3>
                              )}

                              {section.items && (
                                <ul className="space-y-2">
                                  {section.items.map((item, i) => (
                                    <li key={i} className="py-1">
                                      <a
                                        href={item.link}
                                        className="flex gap-2.5 items-start hover:text-[#dffe00]"
                                        {...(isExternalLink(item.link) && { 
                                          target: '_blank', 
                                          rel: 'noopener noreferrer' 
                                        })}
                                      >
                                        {item.icon && (
                                          <span className="text-lg">
                                            {item.icon}
                                          </span>
                                        )}
                                        <div>
                                          <span
                                            className={`font-medium text-sm ${themeStyles.text}`}
                                          >
                                            {item.label}
                                          </span>
                                          {item.description && (
                                            <p
                                              className={`text-xs ${themeStyles.textSecondary}`}
                                            >
                                              {item.description}
                                            </p>
                                          )}
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {section.description && (
                                <div className="mt-1">
                                  <a
                                    href={section.link}
                                    className="block hover:text-[#dffe00]"
                                    {...(isExternalLink(section.link) && { 
                                      target: '_blank', 
                                      rel: 'noopener noreferrer' 
                                    })}
                                  >
                                    <p
                                      className={`text-sm ${themeStyles.textSecondary}`}
                                    >
                                      {section.description}
                                    </p>
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}

                          {menuName === "Ecosystem" &&
                            menuItems[menuName].ctaBox && (
                              <div
                                className={`bg-zinc-800 rounded-lg p-3 text-sm my-3`}
                              >
                                <a
                                  href={menuItems[menuName].ctaLink}
                                  className="block hover:text-[#dffe00]"
                                  {...(isExternalLink(menuItems[menuName].ctaLink) && { 
                                    target: '_blank', 
                                    rel: 'noopener noreferrer' 
                                  })}
                                >
                                  {menuItems[menuName].ctaBox}
                                </a>
                              </div>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile CTA Button */}
                <div className="py-4">
                  <motion.a
                    href="https://app.uomi.ai/"
                    className="block w-full text-center bg-[#dffe00] text-black py-2.5 rounded-full font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Testnet
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Navbar;