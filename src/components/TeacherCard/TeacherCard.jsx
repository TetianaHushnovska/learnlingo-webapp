import { useState } from "react";
import css from "./TeacherCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { toggleFav } from "../../redux/favorite/favoriteSlice";
import { ref, set } from "firebase/database";
import { database } from "../../firebase/firebase";

export default function TeacherCard({ teacher, onBookTrial }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector(
    (state) => state.favoriteTeachers.favoriteTeachers
  );

  const {
    avatar_url,
    name,
    surname,
    languages,
    rating,
    lessons_done,
    price_per_hour,
    experience,
    conditions,
    lesson_info,
    reviews,
    levels,
  } = teacher;

  const isFavorite = favorites?.includes(teacher.id);

  const handleFav = async () => {
    // console.log("❤️ Clicked fav:", teacher.id, favorites);
    if (!user) {
      iziToast.warning({
        title: "Caution",
        message: "Please log in to add favorites!",
        position: "topRight",
      });
      return;
    }

    dispatch(toggleFav(teacher.id));

    const updateFav = isFavorite
      ? favorites.filter((id) => id !== teacher.id)
      : [...favorites, teacher.id];

    await set(ref(database, `users/${user.uid}/favorites`), updateFav);
  };

  return (
    <div className={css.card}>
      <div className={css.cardWraper}>
        <div className={css.avatarWrap}>
          <div className={css.border}>
            <img src={avatar_url} alt={name} className={css.avatar} />
            <div className={css.onlineMark}></div>
          </div>
        </div>

        <div className={css.mainInfo}>
          <div className={css.topDetails}>
            <p className={css.subTitle}>Languages</p>
            <div className={css.infoWrap}>
              <p className={css.lineText}>
                <svg className={css.icon}>
                  <use href="/icons.svg#icon-book" />
                </svg>
                Lessons online
              </p>
              <p className={css.break}>|</p>
              <p>Lessons done: {lessons_done}</p>
              <p className={css.break}>|</p>
              <p className={css.lineText}>
                <svg
                  style={{ width: "16px", height: "16px", marginRight: "8px" }}
                >
                  <use href="/icons.svg#icon-star" />
                </svg>
                Rating: {rating}
              </p>
              <p className={css.break}>|</p>
              <p>
                Price / 1 hour:{" "}
                <span className={css.price}>{price_per_hour}$</span>
              </p>
            </div>
            <button
              type="button"
              className={`${css.btnFav} ${isFavorite ? css.active : ""}`}
              onClick={handleFav}
            >
              <svg className={css.iconFav}>
                <use href="/icons.svg#icon-heart" />
              </svg>
            </button>
          </div>

          <div className={css.name}>
            {name} {surname}
          </div>

          <p className={css.infoLine}>
            <span className={css.description}> Speaks: </span>
            {languages.map((lang, index) => (
              <span key={index} className={css.lang}>
                {lang}
                {index < languages.length - 1 && ", "}
              </span>
            ))}
          </p>

          <p className={css.infoLine}>
            <span className={css.description}>Lesson Info: </span>
            {lesson_info}
          </p>

          <p className={css.infoLine}>
            <span className={css.description}>Conditions: </span>
            {conditions.map((condition, index) => (
              <span key={index}>
                {condition}
                {index < conditions.length - 1 && " "}
              </span>
            ))}
          </p>

          {!isExpanded && (
            <button
              className={css.readMore}
              onClick={() => setIsExpanded(true)}
            >
              Read More
            </button>
          )}

          {isExpanded && (
            <>
              <p className={css.experience}>{experience}</p>
              <ul>
                {reviews.map((review, index) => (
                  <li key={index} style={{ marginBottom: "16px" }}>
                    <div className={css.reviews}>
                      <div>
                        <svg className={css.iconReview}>
                          <use href="/icons.svg#icon-user" />
                        </svg>
                      </div>
                      <div>
                        <p className={css.description}>
                          {review.reviewer_name}
                        </p>
                        <p className={css.lineText}>
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              marginRight: "8px",
                            }}
                          >
                            <use href="/icons.svg#icon-star" />
                          </svg>
                          {review.reviewer_rating}.0
                        </p>
                      </div>
                    </div>

                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          <ul className={css.levels}>
            {levels.map((level, index) => (
              <li key={index} className={css.levelItem}>
                #{level}
              </li>
            ))}
          </ul>

          {isExpanded && (
            <button
              type="button"
              className={css.trialBtn}
              onClick={() => onBookTrial(teacher)}
            >
              Book trial lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
