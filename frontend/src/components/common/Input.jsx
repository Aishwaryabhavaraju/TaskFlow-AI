import { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          className={`
            w-full
            rounded-xl
            border
            border-zinc-300
            dark:border-zinc-700
            bg-white
            dark:bg-zinc-900
            px-4
            py-3
            text-zinc-900
            dark:text-white
            placeholder:text-zinc-400
            outline-none
            transition
            focus:border-yellow-500
            focus:ring-2
            focus:ring-yellow-500/30
            ${className}
          `}
        />

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;