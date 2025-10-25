import { useState, useRef, useEffect } from "react";
import css from "./Dropdown.module.css";

export default function Dropdown({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Закриття при кліку поза
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={css.dropdown} ref={ref}>
      <button
        type="button"
        className={css.selected}
        onClick={() => setOpen(!open)}
      >
        {value || placeholder}
        <span className={css.arrow}>▾</span>
      </button>

      {open && (
        <ul className={css.menu}>
          {options.map((option) => (
            <li
              key={option.value || option}
              className={`${css.option} ${
                (option.value || option) === value ? css.active : css.inactive
              }`}
              onClick={() => {
                onChange(option.value || option);
                setOpen(false);
              }}
            >
              {option.label || option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
