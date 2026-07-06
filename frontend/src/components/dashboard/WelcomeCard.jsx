import { useSelector } from "react-redux";

export default function WelcomeCard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="
      rounded-2xl
      bg-gradient-to-r
      from-yellow-400
      to-yellow-500
      p-8
      text-black
      shadow-lg
      "
    >
      <h1 className="text-4xl font-bold">
        Welcome back, {user?.firstName} 👋
      </h1>

      <p className="mt-3 text-lg opacity-90">
        Stay organized, collaborate smarter, and let AI help
        you finish projects faster.
      </p>
    </div>
  );
}