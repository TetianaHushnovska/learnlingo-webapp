import { useDispatch, useSelector } from "react-redux";
import css from "./LoginModal.module.css";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../redux/auth/operations";
import Loader from "../Loader/Loader";
import {
  useAutoCloseOnAuth,
  useCloseOnEsc,
  useLockBodyScroll,
} from "../../utils";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

export default function LoginModal({ onClose }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useCloseOnEsc(onClose);
  useLockBodyScroll();
  useAutoCloseOnAuth(isAuthenticated, onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitError("");
    try {
      await dispatch(loginUser(data)).unwrap();
      reset();
      onClose();
    } catch (error) {
      setSubmitError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.modalBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>

        <h2 className={css.modalTitle}>Log In</h2>
        <p className={css.modalSubtitle}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a teacher.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
          </label>

          <label className={css.pwdWraper}>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className={css.formInput}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={css.showIcon}
              aria-label="Toggle password visibility"
            >
              <svg className={css.icon}>
                <use
                  href={`/icons.svg#${
                    showPassword ? "icon-eye" : "icon-eye-off"
                  }`}
                />
              </svg>
            </button>
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </label>

          {submitError && <p className={css.submitError}>{submitError}</p>}

          <button type="submit" className={css.formBtn} disabled={loading}>
            {loading ? <Loader size={20} /> : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
