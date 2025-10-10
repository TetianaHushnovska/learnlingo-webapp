import { Link } from "react-router-dom";
import css from "./Header.module.css";

export default function Header({ onRegisterClick }) {
  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        <img
          src="/src/img/ukraine.png"
          alt="Website logo"
          className={css.logoImg}
        />
        <span className={css.logoText}>LearnLingo</span>
      </Link>

      <nav className={css.nav}>
        <Link to="/" className={css.navLink}>
          Home
        </Link>
        <Link to="/teachers" className={css.navLink}>
          Teachers
        </Link>
      </nav>

      <div className={css.auth}>
        <button type="button" className={css.authLogin}>
          <svg className={css.authIcon}>
            <use href="/icons.svg#icon-log-in" />
          </svg>
          Log In
        </button>

        <button
          type="button"
          className={css.authRegist}
          onClick={onRegisterClick}
        >
          Registration
        </button>
      </div>
    </header>
  );
}
