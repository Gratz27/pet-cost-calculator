import { AFFILIATE_LINKS } from "@/config/affiliates";
import { ShieldCheck, ShoppingBag, HeartPulse } from "lucide-react";

type BannerType = "insurance" | "supplies" | "food";

interface AffiliateBannerProps {
  type: BannerType;
  className?: string;
  variant?: "horizontal" | "box";
}

export function AffiliateBanner({ type, className = "", variant = "horizontal" }: AffiliateBannerProps) {
  const content = {
    insurance: {
      icon: ShieldCheck,
      title: "Protect Your Pet & Your Wallet",
      description: "Vet bills can cost thousands. Get a personalized pet insurance quote today.",
      cta: "Get Free Quote",
      link: AFFILIATE_LINKS.petInsurance,
      color: "bg-blue-50 border-blue-100 text-blue-900",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    supplies: {
      icon: ShoppingBag,
      title: "Save on Pet Essentials",
      description: "From crates to toys, find the best deals on top-rated pet supplies.",
      cta: "Shop Deals",
      link: AFFILIATE_LINKS.petSupplies,
      color: "bg-amber-50 border-amber-100 text-amber-900",
      iconColor: "text-amber-600",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
    },
    food: {
      icon: HeartPulse,
      title: "Nutrition Matters",
      description: "Give your pet the best start with high-quality, vet-recommended food.",
      cta: "Find Best Food",
      link: AFFILIATE_LINKS.petFood,
      color: "bg-green-50 border-green-100 text-green-900",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
  };

  const data = content[type];
  const Icon = data.icon;

  if (variant === "box") {
    return (
      <div className={`p-6 rounded-xl border-2 ${data.color} ${className} flex flex-col items-center text-center`}>
        <div className={`p-3 rounded-full bg-white shadow-sm mb-4 ${data.iconColor}`}>
          <Icon size={32} />
        </div>
        <h3 className="font-bold text-lg mb-2">{data.title}</h3>
        <p className="text-sm opacity-90 mb-4">{data.description}</p>
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 py-2 rounded-lg font-semibold text-white shadow-sm transition-colors ${data.buttonColor} w-full`}
        >
          {data.cta}
        </a>
        <span className="text-[10px] uppercase tracking-wider opacity-50 mt-3">Sponsored</span>
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-6 rounded-xl border-2 ${data.color} ${className} flex flex-col sm:flex-row items-center gap-4 sm:gap-6`}>
      <div className={`p-3 rounded-full bg-white shadow-sm shrink-0 ${data.iconColor}`}>
        <Icon size={32} />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-bold text-lg">{data.title}</h3>
        <p className="text-sm opacity-90">{data.description}</p>
      </div>
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-6 py-2 rounded-lg font-semibold text-white shadow-sm transition-colors ${data.buttonColor} whitespace-nowrap`}
      >
        {data.cta}
      </a>
    </div>
  );
}
