import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthHeader from "./AuthHeader";
import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";

import { registerSchema } from "../../schemas/authSchemas";
import {
  registerUser,
  clearError,
} from "../../redux/slices/authSlice";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    dispatch(
      registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Registration successful!");
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
        title="Create Account"
        subtitle="Create your TaskFlow AI account."
      />

      <Input
        label="First Name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />

      <Input
        label="Last Name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      <Input
        label="Username"
        error={errors.username?.message}
        {...register("username")}
      />

      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" loading={loading}>
        Register
      </Button>

      <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-yellow-500 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}