import css from "./Button.module.css";

export default function Button({ text, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick} className={css.button}>
      {text}
    </button>
  );
}
