import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AIVisualization = () => {
    const canvasRef = useRef(null);
    
    // Function to generate a unique pulse animation for each pulse element
    const getPulseAnimation = (index) => ({
      initial: { opacity: 0.3, scale: 0.7 },
      animate: {
        opacity: [0.3, 0.7, 0.3],
        scale: [0.7, 1, 0.7],
        transition: {
          duration: 3 + index * 0.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: index * 0.7,
        },
      },
    });
  
    // Canvas animation for background particles
    useEffect(() => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      // Handle resize
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      
      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      
      // Create particles
      const particlesArray = [];
      const numberOfParticles = 50;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 0.5;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.color = `rgba(223, 254, 0, ${Math.random() * 0.3 + 0.1})`;
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          if (this.x > canvas.width) this.x = 0;
          else if (this.x < 0) this.x = canvas.width;
          
          if (this.y > canvas.height) this.y = 0;
          else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      const init = () => {
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new Particle());
        }
      };
      
      init();
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }, []);
  
    // Define the node positions for a hexagonal layout
    const nodePositions = [
      { x: 0, y: -130 },            // Top
      { x: 112, y: -65 },           // Top Right
      { x: 112, y: 65 },            // Bottom Right
      { x: 0, y: 130 },             // Bottom
      { x: -112, y: 65 },           // Bottom Left
      { x: -112, y: -65 }           // Top Left
    ];
  
    // Define the connections between nodes (each node connects to two others)
    const nodeConnections = [
      [0, 1], [0, 5],    // Connect top node
      [1, 2],            // Connect top right
      [2, 3],            // Connect bottom right
      [3, 4],            // Connect bottom
      [4, 5]             // Connect bottom left
      // Node 5 already connected to 0
    ];
  
    // Define star connections (connecting to the center)
    const centerConnections = [0, 1, 2, 3, 4, 5]; // All nodes connect to center
  
    return (
      <div className="w-full relative h-[300px] md:h-[400px] overflow-hidden">
        {/* Background canvas for particles */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />
        
        {/* Center glow point */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full blur-md z-10"
          style={{ backgroundColor: "#dffe00" }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
  
        {/* Pulse elements */}
        {[...Array(5)].map((_, i) => {
          const pulseAnimation = getPulseAnimation(i);
          return (
            <motion.div
              key={`pulse-${i}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-20"
              style={{
                width: `${(i + 1) * 60}px`,
                height: `${(i + 1) * 60}px`,
                border: "1px solid rgba(223, 254, 0, 0.3)"
              }}
              initial={pulseAnimation.initial}
              animate={pulseAnimation.animate}
            />
          );
        })}
  
        {/* Center node */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-10 h-10 bg-black rounded-full z-20"
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 10px rgba(223, 254, 0, 0.5)",
          }}
          initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1 , x: "-50%", y: "-50%"}}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.5,
          }}
        >
       
        <motion.div
          className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full blur-md z-10"
          style={{
            backgroundColor: "#dffe00",
            opacity: 0.5,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        </motion.div>
      
  
  
        {/* Connections to center - FIXED */}
        {centerConnections.map((nodeIndex, i) => {
    const node = nodePositions[nodeIndex];
    const distance = Math.sqrt(node.x * node.x + node.y * node.y);
    const angle = Math.atan2(node.y, node.x) * (180 / Math.PI);
  
    return (
      <motion.div
        key={`center-connection-${i}`}
        className="absolute z-15"
        style={{
          width: `${distance}px`,
          height: `2px`,
          top: "50%",
          left: "50%",
          transformOrigin: "0 0",
          background: "linear-gradient(90deg, rgba(223, 254, 0, 0.6), rgba(223, 254, 0, 0.2))"
        }}
        initial={{ scaleX: 0, opacity: 0, rotate: angle }}
        animate={{ scaleX: 1, opacity: 1, rotate: angle }}
        transition={{
          delay: 1.0 + (i * 0.15),
          duration: 0.8,
          ease: "easeOut"
        }}
      />
    );
  })}
  
        {/* Node-to-node connections - FIXED */}
        {nodeConnections.map(([from, to], i) => {
    const fromNode = nodePositions[from];
    const toNode = nodePositions[to];
  
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
    return (
      <motion.div
        key={`connection-${i}`}
        className="absolute z-15"
        style={{
          width: `${distance}px`,
          height: `2px`,
          top: `calc(50% + ${fromNode.y}px)`,
          left: `calc(50% + ${fromNode.x}px)`,
          transformOrigin: "0 0",
          background: "linear-gradient(90deg, rgba(223, 254, 0, 0.5), rgba(223, 254, 0, 0.3))"
        }}
        initial={{ scaleX: 0, opacity: 0, rotate: angle }}
        animate={{ scaleX: 1, opacity: 1, rotate: angle }}
        transition={{
          delay: 1.5 + (i * 0.15),
          duration: 0.8,
          ease: "easeOut"
        }}
      />
    );
  })}
  
        {/* Data nodes */}
        {nodePositions.map((node, i) => {
    return (
      <motion.div
        key={`node-${i}`}
        className="absolute top-1/2 left-1/2 w-6 h-6 bg-black rounded-md flex items-center justify-center shadow-lg z-30"
        style={{
          left: `calc(50% + ${node.x}px)`,
          top: `calc(50% + ${node.y}px)`,
          border: "1px solid rgba(223, 254, 0, 0.5)",
          boxShadow: "0 4px 6px -1px rgba(223, 254, 0, 0.2)"
        }}
        initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        transition={{
          delay: 0.5 + i * 0.2,
          duration: 0.5,
          type: "spring",
        }}
        whileHover={{ 
          scale: 1.2, 
          boxShadow: "0 8px 16px -2px rgba(223, 254, 0, 0.3)",
          borderColor: "rgba(223, 254, 0, 0.8)"
        }}
      >
        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "#dffe00" }} />
      </motion.div>
    );
  })}
  
        {/* Data flow particles - small dots moving along connections */}
        {nodeConnections.map(([from, to], i) => {
          const fromNode = nodePositions[from];
          const toNode = nodePositions[to];
          
          return (
            <motion.div
              key={`data-flow-${i}`}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full z-30"
              style={{
                backgroundColor: "#dffe00",
                boxShadow: "0 0 3px rgba(223, 254, 0, 0.8)",
                transformOrigin: "center"
              }}
              initial={{ 
                x: fromNode.x - 3, 
                y: fromNode.y - 3,
                opacity: 0
              }}
              animate={{ 
                x: [fromNode.x - 3, toNode.x - 3],
                y: [fromNode.y - 3, toNode.y - 3],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: 2 + (i * 0.4),
                repeat: Infinity,
                repeatDelay: 3 + (i % 3)
              }}
            />
          );
        })}
  
        {/* Center to node data flows */}
        {centerConnections.map((nodeIndex, i) => {
          const node = nodePositions[nodeIndex];
          return (
            <motion.div
              key={`center-flow-${i}`}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full z-30"
              style={{
                backgroundColor: "#dffe00",
                boxShadow: "0 0 3px rgba(223, 254, 0, 0.8)",
                transformOrigin: "center"
              }}
              initial={{ 
                x: -3, 
                y: -3,
                opacity: 0
              }}
              animate={{ 
                x: [0 - 3, node.x - 3],
                y: [0 - 3, node.y - 3],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.2,
                delay: 3 + (i * 0.7),
                repeat: Infinity,
                repeatDelay: 4 + (i % 4)
              }}
            />
          );
        })}
      </div>
    );
  };

export default AIVisualization;