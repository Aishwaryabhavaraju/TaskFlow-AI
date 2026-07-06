import AuthLayout from "./layouts/AuthLayout";

import AuthHeader from "./components/auth/AuthHeader";

import Input from "./components/common/Input";
import PasswordInput from "./components/common/PasswordInput";
import Checkbox from "./components/common/Checkbox";
import Button from "./components/common/Button";

export default function App() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue to TaskFlow AI."
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
      />

      <div className="mb-6 flex items-center justify-between">
        <Checkbox label="Remember Me" />

        <button
          className="
          text-sm
          font-medium
          text-yellow-500
          hover:underline
          "
        >
          Forgot Password?
        </button>
      </div>

      <Button>
        Login
      </Button>
    </AuthLayout>
  );
}