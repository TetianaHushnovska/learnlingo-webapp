import { useDispatch, useSelector } from "react-redux";
import css from "./RegisterModal.module.css";
import * as yup from "yup";
import { registerUser } from "../../redux/auth/operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  useAutoCloseOnAuth,
  useCloseOnEsc,
  useLockBodyScroll,
} from "../../utils";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

export default function RegisterModal({ onClose }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isAuthenticated } = useSelector((state) => state.auth);

  useCloseOnEsc(onClose);
  useLockBodyScroll();
  useAutoCloseOnAuth(isAuthenticated, onClose);

  const onSubmit = (data) => {
    setFirebaseError(null);
    dispatch(registerUser(data))
      .unwrap()
      .then(() => onClose())
      .catch((error) => {
        const message =
          typeof error === "string"
            ? error
            : error?.message || error?.error?.message || "Unknown error";

        if (
          message.includes("EMAIL_EXISTS") ||
          message.includes("email-already-in-use")
        ) {
          setFirebaseError(
            "This email is already registered. Try logging in instead."
          );
        } else if (message.includes("WEAK_PASSWORD")) {
          setFirebaseError(
            "Password is too weak. Please choose a stronger one."
          );
        } else {
          setFirebaseError("Something went wrong. Please try again later.");
        }

        console.error("Registration error:", message);
      });
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.modalBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>
        <h2 className={css.modalTitle}>Registration</h2>
        <p className={css.modalSubtitle}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <label>
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className={css.formInput}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </label>

          <label>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className={css.formInput}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
            {firebaseError && <p className={css.error}>{firebaseError}</p>}
          </label>

          <label className={css.pwdWraper}>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register("password")}
              placeholder="Password"
              className={css.formInput}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={css.showIcon}
            >
              <svg className={css.icon}>
                <use href="/icons.svg#icon-eye-off" />
              </svg>
            </button>
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </label>

          <button type="submit" className={css.formBtn}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
