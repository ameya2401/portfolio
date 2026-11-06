import Image from "next/image";

const monochrome = new Set([
  "nextjs",
  "shadcn",
  "radix",
  "github",
  "x",
  "cal",
  "cursor",
  "opencode",
  "vercel",
  "bun",
]);

export default function BrandLogo({
  name,
  size = 18,
}: {
  name: string;
  size?: number;
}) {
  return (
    <Image
      src={`/logos/${name}.svg`}
      alt=""
      width={size}
      height={size}
      className={`brand-logo ${monochrome.has(name) ? "brand-logo-mono" : ""}`}
      unoptimized
    />
  );
}
