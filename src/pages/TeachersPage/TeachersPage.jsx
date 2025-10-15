import css from "./TeachersPage.module.css";
import TeachersList from "../../components/TeachersList/TeachersList";

export default function TeachersPage() {
  return (
    <section className={css.container}>
      <TeachersList />
    </section>
  );
}
