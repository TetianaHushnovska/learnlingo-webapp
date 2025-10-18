import * as yup from "yup";
import css from "./BookTrialModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  reason: yup.string().required("Please select a reason"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  number: yup
    .string()
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone number")
    .required("Phone number is required"),
});

export default function BookTrialModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errers },
  } = useForm;
  ({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    alert("Trial lesson booked successfully!");
    onClose();
  };
}
