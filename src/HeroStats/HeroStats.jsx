import css from "./HeroStats.module.css";

export default function HeroStats() {
  const stats = [
    { number: "32,000+", label: "Experienced tutors" },
    { number: "300,000+", label: "5-star tutor reviews" },
    { number: "120+", label: "Subjects taught" },
    { number: "200+", label: "Tutor nationalities" },
  ];

  return (
    <div className={css.stats}>
      <svg className={css.statsBorder} xmlns="http://www.w3.org/2000/svg">
        <rect
          x="1"
          y="1"
          rx="30"
          ry="30"
          width="100%"
          height="100%"
          fill="none"
          stroke="#9FBAAE"
          strokeWidth="1.5"
          strokeDasharray="15 15" /* довжина штриха + відстань */
        />
      </svg>

      <div className={css.statsContent}>
        {stats.map((item, index) => (
          <div key={index} className={css.statsWraper}>
            <h3 className={css.statsNumber}>{item.number}</h3>
            <p className={css.statsLabel}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
