import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonXProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
}

export default function ButtonX({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  iconOnly = false,
  disabled,
  className = "",
  type = "button",
  ...props
}: ButtonXProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
    outline: "border border-gray-300 bg-white text-black hover:border-black",
    ghost: "bg-transparent text-black hover:bg-gray-100",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-sm",
  };
  const iconStyles = iconOnly ? "h-10 w-10 !p-0 text-xl" : "";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        disabled || loading ? "cursor-not-allowed opacity-50" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
}
