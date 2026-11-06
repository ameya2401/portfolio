import type { ReactNode } from "react";

// Keep existing article wrappers compatible without a perpetual canvas loop.
export default function AsciiHeroContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
