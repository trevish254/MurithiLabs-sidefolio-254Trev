import Head from "next/head";
import Image from "next/image";
import { formatDate } from "../../lib/formatDate";
import { Prose } from "@/components/Prose";
import { Container } from "./Container";
import { Heading } from "./Heading";
import Link from "next/link";
import { Paragraph } from "./Paragraph";

function ArrowLeftIcon(props: any) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}: any) {
  return (
    <Container>
      <article>
        <header className="flex flex-col">
          <Link
            type="button"
            href="/blog"
            aria-label="Go back to articles"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 shadow-xl ring-1 ring-white/10 transition hover:ring-white/20"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-400 transition group-hover:stroke-white" />
          </Link>

          <Heading className=" py-4">{meta.title}</Heading>
          <time
            dateTime={meta.date}
            className="flex items-center text-sm text-zinc-500 font-bold uppercase tracking-widest"
          >
            {formatDate(meta.date)}
          </time>
          <div className="w-full mt-8 aspect-w-16 aspect-h-10 bg-zinc-900 rounded-2xl overflow-hidden relative border border-white/5">
            <Image
              src={meta.image}
              alt="thumbnail"
              height="800"
              width="800"
              className={`object-cover object-left-top w-full max-h-96`}
            />
          </div>
        </header>
        <Prose className="mt-8">{children}</Prose>
      </article>
    </Container>
  );
}
