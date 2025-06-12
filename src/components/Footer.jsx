import { DiscordIcon, XIcon, GithubIcon } from "./Navbar";


const Footer = () => {
    return (
      <footer
        className={`w-full py-10 md:py-16 bg-black text-white border-t border-zinc-800`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo and Social - Full width on small mobile */}
            <div className="col-span-2 mb-6 md:mb-0 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <img
                  src="https://uomi-new.vercel.app/UOMI.svg"
                  alt="UOMI Logo"
                  className="h-8 md:h-10 w-auto"
                  style={{ filter: "invert(1)" }}
                />
              </div>
              <p
                className={`mb-4 md:mb-6 text-sm md:text-base text-gray-300 max-w-md`}
              >
                The layer 1 blockchain designed for autonomous AI. Built for
                verifiable on-chain computation, multi-chain agents, and the next
                generation of intelligent dApps.
              </p>
              <div className="flex space-x-4 mb-8">
                <a
                  href="https://x.com/uomiNetwork"
                  className={`p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200`}
                  aria-label="Twitter"
                >
                 <XIcon/>
                </a>
                <a
                  href="https://github.com/Uomi-network"
                  className={`p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200`}
                  aria-label="GitHub"
                >
                  <GithubIcon/>
                </a>
                <a
                  href="https://discord.gg/RV5DUpjsdY"
                  className={`p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200`}
                  aria-label="GitHub"
                >
                  <DiscordIcon/>
                </a>
              </div>
            </div>
  
            {/* Navigation Links - 2 columns on mobile, 3 columns on larger screens */}
            <div>
              <h3
                className="font-semibold text-base md:text-lg mb-3 md:mb-4"
                style={{ color: "#dffe00" }}
              >
                Products
              </h3>
              <ul
                className={`space-y-2 md:space-y-3 text-sm md:text-base text-gray-300`}
              >
                <li>
                  <a href="https://app.uomi.ai" className="hover:text-[#dffe00] transition-colors">
                    Testnet
                  </a>
                </li>
                <li>
                  <a href="/docs" className="hover:text-[#dffe00] transition-colors">
                    Developer
                  </a>
                </li>
                <li>
                  <a href="/wasp" className="hover:text-[#dffe00] transition-colors">
                    Agent Studio
                  </a>
                </li>
                <li>
                  <a href="https://explorer.uomi.ai" className="hover:text-[#dffe00] transition-colors">
                    Explorer
                  </a>
                </li>
              </ul>
            </div>
  
            <div >
              <h3
                className="font-semibold text-base md:text-lg mb-3 md:mb-4"
                style={{ color: "#dffe00" }}
              >
                Resources
              </h3>
              <ul
                className={`space-y-2 md:space-y-3 text-sm md:text-base text-gray-300`}
              >
                <li>
                  <a href="https://docs.uomi.ai" className="hover:text-[#dffe00] transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/whitepaper" className="hover:text-[#dffe00] transition-colors">
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-[#dffe00] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/RV5DUpjsdY" className="hover:text-[#dffe00] transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
       
  
          {/* Bottom */}
          <div
            className={`mt-10 md:mt-16 pt-6 md:pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center`}
          >
            <p
              className={`text-gray-400 text-xs md:text-sm text-center md:text-left`}
            >
              © 2025 UOMI Network. All rights reserved.
            </p>
            <div
              className={`flex gap-4 md:gap-6 mt-4 md:mt-0 text-gray-400 text-xs md:text-sm`}
            >
             
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;