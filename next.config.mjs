/** @type {import('next').NextConfig} */
const nextConfig = {
  // Shown as "Last updated" in the footer.
  env: { NEXT_PUBLIC_BUILD_DATE: new Date().toISOString() },
};

export default nextConfig;
