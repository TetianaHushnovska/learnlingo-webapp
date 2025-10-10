import { useDispatch } from "react-redux";
import css from "./RegisterModal.module.css";
import * as yup from "yup";
import { registerUser } from "../../redux/auth/operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
    dispatch(registerUser(data))
      .unwrap()
      .then(() => onClose())
      .catch((error) => console.log(error));
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.modalBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/public/icons.svg#icon-x" />
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
          </label>

          <label className={css.pwdWraper}>
            <input
              type={showPassword ? "text" : "password"}
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
