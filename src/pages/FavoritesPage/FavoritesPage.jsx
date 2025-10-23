import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { get, ref } from "firebase/database";
import { database } from "../../firebase/firebase";
import TeachersList from "../../components/TeachersList/TeachersList";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import css from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const favoriteIds = useSelector(
    (state) => state.favoriteTeachers.favoriteTeachers
  );
  const [favTeachers, setFavTeachers] = useState([]);
  const [visibleTeachers, setVisibleTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const fetchAllTeachers = async () => {
      setLoading(true);

      try {
        const snapshot = await get(ref(database));
        if (!snapshot.exists()) {
          setFavTeachers([]);
          setLoading(false);
          return;
        }

        const data = snapshot.val();
        const allTeachers = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        const favoriteTeachers = allTeachers.filter((t) =>
          favoriteIds.includes(t.id)
        );

        setFavTeachers(favoriteTeachers);
        setVisibleTeachers(favoriteTeachers.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTeachers();
  }, [favoriteIds]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const nextVisible = favTeachers.slice(0, nextPage * ITEMS_PER_PAGE);
    setVisibleTeachers(nextVisible);
    setPage(nextPage);
  };

  if (loading) return <Loader />;

  return (
    <section className={css.section}>
      {visibleTeachers.length > 0 ? (
        <>
          <TeachersList customItems={visibleTeachers} />
          {visibleTeachers.length < favTeachers.length && (
            <Button
              text="Load more"
              onClick={handleLoadMore}
              style={{ margin: "0 auto", display: "block" }}
            />
          )}
        </>
      ) : (
        <p className={css.empty}>
          You haven’t added any favorite teachers yet.
        </p>
      )}
    </section>
  );
}
