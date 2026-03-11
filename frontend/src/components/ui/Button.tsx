import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 disabled:cursor-not-allowed";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-400",
    secondary:
      "border border-neutral-300 bg-transparent text-neutral-700 hover:border-neutral-400 hover:bg-neutral-100 disabled:border-neutral-200 disabled:text-neutral-400",
    ghost:
      "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:text-neutral-400",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  const merged = [baseClasses, variantClasses[variant], widthClasses, className]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={merged} {...rest} />;
}

