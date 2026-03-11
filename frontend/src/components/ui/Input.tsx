import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: InputProps) {
  const baseClasses =
    "h-10 rounded-full border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0";

  const merged = [baseClasses, className].filter(Boolean).join(" ");

  return <input className={merged} {...rest} />;
}

