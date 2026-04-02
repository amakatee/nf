import { cn } from "@/lib/utils"; // Optional: your classnames helper (or just use template literals)
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", children, ...props },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center rounded-full font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      className
    );

    const variants = {
      primary: "bg-[#3B82F6] text-white hover:bg-[#2563EB] focus:ring-blue-500 shadow-md hover:shadow-lg  active:scale-95",
      outline: "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-400",
      ghost: "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-400",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-sm",
      default: "px-4 py-4 text-base",
      lg: "px-10 py-5 text-lg md:text-xl",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size])}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };