import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full",
        "bg-gradient-to-r from-accent/8 to-accent-cyan/8 text-accent border border-accent/10",
        className
      )}
    >
      {children}
    </span>
  );
}
