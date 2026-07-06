import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import AuthHeader from "./AuthHeader";

import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";

import { resetPasswordSchema } from "../../schemas/authSchemas";

import {
  resetPasswordUser,
  clearError,
} from "../../redux/slices/authSlice";

export default function ResetPasswordForm() {
  const { token } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    loading,
    error,
  } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data) => {
    dispatch(
      resetPasswordUser({
        token,
        password: data.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(
          "Password reset successfully"
        );

        navigate("/login");
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <AuthHeader
        title="Reset Password"
        subtitle="Choose a new password for your account."
      />

      <PasswordInput
        label="New Password"
        placeholder="Enter new password"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm new password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button
        type="submit"
        loading={loading}
      >
        Reset Password
      </Button>

    </form>
  );
}