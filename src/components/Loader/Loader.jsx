import { PropagateLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function LOader() {
  return (
    <div className={css.loader}>
      <PropagateLoader color="#9FBAAE" />
    </div>
  );
}
