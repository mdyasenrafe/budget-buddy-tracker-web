import React from "react";

export type T3DCategoryDetails = {
  emoji: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  shadowColor: string;
};

export const get3DCategoryDetails = (
  categoryName?: string,
  type?: string
): T3DCategoryDetails => {
  const norm = (categoryName || "").toLowerCase().replace(/[\s_-]+/g, "");

  if (norm.includes("grocer") || norm.includes("supermarket")) {
    return {
      emoji: "🛒",
      bgGradient: "bg-gradient-to-b from-amber-50 to-amber-100/90",
      borderColor: "border-amber-200/80",
      textColor: "text-amber-700",
      shadowColor: "shadow-[0_3px_8px_rgba(245,158,11,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("utilit") ||
    norm.includes("bill") ||
    norm.includes("electric") ||
    norm.includes("water") ||
    norm.includes("gas") ||
    norm.includes("internet") ||
    norm.includes("wifi")
  ) {
    return {
      emoji: "💡",
      bgGradient: "bg-gradient-to-b from-sky-50 to-sky-100/90",
      borderColor: "border-sky-200/80",
      textColor: "text-sky-700",
      shadowColor: "shadow-[0_3px_8px_rgba(14,165,233,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("health") ||
    norm.includes("medic") ||
    norm.includes("doctor") ||
    norm.includes("pharma") ||
    norm.includes("hospital")
  ) {
    return {
      emoji: "🩺",
      bgGradient: "bg-gradient-to-b from-rose-50 to-rose-100/90",
      borderColor: "border-rose-200/80",
      textColor: "text-rose-700",
      shadowColor: "shadow-[0_3px_8px_rgba(244,63,94,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("transport") ||
    norm.includes("bus") ||
    norm.includes("fuel") ||
    norm.includes("uber") ||
    norm.includes("taxi") ||
    norm.includes("car") ||
    norm.includes("train")
  ) {
    return {
      emoji: "🚗",
      bgGradient: "bg-gradient-to-b from-blue-50 to-blue-100/90",
      borderColor: "border-blue-200/80",
      textColor: "text-blue-700",
      shadowColor: "shadow-[0_3px_8px_rgba(59,130,246,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("travel") ||
    norm.includes("flight") ||
    norm.includes("hotel") ||
    norm.includes("plane") ||
    norm.includes("tour") ||
    norm.includes("vacation")
  ) {
    return {
      emoji: "✈️",
      bgGradient: "bg-gradient-to-b from-indigo-50 to-indigo-100/90",
      borderColor: "border-indigo-200/80",
      textColor: "text-indigo-700",
      shadowColor: "shadow-[0_3px_8px_rgba(99,102,241,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("educat") ||
    norm.includes("course") ||
    norm.includes("book") ||
    norm.includes("school") ||
    norm.includes("tuition") ||
    norm.includes("college")
  ) {
    return {
      emoji: "🎓",
      bgGradient: "bg-gradient-to-b from-cyan-50 to-cyan-100/90",
      borderColor: "border-cyan-200/80",
      textColor: "text-cyan-700",
      shadowColor: "shadow-[0_3px_8px_rgba(6,182,212,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("dining") ||
    norm.includes("food") ||
    norm.includes("restaurant") ||
    norm.includes("cafe") ||
    norm.includes("eat") ||
    norm.includes("coffee") ||
    norm.includes("lunch") ||
    norm.includes("dinner")
  ) {
    return {
      emoji: "🍔",
      bgGradient: "bg-gradient-to-b from-orange-50 to-orange-100/90",
      borderColor: "border-orange-200/80",
      textColor: "text-orange-700",
      shadowColor: "shadow-[0_3px_8px_rgba(249,115,22,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("entertain") ||
    norm.includes("movie") ||
    norm.includes("music") ||
    norm.includes("game") ||
    norm.includes("netflix") ||
    norm.includes("cinema")
  ) {
    return {
      emoji: "🎬",
      bgGradient: "bg-gradient-to-b from-purple-50 to-purple-100/90",
      borderColor: "border-purple-200/80",
      textColor: "text-purple-700",
      shadowColor: "shadow-[0_3px_8px_rgba(168,85,247,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("saving") ||
    norm.includes("invest") ||
    norm.includes("stock") ||
    norm.includes("crypto") ||
    norm.includes("deposit")
  ) {
    return {
      emoji: "📈",
      bgGradient: "bg-gradient-to-b from-emerald-50 to-emerald-100/90",
      borderColor: "border-emerald-200/80",
      textColor: "text-emerald-700",
      shadowColor: "shadow-[0_3px_8px_rgba(16,185,129,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("child") ||
    norm.includes("baby") ||
    norm.includes("kid") ||
    norm.includes("toy")
  ) {
    return {
      emoji: "🧸",
      bgGradient: "bg-gradient-to-b from-pink-50 to-pink-100/90",
      borderColor: "border-pink-200/80",
      textColor: "text-pink-700",
      shadowColor: "shadow-[0_3px_8px_rgba(236,72,153,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("home") ||
    norm.includes("rent") ||
    norm.includes("house") ||
    norm.includes("repair") ||
    norm.includes("furniture")
  ) {
    return {
      emoji: "🏠",
      bgGradient: "bg-gradient-to-b from-amber-50 to-amber-100/90",
      borderColor: "border-amber-200/80",
      textColor: "text-amber-700",
      shadowColor: "shadow-[0_3px_8px_rgba(217,119,6,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("charity") ||
    norm.includes("donat") ||
    norm.includes("gift")
  ) {
    return {
      emoji: "🎁",
      bgGradient: "bg-gradient-to-b from-teal-50 to-teal-100/90",
      borderColor: "border-teal-200/80",
      textColor: "text-teal-700",
      shadowColor: "shadow-[0_3px_8px_rgba(20,184,166,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (
    norm.includes("salary") ||
    norm.includes("wage") ||
    norm.includes("income") ||
    norm.includes("paycheck") ||
    norm.includes("freelance") ||
    norm.includes("bonus")
  ) {
    return {
      emoji: "💵",
      bgGradient: "bg-gradient-to-b from-emerald-50 to-emerald-100/90",
      borderColor: "border-emerald-200/80",
      textColor: "text-emerald-700",
      shadowColor: "shadow-[0_3px_8px_rgba(16,185,129,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (norm.includes("shop") || norm.includes("cloth") || norm.includes("shoes")) {
    return {
      emoji: "🛍️",
      bgGradient: "bg-gradient-to-b from-fuchsia-50 to-fuchsia-100/90",
      borderColor: "border-fuchsia-200/80",
      textColor: "text-fuchsia-700",
      shadowColor: "shadow-[0_3px_8px_rgba(217,70,239,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  if (type === "income") {
    return {
      emoji: "💰",
      bgGradient: "bg-gradient-to-b from-emerald-50 to-emerald-100/90",
      borderColor: "border-emerald-200/80",
      textColor: "text-emerald-700",
      shadowColor: "shadow-[0_3px_8px_rgba(16,185,129,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]",
    };
  }

  return {
    emoji: "🧾",
    bgGradient: "bg-gradient-to-b from-slate-50 to-slate-100/90",
    borderColor: "border-slate-200/80",
    textColor: "text-slate-700",
    shadowColor: "shadow-[0_3px_8px_rgba(100,116,139,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]",
  };
};

export const Category3DBadge: React.FC<{
  categoryName?: string;
  type?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ categoryName, type, size = "md", className = "" }) => {
  const details = get3DCategoryDetails(categoryName, type);

  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg text-base",
    md: "w-10 h-10 rounded-xl text-lg",
    lg: "w-12 h-12 rounded-2xl text-xl",
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 border select-none transition-transform duration-200 ${sizeClasses} ${details.bgGradient} ${details.borderColor} ${details.shadowColor} ${className}`}
    >
      <span className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.12)] filter leading-none transform transition-transform group-hover:scale-110">
        {details.emoji}
      </span>
    </div>
  );
};
