"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: "zinc" | "yellow" | "purple" | "orange" | "red";
}

const colorVariants = {
  zinc: {
    gradient: "from-zinc-700 to-zinc-900",
    bg: "bg-zinc-500",
    text: "text-white",
    icon: "text-zinc-600",
  },
  yellow: {
    gradient: "from-yellow-500 to-yellow-600",
    bg: "bg-yellow-500",
    text: "text-white",
    icon: "text-yellow-600",
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    bg: "bg-purple-500",
    text: "text-white",
    icon: "text-purple-600",
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-500",
    text: "text-white",
    icon: "text-orange-600",
  },
  red: {
    gradient: "from-red-500 to-red-600",
    bg: "bg-red-500",
    text: "text-white",
    icon: "text-red-600",
  },
};

export function OverviewCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color,
}: OverviewCardProps) {
  const colors = colorVariants[color];

  return (
    <div
      className={`${colors.bg} rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white font-bold">{title}</p>
              {trend && (
                <div className="flex items-center gap-1 mt-1">
                  {trend.isPositive ? (
                    <TrendingUp className="w-3 h-3 text-white" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-white" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      trend.isPositive
                        ? "text-white font-bold"
                        : "text-white font-bold"
                    }`}
                  >
                    {trend.isPositive ? "+" : ""}
                    {trend.value}%
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            <p className="text-sm text-white">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
