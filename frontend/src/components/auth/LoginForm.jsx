import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import AuthHeader from "./AuthHeader";
import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";
import Checkbox from "../common/Checkbox";
import Button from "../common/Button";

import { loginSchema } from "../../schemas/authSchemas";
import { loginUser, clearError } from "../../redux/slices/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue using TaskFlow AI."
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="mb-6 flex items-center justify-between">

        <Checkbox
          label="Remember Me"
          {...register("rememberMe")}
        />

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-yellow-500 hover:underline"
        >
          Forgot Password?
        </Link>

      </div>

      <Button
        type="submit"
        loading={loading}
      >
        Login
      </Button>

      <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-yellow-500 hover:underline"
        >
          Register
        </Link>
      </p>

    </form>
  );
}