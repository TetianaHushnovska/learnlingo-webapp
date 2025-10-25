import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredTeachers = createSelector(
  [
    (state) => state.teachers.items,
    (state) => state.teachers.filters,
  ],
  (items, filters) => {
    const { language, level, price } = filters;

    return items.filter((teacher) => {
      // ✅ безпечна перевірка навіть якщо поля відсутні
      const teacherLanguages = Array.isArray(teacher.languages)
        ? teacher.languages
        : teacher.language
        ? [teacher.language]
        : [];

      const teacherLevels = Array.isArray(teacher.levels)
        ? teacher.levels
        : teacher.level
        ? [teacher.level]
        : [];

      const matchesLanguage =
        !language || teacherLanguages.includes(language);

      const matchesLevel = !level || teacherLevels.includes(level);

      const matchesPrice =
        !price ||
        (() => {
          const [min, max] = price.split("-").map(Number);
          return (
            teacher.price_per_hour >= min && teacher.price_per_hour <= max
          );
        })();

      return matchesLanguage && matchesLevel && matchesPrice;
    });
  }
);
