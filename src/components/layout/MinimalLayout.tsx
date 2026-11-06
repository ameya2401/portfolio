"use client";
import { usePathname } from 'next/navigation';
import QuietShell from '@/components/quiet/QuietShell';
export default function MinimalLayout({children}:{children:React.ReactNode}) {
 const path=usePathname();
 return path.startsWith('/keystatic')?<>{children}</>:<QuietShell>{children}</QuietShell>;
}
