import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-foreground/80"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full px-4 py-3.5 bg-background-secondary/50 border border-border rounded-xl",
          "text-foreground placeholder:text-foreground-subtle",
          "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 focus:bg-white",
          "transition-all duration-300 resize-none",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        rows={5}
        {...props}
      />
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
}
