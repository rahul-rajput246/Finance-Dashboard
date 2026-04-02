function TransactionsSection({
  transactions,
  filters,
  setFilters,
  onDeleteTransaction,
  role
}) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "all",
      category: "All",
      sortBy: "date-desc"
    });
  };

  return (
    <section className="panel_card table_panel">
      <div className="section_top">
        <div>
          <h2>Transactions</h2>
          <p>Search, filter, sort, and explore financial activity</p>
        </div>

        <div className="table_top_actions">
          <div className="panel_badge">
            {transactions.length} {transactions.length === 1 ? "record" : "records"}
          </div>
          <button className="secondary_btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="filters_grid improved_filters_grid">
        <label className="field_group">
          <span>Search</span>
          <input
            type="text"
            name="search"
            placeholder="Search by title or category"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </label>

        <label className="field_group">
          <span>Type</span>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="field_group">
          <span>Category</span>
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Bonus">Bonus</option>
            <option value="Investment">Investment</option>
            <option value="Housing">Housing</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Shopping">Shopping</option>
          </select>
        </label>

        <label className="field_group">
          <span>Sort By</span>
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount High to Low</option>
            <option value="amount-asc">Amount Low to High</option>
          </select>
        </label>
      </div>

      {transactions.length === 0 ? (
        <div className="empty_state">
          <h3>No transactions found</h3>
          <p>Try changing your search text, type, category, or sort option.</p>
        </div>
      ) : (
        <div className="table_wrapper improved_table_wrapper">
          <table className="transaction_table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                {role === "admin" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={`type_badge ${item.type}`}>{item.type}</span>
                  </td>
                  <td className={item.type === "income" ? "income_text" : "expense_text"}>
                    {item.type === "income" ? "+" : "-"}₹
                    {item.amount.toLocaleString("en-IN")}
                  </td>
                  {role === "admin" && (
                    <td>
                      <button
                        className="danger_btn"
                        onClick={() => onDeleteTransaction(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TransactionsSection;
