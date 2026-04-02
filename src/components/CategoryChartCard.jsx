function CategoryChartCard({ data }) {
  const maxAmount = Math.max(...data.map((item) => item.amount), 1);

  return (
    <div className="chart_card animated_card">
      <div className="section_top">
        <div>
          <h2>Spending Breakdown</h2>
          <p>Category wise expense comparison</p>
        </div>
        <div className="panel_badge">Category Based</div>
      </div>

      <div className="bars_wrapper">
        {data.length === 0 ? (
          <div className="empty_state small_empty">No expense category data available.</div>
        ) : (
          data.map((item, index) => (
            <div className="bar_row" key={item.category}>
              <div className="bar_labels">
                <span>{item.category}</span>
                <strong>₹{item.amount.toLocaleString("en-IN")}</strong>
              </div>
              <div className="bar_track">
                <div
                  className="bar_fill"
                  style={{
                    width: `${(item.amount / maxAmount) * 100}%`,
                    animationDelay: `${index * 0.06}s`
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryChartCard;
