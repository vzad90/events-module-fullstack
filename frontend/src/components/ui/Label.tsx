import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...rest }: LabelProps) {
  const baseClasses = "text-sm font-medium text-neutral-800";

  const merged = [baseClasses, className].filter(Boolean).join(" ");

  return <label className={merged} {...rest} />;
}

