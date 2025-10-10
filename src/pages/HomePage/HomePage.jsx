import Hero from "../../components/Hero/Hero";
import ImageCard from "../../components/ImageCard/ImageCard";
import HeroStats from "../../components/HeroStats/HeroStats";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={css.main}>
        <section className={css.section}>
          <Hero />
          <ImageCard />
        </section>

        <HeroStats />
      </div>
    </>
  );
}
