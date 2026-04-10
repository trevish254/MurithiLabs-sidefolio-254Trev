import { Contact } from "@/components/Contact";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact | Trevor",
  description: "Get in touch with Trevor for system architecture, lead development, and innovative digital products.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-black min-h-screen relative font-sans text-white overflow-x-hidden">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 relative z-10">
        
        {/* Giant Hollow Header — Resembling the reference */}
        <div className="mb-12 overflow-hidden flex justify-center">
          <h1 
            className="text-[15vw] font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap select-none"
            style={{ 
              WebkitTextStroke: "1px rgba(255,255,255,0.15)", 
              color: "transparent",
              filter: "drop-shadow(0 0 1px rgba(255,255,255,0.05))"
            }}
          >
            CONTACT
          </h1>
        </div>

        {/* Split Card Design */}
        <div className="grid grid-cols-1 lg:grid-cols-5 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5">
          
          {/* Left Side: Editorial Portrait */}
          <div className="lg:col-span-2 relative min-h-[400px] bg-red-600">
             <Image 
                src="/images/contact-portrait.png" 
                alt="Trevor Portrait" 
                fill 
                className="object-cover"
                priority
             />
             {/* Red Overlay to match the solid red look if needed */}
             <div className="absolute inset-0 bg-red-600/10 mix-blend-multiply" />
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-3">
             <Contact />
          </div>

        </div>

        <div className="mt-20 text-center">
           <Paragraph className="text-zinc-500 font-medium">
             Alternatively, reached out via <span className="text-white hover:underline cursor-pointer">trevor@murithilabs.co</span>
           </Paragraph>
        </div>

      </div>

      <Footer />
    </div>
  );
}
