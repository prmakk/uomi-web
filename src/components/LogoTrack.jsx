
import { motion } from "framer-motion";

const LogoTrack = ({
    isDarkMode,
    direction = "left",
    speed = 35,
    alternate = false,
  }) => {
    // Define logos with actual image URLs
    const logos = alternate
      ? [
          {
            imageUrl: "https://uomi.ai/assets/sweat-wallet.png",
            alt: "Alchemy",
            key: "alchemy",
          },
          {
            imageUrl: "https://uomi.ai/assets/seedify.png",
            alt: "Infura",
            key: "infura",
          },
          {
            imageUrl: "https://uomi.ai/assets/cookie3.png",
            alt: "Consensys",
            key: "consensys",
          },
          {
            imageUrl: "https://uomi.ai/assets/aethir.png",
            alt: "OpenAI",
            key: "openai",
          },
          {
            imageUrl: "https://uomi.ai/assets/eesee.png",
            alt: "Anthropic",
            key: "anthropic",
          },
          {
            imageUrl: "https://uomi.ai/assets/ethermail.png",
            alt: "Paradigm",
            key: "paradigm",
          },
          {
            imageUrl: "https://uomi.ai/assets/impossible-cloud-network.svg",
            alt: "a16z",
            key: "a16z",
          },
        ]
      : [
          {
            imageUrl: "https://uomi.ai/assets/aitech-pad.png",
            alt: "Ethereum",
            key: "ethereum",
          },
          {
            imageUrl: "https://uomi.ai/assets/ankr.png",
            alt: "Polygon",
            key: "polygon",
          },
          {
            imageUrl: "https://uomi.ai/assets/heurist.png",
            alt: "Arbitrum",
            key: "arbitrum",
          },
          {
            imageUrl: "https://uomi.ai/assets/io-net.png",
            alt: "Binance",
            key: "binance",
          },
          {
            imageUrl: "https://uomi.ai/assets/inferix.png",
            alt: "Avalanche",
            key: "avalanche",
          },
          {
            imageUrl: "https://uomi.ai/assets/paid.png",
            alt: "Solana",
            key: "solana",
          },
          {
            imageUrl: "https://uomi.ai/assets/poolz.png",
            alt: "Near",
            key: "near",
          },
          {
            imageUrl: "https://uomi.ai/assets/sentient-labs.png",
            alt: "Optimism",
            key: "optimism",
          },
        ];
  
    // Animation for continuous loop
    return (
      <div className="flex overflow-hidden">
        <motion.div
          className="flex items-center gap-10 whitespace-nowrap"
          animate={{
            x: direction === "left" ? [0, -2000] : [-2000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.key}-${index}`}
              className={`bg-zinc-900 border border-zinc-800 flex items-center justify-center h-16 w-40 p-3 rounded-lg shrink-0`}
            >
              {/* Display logo image */}
              <img
                src={logo.imageUrl}
                alt={logo.alt}
                className={`h-full max-w-full object-contain brightness-0 invert`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

export default LogoTrack;