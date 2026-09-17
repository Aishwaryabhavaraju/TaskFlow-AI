import { Loader2 } from "lucide-react";

export default function Button({
  children,
  loading,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "bg-yellow-400 text-black hover:bg-yellow-300 active:bg-yellow-500 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 shadow-sm",
    secondary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
    outline:
      "border border-zinc-200 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
  };

  const isFullWidth = className.includes("w-full") ? "w-full" : "";
  const selectedSize = sizeStyles[size] || sizeStyles.md;
  const selectedVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`${baseStyles} ${selectedSize} ${selectedVariant} ${isFullWidth} ${className}`.trim()}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" size={18} />}
      {children}
    </button>
  );
}