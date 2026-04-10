"use client";
import React from "react";
import { 
  FileCheck, Shield, BookOpen, AlertCircle, HelpCircle, 
  RotateCcw, Scale, Users, CheckCircle2, Info
} from "lucide-react";

export default function LicensePage() {
  const sections = [
    {
      id: "fair-use",
      title: "Fair Use of the License",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      content: "You may use this codebase to run as a SaaS, generate revenue through your customers, or sell your SaaS business to an investor or buyer. However, if you sell your SaaS business, the new owner must purchase their own license for the codebase. You may promote your SaaS through social media and marketing content showcasing your product and seeking customers."
    },
    {
      id: "incorrect-use",
      title: "Incorrect Use of the License",
      icon: <AlertCircle className="w-5 h-5 text-rose-400" />,
      content: "You cannot resell this codebase to others as a template or codebase product similar to how we distribute it. You are strictly prohibited from creating SaaS development tutorials or educational content showing how to build this codebase. While you may promote your SaaS product and create marketing content for customer acquisition, you cannot create technical tutorials teaching others how to develop or replicate the codebase."
    },
    {
      id: "subscription",
      title: "Subscription-Based Codebase License",
      icon: <RotateCcw className="w-5 h-5 text-blue-400" />,
      content: "For subscription-based codebases, the commercial license is included free with your active subscription. However, this license expires when your subscription ends under certain circumstances: If there is a one-off purchase available for this codebase in our store, and you have purchased a subscription version of the codebase, then your subscription based license will not expire. Your subscription based license automatically gets upgraded to a lifetime license once your subscription total (paid so far) is equal to the total price of the one-off purchase version. If there is no one-off purchase available in the store, to obtain a lifetime commercial license, you must purchase the one-off codebase product separately. Our platform currently does not allow customer to pay off remainers left on their subscription to claim the lifetime license. Please plan accordingly before canceling any subscriptions with us. You can speak to our team before your cancelation for assistance or clarification."
    },
    {
      id: "refunds",
      title: "Refund Policy",
      icon: <Scale className="w-5 h-5 text-amber-400" />,
      content: "Due to the nature of digital products, there is a strict no refund policy. Any and all chargebacks will automatically result in a 30% penalty fee applied to your billing details. You are requested to DM us on Instagram regarding any concerns."
    },
    {
      id: "support",
      title: "1-on-1 Support",
      icon: <Users className="w-5 h-5 text-purple-400" />,
      content: "We do not provide 1-on-1 support, coding assistance, or technical troubleshooting for purchased codebases. We expect all customers to be experienced web developers capable of working with the code independently. This codebase is not production-grade and will require additional development work, bug fixes, and feature additions before deployment. The code is provided as-is for educational purposes, and you are responsible for any modifications, improvements, or debugging required to make it production-ready."
    },
    {
      id: "non-compete",
      title: "Non-Compete",
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      content: "Regardless if you purchase a license or not, you are strictly prohibited from creating and publishing SaaS coding tutorials, or SaaS tutorials—based videos on any of our projects, products, licenses, source code, designs, or mockups without prior written permission. You must first obtain explicit approval by contacting us directly. However, you can create social media content that promotes the SaaS application seeking to get SaaS subscribers / customers after purchasing a license. For example, you purchased Corinna Ai's codebase/license because you wanted to launch Corinna as a real SaaS company. Now you create social media content to market your product and get SaaS customers. This is allowed."
    },
    {
      id: "activation",
      title: "License Activation & Validation",
      icon: <FileCheck className="w-5 h-5 text-cyan-400" />,
      content: "Once you receive your license key after your purchase add your license key to your environment variables. The codebase includes built-in license validation mechanisms. There is no additional activation required - the license is automatically validated when you receive the code. Any attempt to remove, modify, or bypass these validation mechanisms is strictly prohibited and will be prosecuted to the full extent of the law. This includes but is not limited to: removing validation code, modifying license checks, or attempting to circumvent the built-in security measures."
    },
    {
      id: "as-is",
      title: "Code is Sold As Is",
      icon: <Info className="w-5 h-5 text-zinc-400" />,
      content: "This project was created as part of a YouTube tutorial series and is provided as is. Each project was planned, developed, recorded, and published within a tight timeframe—typically under one month. While reasonable effort was made to minimize bugs, the code is intended for educational purposes and may contain issues that were not identified during development. It is the Customer's responsibility to hire developers for ongoing maintenance and improvements. The original Developers are not liable for the code's performance or production readiness."
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <Scale className="w-5 h-5 text-neutral-400" />,
      content: "The Customer, does hereby waive and release, indemnify, and forever discharges WEB PRODIGIES LLC, and its agents, employees, officers, directors, affiliates, successors, members, and assigns, of and from any and all claims, demands, debts, contracts, expenses, causes of action, lawsuits, damages and liabilities, of every kind and nature, whether known or unknown, in law or equity, that I ever had or may have, arising from or in any way related to the services, licenses, code, (\"Services\") being provided to me by Company provided that this waiver of liability does not apply to any acts of gross negligence, or intentional, willful or wanton misconduct."
    }
  ];

  return (
    <div className="w-full bg-black min-h-screen relative font-sans">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/40 text-sm font-medium tracking-[0.2em] uppercase">Legal Documents</span>
          </div>
          
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6">
            License <span className="text-neutral-500 italic">Terms</span>
          </h1>
          
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Simple and straightforward terms for using our intellectual property. Our goal is to empower you to build while protecting the original work.
          </p>
        </header>

        {/* Info Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start space-x-4">
          <HelpCircle className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-1" />
          <p className="text-neutral-500 text-sm leading-relaxed">
            If your purchase involves a codebase the following license applies. Codebases now come with a free commercial license when you purchase the codebase. These terms apply to the codebases you purchase.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="group scroll-mt-24">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-white/10 transition-colors">
                  {section.icon}
                </div>
                <h3 className="text-white text-xl font-bold tracking-tight">
                  {section.title}
                </h3>
              </div>
              <div className="pl-12">
                <p className="text-neutral-400 text-base leading-[1.8] font-medium">
                  {section.content}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Footer Contact */}
        <div className="mt-24 pt-12 border-t border-white/10 text-center">
          <p className="text-neutral-500 text-sm mb-6">
            Have questions about these terms?
          </p>
          <a 
            href="https://instagram.com/webprodigies" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium hover:bg-white/10 transition group"
          >
            <span>Reach out to @webprodigies</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>

    </div>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
