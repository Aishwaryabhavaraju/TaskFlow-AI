import AuthHero from "../components/auth/AuthHero";
import AuthCard from "../components/auth/AuthCard";

export default function AuthLayout({ children }) {
  return (
    <div
      className="
      min-h-screen
      transition-all
      duration-300

      bg-white
      dark:bg-black

      text-zinc-900
      dark:text-white
      "
    >
      <div
        className="
        grid

        lg:grid-cols-2

        min-h-screen
        "
      >
        <AuthHero />

        <AuthCard>
          {children}
        </AuthCard>
      </div>
    </div>
  );
}