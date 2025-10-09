import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import css from "./Hero.module.css";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className={css.hero}>
      <h1 className={css.heroTitle}>
        Unlock your potential with the best{" "}
        <span className={css.highlight}>language</span> tutors
      </h1>

      <p className={css.heroSubtitle}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>

      <Button text="Get started" onClick={() => navigate("/teachers")} />
    </section>
  );
}
