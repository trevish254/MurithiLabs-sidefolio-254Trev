import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { getAllBlogs } from "../../../lib/getAllBlogs";
import { BlogListing } from "@/components/BlogListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Trevor",
  description: "I write about technology, system architecture, and building digital products.",
};

export default async function Blog() {
  const blogs = await getAllBlogs();
  const data = blogs.map(({ component, ...meta }) => meta);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 bg-black">
      <div className="mb-16">
        <span className="text-4xl block mb-4">📝</span>
        <Heading className="font-black text-5xl md:text-7xl mb-6">I write about <span className="text-neutral-500 italic">Technology</span></Heading>
        <Paragraph className="text-xl text-neutral-400 max-w-2xl">
          Ever since <Highlight>I was a kid</Highlight>, I&apos;ve been
          fascinated by how systems are built and logic is structured.
        </Paragraph>
      </div>
      <BlogListing key={data.length} blogs={data} />
    </div>
  );
}
