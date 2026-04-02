import { useState } from "react";

function TransactionForm({ onAddTransaction, categoryOptions }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.date) {
      alert("Please fill all required fields.");
      return;
    }

    onAddTransaction({
      ...formData,
      amount: Number(formData.amount)
    });

    setFormData({
      title: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: ""
    });
  };

  return (
    <section className="panel_card form_panel">
      <div className="section_top">
        <div>
          <h2>Add New Transaction</h2>
          <p>Quick form for admin to add new finance entries</p>
        </div>
        <div className="panel_badge">Admin Access</div>
      </div>

      <form className="transaction_form" onSubmit={handleSubmit}>
        <div className="form_grid improved_form_grid">
          <label className="field_group">
            <span>Transaction Title</span>
            <input
              type="text"
              name="title"
              placeholder="Ex. Grocery Store"
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label className="field_group">
            <span>Amount</span>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>

          <label className="field_group">
            <span>Category</span>
            <select name="category" value={formData.category} onChange={handleChange}>
              {categoryOptions
                .filter((item) => item !== "All")
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </label>

          <label className="field_group">
            <span>Type</span>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label className="field_group full_width">
            <span>Date</span>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
        </div>

        <div className="form_actions">
          <button className="primary_btn" type="submit">
            Add Transaction
          </button>
          <p className="form_note">Tip: Use viewer/admin role switch above for RBAC demo.</p>
        </div>
      </form>
    </section>
  );
}

export default TransactionForm;
