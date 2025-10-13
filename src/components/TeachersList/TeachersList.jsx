import { useDispatch, useSelector } from "react-redux";
import css from "./TeachersList.module.css";
import { useEffect } from "react";
import { getTeachers } from "../../redux/teachers/operations";
import TeacherCard from "../TeacherCard/TeacherCard";

export default function TeachersList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className={css.list}>
      {items.map((teacher, index) => (
        <li key={index}>
          <TeacherCard teacher={teacher} />
        </li>
      ))}
    </ul>
  );
}
