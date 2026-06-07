import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen flex items-center justify-center">
      <div className="container-xl py-24 text-center">
        <div className="text-6xl mb-4">🐾</div>
        <h1 className="text-3xl font-bold text-[#1B2B1B] mb-3">Page Not Found</h1>
        <p className="text-[#5a7a5a] mb-8">This page wandered off. Let&apos;s get you back on track.</p>
        <Link href="/" className="btn-green inline-flex items-center gap-2">Go Home <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}
