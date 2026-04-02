function LineChartCard({ data }) {
  const width = 620;
  const height = 260;
  const padding = 34;
  const maxValue = Math.max(...data.map((item) => item.balance), 1);

  const points = data
    .map((item, index) => {
      const x = padding + (index * (width - padding * 2)) / (data.length - 1 || 1);
      const y = height - padding - (item.balance / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="chart_card animated_card">
      <div className="section_top">
        <div>
          <h2>Balance Trend</h2>
          <p>Month wise net balance overview</p>
        </div>
        <div className="panel_badge">Time Based</div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="line_chart">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary-color)" />
            <stop offset="100%" stopColor="var(--secondary-color)" />
          </linearGradient>
        </defs>

        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="axis_line" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} className="axis_line" />

        <polyline fill="none" points={points} className="trend_line" />

        {data.map((item, index) => {
          const x = padding + (index * (width - padding * 2)) / (data.length - 1 || 1);
          const y = height - padding - (item.balance / maxValue) * (height - padding * 2);

          return (
            <g key={item.month}>
              <circle cx={x} cy={y} r="6" className="trend_point" />
              <text x={x} y={height - 10} textAnchor="middle" className="axis_label">
                {item.month}
              </text>
              <text x={x} y={y - 12} textAnchor="middle" className="point_value">
                ₹{item.balance.toLocaleString("en-IN")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default LineChartCard;
