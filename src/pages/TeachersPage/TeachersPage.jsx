import css from "./TeachersPage.module.css";
import TeachersList from "../../components/TeachersList/TeachersList";
import FilterBar from "../../components/FilterBar/FilterBar";

export default function TeachersPage() {
  return (
    <section className={css.container}>
      <FilterBar />
      <TeachersList />
    </section>
  );
}
