import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            type={show ? "text" : "password"}
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
              pr-12
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

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;