import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-xl py-24 text-center">
      <div className="text-6xl mb-4">🐾</div>
      <h1 className="text-3xl font-bold text-[#0f172a] mb-3">Page Not Found</h1>
      <p className="text-slate-500 mb-8">This page wandered off. Let's get you back on track.</p>
      <Link href="/" className="btn-primary">Go Home <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}
