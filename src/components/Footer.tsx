import React from "react";
import { Caveat } from "next/font/google";
import { Twitter, Instagram, AtSign, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

export const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/5 pt-16 pb-8 px-8 lg:px-16 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-white/5">
          <Link href="/" className="group cursor-pointer">
            <div className="relative h-16 w-48 flex items-center">
              <Image 
                src="/murithi-labs-logo.png" 
                alt="Murithi Labs Logo" 
                width={192} 
                height={64} 
                className="object-contain transition duration-300 group-hover:scale-105" 
              />
            </div>
          </Link>

          {/* Socials */}
          <div className="flex items-center space-x-6 text-neutral-400">
             <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition" />
             <AtSign className="w-5 h-5 hover:text-white cursor-pointer transition" />
             <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition" />
             <Music className="w-5 h-5 hover:text-white cursor-pointer transition" />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 py-12 border-b border-white/5">
          {/* Col 1 */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-1">Platform</h4>
            <a href="#" className="text-neutral-500 hover:text-white transition">Store</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Courses</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Codebases</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Figma Designs</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">PDF Guides</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">YouTube Kits</a>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-1">Services</h4>
            <a href="#" className="text-neutral-500 hover:text-white transition">Design Services</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Animated Intro</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Sponsorship</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Blogs</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">My Library</a>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-1">Company</h4>
            <a href="#" className="text-white font-medium transition cursor-pointer">Contact</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">License Terms</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Blog</a>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-medium mb-1">Legal</h4>
            <a href="#" className="text-neutral-500 hover:text-white transition">License Terms</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-neutral-500 hover:text-white transition">Cookie Policy</a>
          </div>

          {/* Col 5: Newsletter */}
          <div className="flex flex-col space-y-4 lg:col-span-2">
            <h4 className="text-white font-medium mb-1">Newsletter</h4>
            <form className="flex space-x-2">
              <input 
                 type="email" 
                 placeholder="Your email" 
                 className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-600 outline-none focus:border-white/30 transition"
              />
              <button 
                 type="submit" 
                 className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg hover:opcaity-90 transition"
              >
                Submit
              </button>
            </form>
            <p className="text-neutral-500">Don't miss any update!</p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8">
           <p className="text-neutral-500 text-xs">
             © 2026 Murithi Labs, All rights reserved
           </p>
        </div>

      </div>
    </footer>
  );
};
