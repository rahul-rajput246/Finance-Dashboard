import { FaChartLine, FaCoins, FaBullseye } from "react-icons/fa";

function InsightsSection({ insights }) {
  const icons = [<FaCoins />, <FaChartLine />, <FaBullseye />];

  return (
    <section className="insight_grid">
      {insights.map((item, index) => (
        <div className="insight_card animated_card" key={item.title} style={{ animationDelay: `${index * 0.08}s` }}>
          <div className="insight_icon">{icons[index]}</div>
          <h3>{item.title}</h3>
          <p>{item.value}</p>
          <span>{item.note}</span>
        </div>
      ))}
    </section>
  );
}

export default InsightsSection;
