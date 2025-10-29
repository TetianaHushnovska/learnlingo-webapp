import { useDispatch, useSelector } from "react-redux";
import css from "./TeachersList.module.css";
import { getTeachers } from "../../redux/teachers/operations";
import { selectFilteredTeachers } from "../../redux/teachers/selectors";
import {
  clearPagination,
  showMoreFiltered,
} from "../../redux/teachers/teachersSlice";
import TeacherCard from "../TeacherCard/TeacherCard";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import BookTrialModal from "../BookTrialModal/BookTrialModal";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import { useEffect, useState } from "react";

export default function TeachersList({ customItems = null }) {
  const dispatch = useDispatch();
  const filteredTeachers = useSelector(selectFilteredTeachers);
  const { filters, loading, error, lastKey, hasMore, items, allTeachers } =
    useSelector((state) => state.teachers);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const hasFilters = filters.language || filters.level || filters.price;
  const isCustom = Array.isArray(customItems);

  const handleLoadMore = () => {
    if (hasFilters) {
      dispatch(showMoreFiltered());
    } else if (hasMore && !loading) {
      dispatch(getTeachers(lastKey));
    }
  };

  useEffect(() => {
    if (!isCustom && !hasFilters && items.length === 0) {
      dispatch(getTeachers());
    }
  }, [dispatch, hasFilters, items.length, isCustom]);

  useEffect(() => {
    return () => {
      dispatch(clearPagination());
    };
  }, [dispatch]);

  if (
    loading &&
    !isCustom &&
    (!hasFilters ? items.length === 0 : filteredTeachers.length === 0)
  )
    return <Loader />;

  if (error) return <p className={css.error}>Error: {error}</p>;

  const teachersToShow = isCustom
    ? customItems
    : hasFilters
    ? filteredTeachers
    : items;

  if (!loading && teachersToShow.length === 0) {
    return (
      <div className={css.emptyState}>
        <p>No teachers matching your request 🥺</p>
      </div>
    );
  }

  const totalFilteredCount = hasFilters
    ? allTeachers.filter((teacher) => {
        const matchesLanguage =
          !filters.language || teacher.languages?.includes(filters.language);
        const matchesLevel =
          !filters.level || teacher.levels?.includes(filters.level);
        const matchesPrice =
          !filters.price ||
          (() => {
            const [min, max] = filters.price.split("-").map(Number);
            return (
              teacher.price_per_hour >= min && teacher.price_per_hour <= max
            );
          })();
        return matchesLanguage && matchesLevel && matchesPrice;
      }).length
    : 0;

  const allFilteredShown =
    hasFilters && filteredTeachers.length >= totalFilteredCount;

  return (
    <div>
      <ul className={css.list}>
        {teachersToShow.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} onBookTrial={setSelectedTeacher} />
          </li>
        ))}
      </ul>

      {!isCustom && !loading && teachersToShow.length > 0 && (
        <div className={css.buttonWrapper}>
          {((hasFilters && !allFilteredShown) || (!hasFilters && hasMore)) && (
            <Button
              text="Load more"
              onClick={handleLoadMore}
              style={{ margin: "0 auto", display: "block" }}
            />
          )}
        </div>
      )}

      {loading && teachersToShow.length > 0 && <Loader />}

      {selectedTeacher && (
        <BookTrialModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}

      <ScrollToTopButton />
    </div>
  );
}
