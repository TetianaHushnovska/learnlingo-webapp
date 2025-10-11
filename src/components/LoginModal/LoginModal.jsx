import { useDispatch } from "react-redux";
import css from "./LoginModal.module.css";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../redux/auth/operations";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

export default function LoginModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => onClose())
      .catch((error) => console.log(error));
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
          continue your search for an teacher.
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
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
