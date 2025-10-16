import { useDispatch, useSelector } from "react-redux";
import css from "./TeachersList.module.css";
import { useEffect, useRef } from "react";
import { getTeachers } from "../../redux/teachers/operations";
import TeacherCard from "../TeacherCard/TeacherCard";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

export default function TeachersList() {
  const dispatch = useDispatch();
  const { items, loading, error, lastKey, hasMore } = useSelector(
    (state) => state.teachers
  );

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getTeachers());
      hasFetched.current = true;
    }
  }, [dispatch]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(getTeachers(lastKey));
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul className={css.list}>
        {items.map((teacher, index) => (
          <li key={index}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>
      {hasMore && !loading && (
        <Button
          text="Load more"
          onClick={handleLoadMore}
          style={{ margin: "0 auto", display: "block" }}
        />
      )}

      {loading && items.length > 0 && <Loader />}
    </div>
  );
}
