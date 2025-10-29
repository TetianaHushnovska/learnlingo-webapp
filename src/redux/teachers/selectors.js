import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredTeachers = createSelector(
  [
    (state) => state.teachers.filters,
    (state) => state.teachers.allTeachers,
    (state) => state.teachers.filteredCount,
  ],
  (filters, allTeachers, count) => {
    const { language, level, price } = filters;

    const filtered = allTeachers.filter((teacher) => {
      const matchesLanguage = !language || teacher.languages?.includes(language);
      const matchesLevel = !level || teacher.levels?.includes(level);
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

    return filtered.slice(0, count); 
  }
);
