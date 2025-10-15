import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";

export default function Header({ onRegisterClick, onLoginClick }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        <img
          src="/img/ukraine.png"
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
        {user ? (
          <button
            type="button"
            className={css.authLogin}
            onClick={handleLogOut}
          >
            <svg className={css.authIcon}>
              <use href="/icons.svg#icon-log-in" />
            </svg>
            Log Out
          </button>
        ) : (
          <button
            type="button"
            className={css.authLogin}
            onClick={onLoginClick}
          >
            <svg className={css.authIcon}>
              <use href="/icons.svg#icon-log-in" />
            </svg>
            Log In
          </button>
        )}

        {user ? (
          <button type="button" className={css.authRegist} disabled>
            Registered
          </button>
        ) : (
          <button
            type="button"
            className={css.authRegist}
            onClick={onRegisterClick}
          >
            Registration
          </button>
        )}
      </div>
    </header>
  );
}
