import { Twitter, Github, DiscIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white py-12 px-4 md:px-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 className="font-bold mb-4">Product</h4>
          <ul className="space-y-2">
            <li><a href="/drop" className="hover:text-gray-300 transition-colors">Drop</a></li>
            <li><a href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</a></li>
            <li><a href="/invest" className="hover:text-gray-300 transition-colors">Invest</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="https://vesu.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Vesu.xyz</a></li>
            <li><a href="/app-store" className="hover:text-gray-300 transition-colors">App Store</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li><a href="https://x.com/ethersight" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">X (Twitter)</a></li>
            <li><a href="https://github.com/ethersight" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">GitHub</a></li>
            <li><a href="https://discord.gg/ethersight" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Discord</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
        <div className="text-sm mb-4 md:mb-0">
          © EtherSight 2025. All Operations Monitored. All Rights Reserved.
        </div>
        <div className="flex space-x-4">
          <a 
            href="https://x.com/ethersight" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-300 transition-colors"
          >
            <Twitter size={24} />
          </a>
          <a 
            href="https://github.com/ethersight" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-300 transition-colors"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://discord.gg/ethersight" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-300 transition-colors"
          >
            <DiscIcon size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}