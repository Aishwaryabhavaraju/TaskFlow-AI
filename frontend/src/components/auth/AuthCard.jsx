import ThemeToggle from "../common/ThemeToggle";

export default function AuthCard({ children }) {
  return (
    <div
      className="
      flex

      justify-center

      items-center

      p-8

      lg:p-16

      relative
      "
    >
      <div
        className="
        absolute

        top-8

        right-8
        "
      >
        <ThemeToggle />
      </div>

      <div
        className="
        w-full

        max-w-lg
        "
      >
        {children}
      </div>
    </div>
  );
}