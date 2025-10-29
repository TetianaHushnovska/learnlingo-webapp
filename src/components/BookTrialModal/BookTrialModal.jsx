import * as yup from "yup";
import css from "./BookTrialModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { useSelector } from "react-redux";
import {
  useAutoCloseOnAuth,
  useCloseOnEsc,
  useLockBodyScroll,
} from "../../utils";

const schema = yup.object({
  reason: yup.string().required("Please select a reason"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  number: yup
    .string()
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone number")
    .required("Phone number is required"),
});

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

export default function BookTrialModal({ teacher, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { isAuthenticated } = useSelector((state) => state.auth);

  useCloseOnEsc(onClose);
  useLockBodyScroll();
  useAutoCloseOnAuth(isAuthenticated, onClose);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    iziToast.success({
      title: "OK",
      message: "Trial lesson booked successfully!",
      position: "topRight",
    });
    onClose();
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.modalBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>

        <h2 className={css.modalTitle}>Book trial lesson</h2>
        <p className={css.modalSubtitle}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.teacherWrap}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={css.teacherImg}
          />
          <div>
            <p className={css.teacherTitle}>Your teacher</p>
            <p className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.optionsWrap}>
            <p className={css.optionsTitle}>
              What is your main reason for learning English?
            </p>
            {reasons.map((option, index) => (
              <label key={index} className={css.reasonLabel}>
                <input
                  type="radio"
                  value={option}
                  {...register("reason")}
                  className={css.reasonInput}
                />
                {option}
              </label>
            ))}
            {errors.reason && (
              <p className={css.error}>{errors.reason.message}</p>
            )}
          </div>

          <div>
            <label>
              <input
                type="text"
                {...register("name")}
                placeholder="Full name"
                className={css.formInput}
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
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

            <label>
              <input
                type="number"
                {...register("number")}
                placeholder="Phone number"
                className={css.formInput}
              />
              {errors.number && (
                <p className={css.error}>{errors.number.message}</p>
              )}
            </label>

            <button type="submit" className={css.formBtn}>
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
