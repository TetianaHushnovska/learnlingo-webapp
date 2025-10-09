import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import ImageCard from "../../components/ImageCard/ImageCard";
import HeroStats from "../../HeroStats/HeroStats";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className={css.main}>
        <section className={css.section}>
          <Hero />
          <ImageCard />
        </section>

        <HeroStats />
      </main>
    </>
  );
}
