import css from "./Button.module.css";

export default function Button({ text, onClick, type = "button", style }) {
  return (
    <button type={type} onClick={onClick} className={css.button} style={style}>
      {text}
    </button>
  );
}
