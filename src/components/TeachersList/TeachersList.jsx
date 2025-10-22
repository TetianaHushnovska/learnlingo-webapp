import { useDispatch, useSelector } from "react-redux";
import css from "./TeachersList.module.css";
import { useEffect, useRef, useState } from "react";
import { getTeachers } from "../../redux/teachers/operations";
import TeacherCard from "../TeacherCard/TeacherCard";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import BookTrialModal from "../BookTrialModal/BookTrialModal";

export default function TeachersList() {
  const dispatch = useDispatch();
  const { items, loading, error, lastKey, hasMore } = useSelector(
    (state) => state.teachers
  );
  const [selectedTeacher, setSelectedTeacher] = useState(null);

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
            <TeacherCard teacher={teacher} onBookTrial={setSelectedTeacher} />
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

      {selectedTeacher && (
        <BookTrialModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
}
