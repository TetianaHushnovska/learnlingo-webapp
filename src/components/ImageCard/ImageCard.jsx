import css from "./ImageCard.module.css";

export default function ImageCard() {
  return (
    <div className={css.imgCard}>
      <img
        src="/img/hero.jpg"
        alt="Smiling student"
        srcSet="/src/img/hero.jpg 1x, /src/img/hero@2x.jpg 2x"
      />
    </div>
  );
}
