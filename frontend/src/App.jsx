import AuthLayout from "./layouts/AuthLayout";

export default function App() {
  return (
    <AuthLayout>

      <div>

        <p className="uppercase tracking-[0.4em] text-sm text-zinc-500">
          Welcome Back
        </p>

        <h1 className="text-5xl font-black mt-3">
          Sign in to TaskFlow AI
        </h1>

        <p className="mt-6 text-zinc-500">
          Login form will be built in Step 2.4.
        </p>

      </div>

    </AuthLayout>
  );
}