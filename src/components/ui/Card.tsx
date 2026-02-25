import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export function Card({
  children,
  className,
  glass = false,
  hover = true,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 p-6",
        glass
          ? "glass"
          : "bg-white",
        hover &&
          "transition-all duration-500 hover:border-accent/20 hover:shadow-[0_8px_40px_rgba(108,99,255,0.08)] hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
