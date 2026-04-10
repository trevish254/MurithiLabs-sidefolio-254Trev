"use client";
import React from "react";
import { motion } from "framer-motion";
import { Blog } from "@/types/blog";
import { BlogCardV2 } from "./BlogCardV2";

export const BlogListing = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <BlogCardV2 blog={blog} index={index} />
        </motion.div>
      ))}
    </div>
  );
};
