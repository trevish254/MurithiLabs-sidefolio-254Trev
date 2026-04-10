import clsx from "clsx";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "prose prose-sm prose-invert prose-blue max-w-none prose-p:text-neutral-400 prose-headings:text-white"
      )}
    >
      {children}
    </div>
  );
}
