"use client";
import React, { useState } from "react";

const defaultFormState = {
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  message: {
    value: "",
    error: "",
  },
};
export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Write your submit logic here
    console.log(formData);
  };
  return (
    <div className="w-full bg-white flex flex-col p-8 md:p-12">
      <h2 className="text-black text-4xl md:text-5xl font-black uppercase tracking-tight mb-12">Let&apos;s Talk</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label className="text-black text-[10px] font-bold uppercase tracking-wider mb-2">Full Name*</label>
            <input
              type="text"
              placeholder="Your Name here"
              className="bg-transparent border-b border-black/20 focus:border-black outline-none py-2 text-black transition-all"
              required
              value={formData.name.value}
              onChange={(e) => setFormData({...formData, name: { value: e.target.value, error: "" }})}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black text-[10px] font-bold uppercase tracking-wider mb-2">Email*</label>
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent border-b border-black/20 focus:border-black outline-none py-2 text-black transition-all"
              required
              value={formData.email.value}
              onChange={(e) => setFormData({...formData, email: { value: e.target.value, error: "" }})}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-black text-[10px] font-bold uppercase tracking-wider mb-2">Subject*</label>
          <input
            type="text"
            placeholder="Write Subject line"
            className="bg-transparent border-b border-black/20 focus:border-black outline-none py-2 text-black transition-all"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black text-[10px] font-bold uppercase tracking-wider mb-2">Message*</label>
          <textarea
            rows={5}
            placeholder="Enter your message here..."
            className="bg-transparent border-b border-black/20 focus:border-black outline-none py-4 text-black transition-all resize-none"
            required
            value={formData.message.value}
            onChange={(e) => setFormData({...formData, message: { value: e.target.value, error: "" }})}
          />
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center bg-black text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition shadow-xl"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};
