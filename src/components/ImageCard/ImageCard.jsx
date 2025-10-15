import css from "./ImageCard.module.css";

export default function ImageCard() {
  return (
    <div className={css.imgCard}>
      <img
        src="/img/hero.jpg"
        alt="Smiling student"
        srcSet="/img/hero.jpg 1x, /img/hero@2x.jpg 2x"
      />
    </div>
  );
}
