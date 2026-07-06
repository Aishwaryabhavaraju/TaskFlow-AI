import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useEffect } from "react";

import AuthHeader from "./AuthHeader";

import Input from "../common/Input";
import Button from "../common/Button";

import { forgotPasswordSchema } from "../../schemas/authSchemas";

import {
  forgotPasswordUser,
  clearError,
} from "../../redux/slices/authSlice";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();

  const {
    loading,
    error,
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    dispatch(forgotPasswordUser(data.email))
      .unwrap()
      .then((message) => {
        toast.success(message);
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearError());
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <AuthHeader
        title="Forgot Password"
        subtitle="Enter your email address to receive a password reset link."
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Button
        type="submit"
        loading={loading}
      >
        Send Reset Link
      </Button>

      <p className="mt-8 text-center">

        <Link
          to="/login"
          className="text-yellow-500 hover:underline"
        >
          ← Back to Login
        </Link>

      </p>

    </form>
  );
}