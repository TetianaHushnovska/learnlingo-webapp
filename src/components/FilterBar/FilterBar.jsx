import css from "./FilterBar.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { languages, levels, prices } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/teachers/teachersSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.teachers.filters);

  const handleChange = (field, value) => {
    dispatch(setFilters({ [field]: value }));
  };

  return (
    <div className={css.filter}>
      {/* Мова */}
      <div className={css.label} style={{ width: "221px" }}>
        <span>Languages</span>
        <Dropdown
          options={languages}
          value={filters.language}
          onChange={(val) => handleChange("language", val)}
          placeholder="All languages"
        />
      </div>

      {/* Рівні */}
      <div className={css.label} style={{ width: "198px" }}>
        <span>Level of knowledge</span>
        <Dropdown
          options={levels}
          value={filters.level}
          onChange={(val) => handleChange("level", val)}
          placeholder="All levels"
        />
      </div>

      {/* Ціни */}
      <div className={css.label} style={{ width: "124px" }}>
        <span>Price</span>
        <Dropdown
          options={prices}
          value={filters.price}
          onChange={(val) => handleChange("price", val)}
          placeholder="All prices"
        />
      </div>
    </div>
  );
}
